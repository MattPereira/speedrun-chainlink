// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/automation/AutomationCompatible.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// Errors
error AutomationConsumer__UpkeepNotNeeded();

/**
 *	user guesses if the next price returned by chainlink will be higher or lower than the current price
 *  bets are placed in LINK
 */
contract AutomationConsumer is AutomationCompatibleInterface {
	// Types
	enum Prediction {
		Lower, // 0
		Higher // 1
	}
	struct Bet {
		address bettor;
		uint256 amount;
		int referencePrice;
		Prediction prediction;
	}

	// State variables
	AggregatorV3Interface internal immutable i_priceFeed;
	IERC20 internal immutable i_linkToken;
	mapping(uint => Bet) public bets; // betId => Bet struct
	uint[] public activeBets; // betIds of bets that are still active
	uint public nextBetId = 0;

	// Events
	event BetPlaced(
		uint256 indexed betId,
		address indexed bettor,
		int256 indexed referencePrice,
		uint256 amount,
		Prediction prediction
	);
	event BetWon(uint betId, address indexed bettor, uint256 payout);
	event BetLost(uint betId, address indexed bettor, uint256 amountLost);

	// Functions
	constructor(address priceFeedAddress, address linkTokenAddress) {
		i_priceFeed = AggregatorV3Interface(priceFeedAddress);
		i_linkToken = IERC20(linkTokenAddress);
	}

	/** Allows user to place bet on whether price of asset will be higher or lower than current price
	 * @param amount amount of LINK to wager
	 * @param prediction Lower or Higher than the price at time of bet
	 */
	function placeBet(uint256 amount, Prediction prediction) public {
		require(
			amount >= 1 ether && amount <= 5 ether,
			"You must wager between 1 and 5 LINK"
		);
		require(
			i_linkToken.allowance(msg.sender, address(this)) >= amount,
			"Insufficient LINK token allowance"
		);
		require(
			i_linkToken.transferFrom(msg.sender, address(this), amount),
			"Failed to transfer LINK"
		);
		(, int answer, , , ) = i_priceFeed.latestRoundData();
		bets[nextBetId] = Bet({
			bettor: msg.sender,
			referencePrice: answer,
			amount: amount,
			prediction: prediction
		});
		activeBets.push(nextBetId);
		emit BetPlaced(nextBetId, msg.sender, answer, amount, prediction);
		nextBetId++;
	}

	/** Chainlink Keeper nodes call checkUpkeep to see if it returns true
	 *  https://docs.chain.link/chainlink-automation/compatible-contracts#checkupkeep-function
	 *
	 * @dev returns true if there are active bets and the latest price is different than
	 * the reference price of the most recently placed bet
	 */
	function checkUpkeep(
		bytes memory /* checkData */
	)
		public
		view
		override
		returns (bool upkeepNeeded, bytes memory /* performData */)
	{
		if (activeBets.length == 0) {
			upkeepNeeded = false;
		}
		(, int latestPrice, , , ) = i_priceFeed.latestRoundData();
		// execute the automation if the latest price is different than the reference price of the most recently placed bet
		upkeepNeeded =
			bets[activeBets[activeBets.length - 1]].referencePrice !=
			latestPrice;
	}

	/** Once `checkUpkeep` returns true, `performUpkeep` will be triggered by chainlink node
	 * https://docs.chain.link/chainlink-automation/compatible-contracts#performupkeep-function
	 *
	 * @notice pays out winners and remove bets that have been settled
	 *
	 * - winners get paid double their bet amount
	 * - losers lose their bet amount
	 *
	 * TODO: handle if price is still the same somehow?
	 */
	function performUpkeep(bytes calldata /* performData */) external override {
		// best practice to revalidate the upkeepNeeded
		(bool upkeepNeeded, ) = checkUpkeep(bytes("0x"));
		if (!upkeepNeeded) {
			revert AutomationConsumer__UpkeepNotNeeded();
		}

		(, int latestPrice, , , ) = i_priceFeed.latestRoundData();

		while (activeBets.length > 0) {
			// pointer to end of array enables .pop() for efficiency
			uint betId = activeBets[activeBets.length - 1];
			Bet memory bet = bets[betId];

			bool isWinner = (bet.referencePrice > latestPrice &&
				bet.prediction == Prediction.Lower) ||
				(bet.referencePrice < latestPrice &&
					bet.prediction == Prediction.Higher);

			if (isWinner) {
				uint256 payout = bet.amount * 2;
				i_linkToken.transfer(bet.bettor, payout);
				emit BetWon(betId, bet.bettor, payout);
			} else {
				emit BetLost(betId, bet.bettor, bet.amount);
			}

			activeBets.pop();
		}
	}

	// Getters
	function getLatestRoundData()
		public
		view
		returns (
			uint80 roundId,
			int price,
			uint256 startedAt,
			uint256 updatedAt
		)
	{
		(roundId, price, startedAt, updatedAt, ) = i_priceFeed
			.latestRoundData();
	}
}
