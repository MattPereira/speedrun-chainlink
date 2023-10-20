import { Address } from "../scaffold-eth";

interface WheelOption {
  option: string;
  // add other properties as needed
}

interface Result {
  spinner: string;
  randomValue: number;
}

interface ResultsTableProps {
  results: Result[];
  wheelOptions: WheelOption[];
}

export const ResultsTable: React.FC<ResultsTableProps> = ({ results, wheelOptions }) => {
  return (
    <div className="p-10">
      <h5 className="text-2xl text-center font-bold">Recent Spins</h5>

      <div className="overflow-x-auto">
        <table className="table text-2xl">
          <thead>
            <tr className="text-xl">
              <th>Spinner</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {results.slice(0, 5).map((result, i) => {
              const { spinner, randomValue } = result;
              return (
                <tr key={i}>
                  <td>
                    <Address size="xl" address={spinner} />
                  </td>
                  <td>{wheelOptions[Number(randomValue)].option}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
