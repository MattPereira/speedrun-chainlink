import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { developmentChains, networkConfig } from "../helper-hardhat-config";
import { network, ethers } from "hardhat";

// only for vrfCoordinatorMock deployment
const FUND_AMOUNT = ethers.utils.parseUnits("10", "ether");

/** Deploy the "VRFConsumer" contract
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployVRFConsumer: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy, log } = hre.deployments;
  const { ethers } = hre;

  const chainId = await hre.ethers.provider.getNetwork().then(network => network.chainId);
  console.log(`The current chain ID is: ${chainId}`);

  log("------------------------------------");
  // use values from hepler-hardhat-config.ts
  const { vrfCoordinatorV2 } = networkConfig[chainId];

  let vrfCoordinatorV2Address, subscriptionId;

  if (developmentChains.includes(network.name)) {
    const vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock");
    vrfCoordinatorV2Address = vrfCoordinatorV2Mock.address;
    const tx = await vrfCoordinatorV2Mock.createSubscription();
    const txReceipt = await tx.wait(1);
    subscriptionId = txReceipt.events[0].args.subId.toString(); // grab subId from the event logs of .createSubscription()
    await vrfCoordinatorV2Mock.fundSubscription(subscriptionId, FUND_AMOUNT);
  } else {
    vrfCoordinatorV2Address = vrfCoordinatorV2.address;
    subscriptionId = vrfCoordinatorV2.subscriptionId;
  }

  const { keyHash, callbackGasLimit } = vrfCoordinatorV2;

  const args = [vrfCoordinatorV2Address, keyHash, subscriptionId, callbackGasLimit];

  const VRFConsumer = await deploy("VRFConsumer", {
    from: deployer,
    args: args,
    log: true,
    autoMine: true,
  });

  // For testing on local network, add nft contract as a valid consumer of the VRFCoordinatorV2Mock contract
  if (developmentChains.includes(network.name)) {
    const vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock");
    await vrfCoordinatorV2Mock.addConsumer(subscriptionId, VRFConsumer.address);
  }

  // HOW TO VERIFY : https://docs.scaffoldeth.io/deploying/deploy-smart-contracts#4-verify-your-smart-contract
};

export default deployVRFConsumer;
