import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Main: FC<Props> = ({ children }) => {
  return (
    <main className="mb-auto">
      <div className="app-container">{children}</div>
    </main>
  );
};

export default Main;
