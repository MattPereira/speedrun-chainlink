import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { networkConfig } from "../helper-hardhat-config";

/** Deploy FunctionsConsumer contract
 * @param hre HardhatRuntimeEnvironment object.
 *
 * @notice adds subscription to FunctionsRouter contract
 */

const functionsConsumer: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy, log } = hre.deployments;

  log("------------------------------------");
  const chainId = await hre.ethers.provider.getNetwork().then(network => network.chainId);
  const { routerAddress, subscriptionId, gasLimit, donId } = networkConfig[chainId].FunctionsConsumer;

  const args = [routerAddress, subscriptionId, gasLimit, donId];

  const FunctionsConsumer = await deploy("FunctionsConsumer", {
    from: deployer,
    args: args,
    log: true,
    autoMine: true,
  });

  try {
    const router = await hre.ethers.getContractAt(
      [
        {
          inputs: [
            { internalType: "uint64", name: "subscriptionId", type: "uint64" },
            { internalType: "address", name: "consumer", type: "address" },
          ],
          name: "addConsumer",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      routerAddress,
      deployer,
    );

    await router.addConsumer(subscriptionId, FunctionsConsumer.address);
  } catch (e) {
    console.log("error", e);
  }
};

export default functionsConsumer;

functionsConsumer.tags = ["functions", "all"];
