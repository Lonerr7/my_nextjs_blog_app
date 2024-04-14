import clsx from 'clsx';
import Link from 'next/link';

interface Props {
  customClassName?: string;
  customLinkClassName?: string;
  customCLSXClassName?: string;
  textValue: string;
  pathname: string;
  pathnameValue: string;
  isOpen: boolean;
  closeMenu: () => void;
}

const NavListItem: React.FC<Props> = ({
  customClassName,
  customLinkClassName,
  textValue,
  pathname,
  pathnameValue,
  customCLSXClassName,
  isOpen,
  closeMenu,
}) => {
  return (
    <li
      className={customClassName}
      onClick={() => {
        if (isOpen) {
          console.log(`if is Open`);

          closeMenu();
        }
      }}
    >
      <Link
        className={clsx(`link dark:text-white text-light-black ${customLinkClassName}`, {
          [`font-bold ${customCLSXClassName}`]: pathname === pathnameValue,
        })}
        href={pathnameValue}
      >
        {textValue}
      </Link>
    </li>
  );
};

export default NavListItem;
