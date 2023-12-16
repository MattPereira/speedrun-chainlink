import * as dotenv from "dotenv";
dotenv.config();
// import chalk from "chalk";
import { task } from "hardhat/config";
import { SecretsManager, createGist } from "@chainlink/functions-toolkit";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { networkConfig } from "../helper-hardhat-config";

/** Upload a single secret to a github gist
 * @param key the name for the secret
 * @param value the value of the secret
 * @returns the `encryptedSecretsReference` used to make a chainlink functions request
 */

export async function uploadSecretToGist(hre: HardhatRuntimeEnvironment, key: string, value: string) {
  if (hre.network.name !== "sepolia") {
    throw new Error("This script is only configured for sepolia network");
  }

  const chainId = await hre.ethers.provider.getNetwork().then(network => network.chainId);
  const { routerAddress, toolkitDonId } = networkConfig[chainId].FunctionsConsumer;

  const [signer] = await hre.ethers.getSigners();

  const secretsManager = new SecretsManager({
    signer: signer,
    functionsRouterAddress: routerAddress,
    donId: toolkitDonId,
  });
  await secretsManager.initialize();

  const secretsObject = { [key]: value };
  // console.log("secretsObject", secretsObject);

  const encryptedSecrets = await secretsManager.encryptSecrets(secretsObject);
  // console.log("encryptedSecrets", encryptedSecrets);

  if (process.env.GITHUB_ACCESS_TOKEN) {
    const gistURL = await createGist(process.env.GITHUB_ACCESS_TOKEN, JSON.stringify(encryptedSecrets));
    console.log("gistURL", gistURL);
    const encryptedSecretsReference: string = await secretsManager.encryptSecretsUrls([gistURL]);
    console.log("encryptedSecretsReference:", encryptedSecretsReference);
    return encryptedSecretsReference;
  } else {
    throw new Error("GITHUB_ACCESS_TOKEN not found in .env");
  }
}

task("upload-secret-to-gist", "Uploads encrypted secrets to a GitHub gist")
  .addParam("key", "The name for the secret")
  .addParam("value", "The value of the secret")
  .setAction(async (taskArgs, hre) => {
    await uploadSecretToGist(hre, taskArgs.key, taskArgs.value);
  });
