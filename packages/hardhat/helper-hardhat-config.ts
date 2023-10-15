interface NetworkConfigEntryTypes {
  name: string;
  priceFeedAddress?: {
    BTC_USD: string;
    ETH_USD: string;
    LINK_USD: string;
  };
  vrfCoordinator: {
    wrapperAddress?: string;
    linkAddress?: string;
  };
}

const networkConfig: { [key: number]: NetworkConfigEntryTypes } = {
  31337: {
    name: "hardhat",
    vrfCoordinator: {
      wrapperAddress: "",
      linkAddress: "",
    },
  },
  11155111: {
    name: "sepolia",
    vrfCoordinator: {
      wrapperAddress: "0xab18414CD93297B0d12ac29E63Ca20f515b3DB46",
      linkAddress: "0x779877A7B0D9E8603169DdbD7836e478b4624789",
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
