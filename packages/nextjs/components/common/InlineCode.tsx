type Props = {
  text: string;
  href?: string;
};

export const InlineCode: React.FC<Props> = ({ text, href }) => {
  const content = (
    <code className="bg-base-100 border border-base-200 text-accent py-0.5 px-1.5 rounded-md">{text}</code>
  );

  return href ? (
    <a target="_blank" rel="noopener noreferrer" href={href}>
      {content}
    </a>
  ) : (
    content
  );
};
