import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
// import { ExternalLink, InformationSection, InlineCode } from "~~/components/common";
import { Showcase } from "~~/components/functions/Showcase";

const VRFPage: NextPage = () => {
  return (
    <div>
      <MetaHeader />
      <div className="container mx-auto py-14 px-5 xl:px-20">
        <h1 className="text-center text-6xl font-cubano mb-10">💻 Functions</h1>

        <div className="p-5 lg:p-10 bg-base-200 border-base-200 border rounded-2xl mb-10">
          <Showcase />
        </div>
      </div>
    </div>
  );
};

export default VRFPage;
