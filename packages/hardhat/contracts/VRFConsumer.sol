// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/vrf/VRFV2WrapperConsumerBase.sol";
import "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";

/**
 *
 */
contract VRFConsumer is VRFV2WrapperConsumerBase, ConfirmedOwner {
	// State variables
	address public linkAddress;
	uint32 callbackGasLimit = 100000; // limit for gas can be used when chainlink node calls fulfillRandomWords()
	// how many blocks chainlink node waits before responding
	// more blocks is safer to avoid chain reorgs but increases response time
	uint16 requestConfirmations = 3;
	uint32 numValues = 1; // how many random numbers to generate

	mapping(uint256 => address) public s_spinners; // requestId => msg.sender
	mapping(address => uint256) public s_results; // msg.sender => random number

	// Events
	event WheelSpun(uint256 indexed requestId, address indexed spinner);
	event WheelResult(
		uint256 indexed requestId,
		address indexed spinner,
		uint256 indexed result
	);

	constructor(
		address _linkAddress,
		address _wrapperAddress
	)
		ConfirmedOwner(msg.sender)
		VRFV2WrapperConsumerBase(_linkAddress, _wrapperAddress)
	{
		linkAddress = _linkAddress;
	}

	/** This function triggers the request to chainlink node that generates the random number
	 * @return requestId each request has a unique ID
	 */
	function spinWheel() public returns (uint256 requestId) {
		// Will revert if link.balanceOf(address(this)) is insufficient
		requestId = requestRandomness(
			callbackGasLimit,
			requestConfirmations,
			numValues
		);

		// keep track of who sent the request
		s_spinners[requestId] = msg.sender;
		emit WheelSpun(requestId, msg.sender);
	}

	/** Chainlink oracle calls this function to deliver the random number
	 * @param requestId The ID of the request
	 * @param randomWords Array containing the random number(s)
	 *
	 * @dev use the random number to change state of your contract here
	 * @dev the random number is huge so you'll want to use modulo to constrain the range
	 */
	function fulfillRandomWords(
		uint256 requestId,
		uint256[] memory randomWords
	) internal override {
		// The remainder of division by 6 can only be 0 - 5
		uint256 randomNumber = (randomWords[0] % 6);
		// update mapping to record who received which random number by using the requestId
		s_results[s_spinners[requestId]] = randomNumber;
		emit WheelResult(requestId, s_spinners[requestId], randomNumber);
	}

	function withdrawLink() public onlyOwner {
		LinkTokenInterface link = LinkTokenInterface(linkAddress);
		require(
			link.transfer(msg.sender, link.balanceOf(address(this))),
			"Unable to transfer"
		);
	}

	// Getters
	function getLinkBalance() public view returns (uint256) {
		LinkTokenInterface link = LinkTokenInterface(linkAddress);
		return link.balanceOf(address(this));
	}
}
