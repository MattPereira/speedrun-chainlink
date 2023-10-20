import { ExternalLinkButton } from "../common";
import { InlineCode } from "../common";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldContract, useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export const Showcase = () => {
  const { data: vrfConsumerContract } = useScaffoldContract({ contractName: "AutomationConsumer" });

  const { data: linkBalance } = useScaffoldContractRead({
    contractName: "AutomationConsumer",
    functionName: "getLinkBalance",
  });

  const { data: currentCount } = useScaffoldContractRead({
    contractName: "AutomationConsumer",
    functionName: "counter",
  });

  const { data: isCounting } = useScaffoldContractRead({
    contractName: "AutomationConsumer",
    functionName: "isCounting",
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
    functionName: "startCounting",
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });

  return (
    <div className="bg-base-100 rounded-xl mb-10 p-10">
      <div className="flex flex-col justify-center gap-2 items-center mb-10">
        <div className="flex items-center gap-4">
          <h3 className="text-2xl md:text-3xl mb-0 font-bold">AutomationConsumer</h3>
          <ExternalLinkButton href="https://github.com/MattPereira/speedrun-chainlink/blob/main/packages/hardhat/contracts/AutomationConsumer.sol" />
        </div>

        <div className="badge badge-warning">{linkBalance?.toString()} LINK</div>

        <div>
          <Address size="xl" address={vrfConsumerContract?.address} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-2xl font-bold">EVM Limitations</h3>
          <p className="text-xl">
            The design of the EVM does not allow for smart contracts to call functions on time based or future
            conditional logic based triggers. Since every transaction costs gas and the cost must be computed before a
            transaction can be processed, it is not possible to create a function that increments indefinitely or is
            triggered by some conditional logic that has not occurred yet.
          </p>
          <div>
            <h3 className="text-2xl font-bold">Explanation</h3>
            <p className="text-xl">
              Click start button to update boolean state variable integrated with the <InlineCode text="checkUpkeep" />{" "}
              function&apos;s return value that controls if chainlink nodes should call the{" "}
              <InlineCode text="performUpkeep" /> function.
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <h3 className="text-2xl font-bold">Simple Counter </h3>

          <div className="grid grid-flow-col gap-5 text-center auto-cols-max mb-5 justify-center items-center">
            <div className="stats">
              <div className="stat bg-base-200">
                <div className="stat-value">{isCounting?.toString()}</div>
                <div className="stat-title">isCounting</div>
              </div>
            </div>
            <div className="flex flex-col p-2 bg-base-200 rounded-box text-white">
              <span className="countdown font-mono text-5xl">
                <span style={{ "--value": Number(currentCount) } as React.CSSProperties}></span>
              </span>
              counter
            </div>
            <button onClick={() => startCounting()} className="btn btn-success">
              Start
            </button>
            <button onClick={() => stopCounting()} className="btn btn-error">
              Stop
            </button>
          </div>
          <div className="bg-base-200 grow rounded-xl">
            <h4 className="text-xl font-bold text-center mt-3">Events</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

//  parseFloat(formatUnits(latestPrice, decimals)).toFixed(2)
