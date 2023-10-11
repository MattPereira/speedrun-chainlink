import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

interface ExternalLinkProps {
  href: string;
  text: string;
}

export const ExternalLink: React.FC<ExternalLinkProps> = ({ href, text }) => {
  return (
    <a href={href} className="capitalize text-accent hover:underline" target="_blank" rel="noopener noreferrer">
      {text} <ArrowTopRightOnSquareIcon className="h-5 w-5 inline mb-1" />
    </a>
  );
};
