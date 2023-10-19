import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

type LatestRoundData = [bigint, bigint, bigint, bigint];

export const Showcase = () => {
  const { data: latestRoundData } = useScaffoldContractRead({
    contractName: "AutomationConsumer",
    functionName: "getLatestRoundData",
  });

  let roundId, answer, startedAt, updatedAt;

  if (latestRoundData) {
    [roundId, answer, startedAt, updatedAt] = latestRoundData as unknown as LatestRoundData;
  }

  return (
    <div className="bg-base-100 rounded-xl mb-10">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="p-10">
          <h4 className="text-center text-xl font-bold">latestRoundData</h4>
          <div className="overflow-x-auto">
            <table className="table bg-base-200">
              <tbody>
                <tr>
                  <th>roundId</th>
                  <td>{roundId?.toString()}</td>
                </tr>
                <tr>
                  <th>answer</th>
                  <td>{answer?.toString()}</td>
                </tr>
                <tr>
                  <th>startedAt</th>
                  <td>{startedAt?.toString()}</td>
                </tr>
                <tr>
                  <th>updatedAt</th>
                  <td>{updatedAt?.toString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="p-10">
          <h3 className="text-center">Betting Interface</h3>
        </div>
      </div>
    </div>
  );
};
