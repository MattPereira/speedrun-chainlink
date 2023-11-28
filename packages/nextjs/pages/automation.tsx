import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { Showcase } from "~~/components/automation/Showcase";
import { ExternalLink, ExternalLinkButton, InformationSection, InlineCode } from "~~/components/common";

const AutomationPage: NextPage = () => {
  return (
    <div>
      <MetaHeader />
      <div className="container mx-auto py-14 px-5 xl:px-20">
        <h1 className="text-center text-6xl font-cubano mb-14">🤖 Automation</h1>
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
              <InlineCode
                href="https://docs.chain.link/chainlink-automation/reference/automation-interfaces#automationcompatibleinterface"
                text="AutomationCompatibleInterface"
              />
            </>,
            <>
              The <ExternalLink href="https://docs.chain.link/chainlink-automation/log-trigger" text="log trigger" />{" "}
              requires your target contract be compatible with{" "}
              <InlineCode
                href="https://docs.chain.link/chainlink-automation/reference/automation-interfaces#ilogautomation"
                text="IlogAutomation"
              />
            </>,
          ]}
          gettingStarted={[
            <>Decide which trigger fits best for your use case</>,
            <>
              Import the appropriate interface and <InlineCode text="override" /> the <InlineCode text="checkUpkeep" />{" "}
              and <InlineCode text="performUpkeep" /> functions inhereted from the interface
            </>,

            <>
              Register a new upkeep with chainlink by providing your target contract address and depositing{" "}
              <InlineCode text="LINK" /> tokens <ExternalLinkButton href="https://automation.chain.link/sepolia/new" />
            </>,
          ]}
        />
      </div>
    </div>
  );
};

export default AutomationPage;
