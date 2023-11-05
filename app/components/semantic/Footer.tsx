import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Footer: FC<Props> = ({ children }) => {
  return (
    <footer>
      <div className="app-container">{children}</div>
    </footer>
  );
};

export default Footer;
