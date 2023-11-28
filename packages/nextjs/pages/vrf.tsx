import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { ExternalLink, InformationSection, InlineCode } from "~~/components/common";
import { Showcase } from "~~/components/vrf/Showcase";

const VRFPage: NextPage = () => {
  return (
    <div>
      <MetaHeader />
      <div className="container mx-auto py-14 px-5 xl:px-20">
        <h1 className="text-center text-6xl font-cubano mb-10">🎲 VRF</h1>

        <div className="p-5 lg:p-10 bg-base-200 border-base-200 border rounded-2xl mb-10">
          <Showcase />
        </div>

        <InformationSection
          summary={
            <>
              Chainlink VRF provides access to verifiably random numbers on chain. Each request for a random number
              costs <InlineCode text="LINK" /> and the reponse is delivered after{" "}
              <InlineCode text="requestConfirmations" /> number of blocks. The <InlineCode text="VRFConsumer" /> example
              uses the <ExternalLink href="https://docs.chain.link/vrf/v2/direct-funding" text="Direct Funding" />{" "}
              method, but you may prefer the{" "}
              <ExternalLink href="https://docs.chain.link/vrf/v2/subscription" text="Subscription" /> method depending
              on your use case.
            </>
          }
          details={[
            <>
              The <ExternalLink href="https://docs.chain.link/vrf/v2/direct-funding" text="Direct Funding" /> method
              requires your smart contract hold <InlineCode text="LINK" /> tokens for payment
            </>,
            <>
              The <InlineCode text="fulfillRandomWords" /> function is triggered by the VRF Coordinator contract
            </>,
            <>
              VRF response time is impacted by <InlineCode text="requestConfirmations" /> which must be greater than the
              minimum amount set by the coordinator contract
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
              <InlineCode text="requestRandomness" /> function inhereted from{" "}
              <ExternalLink
                text="VRFV2WrapperConsumerBase"
                href="https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.8/vrf/VRFV2WrapperConsumerBase.sol"
              />
            </>,
            <>
              You must <InlineCode text="override" /> the <InlineCode text="fullFillrandomWords" /> function inhereted
              from{" "}
              <ExternalLink
                text="VRFV2WrapperConsumerBase"
                href="https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.8/vrf/VRFV2WrapperConsumerBase.sol"
              />
            </>,
          ]}
        />
      </div>
    </div>
  );
};

export default VRFPage;
