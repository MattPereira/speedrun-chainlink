import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { networkConfig } from "../helper-hardhat-config";
import { sendLink } from "../tasks/send-link";
// import RegistrarABI from "@chainlink/contracts/abi/v0.8/AutomationRegistrar2_1.json";

/** Deploys the AutomationConsumer contract
 * @param hre HardhatRuntimeEnvironment object.
 */

const deployAutomationConsumer: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy, log } = hre.deployments;

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

  /** PROGRAMMATIC REGISTRATION FAILING!!!
   *
   * VERIFIED:
   * - the AutomationConsumer contract does successfully approve registrar contract to spend LINK
   *
   * PROBLEM:
   * - always fails with UNPREDICTABLE_GAS_LIMIT but don't know why
   */

  const [signer] = await hre.ethers.getSigners();
  const AutomationConsumer = await hre.ethers.getContract("AutomationConsumer", signer);
  const upkeepID = await AutomationConsumer.s_upkeepID();

  // if the automation consumer contract has not yet registered an upkeep subscription
  if (upkeepID.toString() === "0") {
    const fundAmount = 10;
    const parsedFundAmount = hre.ethers.utils.parseUnits(fundAmount.toString(), 18);

    if ((await AutomationConsumer.getLinkBalance()) < parsedFundAmount) {
      await sendLink(AutomationConsumer.address, fundAmount, hre);
    }

    // set up registration params: https://docs.chain.link/chainlink-automation/guides/register-upkeep-in-contract#register-the-upkeep
    const registrationParams = {
      name: "Programmatic Upkeep Registration",
      encryptedEmail: "0x",
      upkeepContract: AutomationConsumer.address,
      gasLimit: "500000",
      adminAddress: deployer,
      triggerType: "0", // 0 for conditional upkeep
      checkData: "0x",
      triggerConfig: "0x",
      offchainConfig: "0x",
      amount: parsedFundAmount.toString(),
    };

    console.log("registrationParams", registrationParams);

    try {
      console.log("Registering upkeep...");
      const registerUpkeepTx = await AutomationConsumer.registerNewUpkeep(registrationParams);
      console.log("Register tx hash:", registerUpkeepTx.hash);
      await registerUpkeepTx.wait();
      console.log("Successfully registered upkeep with ID:", await AutomationConsumer.s_upkeepID());
    } catch (e) {
      console.log(e);
      console.log("Failed to register upkeep");
    }
  }
};

export default deployAutomationConsumer;

deployAutomationConsumer.tags = ["automation", "all"];
