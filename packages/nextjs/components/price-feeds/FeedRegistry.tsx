import { useState } from "react";
import { StatDisplay } from "./AggregatorV3Consumer";
import { formatUnits } from "viem";
import { useContractRead } from "wagmi";
import Denominations from "~~/utils/contract-helpers/Denominations";
import FeedRegistry from "~~/utils/contract-helpers/FeedRegistry";

/**
 * @dev figure out how to interact with mainnet
 * even tho we are on sepolia
 */

const { baseOptions, quoteOptions } = Denominations;

export const FeedRegistryDisplay = () => {
  const [base, setBase] = useState(baseOptions.BTC);
  const [quote, setQuote] = useState(quoteOptions.USD);

  const { data: description } = useContractRead({
    address: FeedRegistry.address,
    abi: FeedRegistry.abi,
    functionName: "description",
    args: [base, quote],
    chainId: 1, // force request on mainnet
  });

  const { data: roundData } = useContractRead({
    address: FeedRegistry.address,
    abi: FeedRegistry.abi,
    functionName: "latestRoundData",
    args: [base, quote],
    chainId: 1, // force request on mainnet
  });

  let price;
  // handle typescript rage
  if (Array.isArray(roundData) && typeof roundData[1] === "bigint") {
    price = roundData[1];
    console.log("$" + formatUnits(price, 8));
  } else {
    console.error("Unexpected data format");
  }

  return (
    <div className="bg-base-100 rounded-xl p-10 shadow-lg">
      <h3 className="text-2xl md:text-3xl text-center mb-6 font-bold">FeedRegistry</h3>

      {!price || !description ? (
        <p>loading...</p>
      ) : (
        <div className="mb-5 flex gap-4 flex-wrap">
          <StatDisplay title="description()" value={"ETH"} type="string" />
          <StatDisplay title="latestRoundData().answer" value={price?.toString()} type="int256" />
        </div>
      )}

      <div className="mb-5">
        <div>
          <label className="text-xl ml-4">Base Asset</label>
        </div>
        <select
          className="select select-bordered w-full text-center bg-base-200"
          value={base}
          onChange={e => setBase(e.target.value)}
        >
          {Object.entries(baseOptions).map(([key, value]) => (
            <option key={key} value={value}>
              {key}
            </option>
          ))}
        </select>
      </div>

      <div>
        <div>
          <label className="text-xl ml-4">Quote Asset</label>
        </div>
        <select
          value={quote}
          className="select select-bordered w-full text-center bg-base-200"
          onChange={e => setQuote(e.target.value)}
        >
          {Object.entries(quoteOptions).map(([key, value]) => (
            <option key={key} value={value}>
              {key}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
