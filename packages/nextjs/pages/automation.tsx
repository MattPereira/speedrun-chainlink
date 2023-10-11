import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";

const Automation: NextPage = () => {
  return (
    <div>
      <MetaHeader />
      <div className="container mx-auto py-14 px-5">
        <h1 className="text-center text-5xl font-bold mb-14">🤖 Automation</h1>
        <p className="text-xl text-center mb-14">description</p>
      </div>
    </div>
  );
};

export default Automation;
