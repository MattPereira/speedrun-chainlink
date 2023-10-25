import { ethers } from "hardhat";

interface IApproveAndTransfer {
  tokenAddress: string;
  tokenABI: any[]; // Consider using a more specific type if you have a standardized ABI type
  spenderAddress: string;
  amount: string;
}

/**
 * @param tokenAddress the address of the token to be approved
 * @param tokenABI the ABI of the token to be approved
 * @param spenderAddress the address of the spender
 * @param amount the amount to be approved in human readable format
 */

export async function approveAndTransfer({ tokenAddress, tokenABI, spenderAddress, amount }: IApproveAndTransfer) {
  const [signer] = await ethers.getSigners();
  const tokenContract = new ethers.Contract(tokenAddress, tokenABI, signer);
  const signerBalance = await tokenContract.balanceOf(signer.address);
  const signerFormattedBalance = ethers.utils.formatUnits(signerBalance, await tokenContract.decimals());
  console.log(`Signer token balance: ${signerFormattedBalance}`);

  console.log(`Approving ${spenderAddress} to spend ${amount} LINK...`);
  const parsedAmount = ethers.utils.parseUnits(amount, await tokenContract.decimals());
  const approveTx = await tokenContract.approve(spenderAddress, parsedAmount);
  const approveTxReceipt = await approveTx.wait();
  console.log("approveTx hash:", approveTxReceipt.transactionHash);

  console.log(`Transferring ${spenderAddress} ${amount} LINK...`);
  const transferTx = await tokenContract.transfer(spenderAddress, parsedAmount);
  const transferTxReceipt = await transferTx.wait();
  console.log("transferTx hash:", transferTxReceipt.transactionHash);

  const contractTokenBalance = await tokenContract.balanceOf(spenderAddress);
  console.log(`${spenderAddress} new token balance: ${contractTokenBalance.toString()}`);
}
