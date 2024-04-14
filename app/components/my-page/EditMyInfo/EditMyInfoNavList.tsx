'use client';

import { usePathname } from 'next/navigation';
import GoBack from '../../common/GoBack';
import NavListItem from '../../Navigation/NavList/NavListItem';
import s from './EditMyInfoNavList.module.css';

const editMyInfoNavListItems = [
  {
    pathnameValue: '/edit',
    textValue: 'Edit my general info',
  },
  {
    pathnameValue: '/edit/profile-picture',
    textValue: 'Change my profile picture',
  },
  {
    pathnameValue: '/edit/change-password',
    textValue: 'Change password',
  },
  {
    pathnameValue: '/edit/delete-my-profile',
    textValue: 'Delete my profile',
  },
];

interface Props {
  isMenuOpen: boolean;
  closeMenu: () => void;
}

const EditMyInfoNavList: React.FC<Props> = ({ isMenuOpen, closeMenu }) => {
  const pathname = usePathname();

  return (
    <ul
      className={
        isMenuOpen
          ? `fixed ${s.navList} bg-scrolled-header-light dark:bg-scrolled-header-dark`
          : `fixed ${s.closed}`
      }
    >
      {editMyInfoNavListItems.map(({ pathnameValue, textValue }, i) => {
        if (textValue === 'Delete my profile') {
          return (
            <NavListItem
              key={i}
              customClassName="mb-3 last:mb-0"
              customLinkClassName="hover:!text-red-500 hover:opacity-100 dark:text-red-500"
              pathname={pathname}
              pathnameValue={pathnameValue}
              textValue={textValue}
              isOpen={isMenuOpen}
              closeMenu={closeMenu}
              customCLSXClassName="text-red-500 hover:opacity-70"
            />
          );
        }

        return (
          <NavListItem
            key={i}
            customClassName="mb-3 last:mb-0"
            pathname={pathname}
            pathnameValue={pathnameValue}
            textValue={textValue}
            isOpen={isMenuOpen}
            closeMenu={closeMenu}
          />
        );
      })}

      <li>
        <GoBack customClassName="relative" />
      </li>
    </ul>
  );
};

export default EditMyInfoNavList;
