import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

interface ExternalLinkProps {
  href: string;
}

export const ExternalLinkButton: React.FC<ExternalLinkProps> = ({ href }) => {
  return (
    <a
      href={href}
      className="capitalize text-primary hover:underline btn btn-sm bg-accent px-1 rounded-lg hover:bg-accent-focus hover:text-white"
      target="_blank"
      rel="noopener noreferrer"
    >
      <ArrowTopRightOnSquareIcon className="h-4 w-5 inline" />
    </a>
  );
};
