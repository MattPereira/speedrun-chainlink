import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { developmentChains, networkConfig } from "../helper-hardhat-config";
import { network } from "hardhat";

/**
 * Deploy PriceFeedConsumer contract
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployPriceFeedConsumer: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy, log } = hre.deployments;
  const { ethers } = hre;

  //   const chainId = network.config.chainId;
  const chainId = await hre.ethers.provider.getNetwork().then(network => network.chainId);
  console.log(`The current chain ID is: ${chainId}`);

  log("------------------------------------");
  let priceFeedAddress: string | undefined;

  if (developmentChains.includes(network.name)) {
    // use mock address if on local network
    const MockV3Aggregator = await ethers.getContract("MockV3Aggregator");
    priceFeedAddress = MockV3Aggregator.address;
  } else {
    // use address from helper-hardhat-config if on testnet or live network
    priceFeedAddress = networkConfig[chainId].priceFeeds?.ETH_USD;
  }

  const args = [priceFeedAddress];
  await deploy("PriceFeedConsumer", {
    from: deployer,
    args: args,
    log: true,
    autoMine: true,
  });

  // * HOW TO VERIFY : https://docs.scaffoldeth.io/deploying/deploy-smart-contracts#4-verify-your-smart-contract
};

export default deployPriceFeedConsumer;

deployPriceFeedConsumer.tags = ["price-consumer", "all"];
