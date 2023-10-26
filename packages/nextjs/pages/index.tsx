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
      <div className="container mx-auto py-20 px-5">
        <h1 className="text-center text-5xl font-bold mb-10">Speedrun Chainlink</h1>
        <div className="text-center text-5xl mb-10">🏃💨</div>
        <p className="text-2xl text-center mb-10">
          A beginner&apos;s guide to using chainlink products with{" "}
          <Link className="text-accent" href="https://github.com/scaffold-eth/scaffold-eth-2">
            Scaffold-ETH 2
          </Link>
        </p>
        <div className="grid grid-cols-1 gap-10 px-0 lg:px-24">
          {PRODUCTS.map(product => (
            <Link
              href={product.path}
              key={product.name}
              className="bg-base-100 rounded-xl p-8 hover:bg-accent hover:cursor-pointer flex flex-col justify-center hover:text-primary shadow-lg"
            >
              <h3 className="text-3xl text-center mb-8">{product.name}</h3>
              <p className="text-xl text-center my-0">{product.description}</p>
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
