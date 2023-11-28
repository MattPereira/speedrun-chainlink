import { ExternalLinkButton } from "../common";
import { formatUnits } from "viem";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldContract } from "~~/hooks/scaffold-eth/useScaffoldContract";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth/useScaffoldContractRead";

export const AggregatorV3Consumer = () => {
  const { data: aggregatorV3Consumer } = useScaffoldContract({ contractName: "AggregatorV3Consumer" });

  const { data: latestPrice } = useScaffoldContractRead({
    contractName: "AggregatorV3Consumer",
    functionName: "getLatestPrice",
  });

  const { data: decimals } = useScaffoldContractRead({
    contractName: "AggregatorV3Consumer",
    functionName: "getDecimals",
  });

  const { data: description } = useScaffoldContractRead({
    contractName: "AggregatorV3Consumer",
    functionName: "getDescription", // fix spelling lol
  });

  const items = [
    { title: "getDescription()", value: description?.toString(), type: "string" },
    { title: "getLatestPrice()", value: latestPrice?.toString(), type: "int" },
    { title: "getDecimals()", value: decimals?.toString(), type: "uint8" },
    {
      title: "formatUnits(price, decimals)",
      value: latestPrice && decimals ? "$" + parseFloat(formatUnits(latestPrice, decimals)).toFixed(2) : "N/A",
      type: "string",
    },
  ];

  return (
    <div className="bg-base-200 border border border-base-200 rounded-xl p-10 shadow-lg">
      <div className="flex flex-col justify-center items-center mb-10 gap-2">
        <div className="flex gap-3 items-center">
          <h3 className="text-2xl md:text-3xl text-center font-bold">AggregatorV3Consumer</h3>
          <ExternalLinkButton href="https://github.com/MattPereira/speedrun-chainlink/blob/main/packages/hardhat/contracts/AggregatorV3Consumer.sol" />
        </div>
        <Address size="xl" address={aggregatorV3Consumer?.address} />
      </div>

      <p className="text-xl">The latest round data returned by ETH/USD price feed contract on sepolia</p>

      {!latestPrice || !decimals || !description ? (
        <p>Loading...</p>
      ) : (
        <div className="mb-8 flex flex-wrap gap-4">
          {items.map(item => (
            <StatDisplay key={item.title} {...item} />
          ))}
        </div>
      )}
    </div>
  );
};

export function StatDisplay({
  title = "N/A",
  value = "N/A",
}: {
  title: string | undefined;
  value: string | undefined;
}) {
  return (
    <div className="stats bg-base-200 shadow-lg">
      <div className="stat">
        <div className="stat-value">{value}</div>
        <div className="stat-title">{title}</div>
      </div>
    </div>
  );
}
