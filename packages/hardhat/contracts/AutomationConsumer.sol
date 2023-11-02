// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/automation/AutomationCompatible.sol";
import { LinkTokenInterface } from "@chainlink/contracts/src/v0.8/shared/interfaces/LinkTokenInterface.sol";
import "@chainlink/contracts/src/v0.8/automation/interfaces/v2_0/AutomationRegistryInterface2_0.sol";
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

/** Simple counter contract using chainlink automation
 *
 */

contract AutomationConsumer is AutomationCompatibleInterface, Ownable {
	event UpkeepPerformed(uint256 indexed timestamp, uint256 indexed counter);
	event CounterStarted(uint256 indexed counter);
	event CounterStopped(uint256 indexed counter);
	event IntervalUpdated(uint256 indexed interval);

	uint public s_counter = 0;
	uint public s_interval = 10 seconds;
	uint public s_maxCounterValue = 10;
	bool public s_isCounting = false;
	uint public s_lastTimestamp;
	uint public s_upkeepID;

	LinkTokenInterface public immutable i_link;
	AutomationRegistrarInterface public i_registrar;
	AutomationRegistryBaseInterface public i_registry;

	constructor(
		LinkTokenInterface link,
		AutomationRegistrarInterface registrar,
		AutomationRegistryBaseInterface registry
	) {
		i_link = link;
		i_registrar = registrar;
		i_registry = registry;
	}

	/** This function is called automatically by chainlink keeper nodes
	 * @notice param checkData not used in this example, but it can be set when the Upkeep is registered
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

	/** This function is only called by chainlink keeper when the checkupkeep() function returns true
	 * @param performData returned value from checkUpkeep
	 *
	 * @notice turns off automated counter at max value to conserve LINK in upkeep subscription
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
		} else {
			uint incrementValue = abi.decode(performData, (uint));
			s_counter += incrementValue;
			s_lastTimestamp = block.timestamp;
		}

		emit UpkeepPerformed(block.timestamp, s_counter);
	}

	/** This function allows for the registration of a new upkeep
	 * @param params required params for registering an upkeep
	 *
	 */

	function registerNewUpkeep(
		RegistrationParams memory params
	) public onlyOwner {
		require(
			i_link.approve(address(i_registrar), params.amount),
			"Failed to approve registrar contract to spend LINK"
		);
		// this function call on the registrar contract always fails with UNPREDICTABLE_GAS_LIMIT :(
		uint256 upkeepID = i_registrar.registerUpkeep(params);
		require(upkeepID != 0, "Upkeep registration failed");
		s_upkeepID = upkeepID;
	}

	function setUpkeepID(uint256 _upkeepID) public onlyOwner {
		s_upkeepID = _upkeepID;
	}

	/** Funds the upkeep subscription with more link
	 * @param amount amount of LINK to fund upkeep with
	 */

	function fundUpkeep(uint96 amount) public {
		require(
			// Transfer of LINK from EOA to this contract
			i_link.transferFrom(msg.sender, address(this), amount),
			"Transfer failed. Ensure this contract is approved to spend LINK"
		);
		i_link.approve(address(i_registry), amount);
		i_registry.addFunds(s_upkeepID, amount);
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

	function updateRegistryAddress(
		AutomationRegistryBaseInterface _registry
	) public onlyOwner {
		i_registry = _registry;
	}

	function updateRegistrarAddress(
		AutomationRegistrarInterface _registrar
	) public onlyOwner {
		i_registrar = _registrar;
	}

	function withdrawLink() public onlyOwner {
		require(
			i_link.transfer(msg.sender, i_link.balanceOf(address(this))),
			"Unable to withdraw LINK"
		);
	}

	/** Getters */
	function getUpkeepInfo() public view returns (UpkeepInfo memory) {
		return i_registry.getUpkeep(s_upkeepID);
	}

	function getLinkBalance() public view returns (uint256) {
		return i_link.balanceOf(address(this));
	}
}
