interface NetworkConfigEntryTypes {
  name: string;
  priceFeedAddress?: {
    BTC_USD: string;
    ETH_USD: string;
    LINK_USD: string;
  };
  vrfCoordinatorV2: {
    address?: string;
    subscriptionId?: string;
    keyHash?: string;
    requestConfirmations?: number;
    callbackGasLimit?: string;
    numWords?: number;
  };
}

const networkConfig: { [key: number]: NetworkConfigEntryTypes } = {
  31337: {
    name: "hardhat",
    vrfCoordinatorV2: {
      keyHash: "0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c", // doesn't matter for local network
      callbackGasLimit: "500000", // doesn't matter for local network
    },
  },
  11155111: {
    name: "sepolia",
    vrfCoordinatorV2: {
      address: "0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625",
      keyHash: "0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c", // gas lane ?
      subscriptionId: "4707", // replace with your subscription id
      callbackGasLimit: "500000", // 500,000 gas
    },
    priceFeedAddress: {
      BTC_USD: "0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43",
      ETH_USD: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
      LINK_USD: "0xc59E3633BAAC79493d908e63626716e204A45EdF",
    },
  },
};

const developmentChains: string[] = ["hardhat", "foundry", "localhost"];

export { networkConfig, developmentChains };
