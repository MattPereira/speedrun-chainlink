import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { networkConfig } from "../helper-hardhat-config";

/** Deploy the "AutomationConsumer" contract
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployAutomationConsumer: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy, log } = hre.deployments;

  const chainId = await hre.ethers.provider.getNetwork().then(network => network.chainId);

  log("------------------------------------");
  const { priceFeedAddress, linkTokenAddress } = networkConfig[chainId].AutomationConsumer;

  const args = [priceFeedAddress, linkTokenAddress];

  const AutomationConsumer = await deploy("AutomationConsumer", {
    from: deployer,
    args: args,
    log: true,
    autoMine: true,
  });

  log("VRFConsumer deployed at:", AutomationConsumer.address);

  // HOW TO VERIFY : https://docs.scaffoldeth.io/deploying/deploy-smart-contracts#4-verify-your-smart-contract
};

export default deployAutomationConsumer;

deployAutomationConsumer.tags = ["automation", "all"];
