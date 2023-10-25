type Props = {
  text: string;
  href?: string;
};

export const InlineCode: React.FC<Props> = ({ text, href }) => {
  const content = (
    <code className="bg-[#2F487A] text-neutral-200 border border-[#274072] py-0 px-1 rounded-md">{text}</code>
  );

  return href ? (
    <a target="_blank" rel="noopener noreferrer" href={href}>
      {content}
    </a>
  ) : (
    content
  );
};
