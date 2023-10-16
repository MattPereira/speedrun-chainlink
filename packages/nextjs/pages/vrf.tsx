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
              Chainlink VRF (Verifiable Random Function) is a provably fair and verifiable random number generator that
              enables smart contracts to access random values without compromising security or usability. For each
              request, Chainlink VRF generates one or more random values and cryptographic proof of how those values
              were determined. This example uses the{" "}
              <a className="link link-accent" href="https://docs.chain.link/vrf/v2/direct-funding">
                Direct Funding
              </a>{" "}
              method, but you may prefer the{" "}
              <a className="link link-accent" href="https://docs.chain.link/vrf/v2/subscription">
                Subscription
              </a>{" "}
              method depending on your use case.
            </>
          }
          details={[
            <>
              The Direct Funding method requires your smart contract hold <InlineCode text="LINK" /> tokens for payment{" "}
            </>,
            <>
              Grab <InlineCode text="LINK" /> on sepolia from the faucet{" "}
              <ExternalLink href="https://faucets.chain.link/" />
            </>,
            <>
              The <InlineCode text="fulfillRandomWords()" /> function is triggered by the VRF Coordinator contract
            </>,
            <>The modulo operator can be used to create a range </>,
          ]}
          gettingStarted={[
            <>
              Set up your contract to inherit{" "}
              <a
                className="link link-accent"
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.8/vrf/VRFV2WrapperConsumerBase.sol"
              >
                VRFV2WrapperConsumerBase
              </a>
            </>,

            <>
              Impliment a function that triggers request for random number by calling the{" "}
              <InlineCode text="requestRandomness" /> function which is inhereted from{" "}
              <a
                className="link link-accent"
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.8/vrf/VRFV2WrapperConsumerBase.sol"
              >
                VRFV2WrapperConsumerBase
              </a>
            </>,
            <>
              You must <InlineCode text="override" /> the <InlineCode text="fullFillrandomWords" /> function
            </>,
          ]}
        />
      </div>
    </div>
  );
};

export default VRFPage;
