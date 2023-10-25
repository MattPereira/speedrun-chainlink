// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/FeedRegistryInterface.sol";
import "@chainlink/contracts/src/v0.8/Denominations.sol";

/** Simple contract to consume the Chainlink FeedRegistry
 *
 * @notice FeedRegistry address only exists on the Ethereum Mainnet
 * @notice https://docs.chain.link/data-feeds/feed-registry#contract-addresses
 */

contract FeedRegistryConsumer {
	FeedRegistryInterface internal immutable i_registry;

	constructor(address registryAddress) {
		i_registry = FeedRegistryInterface(registryAddress);
	}

	/**
	 * Get the latest price of ETH/USD
	 */
	function getEthUsdPrice() public view returns (int) {
		(
			,
			/*uint80 roundID*/ int price /*uint startedAt*/ /*uint timeStamp*/ /*uint80 answeredInRound*/,
			,
			,

		) = i_registry.latestRoundData(Denominations.ETH, Denominations.USD);
		return price;
	}

	/** General method capable of returning the relative price of any available asset pair
	 *
	 * @param base any denomination from the library or a valid ERC20 token address
	 * @param quote the quote denomination from the Denominations library or a valid ERC20 token address
	 */

	function getPrice(address base, address quote) public view returns (int) {
		// prettier-ignore
		(
            /*uint80 roundID*/,
            int price,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = i_registry.latestRoundData(base, quote);
		return price;
	}
}
