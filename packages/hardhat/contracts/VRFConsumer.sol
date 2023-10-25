// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/vrf/VRFV2WrapperConsumerBase.sol";
import "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";

/** Simple contract that request random numbers from chainlink VRF
 *
 * this example uses the "Direct Funding" method
 * https://docs.chain.link/vrf#two-methods-to-request-randomness
 */

contract VRFConsumer is VRFV2WrapperConsumerBase, ConfirmedOwner {
	// if gas consumed by fulfillRandomWords() exceeds this limit, the transaction will revert
	uint32 callbackGasLimit = 100000;
	// blocks before chainlink node responds (must be greater than a minimum amout set by VRF coordinator contract)
	uint16 requestConfirmations = 3;
	// how many random numbers to generate
	uint32 numValues = 1;
	address public linkAddress;

	// keeping track of who requested which random number
	mapping(uint256 => address) public s_spinners; // requestId => msg.sender
	mapping(address => uint256) public s_results; // msg.sender => random number

	event WheelSpun(uint256 indexed requestId, address indexed spinner);
	event WheelResult(
		uint256 indexed requestId,
		address indexed spinner,
		uint256 indexed randomValue
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
	 *
	 * requestRandomness() is inherited from VRFV2WrapperConsumerBase
	 *
	 * @return requestId each request has a unique ID
	 */

	function spinWheel() public returns (uint256 requestId) {
		// this request will revert if the contract does not have enough LINK to pay the fee
		requestId = requestRandomness(
			callbackGasLimit,
			requestConfirmations,
			numValues
		);

		s_spinners[requestId] = msg.sender;
		emit WheelSpun(requestId, msg.sender);
	}

	/** Chainlink oracle calls this function to deliver the random number
	 *
	 * @param requestId The ID of the request
	 * @param randomWords Array containing the random number(s)
	 *
	 * @dev use the random number to change state of your contract here
	 * @dev modulo is used to constrain the range of the random number
	 */

	function fulfillRandomWords(
		uint256 requestId,
		uint256[] memory randomWords
	) internal override {
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

	function getLinkBalance() public view returns (uint256) {
		LinkTokenInterface link = LinkTokenInterface(linkAddress);
		return link.balanceOf(address(this));
	}
}
