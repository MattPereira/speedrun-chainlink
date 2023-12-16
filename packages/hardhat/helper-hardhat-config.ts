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
  FunctionsConsumer: {
    routerAddress: string;
    subscriptionId: string;
    gasLimit: string;
    donId: string;
    toolkitDonId: string;
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
    FunctionsConsumer: {
      routerAddress: "0xb83E47C2bC239B3bf370bc41e1459A34b41238D0",
      subscriptionId: "1464",
      gasLimit: "300000",
      donId: "0x66756e2d657468657265756d2d7365706f6c69612d3100000000000000000000",
      toolkitDonId: "fun-ethereum-sepolia-1",
    },
    tokenAddress: {
      LINK: "0x779877A7B0D9E8603169DdbD7836e478b4624789",
    },
  },
};

const developmentChains: string[] = ["hardhat", "foundry", "localhost"];

export { networkConfig, developmentChains };
