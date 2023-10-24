import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { networkConfig } from "../helper-hardhat-config";
import LinkTokenABI from "@chainlink/contracts/abi/v0.8/LinkToken.json";
import { approveAndTransfer } from "../scripts/approveAndTransfer";

/** 1. Deploy the "VRFConsumer" contract
 *  2. Send 5 LINK to VRFConsumer contract
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployVRFConsumer: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy, log } = hre.deployments;
  const { ethers } = hre;

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

  if (linkTokenAddress) {
    const tokenContract = new ethers.Contract(linkTokenAddress, LinkTokenABI, ethers.provider);
    const rawBalance = await tokenContract.balanceOf(VRFConsumer.address);
    const formattedBalance = +ethers.utils.formatUnits(rawBalance, await tokenContract.decimals());

    if (formattedBalance < 2)
      await approveAndTransfer({
        tokenAddress: linkTokenAddress,
        tokenABI: LinkTokenABI,
        spenderAddress: VRFConsumer.address,
        amount: "5",
      });
  }
};

export default deployVRFConsumer;

deployVRFConsumer.tags = ["vrf", "all"];
