import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth/useScaffoldContractWrite";

// import { useScaffoldEventHistory } from "~~/hooks/scaffold-eth/useScaffoldEventHistory";

/**
 * TODO: Figure out how to show result using eventSubscriber (gotta handle state!)
 * - you gotta combine eventHistory with eventSubscriber to make it work right!
 */
export const ActionPanel = () => {
  // useScaffoldEventSubscriber({
  //     contractName: "YourContract",
  //     eventName: "GreetingChange",
  //     // The listener function is called whenever a GreetingChange event is emitted by the contract.
  //     // Parameters emitted by the event can be destructed using the below example
  //     // for this example: event GreetingChange(address greetingSetter, string newGreeting, bool premium, uint256 value);
  //     listener: (logs) => {
  //       logs.map((log) => {
  //         const { greetingSetter, value, premium, newGreeting } = log.args;
  //         console.log(
  //           "📡 GreetingChange event",
  //           greetingSetter,
  //           value,
  //           premium,
  //           newGreeting
  //         );
  //       });
  //     },
  //   });

  //   const { data: events } = useScaffoldEventHistory({
  //     contractName: "VRFConsumer",
  //     eventName: "RandomNumberReceived",
  //     fromBlock: 4485346n,
  //   });

  const { writeAsync: triggerRequest } = useScaffoldContractWrite({
    contractName: "VRFConsumer",
    functionName: "requestRandomNumber",
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });

  //   console.log("events", events);

  return (
    <div className="bg-base-100 rounded-xl p-10 shadow-lg">
      <div className="flex justify-center items-center mb-10 gap-2">
        <h3 className="text-2xl md:text-3xl text-center font-bold">VRFConsumer</h3>
        <div className="tooltip tooltip-accent" data-tip={`put link to contract here`}>
          <button>
            <InformationCircleIcon className="h-7 w-7" />
          </button>
        </div>
      </div>

      <div className="flex justify-center">
        <button className="btn btn-accent text-base-200 text-lg" onClick={() => triggerRequest()}>
          Request Random
        </button>
      </div>
    </div>
  );
};
