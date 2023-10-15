import { useState } from "react";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import { formatUnits } from "viem";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldContract } from "~~/hooks/scaffold-eth/useScaffoldContract";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth/useScaffoldContractRead";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth/useScaffoldContractWrite";
import { useScaffoldEventHistory } from "~~/hooks/scaffold-eth/useScaffoldEventHistory";
import { useScaffoldEventSubscriber } from "~~/hooks/scaffold-eth/useScaffoldEventSubscriber";
import { notification } from "~~/utils/scaffold-eth";

// dynamic import to satisfy nextjs ssr
const Wheel = dynamic(() => import("react-custom-roulette").then(mod => mod.Wheel), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

type Result = {
  spinner: string;
  result: number;
};
/**
 *
 */
export const WheelSpinner = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [isTxPending, setIsTxPending] = useState(false);
  const [results, setResults] = useState<Result[]>([]);
  const [pointerVisibility, setPointerVisibility] = useState<"visible" | "hidden">("hidden");

  const handleSpinClick = async () => {
    try {
      setIsTxPending(true);
      await spinWheel();
    } catch (e) {
      setIsTxPending(false);
    }
  };

  const { data: vrfConsumerContract } = useScaffoldContract({ contractName: "VRFConsumer" });

  const { data: resultsData, isLoading: resultsLoading } = useScaffoldEventHistory({
    contractName: "VRFConsumer",
    eventName: "WheelResult",
    fromBlock: 4491891n,
  });

  useScaffoldEventSubscriber({
    contractName: "VRFConsumer",
    eventName: "WheelResult",
    listener: logs => {
      logs.map(log => {
        const { spinner, result } = log.args;
        // handle the roulette wheel
        if (!mustSpin) {
          setIsTxPending(false);
          setPrizeNumber(Number(result));
          setMustSpin(true);
        }
        setPointerVisibility("visible");
        // handle the results table
        if (spinner && result) {
          setResults(prev => [{ spinner, result: Number(result) }, ...prev]);
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
      notification.loading("Waiting for VRF to deliver");
    },
  });

  const { data: linkBalance } = useScaffoldContractRead({
    contractName: "VRFConsumer",
    functionName: "getLinkBalance",
  });

  useEffect(() => {
    if (!results.length && !!resultsData?.length && !resultsLoading) {
      setResults(
        resultsData?.map(({ args }) => {
          return { spinner: args.spinner!, result: Number(args.result!) };
        }) || [],
      );
    }
  }, [resultsLoading, resultsData, results.length]);

  return (
    <div className="">
      <div className="flex justify-between gap-4 items-center">
        <h3 className="text-2xl md:text-3xl mb-0 font-bold">VRFConsumer</h3>
        <Address size="xl" address={vrfConsumerContract?.address} />
        <p className="text-xl">{formatUnits(linkBalance!, 18)} LINK</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2">
        <div className="p-10 order-2 xl:order-1">
          <div className="h-full w-full bg-base-200 rounded-xl">
            {!resultsData || resultsLoading ? (
              <p>Loading...</p>
            ) : (
              <div className="p-10">
                <div className="overflow-x-auto">
                  <table className="table text-2xl">
                    <thead>
                      <tr className="text-xl">
                        <th>Spinner</th>
                        <th>Result</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.slice(0, 7).map((event, i) => {
                        const { spinner, result } = event;
                        return (
                          <tr key={i}>
                            <td>
                              <Address size="xl" address={spinner} />
                            </td>
                            <td>{data[Number(result)].option}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="p-10 order-1 xl:order-2">
          <div className={`flex justify-center ${isTxPending ? "animate-spin" : ""}`}>
            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              data={data}
              spinDuration={1}
              onStopSpinning={() => setMustSpin(false)}
              pointerProps={{ style: { visibility: pointerVisibility } }}
            />
          </div>

          <div className="flex justify-center mt-5">
            <button className="btn btn-primary text-white text-lg px-14" onClick={handleSpinClick}>
              Spin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const data = [
  { option: "🍌", style: { backgroundColor: "#fef9c3", fontSize: 40 } },
  { option: "🍉", style: { backgroundColor: "#fda4af", fontSize: 40 } },
  { option: "🍇", style: { backgroundColor: "#c084fc", fontSize: 40 } },
  { option: "🫐", style: { backgroundColor: "#60a5fa", fontSize: 40 } },
  { option: "🍓", style: { backgroundColor: "#f43f5e", fontSize: 40 } },
  { option: "🥑", style: { backgroundColor: "#4ade80", fontSize: 40 } },
];
