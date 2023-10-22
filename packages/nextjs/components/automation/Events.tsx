import { useEffect, useState } from "react";
import { Spinner } from "~~/components/assets/Spinner";
import { useScaffoldEventHistory, useScaffoldEventSubscriber } from "~~/hooks/scaffold-eth/";

type Event = {
  timestamp: bigint | undefined;
  counter: bigint | undefined;
};

export const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useScaffoldEventSubscriber({
    contractName: "AutomationConsumer",
    eventName: "UpkeepPerformed",
    listener: logs => {
      logs.forEach(log => {
        const { timestamp, counter } = log.args;
        console.log("📡 UpkeepPerformed event", timestamp, counter);
        if (timestamp && counter) {
          setEvents(events => [...events, { timestamp, counter }]);
        }
      });
    },
  });

  const { data: eventsData, isLoading: isLoadingEvents } = useScaffoldEventHistory({
    contractName: "AutomationConsumer",
    eventName: "UpkeepPerformed",
    fromBlock: 31231n,
  });

  useEffect(() => {
    if (!events?.length && !!eventsData?.length && !isLoadingEvents) {
      setEvents(
        eventsData.map(({ args }) => ({
          timestamp: args.timestamp,
          counter: args.counter,
        })) || [],
      );
    }
  }, [events.length, eventsData, isLoadingEvents]);

  console.log("events", events);

  return (
    <div className="bg-base-200 h-[350px] rounded-xl">
      {!eventsData || isLoadingEvents ? (
        <div className="w-full h-full flex flex-col justify-center items-center">
          <Spinner width="75" height="75" />
        </div>
      ) : (
        <div className="overflow-x-auto overflow-y-auto h-full hide-scrollbar ">
          <table className="table">
            <thead className="text-lg">
              <tr className="border-b border-neutral-500">
                <th>Timestamp</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody className="text-lg">
              {events.map((event, idx) => (
                <tr key={idx} className="border-b border-neutral-500">
                  <td>{new Date(Number(event.timestamp) * 1000).toLocaleTimeString()}</td>
                  <td>{event?.counter?.toString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
