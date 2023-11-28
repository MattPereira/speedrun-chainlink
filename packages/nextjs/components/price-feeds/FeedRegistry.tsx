import { useEffect, useState } from "react";
import { ExternalLinkButton } from "../common";
import { StatDisplay } from "./AggregatorV3Consumer";
import { formatUnits } from "viem";
import { useContractRead } from "wagmi";
import { Spinner } from "~~/components/assets/Spinner";
import { Address } from "~~/components/scaffold-eth";
import { AddressInput } from "~~/components/scaffold-eth/Input";
import FeedRegistry from "~~/utils/external-contracts/FeedRegistry";

/**
 * @dev  FeedRegistry contract is only available on mainnet
 */
export const FeedRegistryDisplay = () => {
  const [baseAssetAddress, setBaseAssetAddress] = useState("");
  const [quoteAssetAddress, setQuoteAssetAddress] = useState("");

  useEffect(() => {
    setBaseAssetAddress(BASE_ASSET_OPTIONS[0].address);
    setQuoteAssetAddress(USD_QUOTE);
  }, []);

  const { data: description } = useContractRead({
    address: FeedRegistry.address,
    abi: FeedRegistry.abi,
    functionName: "description",
    args: [baseAssetAddress, quoteAssetAddress],
    chainId: 1, // force request on mainnet
  });

  const { data: roundData, isLoading } = useContractRead({
    address: FeedRegistry.address,
    abi: FeedRegistry.abi,
    functionName: "latestRoundData",
    args: [baseAssetAddress, quoteAssetAddress],
    chainId: 1, // force request on mainnet
  });

  console.log(roundData);

  const { data: decimals } = useContractRead({
    address: FeedRegistry.address,
    abi: FeedRegistry.abi,
    functionName: "decimals",
    args: [baseAssetAddress, quoteAssetAddress],
    chainId: 1, // force request on mainnet
  });

  let price;
  // handle typescript rage
  if (Array.isArray(roundData) && typeof roundData[1] === "bigint") {
    price = roundData[1];
  } else {
    console.error("Unexpected data format");
  }

  const items = [
    { title: "description()", value: description?.toString(), type: "string" },
    {
      title: "formatUnits(price, decimals)",
      value: price && decimals ? parseFloat(formatUnits(price, Number(decimals))).toFixed(2) : "N/A",
      type: "string",
    },
  ];

  return (
    <div className="bg-base-200 border border border-base-200 rounded-xl p-10 shadow-lg">
      <div className="flex flex-col justify-center items-center mb-10 gap-2">
        <div className="flex gap-3 items-center">
          <h3 className="text-2xl md:text-3xl text-center font-bold">FeedRegistry</h3>
          <ExternalLinkButton href="https://docs.chain.link/data-feeds/feed-registry" />
        </div>
        <Address size="xl" address={"0x47Fb2585D2C56Fe188D0E6ec628a38b74fCeeeDf"} />
      </div>
      <p className="text-xl">Enter a supported mainnet token address to see the latest price quote in USD</p>

      {isLoading ? (
        <div className="stats bg-base-200 shadow-lg">
          <div className="stat">
            <Spinner />
          </div>
        </div>
      ) : (
        <div className="mb-8 flex flex-wrap gap-4">
          {items.map(item => (
            <StatDisplay key={item.title} {...item} />
          ))}
        </div>
      )}

      <div className="mb-3">
        <div className="ml-3 mb-1">
          <label className="text-xl">Base Asset</label>
        </div>
        <div className="flex items-center justify-end gap-4">
          <div className="grow">
            <AddressInput value={baseAssetAddress} onChange={val => setBaseAssetAddress(val)} />
          </div>
        </div>
      </div>
      <div>
        <div className="ml-3 mb-1">
          <label className="text-xl">Quote Asset</label>
        </div>
        <div className="flex items-center justify-end gap-4">
          <div className="grow">
            <AddressInput value={quoteAssetAddress} onChange={val => setQuoteAssetAddress(val)} />
          </div>
        </div>
      </div>
    </div>
  );
};

const BASE_ASSET_OPTIONS = [
  { symbol: "BTC", address: "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB" },
  { symbol: "ETH", address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" },
  { symbol: "MATIC", address: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0" },
  { symbol: "LINK", address: "0x514910771AF9Ca656af840dff83E8264EcF986CA" },
  { symbol: "AAVE", address: "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9" },
  { symbol: "YFI", address: "0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e" },
  { symbol: "CRV", address: "0xD533a949740bb3306d119CC777fa900bA034cd52" },
];

// address for USD
const USD_QUOTE = "0x0000000000000000000000000000000000000348";
