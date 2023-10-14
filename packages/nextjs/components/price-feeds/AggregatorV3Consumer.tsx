import { formatUnits } from "viem";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth/useScaffoldContractRead";

export const AggregatorV3Consumer = () => {
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
    <div className="bg-base-100 rounded-xl p-10 shadow-lg">
      <div className="flex justify-center items-center mb-10 gap-2">
        <h3 className="text-2xl md:text-3xl text-center font-bold">AggregatorV3Consumer</h3>
        <div className="tooltip tooltip-accent" data-tip={`check out the "debug contracts" tab!`}>
          <button>
            <InformationCircleIcon className="h-7 w-7" />
          </button>
        </div>
      </div>

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
