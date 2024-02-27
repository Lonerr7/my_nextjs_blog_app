import { FC } from 'react';

interface Props {
  children: string;
}

const TextBetweenLines: FC<Props> = ({ children }) => {
  return (
    <div className="flex items-center justify-center mb-6">
      <span className="block w-[43%] bg-neutral-300 h-[1px] dark:bg-neutral-500"></span>
      <p className="relative bg-center mx-auto max-w-[100px]">{children}</p>
      <span className="block w-[43%] bg-neutral-300 h-[1px] dark:bg-neutral-500"></span>
    </div>
  );
};

export default TextBetweenLines;
