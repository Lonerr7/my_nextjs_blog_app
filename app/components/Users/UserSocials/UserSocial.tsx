import { FC, ReactNode } from 'react';

interface Props {
  href: string;
  Icon: ReactNode;
}

const UserSocial: FC<Props> = ({href, Icon}) => {
  return (
    <li className="mr-2">
      <a
        className="dark:text-white"
        href={href}
        target="_blank"
        rel="noreferrer"
      >
        {Icon}
      </a>
    </li>
  );
};

export default UserSocial;
