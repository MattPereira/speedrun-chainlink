// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

// Import the AggregatorV3Interface from the "@chainlink/contracts" package
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";


/**
 * 
 * 
 */

contract PriceFeedConsumer {
    // Declare state variable of type AggregatorV3Interface
    AggregatorV3Interface internal immutable i_priceFeed;

    // Create a constructor that accepts the address of the price feed as an argument
    constructor(address priceFeedAddress) {
        i_priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    // Create a function to get the latest price
    function getLatestPrice() public view returns (int) {
        (, int price, , , ) = i_priceFeed.latestRoundData();
        return price;
    }
}