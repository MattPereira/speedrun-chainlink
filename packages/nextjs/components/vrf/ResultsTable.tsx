import { Address } from "../scaffold-eth";
import { ResultType } from "./Showcase";

interface WheelOption {
  option: string;
}

interface ResultsTableProps {
  results: ResultType[];
  wheelOptions: WheelOption[];
}

export const ResultsTable: React.FC<ResultsTableProps> = ({ results, wheelOptions }) => {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table text-2xl table-pin-rows">
          <thead>
            <tr className="text-lg bg-neutral-700">
              <th>Spinner</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {results.slice(0, 5).map((result, i) => {
              const { spinner, randomValue } = result;
              return (
                <tr key={i} className="border-b border-base-100">
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
