import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { InformationSection, InlineCode } from "~~/components/common";

const AutomationPage: NextPage = () => {
  return (
    <div>
      <MetaHeader />
      <div className="container mx-auto py-14 px-5">
        <h1 className="text-center text-5xl font-bold mb-14">🤖 Automation</h1>
        <InformationSection
          summary={
            <>
              Automate your smart contracts using a secure and hyper-reliable decentralized network that uses the same
              external network of node operators that secures billions in value. Building on Chainlink Automation will
              accelerate your innovation, save you time and money, and help you get to market faster so you do not have
              to deal with the setup cost, ongoing maintenance, and risks associated with a centralized automation
              stack.
            </>
          }
          details={[<>some details here</>]}
          gettingStarted={[
            <>
              Install the <InlineCode text="@chainlink/contracts" /> package
            </>,
          ]}
        />
      </div>
    </div>
  );
};

export default AutomationPage;
