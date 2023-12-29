'use client';

import { createBlogpost } from '@/services/blogServices';
import { useSession } from 'next-auth/react';
import { convertBase64 } from '@/utils/convertToBase64';
import { toast } from 'react-hot-toast';
import { useRef, useState } from 'react';
import CreateBlogPost from './CreateBlogPost';

const CreateBlogPostContainer = () => {
  const { data } = useSession();

  const [textValue, setTextValue] = useState('');
  const [imageFile, setFile] = useState<File>();
  const [isBlogpostCreating, setIsBlogpostCreating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const quillRef = useRef<any>(null);

  const handleCreateBlogpost = async () => {
    //  Если нет картинки - выдаем ошибку
    if (!imageFile) {
      toast.error('Please select an image!');
      return;
    }

    setIsBlogpostCreating(true);
    const base64Image = await convertBase64(imageFile);

    const response = await createBlogpost({
      userId: data?.user.id!,
      body: {
        image: base64Image as string,
        tag: 'sports', // ! Нужно указать перечень возможных тегов через селект и забиндить в ts
        text: textValue,
      },
    });

    if (response && response?.errMsg) {
      toast.error(response.errMsg);
    } else {
      toast.success(response.success);
    }

    setIsBlogpostCreating(false);
  };

  return (
    <CreateBlogPost
      imageFile={imageFile}
      inputRef={inputRef}
      quillRef={quillRef}
      textValue={textValue}
      isBlogpostCreating={isBlogpostCreating}
      setFile={setFile}
      setTextValue={setTextValue}
      handleCreateBlogpost={handleCreateBlogpost}
    />
  );
};

export default CreateBlogPostContainer;
