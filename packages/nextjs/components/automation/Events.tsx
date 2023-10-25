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
        if (timestamp && counter) {
          setEvents(prevEvents => {
            const updatedEvents = [...prevEvents, { timestamp, counter }];

            // Sort the updatedEvents array based on the timestamp
            return updatedEvents.sort((a: Event, b: Event) => {
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
        eventsData.map(({ args }) => ({
          timestamp: args.timestamp,
          counter: args.counter,
        })) || [],
      );
    }
  }, [events.length, eventsData, isLoadingEvents]);

  console.log("events", events);

  return (
    <section className="mb-5 grow bg-base-200 rounded-xl">
      <div className="">
        {!eventsData || isLoadingEvents ? (
          <div className="w-full h-full flex flex-col justify-center items-center">
            <Spinner width="75" height="75" />
          </div>
        ) : (
          <div className="overflow-x-auto overflow-y-auto h-full hide-scrollbar ">
            <table className="table">
              <thead className="text-lg">
                <tr className="border-b border-base-100">
                  <th>Timestamp</th>
                  <th>Block #</th>
                  <th>Count</th>
                </tr>
              </thead>
              <tbody className="text-lg">
                {events.map((event, idx) => (
                  <tr key={idx} className="border-b border-base-100">
                    <td>{event.timestamp ? new Date(Number(event.timestamp) * 1000).toLocaleTimeString() : "N/A"}</td>
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
