# Scaffold Chainlink

## Getting Started

1. Install dependencies

```
yarn install
```

2. Deploy the contracts on sepolia network. You will need funds in the deployer account. Visit the [sepolia faucet](https://sepoliafaucet.com/) and set up your .env file in the `packages/hardhat/` folder OR use `yarn generate` and send sepolia ETH to the generated address.

```
yarn deploy --network sepolia
```

3. Start the frontend

```
yarn start
```

4. Fund the VRFConsumer and AutomationConsumer contracts with LINK (create subscription?)

## Testing

- For local testing mock contracts have been included and configured in the deploy scripts
