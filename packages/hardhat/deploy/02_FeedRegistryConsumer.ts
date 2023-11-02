import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

/** Deploy FeedRegistryConsumer contract
 * @param hre HardhatRuntimeEnvironment object.
 */

const deployRegistryFeedConsumer: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy, log } = hre.deployments;

  const chainId = await hre.ethers.provider.getNetwork().then(network => network.chainId);

  log("------------------------------------");

  // FeedRegistry only available on ethereum mainnet
  if (chainId === 1) {
    const registryFeedAddress = "0x47Fb2585D2C56Fe188D0E6ec628a38b74fCeeeDf";
    const args = [registryFeedAddress];
    await deploy("PriceFeedConsumer", {
      from: deployer,
      args: args,
      log: true,
      autoMine: true,
    });
  }

  // * HOW TO VERIFY : https://docs.scaffoldeth.io/deploying/deploy-smart-contracts#4-verify-your-smart-contract
};

export default deployRegistryFeedConsumer;

deployRegistryFeedConsumer.tags = ["registry", "all"];
