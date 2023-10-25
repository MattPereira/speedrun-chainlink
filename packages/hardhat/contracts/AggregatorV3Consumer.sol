// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

/** Simple contract for integrating a Chainlink price feed
 *
 * the price feed address passed to constructor during deployment determines the asset pair
 *
 * choose a price feed address:
 * https://docs.chain.link/data-feeds/price-feeds/addresses?network=ethereum&page=1
 */

contract AggregatorV3Consumer {
	// Declare state variable of type AggregatorV3Interface
	AggregatorV3Interface internal immutable i_priceFeed;

	// Instatiate the state varible using any given price feed address
	constructor(address priceFeedAddress) {
		i_priceFeed = AggregatorV3Interface(priceFeedAddress);
	}

	// Get the latest price from the price feed contract
	function getLatestPrice() public view returns (int) {
		// latestRoundData() returns roundID, answer, startedAt, timeStamp, answeredInRound
		(, int answer, , , ) = i_priceFeed.latestRoundData();
		return answer;
	}

	// The number of decimals in the response
	function getDecimals() public view returns (uint8) {
		return i_priceFeed.decimals();
	}

	// The description of the aggregator i.e. "ETH / USD"
	function getDescription() public view returns (string memory) {
		return i_priceFeed.description();
	}

	// The version of the aggregator
	function getVersion() public view returns (uint256) {
		return i_priceFeed.version();
	}
}
