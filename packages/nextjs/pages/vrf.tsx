import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { ExternalLink, InformationSection, InlineCode } from "~~/components/common";
import { ActionPanel } from "~~/components/vrf/ActionPanel";

const VRFPage: NextPage = () => {
  return (
    <div>
      <MetaHeader />
      <div className="container mx-auto py-14 px-5 xl:px-20">
        <h1 className="text-center text-5xl font-bold mb-14">🎲 VRF</h1>
        <div className="mb-10">
          <ActionPanel />
        </div>
        <InformationSection
          summary={
            <>
              Chainlink VRF (Verifiable Random Function) is a provably fair and verifiable random number generator (RNG)
              that enables smart contracts to access random values without compromising security or usability. For each
              request, Chainlink VRF generates one or more random values and cryptographic proof of how those values
              were determined.
            </>
          }
          details={[
            <>
              Requests for random values require payment in
              <InlineCode text="LINK" /> token through either a subscription or direct funding{" "}
              <ExternalLink href="https://docs.chain.link/vrf#two-methods-to-request-randomness" />
            </>,
            <>
              The <InlineCode text="requestRandomWords()" /> method is triggered by a user
            </>,
            <>
              Smart contracts that utilize VRFConsumerBaseV2 are required to override the{" "}
              <InlineCode text="fullFillrandomWords" /> method which is how the VRF Coordinator delivers the random
              value(s)
            </>,
            <>The modulo operator can be used to create a range </>,
          ]}
          gettingStarted={[
            <>
              Install the <InlineCode text="@chainlink/contracts" /> package for convenient access to contracts and ABIs
            </>,
            <>
              Import <InlineCode text="VRFCoordinatorV2Interface" /> and the <InlineCode text="VRFConsumerBaseV2" />{" "}
              into your smart contract
            </>,
            <>Set up state variables for all of the parameters required to make a request to the VRF Coordinator</>,
          ]}
        />
      </div>
    </div>
  );
};

export default VRFPage;
