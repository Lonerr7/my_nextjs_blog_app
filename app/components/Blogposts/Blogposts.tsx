import { IUser } from '@/types/userTypes';
import { BlogpostSm } from './BlogpostSm';
import { IBlogPost } from '@/types/blogTypes';

interface Props {
  knownOwner?: IUser;
  mySessionId?: string;
  noTitle?: boolean;
  blogposts?: IBlogPost[];
  blurredUrls: (string | undefined)[] | null;
}

// TODO: Сделаем контейнерную компоненту (сервеную), где будем делать все соответствтующие запросы, далее прокинем пропсами всю инфу вниз сюда и этот компонент сделаем клиентским. Далее здесь вызовем уже useOptimistic и туда передадим полученные через пропсы блогпосты

const Blogposts: React.FC<Props> = async ({
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
      <ul className="grid grid-cols-3 gap-5">
        {blogposts
          ? blogposts.map((blogpost, i) => (
              <BlogpostSm
                key={blogpost._id}
                blogpost={blogpost}
                blurredDataUrl={blurredUrls && blurredUrls[i]}
                owner={knownOwner ? knownOwner : blogpost.owner}
                isMine={
                  knownOwner?._id === mySessionId
                    ? true
                    : mySessionId === blogpost.owner._id
                }
              />
            ))
          : null}
      </ul>
    </div>
  );
};

export default Blogposts;
