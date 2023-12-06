import { ExternalLinkButton } from "~~/components/common";
import { Address } from "~~/components/scaffold-eth";
import {
  useScaffoldContract, //  useScaffoldContractRead, useScaffoldContractWrite
} from "~~/hooks/scaffold-eth";

export const Showcase = () => {
  const { data: functionsConsumerContract } = useScaffoldContract({ contractName: "FunctionsConsumer" });

  // const { writeAsync: fetchWeatherData } = useScaffoldContractWrite({
  //   contractName: "FunctionsConsumer",
  //   functionName: "sendRequest",
  //   args: [["94521", "US"]],
  // });

  // const { data: weatherResult } = useScaffoldContractRead({
  //   contractName: "FunctionsConsumer",
  //   functionName: "weatherResult",
  // });

  // const { data: s_lastError } = useScaffoldContractRead({
  //   contractName: "FunctionsConsumer",
  //   functionName: "s_lastError",
  // });

  // const { data: s_lastResponse } = useScaffoldContractRead({
  //   contractName: "FunctionsConsumer",
  //   functionName: " s_lastResponse",
  // });

  // console.log(weatherResult);

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
            Chainlink functions are used to send a request from a smart contract to a decentralized oracle network (DON)
            which executes the provided source code in off chain environment and returns the result on chain through the
            `fulfillRequest` function
          </p>
          <div>
            <h3 className="font-cubano text-4xl">TODO</h3>
            <ol className="list-decimal list-inside text-xl">
              <li>Figure out how to upload encrypted secret to DON</li>
              <li>Set up vercel serverless function with cron job to upload secret once per day</li>
              <li>Set up function to return weather data</li>
            </ol>
          </div>
        </div>

        <div>
          <h3 className="text-3xl text-center mb-5 font-cubano">On Chain Weather</h3>
          {/* <div className="flex gap-4 mb-3">
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
          </div> */}
        </div>
      </div>
    </section>
  );
};
