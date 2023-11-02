import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { networkConfig } from "../helper-hardhat-config";
import { getTokenBalance, sendLink } from "../tasks";

/** Deploy VRFConsumer contract
 * @param hre HardhatRuntimeEnvironment object.
 *
 * @notice funds contract with LINK if fresh deployment
 */

const deployVRFConsumer: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy, log } = hre.deployments;

  log("------------------------------------");
  const chainId = await hre.ethers.provider.getNetwork().then(network => network.chainId);
  const { VRFV2WrapperAddress, linkTokenAddress } = networkConfig[chainId].VRFConsumer;

  const args = [linkTokenAddress, VRFV2WrapperAddress];

  const VRFConsumer = await deploy("VRFConsumer", {
    from: deployer,
    args: args,
    log: true,
    autoMine: true,
  });

  // check the LINK balance
  const VRFConsumerLinkBalance = await getTokenBalance(hre, VRFConsumer.address, linkTokenAddress);
  // fund with LINK if the balance is 0 LINK (i.e. fresh deployment)
  if (+VRFConsumerLinkBalance === 0) {
    const amount = 5;
    console.log(`Funding VRFConsumer contract with ${amount} LINK`);
    await sendLink(VRFConsumer.address, amount, hre);
  }
};

export default deployVRFConsumer;

deployVRFConsumer.tags = ["vrf", "all"];
