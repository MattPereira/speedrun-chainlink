type Props = {
  text: string;
  href?: string;
};

export const InlineCode: React.FC<Props> = ({ text, href }) => {
  const content = (
    <code className="bg-[#273F66] text-neutral-100 border border-base-200 py-0.5 px-1 rounded-md">{text}</code>
  );

  return href ? (
    <a target="_blank" rel="noopener noreferrer" href={href}>
      {content}
    </a>
  ) : (
    content
  );
};
