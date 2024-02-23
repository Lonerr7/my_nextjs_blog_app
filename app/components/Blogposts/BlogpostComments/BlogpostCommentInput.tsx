'use client';

import { createBlogpostComment } from '@/actions/createBlogpostComment';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

interface Props {
  blogpostId: string;
}

const BlogpostCommentInput: React.FC<Props> = ({ blogpostId }) => {
  const [text, setText] = useState('');

  const clientAction = async () => {
    const bindedAction = createBlogpostComment.bind(null, { blogpostId, text });

    const { errMessage } = await bindedAction();

    if (!errMessage) {
      toast.success('Successfully created a comment!');
      setText('');
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
