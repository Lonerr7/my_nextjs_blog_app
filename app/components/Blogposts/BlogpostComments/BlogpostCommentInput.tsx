'use client';

import { createBlogpostComment } from '@/actions/createBlogpostComment';
import { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'react-hot-toast';

interface Props {
  blogpostId: string;
  setScrollState: Dispatch<any>;
  setPageNumber: Dispatch<SetStateAction<number>>;
  setFirstItemAdded: Dispatch<SetStateAction<boolean>>;
}

const BlogpostCommentInput: React.FC<Props> = ({
  blogpostId,
  setScrollState,
  setPageNumber,
  setFirstItemAdded,
}) => {
  const [text, setText] = useState('');

  const clientAction = async () => {
    const bindedAction = createBlogpostComment.bind(null, { blogpostId, text });

    const { errMessage } = await bindedAction();

    if (!errMessage) {
      toast.success('Successfully created a comment!');
      setText('');

      // Next 2 lines are needed to refetch all coments when we create a new one so that it appears immideatly
      setScrollState([]);
      setPageNumber(1);
      setFirstItemAdded(true);
    } else {
      toast.error(errMessage);
    }
  };

  return (
    <form className="w-full flex items-center" action={clientAction}>
      <textarea
        className="block w-[75%] h-[75px] resize-none text-sm p-2 mr-4 rounded-md"
        id="text"
        name="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="form-btn !w-[25%] !mb-0" type="submit">
        Send
      </button>
    </form>
  );
};

export default BlogpostCommentInput;
