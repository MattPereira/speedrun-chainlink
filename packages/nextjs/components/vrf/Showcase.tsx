import { useState } from "react";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import { ResultsTable } from "./ResultsTable";
import { LoaderIcon } from "react-hot-toast";
import { Spinner } from "~~/components/assets/Spinner";
import { TxnNotification } from "~~/hooks/scaffold-eth";
import { useScaffoldContractWrite, useScaffoldEventHistory, useScaffoldEventSubscriber } from "~~/hooks/scaffold-eth/";
import { notification } from "~~/utils/scaffold-eth";

// dynamic import to satisfy nextjs ssr
const Wheel = dynamic(() => import("react-custom-roulette").then(mod => mod.Wheel), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

type Result = {
  spinner: string;
  randomValue: number;
};
/**
 *
 */
export const Showcase = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [isTxPending, setIsTxPending] = useState(false);
  const [results, setResults] = useState<Result[]>([]);
  const [pointerVisibility, setPointerVisibility] = useState<"visible" | "hidden">("visible");
  const [waitingForVRF, setWaitingForVRF] = useState(false);
  const [notificationId, setNotificationId] = useState<string | null>(null);

  useEffect(() => {
    if (waitingForVRF) {
      const id = notification.loading("Waiting for VRF to deliver");
      setNotificationId(id);
    } else if (notificationId) {
      notification.remove(notificationId);
      setNotificationId(null);
    }
  }, [waitingForVRF, notificationId]);

  const handleSpinClick = async () => {
    try {
      setPointerVisibility("hidden");
      setIsTxPending(true);
      await spinWheel();
    } catch (e) {
      setIsTxPending(false);
    }
  };

  const { data: resultsData, isLoading: resultsLoading } = useScaffoldEventHistory({
    contractName: "VRFConsumer",
    eventName: "WheelResult",
    fromBlock: 4491891n,
  });

  useScaffoldEventSubscriber({
    contractName: "VRFConsumer",
    eventName: "WheelResult",
    listener: logs => {
      console.log("logs", logs);
      logs.map(log => {
        setWaitingForVRF(false);
        const { spinner, randomValue } = log.args;
        if (!mustSpin) {
          setIsTxPending(false);
          setPrizeNumber(Number(randomValue));
          setMustSpin(true);
        }
        setPointerVisibility("visible");
        notification.success(<TxnNotification message="VRF delivered" blockExplorerLink={log.transactionHash} />, {
          duration: 20000,
        });
        // adding new events to the results table
        if (spinner && randomValue) {
          setResults(prev => [{ spinner, randomValue: Number(randomValue) }, ...prev]);
        }
      });
    },
  });

  const { writeAsync: spinWheel } = useScaffoldContractWrite({
    contractName: "VRFConsumer",
    functionName: "spinWheel",
    blockConfirmations: 1,
    onError: () => {
      setIsTxPending(false);
    },
    onBlockConfirmation: () => {
      setWaitingForVRF(true);
    },
  });

  useEffect(() => {
    if (!results.length && !!resultsData?.length && !resultsLoading) {
      setResults(
        resultsData?.map(({ args }) => {
          return { spinner: args.spinner!, randomValue: Number(args.randomValue!) };
        }) || [],
      );
    }
  }, [resultsLoading, resultsData, results.length]);

  return (
    <section>
      <div className="mb-10">
        <p className="text-xl">
          This example sends a request to chainlink VRF when the spin button is clicked. Each request for a random
          number costs LINK that is paid using the Direct Funding method. The chainlink node responds with a huge number
          that is constrained to a number between 0 and 5 using the modulo operator{" "}
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="flex flex-col">
          <div className="bg-base-200 rounded-xl grow">
            {!resultsData || resultsLoading ? (
              <div className="w-full h-full flex flex-col justify-center items-center">
                <Spinner width="75" height="75" />
              </div>
            ) : (
              <ResultsTable results={results} wheelOptions={wheelOptions} />
            )}
          </div>
        </div>
        <div>
          <div className={`flex flex-col justify-center ${isTxPending ? "animate-spin" : ""}`}>
            <div className="flex justify-center">
              <Wheel
                mustStartSpinning={mustSpin}
                prizeNumber={prizeNumber}
                data={wheelOptions}
                spinDuration={1}
                onStopSpinning={() => setMustSpin(false)}
                pointerProps={{ style: { visibility: pointerVisibility } }}
              />
            </div>
            <div className="flex justify-center">
              <button
                disabled={isTxPending || waitingForVRF}
                className="btn btn-accent text-primary text-lg w-44 px-14 "
                onClick={handleSpinClick}
              >
                {isTxPending || waitingForVRF ? <LoaderIcon className="animate-spin h-5 w-5" /> : "Spin"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const wheelOptions = [
  { option: "🍌", style: { backgroundColor: "#fef9c3", fontSize: 40 } },
  { option: "🍉", style: { backgroundColor: "#fda4af", fontSize: 40 } },
  { option: "🍇", style: { backgroundColor: "#c084fc", fontSize: 40 } },
  { option: "🫐", style: { backgroundColor: "#60a5fa", fontSize: 40 } },
  { option: "🍓", style: { backgroundColor: "#f43f5e", fontSize: 40 } },
  { option: "🥑", style: { backgroundColor: "#4ade80", fontSize: 40 } },
];
