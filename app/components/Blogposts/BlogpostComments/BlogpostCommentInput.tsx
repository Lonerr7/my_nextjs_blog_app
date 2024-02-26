'use client';

import { createBlogpostComment } from '@/actions/createBlogpostComment';
import { getBlogpostComments } from '@/services/blogServices';
import { refetchComments } from '@/utils/refetchComments';
import { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'react-hot-toast';

interface Props {
  blogpostId: string;
  pageNumber: number;
  setScrollState: Dispatch<any>;
  setPageNumber: Dispatch<SetStateAction<number>>;
}

const BlogpostCommentInput: React.FC<Props> = ({
  blogpostId,
  pageNumber,
  setScrollState,
  setPageNumber,
}) => {
  const [text, setText] = useState('');

  const clientAction = async () => {
    const bindedAction = createBlogpostComment.bind(null, { blogpostId, text });

    if (!text) {
      toast.error('Please, enter your comment!');
      return;
    }

    const { errMessage } = await bindedAction();

    await refetchComments({
      blogpostId,
      errMessage,
      pageNumber,
      setPageNumber,
      setScrollState,
    });

    setText('');
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
