import { ExternalLinkButton } from "~~/components/common";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldContract, useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export const Showcase = () => {
  const { data: functionsConsumerContract } = useScaffoldContract({ contractName: "FunctionsConsumer" });

  const { writeAsync: updateBuilderCount } = useScaffoldContractWrite({
    contractName: "FunctionsConsumer",
    functionName: "sendRequest",
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const { data: builderCount } = useScaffoldContractRead({
    contractName: "FunctionsConsumer",
    functionName: "builderCount",
  });

  console.log("builderCount", builderCount);

  return (
    <section>
      <div className="flex flex-wrap justify-center sm:justify-between gap-4 items-center mb-10">
        <div className="flex items-center gap-4">
          <h3 className="text-2xl md:text-4xl mb-0 font-bold">FunctionsConsumer</h3>
          <ExternalLinkButton href="https://github.com/MattPereira/speedrun-chainlink/blob/main/packages/hardhat/contracts/FunctionsConsumer.sol" />
        </div>
        <div>
          <Address size="xl" address={functionsConsumerContract?.address} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <p className="text-xl">
            Chainlink functions are used to send request from FunctionsConsumer contract to the decentralized oracle
            network (DON) which executes API request to Buidl Guidl server in off chain environment and returns the
            result on chain where the FunctionsConsumer contract stores the response in a state variable
          </p>
        </div>
        <div>
          <h3 className="text-3xl text-center mb-5 font-cubano">On Chain Stats</h3>
          <div className="flex gap-4 mb-3">
            <div>
              <div className="stats shadow mb-3">
                <div className="stat bg-base-200 w-48 text-center">
                  <div className="stat-value">{builderCount?.toString()}</div>
                  <div className="stat-title">Builder Count</div>
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  className="btn btn-outline hover:text-primary-content text-xl w-full"
                  onClick={async () => await updateBuilderCount()}
                >
                  Update
                </button>
              </div>
            </div>
            <div>
              <div className="stats shadow mb-3">
                <div className="stat bg-base-200 w-48 text-center">
                  <div className="stat-value">0</div>
                  <div className="stat-title">Build Count</div>
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  className="btn btn-outline hover:text-primary-content text-xl w-full"
                  onClick={async () => await updateBuilderCount()}
                >
                  Update
                </button>
              </div>
            </div>
            <div>
              <div className="stats shadow mb-3">
                <div className="stat bg-base-200 w-48 text-center">
                  <div className="stat-value">0</div>
                  <div className="stat-title">Stream ETH</div>
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  className="btn btn-outline hover:text-primary-content text-xl w-full"
                  onClick={async () => await updateBuilderCount()}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
