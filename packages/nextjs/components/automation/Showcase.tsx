import { ExternalLinkButton } from "../common";
import { InlineCode } from "../common";
import { Events } from "./Events";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldContract, useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export const Showcase = () => {
  const { data: vrfConsumerContract } = useScaffoldContract({ contractName: "AutomationConsumer" });

  // const { data: linkBalance } = useScaffoldContractRead({
  //   contractName: "AutomationConsumer",
  //   functionName: "getLinkBalance",
  // });

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

  return (
    <div className="bg-base-100 rounded-xl mb-10 p-5 lg:p-10">
      <div className="flex flex-wrap justify-between gap-2 items-center mb-10">
        <div className="flex items-center gap-4">
          <h3 className="text-2xl md:text-3xl mb-0 font-bold">AutomationConsumer</h3>
          <ExternalLinkButton href="https://github.com/MattPereira/speedrun-chainlink/blob/main/packages/hardhat/contracts/AutomationConsumer.sol" />
        </div>
        {/* <div className="badge badge-warning">{linkBalance?.toString()} LINK</div> */}
        <div>
          <Address size="xl" address={vrfConsumerContract?.address} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <p className="text-xl">
            Since smart contracts cannot initiate functions or update their state by themselves, they require externally
            owned accounts to trigger their execution. Chainlink automation is a reliable way to outsource smart
            contract operations.
          </p>

          <p className="text-xl">
            Click start to update boolean state variable integrated with the <InlineCode text="checkUpkeep" />{" "}
            function&apos;s return value that controls if chainlink nodes should call the{" "}
            <InlineCode text="performUpkeep" /> function.
          </p>

          <p className="text-xl">
            Modify the <InlineCode text="s_interval" /> to get a sense of how often the chainlink keeper nodes will
            trigger the <InlineCode text="performUpkeep" /> function.
          </p>
        </div>

        <div className="flex flex-col">
          <h4 className="text-center font-medium text-xl">UpkeepPerformed Events</h4>

          <Events />

          <div className="bg-base-200 rounded-xl flex flex-wrap justify-around items-center">
            <div className="stats">
              <div className="stat bg-base-200">
                <div className="stat-value">{interval?.toString()}</div>
                <div className="stat-title">interval</div>
              </div>
            </div>
            <div className="stats">
              <div className="stat bg-base-200">
                <div className={`stat-value ${isCounting ? "text-green-500" : "text-red-500"}`}>
                  {isCounting?.toString()}
                </div>
                <div className="stat-title">isCounting</div>
              </div>
            </div>
            <div className="stats">
              <div className="stat bg-base-200">
                <div className="stat-value">{Number(currentCount)}</div>
                <div className="stat-title">counter</div>
              </div>
            </div>

            {isCounting ? (
              <button onClick={() => stopCounting()} className="btn btn-error">
                Stop
              </button>
            ) : (
              <button onClick={() => startCounting()} className="btn btn-success">
                Start
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

//  parseFloat(formatUnits(latestPrice, decimals)).toFixed(2)
