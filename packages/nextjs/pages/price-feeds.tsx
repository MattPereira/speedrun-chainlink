import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { ExternalLink, InformationSection, InlineCode } from "~~/components/common";
import { AggregatorV3Consumer } from "~~/components/price-feeds/AggregatorV3Consumer";
import { FeedRegistryDisplay } from "~~/components/price-feeds/FeedRegistry";
import { getTargetNetwork } from "~~/utils/scaffold-eth";

/**
 * Price Feeds page
 */
const PriceFeeds: NextPage = () => {
  const network = getTargetNetwork();
  console.log("network", network);

  return (
    <div>
      <MetaHeader />
      <div className="container mx-auto py-14 px-5 xl:px-20">
        <h1 className="text-center text-5xl font-bold mb-14">📈 Price Feeds</h1>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-14 mb-14">
          <AggregatorV3Consumer />
          <FeedRegistryDisplay />
        </div>
        <InformationSection
          summary={
            <>
              Chainlink price feeds offer a decentralized data source that provides price information for a range of
              assets pairs depending on the network. The price feeds are powered by a decentralized network of
              independent, security-reviewed, and Sybil-resistant oracle nodes. The{" "}
              <InlineCode text="AggregatorV3Interface" /> is fixed to the price feed address used during instantiation,
              but the <InlineCode text="FeedRegistry" /> is more flexible with the trade off of only being avaible on
              mainnet.
            </>
          }
          details={[
            <>
              The price returned by the price feed contract has a specified number of decimals that can be fetched from
              the price feed contract using the <InlineCode text="decimals()" /> method
            </>,
            <>
              The price returned by the price feed contract is only updated if the price changes beyond a specified
              deviation threshold or if a certain amount of time has passed since the last update{" "}
              <ExternalLink href="https://data.chain.link/ethereum/mainnet/crypto-usd/eth-usd" />
            </>,
            <>
              <InlineCode text="FeedRegistry" /> is only available on Ethereum Mainnet, but{" "}
              <InlineCode text="AggregatorV3Interface" /> is available on a variety of networks.
            </>,
          ]}
          gettingStarted={[
            <>
              Install the <InlineCode text="@chainlink/contracts" /> package for convenient access to contracts and ABIs
            </>,
            <>
              Import <InlineCode text="AggregatorV3Interface" /> into your smart contract
            </>,
            <>
              Declare a state variable of type <InlineCode text="AggregatorV3Interface" />
            </>,
            <>
              Choose a network and a pair of assets to find the contract address{" "}
              <ExternalLink href="https://data.chain.link/ethereum/mainnet/crypto-usd/eth-usd" />
            </>,
            <>Instantiate the variable using a price feed address</>,
            <>
              Call <InlineCode text=".latestRoundData()" />
              on the state variable <ExternalLink href="https://docs.chain.link/data-feeds/api-reference" />{" "}
            </>,
          ]}
        />
      </div>
    </div>
  );
};

export default PriceFeeds;
