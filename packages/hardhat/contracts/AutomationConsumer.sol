// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/automation/AutomationCompatible.sol";
import { LinkTokenInterface } from "@chainlink/contracts/src/v0.8/shared/interfaces/LinkTokenInterface.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

error AutomationConsumer__UpkeepNotNeeded();

struct RegistrationParams {
	string name;
	bytes encryptedEmail;
	address upkeepContract;
	uint32 gasLimit;
	address adminAddress;
	uint8 triggerType;
	bytes checkData;
	bytes triggerConfig;
	bytes offchainConfig;
	uint96 amount;
}

interface AutomationRegistrarInterface {
	function registerUpkeep(
		RegistrationParams calldata requestParams
	) external returns (uint256);
}

/**
 * Simple counter contract using chainlink automation
 *
 * the upkeep registration process is integrated within this contract
 *
 */
contract AutomationConsumer is AutomationCompatibleInterface, Ownable {
	event UpkeepPerformed(uint256 indexed timestamp, uint256 indexed counter);
	event CounterStarted(uint256 indexed counter);
	event CounterStopped(uint256 indexed counter);
	event IntervalUpdated(uint256 indexed interval);

	uint public s_counter = 0;
	uint public s_interval = 30 seconds;
	uint public s_maxCounterValue = 10;
	bool public s_isCounting = false;
	uint public s_lastTimestamp;
	uint public s_upkeepID;
	LinkTokenInterface public immutable i_link;
	AutomationRegistrarInterface public immutable i_registrar;

	constructor(
		LinkTokenInterface link,
		AutomationRegistrarInterface registrar
	) {
		i_link = link;
		i_registrar = registrar;
	}

	function startCounting() public {
		s_isCounting = true;
		s_lastTimestamp = block.timestamp;
		emit CounterStarted(s_counter);
	}

	function stopCounting() public {
		s_isCounting = false;
		emit CounterStopped(s_counter);
	}

	function resetCounter() public {
		s_counter = 0;
	}

	function updateInterval(uint256 _interval) public {
		s_interval = _interval;
		emit IntervalUpdated(s_interval);
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
		bool isPastInterval = (block.timestamp - s_lastTimestamp) > s_interval;
		upkeepNeeded = isPastInterval && s_isCounting;
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
		if (s_counter >= s_maxCounterValue) {
			s_isCounting = false;
			s_counter = 0;
		}

		uint incrementValue = abi.decode(performData, (uint));
		s_counter += incrementValue;
		s_lastTimestamp = block.timestamp;
		emit UpkeepPerformed(block.timestamp, s_counter);
	}

	/**
	 * @param params required params for registering an upkeep
	 */

	function registerNewUpkeep(RegistrationParams memory params) public {
		require(
			i_link.balanceOf(address(this)) >= params.amount,
			"Not enough LINK tokens in this contract"
		);
		require(
			i_link.approve(address(i_registrar), params.amount),
			"Failed to approve registrar contract to spend LINK"
		);
		uint256 upkeepID = i_registrar.registerUpkeep(params);
		require(upkeepID != 0, "Upkeep registration failed");
		s_upkeepID = upkeepID;
	}

	function getLinkBalance() public view returns (uint256) {
		return i_link.balanceOf(address(this));
	}

	function withdrawLink() public onlyOwner {
		i_link.transfer(msg.sender, i_link.balanceOf(address(this)));
	}
}
