import Image from "next/image";
import Link from "next/link";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";

/**
 * the site is intended to be used primarily on "Sepolia" testnet
 * where devs can get a feel for how the chainlink products work
 * and the LINK is free and plentiful
 */
const Home: NextPage = () => {
  return (
    <div className="">
      <MetaHeader />
      <div className="flex justify-center"></div>

      <div className="container mx-auto py-10 px-5">
        <div className="mb-10">
          <h1 className="text-center text-6xl font-cubano">Speedrun Chainlink</h1>
        </div>
        <p className="text-3xl text-center my-10">
          A beginner&apos;s guide to integrating chainlink products with smart contracts
        </p>
        <div className="rounded-xl overflow-hidden mb-14">
          <Image src={"/banner-crop.png"} height="1350" width="1550" alt="Speedrun Chainlink Banner" />
        </div>
        {/* <div className="flex justify-center mb-10 items-center gap-8 flex-wrap"></div> */}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10 px-0">
          {PRODUCTS.map(product => (
            <Link
              href={product.path}
              key={product.name}
              className="bg-base-200 border border-base-200 rounded-xl p-8 hover:bg-accent hover:cursor-pointer flex flex-col justify-center"
            >
              <h3 className="text-3xl mb-8 font-cubano">{product.name}</h3>
              <p className="text-xl my-0">{product.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

const PRODUCTS = [
  {
    name: "📈 Price Feeds",
    path: "/price-feeds",
    description: "Learn how to integrate price feeds in your smart contracts using AggregatorV3Interface",
  },
  {
    name: "🎲 VRF",
    path: "/vrf",
    description: "Spin the wheel of fruit to request a verifiably random number from the VRF Coordinator",
  },
  {
    name: "🤖 Automation",
    path: "/automation",
    description:
      "Play with the simple counter contract to understand how chainlink keeper nodes perform automated tasks on chain",
  },
];
