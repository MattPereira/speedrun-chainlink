import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { ExternalLink, InformationSection, InlineCode } from "~~/components/common";
import { Showcase } from "~~/components/vrf/Showcase";

const VRFPage: NextPage = () => {
  return (
    <div>
      <MetaHeader />
      <div className="container mx-auto py-14 px-5 xl:px-20">
        <h1 className="text-center text-5xl font-bold mb-14">🎲 VRF</h1>
        <div className="mb-10">
          <div className="bg-base-100 rounded-xl p-10 shadow-lg">
            <Showcase />
          </div>
        </div>
        <InformationSection
          summary={
            <>
              Chainlink VRF (Verifiable Random Function) is a provably fair and verifiable random number generator that
              enables smart contracts to access random values without compromising security or usability. For each
              request, Chainlink VRF generates one or more random values and cryptographic proof of how those values
              were determined. The{" "}
              <ExternalLink
                href="https://github.com/MattPereira/speedrun-chainlink/blob/main/packages/hardhat/contracts/VRFConsumer.sol"
                text="VRFConusmer"
              />{" "}
              contract uses the{" "}
              <ExternalLink href="https://docs.chain.link/vrf/v2/direct-funding" text="Direct Funding" /> method, but
              you may prefer the <ExternalLink href="https://docs.chain.link/vrf/v2/subscription" text="Subscription" />{" "}
              method depending on your use case.
            </>
          }
          details={[
            <>
              The Direct Funding method requires your smart contract hold <InlineCode text="LINK" /> tokens for payment{" "}
            </>,
            <>
              The <InlineCode text="fulfillRandomWords()" /> function is triggered by the VRF Coordinator contract
            </>,
            <>
              The response time of the random number is tied to <InlineCode text="requestConfirmations" />
            </>,
          ]}
          gettingStarted={[
            <>
              Set up your contract to inherit{" "}
              <ExternalLink
                text="VRFV2WrapperConsumerBase"
                href="https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.8/vrf/VRFV2WrapperConsumerBase.sol"
              />
            </>,

            <>
              Impliment a function that triggers request for random number by calling the{" "}
              <InlineCode text="requestRandomness" /> function which is inhereted from{" "}
              <ExternalLink
                text="VRFV2WrapperConsumerBase"
                href="https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.8/vrf/VRFV2WrapperConsumerBase.sol"
              />
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
