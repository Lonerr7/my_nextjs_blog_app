import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Header: FC<Props> = ({ children }) => {
  return (
    <header className="py-8">
      <div className="app-container">{children}</div>
    </header>
  );
};

export default Header;
