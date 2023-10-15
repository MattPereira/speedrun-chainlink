import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { ExternalLink, InformationSection, InlineCode } from "~~/components/common";
import { WheelSpinner } from "~~/components/vrf/WheelSpinner";

const VRFPage: NextPage = () => {
  return (
    <div>
      <MetaHeader />
      <div className="container mx-auto py-14 px-5 xl:px-20">
        <h1 className="text-center text-5xl font-bold mb-14">🎲 VRF</h1>
        <div className="mb-10">
          <div className="bg-base-100 rounded-xl p-10 shadow-lg">
            <WheelSpinner />
          </div>
        </div>
        <InformationSection
          summary={
            <>
              Chainlink VRF (Verifiable Random Function) is a provably fair and verifiable random number generator (RNG)
              that enables smart contracts to access random values without compromising security or usability. For each
              request, Chainlink VRF generates one or more random values and cryptographic proof of how those values
              were determined. This example uses the <a className="link link-accent">Direct Funding</a> method, but you
              may prefer the <a className="link link-accent">Subscription</a> method depending on your use case.
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
              Set up your contract to inherit{" "}
              <a
                className="link link-accent"
                href="https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.8/vrf/VRFV2WrapperConsumerBase.sol"
              >
                VRFV2WrapperConsumerBase
              </a>
            </>,
            <>
              Override the <InlineCode text="fullFillrandomWords" /> function with logic that handles the random values
            </>,
            <>
              Request for random number is triggered by <InlineCode text="requestRandomness" /> function
            </>,
            <></>,
          ]}
        />
      </div>
    </div>
  );
};

export default VRFPage;
