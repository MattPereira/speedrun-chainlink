import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

interface ExternalLinkProps {
  href: string;
}

export const ExternalLinkButton: React.FC<ExternalLinkProps> = ({ href }) => {
  return (
    <a
      href={href}
      className="bg-primary text-black pb-1 px-1 rounded-lg hover:bg-accent-focus hover:text-white"
      target="_blank"
      rel="noopener noreferrer"
    >
      <ArrowTopRightOnSquareIcon className="h-5 w-5 inline" />
    </a>
  );
};
