import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";

// import Link from "next/link";

const products = [
  {
    name: "📈 Data Feeds",
    path: "/data-feeds",
    description: "Get data from the Chainlink network",
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
    <div>
      <MetaHeader />
      <div className="container mx-auto py-14 px-5">
        <h1 className="text-center text-5xl font-bold mb-14">Scaffold Chainlink</h1>
        <p className="text-xl text-center mb-14">
          A starter kit and guide for using chainlink products with scaffold-eth-2
        </p>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {products.map(product => (
            <div key={product.name} className="bg-base-100 h-96 rounded-xl">
              <h3 className="text-3xl text-center mt-8">{product.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
