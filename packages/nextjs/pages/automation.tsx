import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { Showcase } from "~~/components/automation/Showcase";
import { ExternalLink, ExternalLinkButton, InformationSection, InlineCode } from "~~/components/common";

const AutomationPage: NextPage = () => {
  return (
    <div>
      <MetaHeader />
      <div className="container mx-auto py-14 px-5">
        <h1 className="text-center text-5xl font-bold mb-14">🤖 Automation</h1>
        <Showcase />
        <InformationSection
          summary={
            <>
              Chainlink Automation calls a smart contract function if a specified set of criteria are met. The{" "}
              <ExternalLink
                href="https://docs.chain.link/chainlink-automation/job-scheduler"
                text="time-based trigger"
              />{" "}
              calls a target function on a target contract every specified interval. The{" "}
              <ExternalLink
                href="https://docs.chain.link/chainlink-automation/register-upkeep"
                text="custom logic trigger"
              />{" "}
              allows your contract to use on-chain state to determine when to call a target function. The{" "}
              <ExternalLink href="https://docs.chain.link/chainlink-automation/log-trigger" text="log trigger" /> allows
              your contract to use event log data as both a trigger and an input
            </>
          }
          details={[
            <>
              The{" "}
              <ExternalLink
                href="https://docs.chain.link/chainlink-automation/job-scheduler"
                text="time-based trigger"
              />{" "}
              does not require an interface
            </>,
            <>
              The{" "}
              <ExternalLink
                href="https://docs.chain.link/chainlink-automation/register-upkeep"
                text="custom logic trigger"
              />{" "}
              requires your target contract be compatible with{" "}
              <ExternalLink
                href="https://docs.chain.link/chainlink-automation/reference/automation-interfaces#automationcompatibleinterface"
                text="AutomationCompatibleInterface"
              />{" "}
              by overriding the <InlineCode text="checkUpkeep" /> and <InlineCode text="performUpkeep" /> functions
            </>,
            <>
              The <ExternalLink href="https://docs.chain.link/chainlink-automation/log-trigger" text="log trigger" />{" "}
              requires your target contract be compatible with{" "}
              <ExternalLink
                href="https://docs.chain.link/chainlink-automation/reference/automation-interfaces#ilogautomation"
                text="IlogAutomation"
              />
            </>,
          ]}
          gettingStarted={[
            <>Decide which trigger fits best for your use case</>,
            <>
              Register a new upkeep with chainlink{" "}
              <ExternalLinkButton href="https://automation.chain.link/sepolia/new" />{" "}
            </>,
            <>Provide your target contract and target function</>,
          ]}
        />
      </div>
    </div>
  );
};

export default AutomationPage;
