import { ReactNode } from "react";

interface InformationSectionProps {
  summary: ReactNode;
  details: ReactNode[];
  gettingStarted: ReactNode[];
}

export const InformationSection: React.FC<InformationSectionProps> = ({ summary, details, gettingStarted }) => {
  return (
    <div className="collapse collapse-plus bg-base-200 border border border-base-200 p-4">
      <input type="radio" name="my-accordion-1" />
      <div className="collapse-title text-3xl font-bold">Getting Started</div>
      <div className="collapse-content">
        <div className="mb-10">
          <p className="text-xl">{summary}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          <div>
            <h3 className="text-2xl font-bold">Steps</h3>
            <ol className="text-xl list-decimal list-inside">
              {gettingStarted.map((step, index) => (
                <li key={index} className="mb-1">
                  {step}
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="text-2xl font-bold">Details</h3>
            <ul className="text-xl list-disc list-inside">
              {details.map((detail, index) => (
                <li key={index} className="mb-1 text-xl">
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
