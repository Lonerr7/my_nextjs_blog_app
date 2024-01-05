import { addBlurredDataUrls } from '@/utils/getBase64';
import { IUser } from '@/types/userTypes';
import { BlogpostSm } from './BlogpostSm';
import { getBlogposts } from '@/services/blogServices';

interface Props {
  myselfOwner?: IUser;
  mySessionId?: string;
}

const Blogposts: React.FC<Props> = async ({ myselfOwner, mySessionId }) => {
  const { blogs: blogposts, errMsg } = await getBlogposts(myselfOwner?._id, {});

  if (errMsg) {
    return <p>Error: {errMsg}</p>;
  }

  console.log(blogposts);
  

  const blurredUrls = await addBlurredDataUrls(
    blogposts && blogposts.map((blogpost) => blogpost.image.imageUrl)
  );

  return (
    <div>
      <h2 className="text-[24px] font-bold leading-7 mb-8">Latest blogposts</h2>
      <ul className="grid grid-cols-3 gap-5">
        {blogposts
          ? blogposts.map((blogpost, i) => (
              <BlogpostSm
                key={blogpost._id}
                blogpost={blogpost}
                blurredDataUrl={blurredUrls && blurredUrls[i]}
                owner={myselfOwner ? myselfOwner : blogpost.owner}
                isMine={myselfOwner ? true : mySessionId === blogpost.owner._id}
              />
            ))
          : null}
      </ul>
    </div>
  );
};

export default Blogposts;
