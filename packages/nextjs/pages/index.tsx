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
        <h1 className="text-center text-5xl font-bold mb-14">🏃Speedrun Chainlink</h1>
        <p className="text-xl text-center mb-14">
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
              className="bg-base-100 rounded-xl p-8 hover:bg-accent hover:cursor-pointer flex flex-col justify-center hover:text-primary"
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
    name: "🤖 Automation",
    path: "/automation",
    description: "Learn how to automate the execution of a transaction based on some condition",
  },
  {
    name: "🎲 VRF",
    path: "/vrf",
    description: "Learn how to request a verifiably random number by spinning the wheel of fruit",
  },
];
