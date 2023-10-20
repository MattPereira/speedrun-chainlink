import { useState } from "react";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import { ResultsTable } from "./ResultsTable";
import { LoaderIcon } from "react-hot-toast";
import { Spinner } from "~~/components/assets/Spinner";
import { ExternalLinkButton } from "~~/components/common";
import { Address } from "~~/components/scaffold-eth";
import { TxnNotification } from "~~/hooks/scaffold-eth";
import {
  useScaffoldContract,
  useScaffoldContractRead,
  useScaffoldContractWrite,
  useScaffoldEventHistory,
  useScaffoldEventSubscriber,
} from "~~/hooks/scaffold-eth/";
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
  }, [waitingForVRF]);

  const handleSpinClick = async () => {
    try {
      setPointerVisibility("hidden");
      setIsTxPending(true);
      await spinWheel();
    } catch (e) {
      setIsTxPending(false);
    }
  };

  const { data: vrfConsumerContract } = useScaffoldContract({ contractName: "VRFConsumer" });

  const { data: linkBalance } = useScaffoldContractRead({
    contractName: "VRFConsumer",
    functionName: "getLinkBalance",
  });

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
        console.log("LOG", log);
        if (!mustSpin) {
          setIsTxPending(false);
          setPrizeNumber(Number(randomValue));
          setMustSpin(true);
        }
        setPointerVisibility("visible");
        notification.success(<TxnNotification message="VRF delivered" blockExplorerLink={log.transactionHash} />, {
          duration: 20000,
        });
        // handle the results table
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
    <div className="">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="flex flex-col">
          <div className="flex flex-col justify-center gap-2 items-center mb-5">
            <div className="flex items-center gap-4">
              <h3 className="text-2xl md:text-3xl mb-0 font-bold">VRFConsumer</h3>
              <ExternalLinkButton href="https://github.com/MattPereira/speedrun-chainlink/blob/main/packages/hardhat/contracts/VRFConsumer.sol" />
            </div>

            <div className="badge badge-warning">{linkBalance?.toString()} LINK</div>

            <div>
              <Address size="xl" address={vrfConsumerContract?.address} />
            </div>
          </div>
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
          <div className={`flex justify-center ${isTxPending ? "animate-spin" : ""}`}>
            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              data={wheelOptions}
              spinDuration={1}
              onStopSpinning={() => setMustSpin(false)}
              pointerProps={{ style: { visibility: pointerVisibility } }}
            />
          </div>

          <div className="flex justify-center mt-1">
            <button
              disabled={isTxPending || waitingForVRF}
              className="btn btn-accent text-primary text-lg px-14 "
              onClick={handleSpinClick}
            >
              {isTxPending || waitingForVRF ? <LoaderIcon className="animate-spin h-5 w-5" /> : "Spin"}
            </button>
          </div>
        </div>
      </div>
    </div>
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
