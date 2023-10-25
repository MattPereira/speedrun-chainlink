import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { networkConfig } from "../helper-hardhat-config";
// import RegistrarABI from "@chainlink/contracts/abi/v0.8/AutomationRegistrar2_1.json";
// import LinkTokenABI from "@chainlink/contracts/abi/v0.8/LinkToken.json";
// import { approveAndTransfer } from "../scripts/approveAndTransfer";

/** 1. Deploys the "AutomationConsumer" contract
 *  2. Send LINK to AutomationConsumer contract
 *  3. Register upkeep for AutomationConsumer contract
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployAutomationConsumer: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy, log } = hre.deployments;
  // const { ethers } = hre;

  log("------------------------------------");
  const chainId = await hre.ethers.provider.getNetwork().then(network => network.chainId);
  const { linkTokenAddress, registrarAddress, registryAddress } = networkConfig[chainId].AutomationConsumer;
  const args = [linkTokenAddress, registrarAddress, registryAddress];

  await deploy("AutomationConsumer", {
    from: deployer,
    args: args,
    log: true,
    autoMine: true,
  });

  log("------------------------------------");

  /** FAILED ATTEMPT: programmatic registration through AutomationConsumer.registerNewUpkeep()
   *
   * VERIFIED:
   * - the AutomationConsumer contract does successfully approve registrar contract to spend LINK
   *
   * PROBLEM:
   * - always fails with UNPREDICTABLE_GAS_LIMIT and I can't figure out why
   */

  // if (linkTokenAddress) {
  // const [signer] = await ethers.getSigners();
  //   const AutomationConsumer = await ethers.getContract("AutomationConsumer", signer);

  //   const fundAmount = "5";

  //   await approveAndTransfer({
  //     tokenAddress: linkTokenAddress,
  //     tokenABI: LinkTokenABI,
  //     spenderAddress: AutomationConsumer.address,
  //     amount: fundAmount,
  //   });

  //   // https://docs.chain.link/chainlink-automation/guides/register-upkeep-in-contract#register-the-upkeep
  //   const registrationParams = {
  //     name: "AutomationConsumer",
  //     encryptedEmail: "0x",
  //     upkeepContract: AutomationConsumer.address,
  //     gasLimit: "500000",
  //     adminAddress: deployer,
  //     triggerType: 0, // 0 for conditional upkeep
  //     checkData: "0x",
  //     triggerConfig: "0x",
  //     offchainConfig: "0x",
  //     amount: ethers.utils.parseUnits(fundAmount, 18),
  //   };
  //   console.log("registrationParams", registrationParams);

  //   try {
  //     console.log("Registering upkeep...");
  //     const registerUpkeepTx = await AutomationConsumer.registerNewUpkeep(registrationParams);
  //     console.log("Register tx hash:", registerUpkeepTx.hash);
  //     await registerUpkeepTx.wait();
  //     console.log("Successfully registered upkeep with ID:", await AutomationConsumer.s_upkeepID());
  //   } catch (e) {
  //     console.log(e);
  //     console.log("Failed to register upkeep");
  //   }
  // }
};

export default deployAutomationConsumer;

deployAutomationConsumer.tags = ["automation", "all"];
