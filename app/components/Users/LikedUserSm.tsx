import { ILikedUser } from '@/types/blogTypes';
import NextImageVithViewer from './NextImageVithViewer';
import Link from 'next/link';

interface Props {
  user: ILikedUser;
  isMine: boolean;
}

const LikedUserSm: React.FC<Props> = ({ user, isMine }) => {
  console.log(user);

  return (
    <li className="w-full flex justify-between items-center mb-4 last:mb-0">
      <div className="flex items-center">
        <Link href={isMine ? '/my-page' : `/users/${user._id}`}>
          <NextImageVithViewer
            imageUrl={user?.image?.imageUrl}
            alt="avatar"
            sizes="100px"
            small
            customClassName="!min-w-[50px] !min-h-[50px] max-w-[50px] max-h-[50px] mr-3"
          />
        </Link>
        <div>
          <Link href={isMine ? '/my-page' : `/users/${user._id}`}>
            <p className="mb-1 font-semibold">{user.username}</p>
          </Link>
          <p className="text-sm">{user.status}</p>
        </div>
      </div>

      <button>Subscribe</button>
    </li>
  );
};

export default LikedUserSm;
