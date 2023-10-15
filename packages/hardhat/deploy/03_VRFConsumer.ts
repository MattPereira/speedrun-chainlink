import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { networkConfig } from "../helper-hardhat-config";

/** Deploy the "VRFConsumer" contract
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployVRFConsumer: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy, log } = hre.deployments;

  const chainId = await hre.ethers.provider.getNetwork().then(network => network.chainId);
  console.log(`The current chain ID is: ${chainId}`);

  log("------------------------------------");
  const { wrapperAddress, linkAddress } = networkConfig[chainId].vrfCoordinator;

  const args = [linkAddress, wrapperAddress];

  const VRFConsumer = await deploy("VRFConsumer", {
    from: deployer,
    args: args,
    log: true,
    autoMine: true,
  });

  log("VRFConsumer deployed at:", VRFConsumer.address);

  // HOW TO VERIFY : https://docs.scaffoldeth.io/deploying/deploy-smart-contracts#4-verify-your-smart-contract
};

export default deployVRFConsumer;
