import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { ExternalLinkButton, InformationSection, InlineCode } from "~~/components/common";
import { AggregatorV3Consumer } from "~~/components/price-feeds/AggregatorV3Consumer";
import { FeedRegistryDisplay } from "~~/components/price-feeds/FeedRegistry";

/**
 * Price Feeds page
 */
const PriceFeeds: NextPage = () => {
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
              Chainlink price feeds bring off chain price quotes on chain using a decentralized network of oracles. The{" "}
              <InlineCode text="FeedRegistry" /> contract is only avaible on mainnet, but the price feed addresses that
              power the <InlineCode text="AggregatorV3Interface" /> are available on a wide range of networks
            </>
          }
          details={[
            <>
              The price returned by the price feed contract has a specified number of decimals that can be fetched from
              the price feed contract using the <InlineCode text="decimals()" /> method
            </>,
            <>
              The <InlineCode text="answer" /> returned by the price feed contract is only updated if the price deviates
              beyond a specified threshold or if a certain amount of time has passed since the last update{" "}
              <ExternalLinkButton href="https://data.chain.link/ethereum/mainnet/crypto-usd/eth-usd" />
            </>,
            <>
              <InlineCode text="FeedRegistry" /> is only available on Ethereum Mainnet, but{" "}
              <InlineCode text="AggregatorV3Interface" /> is available on a variety of networks.
            </>,
          ]}
          gettingStarted={[
            <>
              Import <InlineCode text="AggregatorV3Interface" /> into your smart contract
            </>,
            <>
              Declare a state variable of type <InlineCode text="AggregatorV3Interface" />
            </>,
            <>
              Choose network and a pair of assets to find the price feed address{" "}
              <ExternalLinkButton href="https://data.chain.link/ethereum/mainnet/crypto-usd/eth-usd" />
            </>,
            <>Instantiate the variable using the price feed address</>,
            <>
              Call <InlineCode text=".latestRoundData()" /> and extract the <InlineCode text="answer" />{" "}
              <ExternalLinkButton href="https://docs.chain.link/data-feeds/api-reference" />{" "}
            </>,
          ]}
        />
      </div>
    </div>
  );
};

export default PriceFeeds;
