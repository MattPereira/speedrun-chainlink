import type { NextPage } from "next";
import { ExternalLink } from "~~/components/ExternalLink";
import { MetaHeader } from "~~/components/MetaHeader";
import { AggregatorV3Consumer } from "~~/components/price-feeds/AggregatorV3Consumer";
import { getTargetNetwork } from "~~/utils/scaffold-eth";

/**
 *
 * - show the latest price for eth/usd as queried through AggregatorV3Consumer
 * - create form that lets users pick a pair of assets to query for the FeedRegistryConsumer
 *
 * @notice will need to setup dedicated mainnet RPC url for FeedRegistry
 *
 * @TODO
 * - component for inline code
 * - refactor external link component
 */
const PriceFeeds: NextPage = () => {
  const network = getTargetNetwork();
  console.log("network", network);

  return (
    <div>
      <MetaHeader />
      <div className="container mx-auto py-14 px-5">
        <h1 className="text-center text-5xl font-bold mb-14">📈 Price Feeds</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 mb-14">
          <AggregatorV3Consumer />
          <div className="bg-base-100 rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl md:text-3xl text-center mb-6 font-bold">FeedRegistry</h3>
          </div>
        </div>
        <InformationSection />
      </div>
    </div>
  );
};

export default PriceFeeds;

function InformationSection() {
  return (
    <section className="">
      <div className="mb-14">
        <h3 className="text-3xl font-bold">Summary</h3>
        <p className="text-xl">
          Chainlink price feeds offer a decentralized data source that provides price information for a range of assets
          pairs depending on the network. The price feeds are powered by a decentralized network of independent,
          security-reviewed, and Sybil-resistant oracle nodes. The AggregatorV3Interface option attatches to a single
          price feed address, but the FeedRegistry option is more flexible with the downside of only being avaible on
          mainnet.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
        <div>
          <div className="mb-5">
            <h3 className="text-3xl font-bold">Details</h3>
            <ul className="text-xl list-disc list-inside">
              <li>
                The price returned by the price feed contract has a specified number of decimals that can be fetched
                from the price feed contract using the{" "}
                <code className="bg-base-100 border border-base-300 p-0.5 rounded-md">.decimals()</code> method
              </li>
              <li>
                The price returned by the price feed contract is only updated if the price changes beyond a specified
                deviation threshold or if a certain amount of time has passed since the last update{" "}
                <ExternalLink href="https://data.chain.link/ethereum/mainnet/crypto-usd/eth-usd" text="see specifics" />
              </li>
              <li>
                FeedRegistry is only available on Ethereum Mainnet, but AggregatorV3Interface is available on a variety
                of networks.
              </li>
            </ul>
          </div>
        </div>
        <div>
          <div className="mb-5">
            <h3 className="text-3xl font-bold">Getting Started</h3>
            <ol className="text-xl list-decimal list-inside">
              <li>
                Choose a network and a pair of assets to find the contract address{" "}
                <ExternalLink href="https://data.chain.link/ethereum/mainnet/crypto-usd/eth-usd" text="see catalogue" />
              </li>
              <li>Install the @chainlink/contracts package for easy access to the contract and ABI</li>
              <li>Import AggregatorV3Interface into your smart contract</li>
              <li>Declare a state variable of type `AggregatorV3Interface`</li>
              <li>Instantiate the variable using a price feed address</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
