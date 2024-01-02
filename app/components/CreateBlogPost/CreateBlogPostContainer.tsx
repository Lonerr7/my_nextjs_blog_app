'use client';

import { createBlogpost } from '@/services/blogServices';
import { useSession } from 'next-auth/react';
import { convertBase64 } from '@/utils/convertToBase64';
import { toast } from 'react-hot-toast';
import { useRef, useState } from 'react';
import CreateBlogPost from './CreateBlogPost';
import { BlogpostOption, BlogpostTags } from '@/types/blogTypes';
import { useRouter } from 'next/navigation';

const selectOptions: Array<BlogpostOption> = Object.entries(BlogpostTags).map(
  (value) => ({
    label: value[1],
    value: value[1],
  })
);

const CreateBlogPostContainer = () => {
  const { data } = useSession();
  const router = useRouter();
  const [textValue, setTextValue] = useState('');
  const [imageFile, setFile] = useState<File>();
  const [tag, setTag] = useState<BlogpostTags | ''>('');
  const [isBlogpostCreating, setIsBlogpostCreating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const quillRef = useRef<any>(null);

  const handleSelectChange = (newValue: BlogpostOption) => {
    if (newValue?.value) {
      setTag(newValue?.value);
    } else {
      setTag('');
    }
  };

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
        tag,
        text: textValue,
      },
    });

    if (response && response?.errMsg) {
      toast.error(response.errMsg);
    } else {
      toast.success(response.success);
      router.push('/my-page');
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
      selectOptions={selectOptions}
      selectValue={tag}
      setFile={setFile}
      setTextValue={setTextValue}
      handleCreateBlogpost={handleCreateBlogpost}
      handleSelectChange={handleSelectChange}
    />
  );
};

export default CreateBlogPostContainer;
