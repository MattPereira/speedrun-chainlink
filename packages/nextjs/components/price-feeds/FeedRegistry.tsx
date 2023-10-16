import { useState } from "react";
import { ExternalLinkButton } from "../common";
import { StatDisplay } from "./AggregatorV3Consumer";
import { formatUnits } from "viem";
import { useContractRead } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import FeedRegistry from "~~/utils/external-contracts/FeedRegistry";

/**
 * @dev  FeedRegistry contract is only available on mainnet
 */
export const FeedRegistryDisplay = () => {
  const [base, setBase] = useState(BASE_OPTIONS.BTC);

  const { data: description } = useContractRead({
    address: FeedRegistry.address,
    abi: FeedRegistry.abi,
    functionName: "description",
    args: [base, QUOTE],
    chainId: 1, // force request on mainnet
  });

  const { data: roundData } = useContractRead({
    address: FeedRegistry.address,
    abi: FeedRegistry.abi,
    functionName: "latestRoundData",
    args: [base, QUOTE],
    chainId: 1, // force request on mainnet
  });

  const { data: decimals } = useContractRead({
    address: FeedRegistry.address,
    abi: FeedRegistry.abi,
    functionName: "decimals",
    args: [base, QUOTE],
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

  const items = [
    { title: "description()", value: description?.toString(), type: "string" },
    { title: "latestRoundData().answer", value: price?.toString(), type: "int" },
    { title: "decimals()", value: decimals?.toString(), type: "uint8" },
    {
      title: "formatUnits(price, decimals)",
      value: price && decimals ? "$" + parseFloat(formatUnits(price, Number(decimals))).toFixed(2) : "N/A",
      type: "string",
    },
  ];

  return (
    <div className="bg-base-100 rounded-xl p-10 shadow-lg">
      <div className="flex flex-col justify-center items-center mb-10 gap-2">
        <div className="flex gap-3 items-center">
          <h3 className="text-2xl md:text-3xl text-center font-bold">FeedRegistry</h3>
          <ExternalLinkButton href="https://etherscan.io/address/0x47Fb2585D2C56Fe188D0E6ec628a38b74fCeeeDf#code" />
        </div>
        <Address size="xl" address={"0x47Fb2585D2C56Fe188D0E6ec628a38b74fCeeeDf"} />
      </div>

      {!price || !description || !decimals ? (
        <p>loading...</p>
      ) : (
        <div className="mb-8 flex flex-wrap gap-4">
          {items.map(item => (
            <StatDisplay key={item.title} {...item} />
          ))}
        </div>
      )}

      <div className="flex items-center justify-end">
        <div className="mr-4">
          <label className="text-xl">Base Asset</label>
        </div>
        <div>
          <select
            className="select select-bordered w-full text-center bg-base-200 text-2xl"
            value={base}
            onChange={e => setBase(e.target.value)}
          >
            {Object.entries(BASE_OPTIONS).map(([key, value]) => (
              <option key={key} value={value} className="font-bold">
                {key}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

const BASE_OPTIONS = {
  BTC: "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
  ETH: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
  LINK: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
  AAVE: "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
  YFI: "0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e",
};

// address for USD
const QUOTE = "0x0000000000000000000000000000000000000348";
