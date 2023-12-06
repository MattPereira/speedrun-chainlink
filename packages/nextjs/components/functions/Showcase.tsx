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
          <h3 className="text-2xl md:text-4xl mb-0 font-bold">VRFConsumer</h3>
          <ExternalLinkButton href="https://github.com/MattPereira/speedrun-chainlink/blob/main/packages/hardhat/contracts/FunctionsConsumer.sol" />
        </div>
        <div>
          <Address size="xl" address={functionsConsumerContract?.address} />
        </div>
      </div>
      <div className="stats shadow">
        <div className="stat bg-base-200">
          <div className="stat-value">{builderCount?.toString()}</div>
          <div className="stat-title">Builder Count</div>
        </div>
      </div>
      <div className="flex justify-center">
        <button className="btn btn-primary text-xl" onClick={async () => await updateBuilderCount()}>
          Update Builder Count
        </button>
      </div>
    </section>
  );
};
