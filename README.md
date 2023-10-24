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

## VRF (Verifiable Random Function)

## Automation
