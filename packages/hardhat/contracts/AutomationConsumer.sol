// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/automation/AutomationCompatible.sol";

// Errors
error AutomationConsumer__UpkeepNotNeeded();

/**
 *
 */
contract AutomationConsumer is AutomationCompatibleInterface {
	// State variables

	/** Chainlink Keeper nodes call checkUpkeep to see if upkeepNeeded is true
	 *
	 *  https://docs.chain.link/chainlink-automation/compatible-contracts#checkupkeep-function
	 */
	function checkUpkeep(
		bytes memory /* checkData */
	)
		public
		pure
		override
		returns (bool upkeepNeeded, bytes memory /* performData */)
	{
		upkeepNeeded = true;
	}

	/**
	 * @dev Once `checkUpkeep` returns true, this function triggers
	 *  the Chainlink VRF node being called to generate a random number
	 *
	 * @dev then the `fullfillRandomWords` function is automatically called once the Chainlink VRF node
	 * returns the random number because of this contract inherting from `VRFConsumerBaseV2`
	 *
	 * @dev https://docs.chain.link/chainlink-automation/compatible-contracts#performupkeep-function
	 */
	function performUpkeep(bytes calldata /* performData */) external override {
		// best practice to revalidate the upkeepNeeded
		(bool upkeepNeeded, ) = checkUpkeep(bytes("0x"));
		if (!upkeepNeeded) {
			revert AutomationConsumer__UpkeepNotNeeded();
		}
	}
}
