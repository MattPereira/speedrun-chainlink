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

4. Fund the VRFConsumer contract with LINK. Visit the [LINK faucet](https://faucets.chain.link/)

### Example BG Project Exploration links

- https://jadenkore.medium.com/creating-a-dynamic-nft-that-updates-in-real-time-based-on-chain-data-3d989c04f137

- https://app.buidlguidl.com/build/NxKk0AQM5LBm2ks4aSZr

- https://github.com/danielkhoo/scaffold-eth/tree/buidl-guidl-dynamic-nft
