import Link from "next/link";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";

const products = [
  {
    name: "📈 Price Feeds",
    path: "/data-feeds",
    description: "Learn how to integrate price feeds in a smart contract",
  },
  {
    name: "🤖 Automation",
    path: "/automation",
    description: "Automate your smart contracts",
  },
  {
    name: "🎲 VRF",
    path: "/vrf",
    description: "Get random numbers on-chain",
  },
];

const Home: NextPage = () => {
  return (
    <div className="">
      <MetaHeader />
      <div className="container mx-auto py-20 px-5">
        <h1 className="text-center text-5xl font-bold mb-14">Scaffold Chainlink</h1>
        <p className="text-xl text-center mb-14">
          A guide and starter kit for using chainlink products with{" "}
          <Link className="text-accent" href="https://github.com/scaffold-eth/scaffold-eth-2">
            Scaffold-ETH 2
          </Link>
        </p>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {products.map(product => (
            <div key={product.name} className="bg-base-100 h-96 rounded-xl p-14">
              <h3 className="text-3xl text-center mb-8">{product.name}</h3>
              <p className="text-xl">{product.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
