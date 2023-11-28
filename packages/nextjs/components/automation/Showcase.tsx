import { ExternalLinkButton } from "../common";
import { InlineCode } from "../common";
import { Events } from "./Events";
import { formatEther } from "viem";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldContract, useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export const Showcase = () => {
  const { data: vrfConsumerContract } = useScaffoldContract({ contractName: "AutomationConsumer" });

  const { data: upkeepInfo } = useScaffoldContractRead({
    contractName: "AutomationConsumer",
    functionName: "getUpkeepInfo",
  });

  const { data: currentCount } = useScaffoldContractRead({
    contractName: "AutomationConsumer",
    functionName: "s_counter",
  });

  const { data: isCounting } = useScaffoldContractRead({
    contractName: "AutomationConsumer",
    functionName: "s_isCounting",
  });

  const { data: interval } = useScaffoldContractRead({
    contractName: "AutomationConsumer",
    functionName: "s_interval",
  });

  const { writeAsync: startCounting } = useScaffoldContractWrite({
    contractName: "AutomationConsumer",
    functionName: "startCounting",
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const { writeAsync: stopCounting } = useScaffoldContractWrite({
    contractName: "AutomationConsumer",
    functionName: "stopCounting",
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });

  // console.log("upkeepInfo", upkeepInfo);

  return (
    <div className="bg-base-200 border border-base-200 rounded-xl mb-10 p-5 lg:p-10">
      <div className="flex flex-wrap justify-between gap-2 items-center mb-10">
        <div className="flex items-center gap-4">
          <h3 className="text-2xl md:text-4xl mb-0 font-bold">AutomationConsumer</h3>
          <ExternalLinkButton href="https://github.com/MattPereira/speedrun-chainlink/blob/main/packages/hardhat/contracts/AutomationConsumer.sol" />
        </div>
        <div>
          <Address size="xl" address={vrfConsumerContract?.address} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <p className="text-xl">
            Since smart contracts cannot initate transactions without the help of an externally owned account, a service
            like chainlink automation is required to reliably execute transactions at regular intervals or based on
            conditional logic triggers.
          </p>

          <p className="text-xl">
            Click <InlineCode text="start" /> to update the boolean state variable integrated with the{" "}
            <InlineCode text="checkUpkeep" /> function&apos;s return value that controls if chainlink nodes should call
            the <InlineCode text="performUpkeep" /> function every <InlineCode text="interval" /> seconds.
          </p>

          <div className="bg-base-200 rounded-xl flex flex-wrap justify-around items-center">
            <div className="stats">
              <div className="stat">
                <div className="stat-value">{interval?.toString()}</div>
                <div className="stat-title">interval</div>
              </div>
            </div>
            <div className="stats">
              <div className="stat">
                <div className={`stat-value ${isCounting ? "text-green-500" : "text-red-500"}`}>
                  {isCounting?.toString()}
                </div>
                <div className="stat-title">isCounting</div>
              </div>
            </div>
            <div className="stats">
              <div className="stat">
                <div className="stat-value">{Number(currentCount)}</div>
                <div className="stat-title">counter</div>
              </div>
            </div>

            {isCounting ? (
              <button onClick={() => stopCounting()} className="btn btn-error font-cubano text-xl rounded-lg px-7">
                Stop
              </button>
            ) : (
              <button onClick={() => startCounting()} className="btn btn-primary font-cubano text-xl rounded-lg px-7">
                Start
              </button>
            )}
          </div>
          <div className="alert bg-neutral-700 mt-5 text-xl">
            <InformationCircleIcon className="stroke-current shrink-0 w-6 h-6" />
            <div>
              <span className="font-bold mr-2">
                {upkeepInfo?.balance ? parseFloat(formatEther(upkeepInfo.balance)).toFixed(2) : "0.0"} LINK
              </span>
              left in upkeep subscription
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <h4 className="text-center font-bold text-2xl">Upkeep Events</h4>

          <Events />
        </div>
      </div>
    </div>
  );
};
