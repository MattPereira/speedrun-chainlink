import { useState } from "react";
import type { NextPage } from "next";
import { ExternalLink } from "~~/components/ExternalLink";
import { MetaHeader } from "~~/components/MetaHeader";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth/useScaffoldContractRead";
import { getTargetNetwork } from "~~/utils/scaffold-eth";

/**
 * How to conditionally check which network I am on?
 *
 */
const DataFeeds: NextPage = () => {
  const [showAbout, setShowAbout] = useState(true);
  const [showDemo, setShowDemo] = useState(false);

  return (
    <div>
      <MetaHeader />
      <div className="container mx-auto py-14 px-5">
        <h1 className="text-center text-5xl font-bold mb-14">📈 Price Feeds</h1>
        <div className="flex justify-center">
          <div className="join mb-14">
            <button
              className={`join-item btn px-10 text-xl w-36 ${
                showAbout ? "bg-accent text-primary hover:bg-accent-focus" : "btn-primary"
              }`}
              onClick={() => {
                setShowAbout(true);
                setShowDemo(false);
              }}
              name="options"
              aria-label="About"
            >
              About
            </button>
            <button
              className={`join-item btn px-10 text-xl w-36 ${
                showDemo ? "bg-accent text-primary hover:bg-accent-focus" : "btn-primary"
              }`}
              onClick={() => {
                setShowAbout(false);
                setShowDemo(true);
              }}
            >
              Demo
            </button>
          </div>
        </div>

        {showAbout && <About />}
        {showDemo && <Demo />}
      </div>
    </div>
  );
};

export default DataFeeds;

function About() {
  const network = getTargetNetwork();
  console.log("network", network);

  const { data: latestPrice } = useScaffoldContractRead({
    contractName: "PriceFeedConsumer",
    functionName: "getLatestPrice",
  });

  const { data: mockDecimals } = useScaffoldContractRead({
    contractName: "MockV3Aggregator",
    functionName: "decimals",
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
      <div>
        <div className="mb-5">
          <h3 className="text-3xl font-bold">Description</h3>
          <p className="text-xl">Chainlink uses multiple independent nodes </p>
        </div>
        <div className="mb-5">
          <h3 className="text-3xl font-bold">Details</h3>
          <ul className="text-xl list-disc list-inside">
            <li>
              The answer returned by the pricefeed has a specified number of decimals that can be fetched from the price
              feed contract using the{" "}
              <code className="bg-base-100 border border-base-300 p-0.5 rounded-md">.decimals()</code> method
            </li>
            <li>
              The answer returned by the price feed contract is only updated if the price changes beyond a specified
              deviation threshold or if a certain amount of time has passed since the last update{" "}
              <ExternalLink href="https://data.chain.link/ethereum/mainnet/crypto-usd/eth-usd" text="see specifics" />
            </li>
          </ul>
        </div>
        <div className="mb-5">
          <h3 className="text-3xl font-bold">Usage</h3>
          <ol className="text-xl list-decimal list-inside">
            <li>
              Choose a network and a pair of assets to find the contract address{" "}
              <ExternalLink href="https://data.chain.link/ethereum/mainnet/crypto-usd/eth-usd" text="see catalogue" />
            </li>
            <li>Install the @chainlink/contracts package for easy access to the contract and ABI</li>
            <li>Import AggregatorV3Interface into your smart contract</li>
            <li>Declare a state variable of type `AggregatorV3Interface`</li>
            <li>Instantiate the variable in the constructor by passing the contract address to the constructor</li>
          </ol>
        </div>

        <div className="mb-5">
          <h3 className="text-3xl font-bold">Use Cases</h3>
          <ul className="text-xl list-disc list-inside">
            <li>Decentralized Finance</li>
          </ul>
          <p className="text-xl"></p>
        </div>
      </div>

      <div className="text-center">
        <div className="mb-8">
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-title">int answer</div>
              <div className="stat-value">{latestPrice?.toString()}</div>
              <div className="stat-title">PriceFeedConsumer.getLatestPrice()</div>
            </div>
          </div>
        </div>

        {mockDecimals && (
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-title">uint8 decimals</div>
              <div className="stat-value">{mockDecimals?.toString()}</div>
              <div className="stat-title">MockV3Aggregator.decimals()</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Demo() {
  return (
    <div>
      <p className="text-xl text-center mb-14">all price feeds shown are for Ethereum mainnet</p>
    </div>
  );
}
