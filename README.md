# Scaffold Chainlink

A beginner's guide to implimenting chainlink products in your smart contracts. Learn about how to get price feeds on chain, how to get a varifiably random number (VRF) on chain, and how to set up chainlink automation so that keeper nodes trigger your contract.

## Getting Started

1. Install dependencies

```
yarn install
```

2. Deploy the contracts on sepolia network. Before deployment, you must ensure your deployer account has sepolia ETH and LINK to spend.
   a. Grab funds from the [sepolia ETH faucet](https://sepoliafaucet.com/)
   b. Grab funds from the [sepolia LINK faucet](https://faucets.chain.link/)

```
yarn deploy --network sepolia
```

3. Start the frontend

```
yarn start
```

## Price Feeds
Chainlink price feeds offer a decentralized data source that provides price information for a range of assets pairs depending on the network. The price feeds are powered by a decentralized network of independent, security-reviewed, and Sybil-resistant oracle nodes. The `AggregatorV3Interface` is fixed to the price feed address used during instantiation, but the `FeedRegistry` is more flexible although it is only avaible on mainnet.


### Implementation Steps
1. Import `AggregatorV3Interface` into your smart contract
2. Declare a state variable of type `AggregatorV3Interface`
3. Choose network and a pair of assets to find the price feed address 
4. Instantiate the variable using the price feed address
5. Call `.latestRoundData()` and extract the answer 


### Details
- The price returned by the price feed contract has a specified number of decimals that can be fetched from the price feed contract using the `decimals()` method
- The answer returned by the price feed contract is only updated if the price deviates beyond a specified threshold or if a certain amount of time has passed since the last update 
- `FeedRegistry` is only available on Ethereum Mainnet, but `AggregatorV3Interface` is available on a variety of networks.

## VRF (Verifiable Random Function)
Chainlink VRF allows a smart contract to access verifiably random numbers. Each request for a random number costs LINK and the reponse is delivered on chain after requestConfirmations number of blocks. The VRFConsumer example uses the Direct Funding method, but you may prefer the Subscription method depending on your use case.

### Implimentation Steps
1. Set up your contract to inherit VRFV2WrapperConsumerBase
2. Impliment a function that triggers request for random number by calling the requestRandomness function which is inhereted from VRFV2WrapperConsumerBase
3. You must override the fullFillrandomWords function

### Details
- The Direct Funding method requires your smart contract hold LINK tokens for payment
- The fulfillRandomWords function is triggered by the VRF Coordinator contract
- VRF response time is impacted by requestConfirmations which must be greater than the minimum amount set by the coordinator contract

## Automation
Chainlink Automation calls a smart contract function if a specified set of criteria are met. The time-based trigger calls a target function on a target contract every specified interval. The custom logic trigger allows your contract to use on-chain state to determine when to call a target function. The log trigger allows your contract to use event log data as both a trigger and an input.

### Steps
1. Decide which trigger fits best for your use case
2. Register a new upkeep with chainlink 
3. Provide your target contract and target function

### Details
- The time-based trigger does not require an interface
- The custom logic trigger requires your target contract be compatible with AutomationCompatibleInterface
- The log trigger requires your target contract be compatible with IlogAutomation
