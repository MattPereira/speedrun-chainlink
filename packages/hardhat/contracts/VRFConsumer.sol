// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/vrf/VRFConsumerBaseV2.sol";

/** Simple contract that requests a random number and stores it as a state variable
 *
 * @dev the arguments for "requestRandomWords()" don't have to be immutable but it saves on gas
 */
contract VRFConsumer is VRFConsumerBaseV2 {
	// State variables
	VRFCoordinatorV2Interface private immutable i_vrfCoordinator;
	uint64 private immutable i_subscriptionId;
	bytes32 private immutable i_keyHash; // gas lane ?
	uint32 private immutable i_callbackGasLimit;
	uint16 private constant REQUEST_CONFIRMATIONS = 3; // # of blocks to wait before the request can be fulfilled
	uint32 private constant NUM_WORDS = 1; // how many random numbers to request

	mapping(uint256 => address) public s_requestIdToSender; // tracks the sender of the request using the requestId
	mapping(address => uint256) public s_senderToResult; // stores the resulting random number for each requester

	// Events
	event RequestRandomNumber(
		uint256 indexed requestId,
		address indexed requester
	);
	event RandomNumberReceived(
		uint256 indexed requestId,
		uint256 indexed result
	);

	constructor(
		address vrfCoordinatorV2,
		bytes32 keyHash,
		uint64 subscriptionId,
		uint32 callbackGasLimit
	) VRFConsumerBaseV2(vrfCoordinatorV2) {
		i_vrfCoordinator = VRFCoordinatorV2Interface(vrfCoordinatorV2);
		i_keyHash = keyHash;
		i_subscriptionId = subscriptionId;
		i_callbackGasLimit = callbackGasLimit;
	}

	/** This function triggers the request to chainlink node that generates the random number
	 * @return requestId each request has a unique ID
	 */
	function requestRandomNumber() public returns (uint256 requestId) {
		// Will revert if subscription is not setup and funded
		requestId = i_vrfCoordinator.requestRandomWords(
			i_keyHash,
			i_subscriptionId,
			REQUEST_CONFIRMATIONS,
			i_callbackGasLimit,
			NUM_WORDS
		);

		// keep track of who sent the request
		s_requestIdToSender[requestId] = msg.sender;
		emit RequestRandomNumber(requestId, msg.sender);
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
		uint256 randomNumber = (randomWords[0] % 100) + 1; // 1 - 100
		// update mapping to record who received which random number by using the requestId
		s_senderToResult[s_requestIdToSender[requestId]] = randomNumber;
		emit RandomNumberReceived(requestId, randomNumber);
	}
}
