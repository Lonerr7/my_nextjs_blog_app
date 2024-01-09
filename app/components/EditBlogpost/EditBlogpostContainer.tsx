'use client';

import { IBlogPost } from '@/types/blogTypes';
import { useRef, useState } from 'react';
import EditBlogpost from './EditBlogpost';

interface Props {
  blogpost: IBlogPost;
}

const EditBlogpostContainer: React.FC<Props> = ({ blogpost }) => {
  const [blogpostFields, setBlogpostFeilds] = useState({
    title: blogpost.title,
    tag: blogpost.tag,
    image: blogpost.image.imageUrl,
    text: blogpost.text,
  });
  const [imageFile, setImageFile] = useState<File>();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const quillRef = useRef<any>(null);

  console.log(blogpostFields);

  return (
    <EditBlogpost
      blogpostFields={blogpostFields}
      imageInputRef={imageInputRef}
      quillRef={quillRef}
      imageFile={imageFile}
      setImageFile={setImageFile}
    />
  );
};

export default EditBlogpostContainer;
