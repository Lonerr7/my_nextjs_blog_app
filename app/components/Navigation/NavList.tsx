import Link from 'next/link';
import { FC } from 'react';

const NavList: FC = () => {
  return (
    <ul className="w-2/5 flex justify-between text-xl">
      <li className="mr-2">
        <Link href="/">Home</Link>
      </li>
      <li className="mr-2">
        <Link href="/my-page">My Page</Link>
      </li>
      <li className="mr-2">
        <Link href="/blogs">Blogs</Link>
      </li>
      <li>
        <Link href="/create">Create Blog</Link>
      </li>
    </ul>
  );
};

export default NavList;
