import Image from "next/image";
import Link from "next/link";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import logo from "~~/public/speed-chain-logo.png";

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
        <div className="flex justify-center mb-10 items-center gap-8 flex-wrap">
          <div className="rounded-full overflow-hidden">
            <Image src={logo} height="200" width="200" alt="Speedrun Chainlink Logo" />
          </div>
          <div>
            <h1 className="text-center text-6xl font-cubano">
              Speedrun <div>Chainlink</div>
            </h1>
          </div>
        </div>

        <p className="text-xl text-center mb-10">
          A beginner&apos;s guide to integrating chainlink products with smart contracts
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
