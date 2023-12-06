// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import { FunctionsClient } from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/FunctionsClient.sol";
import { ConfirmedOwner } from "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import { FunctionsRequest } from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/libraries/FunctionsRequest.sol";

/**
 * Request testnet LINK and ETH here: https://faucets.chain.link/
 * Find information on LINK Token Contracts and get the latest ETH and LINK faucets here: https://docs.chain.link/resources/link-token-contracts/
 */

/**
 * @title FunctionsConsumer
 * @notice This is an example contract to show how to make HTTP requests using Chainlink
 * @dev This contract uses hardcoded values and should not be used in production.
 */
contract FunctionsConsumer is FunctionsClient, ConfirmedOwner {
	using FunctionsRequest for FunctionsRequest.Request;

	// Custom error type
	error UnexpectedRequestID(bytes32 requestId);

	// Event to log responses
	event Response(
		bytes32 indexed requestId,
		uint256 builderCount,
		bytes response,
		bytes err
	);

	// State variables to store the last request ID, response, and error
	bytes32 public s_lastRequestId;
	bytes public s_lastResponse;
	bytes public s_lastError;

	// State variables used as args in the request
	address router; // https://docs.chain.link/chainlink-functions/supported-networks
	uint64 subscriptionId; // functions.chain.link
	uint32 gasLimit;
	bytes32 donID;

	// State variables to hold function response data
	uint256 public builderCount;

	// JavaScript source code
	// Fetch character name from the Star Wars API.
	// Documentation: https://swapi.dev/documentation#people
	string source =
		"const apiResponse = await Functions.makeHttpRequest({"
		"url: `https://buidlguidl-v3.ew.r.appspot.com/api/stats`});"
		"if (apiResponse.error) {"
		"throw Error('Request failed');"
		"}"
		"const { data } = apiResponse;"
		"const builderCount = data.builderCount;"
		"return Functions.encodeUint256(builderCount);";

	/**
	 * @notice Initializes the contract with the Chainlink router address and sets the contract owner
	 */
	constructor(
		address _router,
		uint64 _subscriptionId,
		uint32 _gasLimit,
		bytes32 _donID
	) FunctionsClient(_router) ConfirmedOwner(msg.sender) {
		router = _router;
		subscriptionId = _subscriptionId;
		gasLimit = _gasLimit;
		donID = _donID;
	}

	/**
	 * @notice Sends an HTTP request for Buidl Guidl stats
	 * @return requestId The ID of the request
	 */
	function sendRequest() external onlyOwner returns (bytes32 requestId) {
		FunctionsRequest.Request memory req;
		req.initializeRequestForInlineJavaScript(source); // Initialize the request with JS code

		// Send the request and store the request ID
		s_lastRequestId = _sendRequest(
			req.encodeCBOR(),
			subscriptionId,
			gasLimit,
			donID
		);

		return s_lastRequestId;
	}

	/**
	 * @notice Callback function for fulfilling a request
	 * @param requestId The ID of the request to fulfill
	 * @param response The HTTP response data
	 * @param err Any errors from the Functions request
	 */
	function fulfillRequest(
		bytes32 requestId,
		bytes memory response,
		bytes memory err
	) internal override {
		if (s_lastRequestId != requestId) {
			revert UnexpectedRequestID(requestId); // Check if request IDs match
		}
		// Update the contract's state variables with the response and any errors
		s_lastResponse = response;
		builderCount = abi.decode(response, (uint256));
		s_lastError = err;

		// Emit an event to log the response
		emit Response(requestId, builderCount, s_lastResponse, s_lastError);
	}
}
