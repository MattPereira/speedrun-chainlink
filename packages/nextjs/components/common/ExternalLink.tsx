interface ExternalLinkProps {
  href: string;
  text: string;
}

export const ExternalLink: React.FC<ExternalLinkProps> = ({ href, text }) => {
  return (
    <a href={href} className="link link-accent no-underline hover:underline" target="_blank" rel="noopener noreferrer">
      {text}
    </a>
  );
};
