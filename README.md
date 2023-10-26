# 🏃 Speedrun Chainlink

A beginner's guide to implimenting chainlink products with smart contracts. Dive into simplified examples that will teach you how to:
- Access price quotes for a variety of assets on a wide range of networks
- Generate veriably random numbers using the VRF Coordinator
- Configure Chainlink automation to execute transactions based on time intervals or conditional logic

## Table of Contents

- [Getting Started](#getting-started)
- [📈 Price Feeds](#-price-feeds)
- [🎲 VRF (Verifiable Random Function)](#-vrf-verifiable-random-function)
- [🤖 Automation](#-automation)

## Getting Started

1. Install dependencies

```
yarn install
```
2. Grab funds from the faucets and set up your dev wallet to be the hardhat deployer account
- [sepolia ETH faucet](https://sepoliafaucet.com/)
- [sepolia LINK faucet](https://faucets.chain.link/)

3. Deploy the contracts on sepolia network
```
yarn deploy --network sepolia
```

4. Start the frontend

```
yarn start
```

## 📈 Price Feeds

Chainlink price feeds bring off chain price quotes on chain using a decentralized network of oracles. The `FeedRegistry` contract is only avaible on mainnet, but the price feed addresses that power the `AggregatorV3Interface` are available on a wide range of networks.

### Steps

1. Import `AggregatorV3Interface` into your smart contract
2. Declare a state variable of type `AggregatorV3Interface`
3. Choose network and a pair of assets to find the price feed address
4. Instantiate the variable using the price feed address
5. Call `.latestRoundData()` and extract the answer

### Details

- The quote returned by the price feed contract has a specified number of decimals
- The quote returned by the price feed contract is only updated if the price deviates beyond a specified threshold or if a certain amount of time has passed since the last update 

## 🎲 VRF (Verifiable Random Function)

Chainlink VRF provides access to verifiably random numbers on chain. Each request for a random number costs LINK and the reponse is delivered after requestConfirmations number of blocks. The VRFConsumer example uses the Direct Funding method, but you may prefer the Subscription method depending on your use case.

### Steps

1. Set up your contract to inherit VRFV2WrapperConsumerBase
2. Impliment a function that triggers request for random number by calling the requestRandomness function inhereted from VRFV2WrapperConsumerBase
3. You must override the fullFillrandomWords function inhereted from VRFV2WrapperConsumerBase

### Details

- The Direct Funding method requires your smart contract hold LINK tokens for payment
- The fulfillRandomWords function is triggered by the VRF Coordinator contract
- VRF response time is impacted by requestConfirmations which must be greater than the minimum amount set by the coordinator contract

## 🤖 Automation

Chainlink Automation calls a smart contract function if a specified set of criteria are met. The time-based trigger calls a target function on a target contract every specified interval. The custom logic trigger allows your contract to use on-chain state to determine when to call a target function. The log trigger allows your contract to use event log data as both a trigger and an input

### Steps

1. Decide which trigger fits best for your use case
2. Import the appropriate interface and override the checkUpkeep and performUpkeep functions inhereted from the interface
3. Register a new upkeep with chainlink by providing your target contract address and depositing LINK tokens 

### Details

- The time-based trigger does not require an interface
- The custom logic trigger requires your target contract be compatible with AutomationCompatibleInterface
- The log trigger requires your target contract be compatible with IlogAutomation
