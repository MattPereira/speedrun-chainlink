import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { developmentChains } from "../helper-hardhat-config";
import { network } from "hardhat";

/** Deploy mock contracts necessary for testing on local networks
 *
 * @param hre HardhatRuntimeEnvironment object.
 */

const deployMocks: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy, log } = hre.deployments;
  const { ethers } = hre;

  // MockV3Aggregator constructor arguments
  const INTIIAL_PRICE = ethers.utils.parseUnits("1579", 8); // sets MockV3Aggregator.latestRoundData().answer
  const DECIMALS = "8";

  // Chainlink VRF Coordinator constructor arguments
  const BASE_FEE = ethers.utils.parseEther("0.25"); // 0.25 is the premium. It costs 0.25 LINK per request
  const GAS_PRICE_LINK = 1e9; // calculated value based on the gas price of the chain

  if (developmentChains.includes(network.name)) {
    log("Local network detected... Deploying mocks...");

    log("Deploying MockV3Aggregator...");
    await deploy("MockV3Aggregator", {
      from: deployer,
      log: true,
      args: [DECIMALS, INTIIAL_PRICE],
    });

    log("Deploying VRFCoordinatorV2Mock...");
    await deploy("VRFCoordinatorV2Mock", {
      from: deployer,
      log: true,
      args: [BASE_FEE, GAS_PRICE_LINK],
    });
    log("Mock contracts successfully deployed on local network!");
    log("------------------------------------");
  }
};

export default deployMocks;

deployMocks.tags = ["mocks", "all"];
