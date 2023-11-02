interface NetworkConfigEntryTypes {
  name: string;
  AggregatorV3Consumer?: {
    BTC_USD: string;
    ETH_USD: string;
    LINK_USD: string;
  };
  VRFConsumer: {
    VRFV2WrapperAddress: string;
    linkTokenAddress: string;
  };
  AutomationConsumer: {
    registrarAddress: string;
    linkTokenAddress: string;
    registryAddress: string;
  };
  tokenAddress: {
    LINK: string;
  };
}

// Contracts have constructors that require contract address args that are network specific
const networkConfig: { [key: number]: NetworkConfigEntryTypes } = {
  11155111: {
    name: "sepolia",
    AutomationConsumer: {
      linkTokenAddress: "0x779877A7B0D9E8603169DdbD7836e478b4624789",
      registrarAddress: "0x9a811502d843E5a03913d5A2cfb646c11463467A",
      registryAddress: "0x86EFBD0b6736Bed994962f9797049422A3A8E8Ad",
    },
    VRFConsumer: {
      VRFV2WrapperAddress: "0xab18414CD93297B0d12ac29E63Ca20f515b3DB46",
      linkTokenAddress: "0x779877A7B0D9E8603169DdbD7836e478b4624789",
    },
    AggregatorV3Consumer: {
      BTC_USD: "0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43",
      ETH_USD: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
      LINK_USD: "0xc59E3633BAAC79493d908e63626716e204A45EdF",
    },
    tokenAddress: {
      LINK: "0x779877A7B0D9E8603169DdbD7836e478b4624789",
    },
  },
};

const developmentChains: string[] = ["hardhat", "foundry", "localhost"];

export { networkConfig, developmentChains };
