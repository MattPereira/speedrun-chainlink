import { useState } from "react";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import { ResultsTable } from "./ResultsTable";
import { LoaderIcon } from "react-hot-toast";
import { formatEther } from "viem";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { Spinner } from "~~/components/assets/Spinner";
import { ExternalLinkButton } from "~~/components/common";
import { InlineCode } from "~~/components/common";
import { ExternalLink } from "~~/components/common";
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

// dynamic import of roulette wheel package to satisfy nextjs ssr
const Wheel = dynamic(() => import("react-custom-roulette").then(mod => mod.Wheel), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export type ResultType = {
  spinner: string | undefined;
  randomValue: bigint | undefined;
};

export const Showcase = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [results, setResults] = useState<ResultType[]>([]);
  const [pointerVisibility, setPointerVisibility] = useState<"visible" | "hidden">("visible");
  const [waitingForVRF, setWaitingForVRF] = useState(false);
  const [notificationId, setNotificationId] = useState<string | null>(null);

  const { data: vrfConsumerContract } = useScaffoldContract({ contractName: "VRFConsumer" });

  const { data: linkBalance } = useScaffoldContractRead({
    contractName: "VRFConsumer",
    functionName: "getLinkBalance",
  });

  const { writeAsync: spinWheel, isMining } = useScaffoldContractWrite({
    contractName: "VRFConsumer",
    functionName: "spinWheel",
    blockConfirmations: 1,
    onError: () => {
      setWaitingForVRF(false);
    },
    onBlockConfirmation: () => {
      setWaitingForVRF(true);
    },
  });

  const { data: resultsData, isLoading: isResultsLoading } = useScaffoldEventHistory({
    contractName: "VRFConsumer",
    eventName: "WheelResult",
    fromBlock: 4491891n,
  });

  useScaffoldEventSubscriber({
    contractName: "VRFConsumer",
    eventName: "WheelResult",
    listener: logs => {
      logs.map(log => {
        const { spinner, randomValue } = log.args;
        setWaitingForVRF(false);
        setPointerVisibility("visible");
        if (!mustSpin) {
          setPrizeNumber(Number(randomValue));
          setMustSpin(true);
        }
        notification.success(
          <TxnNotification
            message={`VRF Coordinator delivered a ${wheelOptions[Number(randomValue)].option}`}
            blockExplorerLink={log.transactionHash}
          />,
          {
            duration: 20000,
          },
        );
        if (spinner && randomValue) {
          setResults(prev => [{ spinner, randomValue }, ...prev]);
          console.log("here");
        }
      });
    },
  });

  useEffect(() => {
    if (waitingForVRF && !notificationId) {
      const id = notification.loading("Waiting for VRF Coordinator to deliver random number");
      setNotificationId(id);
    } else if (!waitingForVRF && notificationId) {
      notification.remove(notificationId);
      setNotificationId(null);
    }
  }, [waitingForVRF, notificationId]);

  useEffect(() => {
    if (!results.length && !!resultsData?.length && !isResultsLoading) {
      setResults(
        resultsData.map(({ args }) => ({
          spinner: args.spinner,
          randomValue: args.randomValue,
        })) || [],
      );
    }
  }, [isResultsLoading, resultsData, results.length]);

  const handleSpinClick = () => {
    setPointerVisibility("hidden");
    spinWheel();
  };

  return (
    <section>
      <div className="flex flex-wrap justify-center sm:justify-between gap-4 items-center mb-10">
        <div className="flex items-center gap-4">
          <h3 className="text-2xl md:text-4xl mb-0 font-bold">VRFConsumer</h3>
          <ExternalLinkButton href="https://github.com/MattPereira/speedrun-chainlink/blob/main/packages/hardhat/contracts/VRFConsumer.sol" />
        </div>
        <div>
          <Address size="xl" address={vrfConsumerContract?.address} />
        </div>
      </div>
      <div className="mb-10">
        <p className="text-xl">
          Spin the wheel to trigger a request for a random number. Each request costs <InlineCode text="LINK" /> that is
          paid using the <ExternalLink href="https://docs.chain.link/vrf/v2/direct-funding" text="Direct Funding" />{" "}
          method. After the request transaction is mined, the VRF Coordinator waits a minimum of{" "}
          <InlineCode text="requestConfirmations" /> blocks before calling the <InlineCode text="fulfillRandomWords" />{" "}
          function on the VRFConsumer contract.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="flex flex-col">
          <h5 className="text-2xl text-center font-bold mb-3">Spin Events</h5>
          <div className="bg-base-200 rounded-xl grow">
            {!resultsData || isResultsLoading ? (
              <div className="w-full h-full flex flex-col justify-center items-center">
                <Spinner width="75" height="75" />
              </div>
            ) : (
              <ResultsTable results={results} wheelOptions={wheelOptions} />
            )}
          </div>
          <div className="alert bg-neutral-700 mt-5 text-xl">
            <InformationCircleIcon className="stroke-current shrink-0 w-6 h-6" />
            <div>
              <span className="font-bold mr-2">
                {linkBalance ? parseFloat(formatEther(linkBalance)).toFixed(2) : "0.0"} LINK
              </span>
              available in VRFConsumer to pay for requests
            </div>
          </div>
        </div>
        <div>
          <div className={`flex flex-col justify-center`}>
            <div className={`flex justify-center ${waitingForVRF || isMining ? "animate-spin" : ""}`}>
              <Wheel
                mustStartSpinning={mustSpin}
                prizeNumber={prizeNumber}
                data={wheelOptions}
                spinDuration={1}
                onStopSpinning={() => {
                  console.log("stopping spinner"), setMustSpin(false);
                }}
                pointerProps={{ style: { visibility: pointerVisibility } }}
              />
            </div>
            <div className="flex justify-center">
              <button
                disabled={waitingForVRF}
                className="btn btn-primary text-2xl w-44 px-14 mt-2 font-cubano"
                onClick={handleSpinClick}
              >
                {waitingForVRF ? <LoaderIcon className="animate-spin h-5 w-5" /> : "Spin"}
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
