import { IUser } from '@/types/userTypes';
import { BlogpostSm } from './BlogpostSm';
import { ISmBlogpost } from '@/types/blogTypes';

interface Props {
  knownOwner?: IUser;
  mySessionId: string;
  noTitle?: boolean;
  blogposts?: ISmBlogpost[];
  blurredUrls: (string | undefined)[] | null;
}

const Blogposts: React.FC<Props> = ({
  knownOwner,
  mySessionId,
  noTitle,
  blogposts,
  blurredUrls,
}) => {
  return (
    <div>
      {noTitle || (
        <h2 className="text-[24px] font-bold leading-7 mb-8">
          Latest blogposts
        </h2>
      )}

      <ul className="grid grid-cols-3 gap-5 lg:grid-cols-2 xsm:!grid-cols-1">
        {blogposts
          ? blogposts.map((blogpost, i) => (
              <BlogpostSm
                key={blogpost._id}
                blogpost={blogpost}
                blurredDataUrl={blurredUrls && blurredUrls[i]}
                owner={knownOwner ? knownOwner : blogpost.owner}
                mySessionId={mySessionId}
                isMine={
                  knownOwner?._id === mySessionId
                    ? true
                    : mySessionId
                    ? mySessionId === blogpost.owner._id
                    : false
                }
              />
            ))
          : null}
      </ul>
    </div>
  );
};

export default Blogposts;
