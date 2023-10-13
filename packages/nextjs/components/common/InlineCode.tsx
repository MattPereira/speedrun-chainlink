type Props = {
  text: string;
};

export const InlineCode: React.FC<Props> = ({ text }) => {
  return <code className="bg-base-100 text-neutral-100 border border-base-300 py-0.5 px-1.5 rounded-md">{text}</code>;
};
