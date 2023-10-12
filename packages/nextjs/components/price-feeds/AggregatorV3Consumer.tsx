import { formatUnits } from "viem";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth/useScaffoldContractRead";

export const AggregatorV3Consumer = () => {
  const { data: latestPrice } = useScaffoldContractRead({
    contractName: "PriceFeedConsumer",
    functionName: "getLatestPrice",
  });

  const { data: decimals } = useScaffoldContractRead({
    contractName: "PriceFeedConsumer",
    functionName: "getDecimals",
  });

  const { data: description } = useScaffoldContractRead({
    contractName: "PriceFeedConsumer",
    functionName: "getDescripition", // fix spelling lol
  });

  const items = [
    { title: "getDescription()", value: description?.toString(), type: "string" },
    { title: "getLatestPrice()", value: latestPrice?.toString(), type: "int" },
    { title: "getDecimals()", value: decimals?.toString(), type: "uint8" },
    {
      title: "formatUnits(price, decimals)",
      value: latestPrice && decimals ? formatUnits(latestPrice, decimals) : "N/A",
      type: "string",
    },
  ];

  return (
    <div className="bg-base-100 rounded-xl p-10 shadow-lg">
      <h3 className="text-2xl md:text-3xl text-center mb-10 font-bold">AggregatorV3Consumer</h3>

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
  type = "N/A",
}: {
  title: string | undefined;
  value: string | undefined;
  type: string | undefined;
}) {
  return (
    <div className="stats bg-base-200 shadow-lg">
      <div className="stat">
        <div className="stat-title">{type}</div>
        <div className="stat-value">{value}</div>
        <div className="stat-title">{title}</div>
      </div>
    </div>
  );
}
