'use client';

import { createBlogpostComment } from '@/actions/createBlogpostComment';
import { getBlogpostComments } from '@/services/blogServices';
import { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'react-hot-toast';

interface Props {
  blogpostId: string;
  setScrollState: Dispatch<any>;
  setPageNumber: Dispatch<SetStateAction<number>>;
}

const BlogpostCommentInput: React.FC<Props> = ({
  blogpostId,
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

    if (!errMessage) {
      toast.success('Successfully created a comment!');
      setText('');

      // Manually refetching comments when created a new one

      const { blogpostComments } = await getBlogpostComments({
        blogpostId,
        page: 1,
        searchQuery: '',
      });

      if (blogpostComments) {
        setPageNumber(1);
        setScrollState(blogpostComments);
      }
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
