import { useEffect, useState } from "react";
import { Spinner } from "~~/components/assets/Spinner";
import { useScaffoldEventHistory, useScaffoldEventSubscriber } from "~~/hooks/scaffold-eth/";

type EventData = {
  timestamp: bigint | undefined;
  blockNumber: bigint;
  counter: bigint | undefined;
};

export const Events = () => {
  const [events, setEvents] = useState<EventData[]>([]);

  useScaffoldEventSubscriber({
    contractName: "AutomationConsumer",
    eventName: "UpkeepPerformed",
    listener: logs => {
      logs.forEach(log => {
        console.log("LOG", log);
        const { timestamp, counter } = log.args;

        const blockNumber = log.blockNumber;
        if (timestamp && counter && blockNumber) {
          setEvents(prevEvents => {
            const updatedEvents = [...prevEvents, { timestamp, blockNumber, counter }];
            // Sort the events array based on the timestamp
            return updatedEvents.sort((a: EventData, b: EventData) => {
              if (a.timestamp && b.timestamp) {
                return a.timestamp > b.timestamp ? -1 : a.timestamp < b.timestamp ? 1 : 0;
              }
              return 0;
            });
          });
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
        eventsData.map(({ args, log }) => {
          return {
            timestamp: args.timestamp,
            blockNumber: log.blockNumber,
            counter: args.counter,
          };
        }) || [],
      );
    }
  }, [events.length, eventsData, isLoadingEvents]);

  // console.log("eventsData", eventsData);

  return (
    <section className="grow bg-base-200 rounded-xl h-[350px]">
      <div className="h-full">
        {!eventsData || isLoadingEvents ? (
          <div className="w-full h-full flex flex-col justify-center items-center">
            <Spinner width="75" height="75" />
          </div>
        ) : (
          <div className="overflow-x-auto overflow-y-auto h-full hide-scrollbar ">
            <table className="table table-pin-rows">
              <thead className="text-lg">
                <tr className="bg-neutral-700 rounded-xl">
                  <th>Timestamp</th>
                  <th>Block</th>
                  <th>Count</th>
                </tr>
              </thead>
              <tbody className="text-lg">
                {events.map((event, idx) => (
                  <tr key={idx} className="border-b border-base-100">
                    <td>{event.timestamp ? new Date(Number(event.timestamp) * 1000).toLocaleTimeString() : "N/A"}</td>
                    <td>{event.blockNumber ? event.blockNumber.toString() : "N/A"}</td>
                    <td>{event.counter ? event?.counter?.toString() : "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};
