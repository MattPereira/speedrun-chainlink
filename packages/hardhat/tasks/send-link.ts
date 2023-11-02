import { task } from "hardhat/config";
import ERC20_ABI from "@chainlink/contracts/abi/v0.8/ERC20.json";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { networkConfig } from "../helper-hardhat-config";

/** Fund a specified address with specified amount of LINK
 * @param recipientAddress who receives the LINK
 * @param amount human readable amount of LINK to send
 *
 * @notice gas fees are boosted since this is only for sepolia network
 */

export async function sendLink(recipientAddress: string, amount: number, hre: HardhatRuntimeEnvironment) {
  if (hre.network.name !== "sepolia") {
    throw new Error("This script is only configured for sepolia network");
  }

  const chainId = await hre.ethers.provider.getNetwork().then(network => network.chainId);
  const linkTokenAddress = networkConfig[chainId].tokenAddress.LINK;
  const [signer] = await hre.ethers.getSigners();

  console.log("Fetching LINK token contract data...");
  const linkTokenContract = new hre.ethers.Contract(linkTokenAddress, ERC20_ABI, signer);
  const decimals = await linkTokenContract.decimals();
  const parsedAmount = hre.ethers.utils.parseUnits(amount.toString(), decimals);

  // Boosting gas fees for speedy sepolia transactions
  const { maxFeePerGas, maxPriorityFeePerGas } = await hre.ethers.provider.getFeeData();
  if (!maxFeePerGas || !maxPriorityFeePerGas) {
    throw new Error("Failed to fetch gas fee data");
  }
  const boost = hre.ethers.utils.parseUnits("2", "gwei");
  const boostedMaxFeePerGas = maxFeePerGas.add(boost);
  const boostedMaxPriorityFeePerGas = maxPriorityFeePerGas.add(boost);

  console.log("Sending transfer transaction...");
  const transferTx = await linkTokenContract.transfer(recipientAddress, parsedAmount, {
    maxFeePerGas: boostedMaxFeePerGas,
    maxPriorityFeePerGas: boostedMaxPriorityFeePerGas,
  });
  console.log("txHash", transferTx.hash);
  const transferTxReceipt = await transferTx.wait();

  if (transferTxReceipt.status !== 1) {
    throw new Error("Transfer transaction failed");
  }

  console.log(`Sent ${amount} LINK to ${recipientAddress}`);
}

task("send-link", "Send a specified amount of link to a specified address")
  .addParam("recipient", "The address to send LINK token to")
  .addParam("amount", "The human readable amount of LINK to send")
  .setAction(async (taskArgs, hre) => {
    await sendLink(taskArgs.recipient, taskArgs.amount, hre);
  });
