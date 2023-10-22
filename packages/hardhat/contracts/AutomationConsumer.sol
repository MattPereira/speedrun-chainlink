// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/automation/AutomationCompatible.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

error AutomationConsumer__UpkeepNotNeeded();

/**
 * Simple counter contract using chainlink automation
 * - try to figure out how to use performData
 */
contract AutomationConsumer is AutomationCompatibleInterface, Ownable {
	event UpkeepPerformed(uint256 indexed timestamp, uint256 indexed counter);
	event CounterStarted(uint256 indexed counter);
	event CounterStopped(uint256 indexed counter);
	event IntervalUpdated(uint256 indexed interval);

	uint public counter = 0;
	uint public interval = 1 minutes;
	uint public maxCounterValue = 10;
	bool public isCounting = false;
	uint public lastTimeStamp;
	IERC20 internal immutable i_linkToken;

	constructor(address linkTokenAddress) {
		i_linkToken = IERC20(linkTokenAddress);
		lastTimeStamp = block.timestamp;
	}

	function startCounting() public {
		isCounting = true;
		emit CounterStarted(counter);
	}

	function stopCounting() public {
		isCounting = false;
		emit CounterStopped(counter);
	}

	function resetCounter() public {
		counter = 0;
	}

	function updateInterval(uint256 _interval) public {
		interval = _interval;
		emit IntervalUpdated(interval);
	}

	/**
	 * - checkData param is not used in this example, but it can be set when the Upkeep is registered
	 * @return upkeepNeeded - if true, performUpkeep() will be called
	 * @return performData - data passed to performUpkeep() (can be dynamically computed within checkUpkeep())
	 */
	function checkUpkeep(
		bytes memory /* checkData */
	)
		public
		view
		override
		returns (bool upkeepNeeded, bytes memory performData)
	{
		bool isPastInterval = (block.timestamp - lastTimeStamp) > interval;
		upkeepNeeded = isPastInterval && isCounting;
		uint incrementValue = 1;
		performData = abi.encode(incrementValue);
		return (upkeepNeeded, performData);
	}

	/** performUpkeep is called by a chainlink node on the condition that the checkupkeep function returns true
	 *
	 * @param performData returned value from checkUpkeep
	 */
	function performUpkeep(bytes calldata performData) external override {
		// best practice to revalidate upkeep needed before executing any logic in performUpkeep
		(bool upkeepNeeded, ) = checkUpkeep(bytes(""));
		if (!upkeepNeeded) {
			revert AutomationConsumer__UpkeepNotNeeded();
		}
		if (counter >= maxCounterValue) {
			isCounting = false;
			counter = 0;
		}

		uint incrementValue = abi.decode(performData, (uint));
		counter += incrementValue;
		lastTimeStamp = block.timestamp;
		emit UpkeepPerformed(block.timestamp, counter);
	}

	// Utilitiy functions
	function getLinkBalance() public view returns (uint256) {
		return i_linkToken.balanceOf(address(this));
	}

	function withdrawLink() public onlyOwner {
		i_linkToken.transfer(msg.sender, i_linkToken.balanceOf(address(this)));
	}
}
