'use client';

import { createBlogpost } from '@/services/blogServices';
import { useSession } from 'next-auth/react';
import { convertBase64 } from '@/utils/convertToBase64';
import { toast } from 'react-hot-toast';
import { useRef, useState } from 'react';
import CreateBlogPost from './CreateBlogPost';
import { SelectOption, BlogpostTags } from '@/types/blogTypes';
import { useRouter } from 'next/navigation';
import { selectOptions } from '@/configs/selectConfig';

const CreateBlogPostContainer = () => {
  const { data } = useSession();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [textValue, setTextValue] = useState('');
  const [imageFile, setFile] = useState<File>();
  const [tag, setTag] = useState<BlogpostTags | ''>('');
  const [isBlogpostCreating, setIsBlogpostCreating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const quillRef = useRef<any>(null);

  const handleSelectChange = (newValue: SelectOption) => {
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
        title,
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
      title={title}
      setFile={setFile}
      setTextValue={setTextValue}
      handleCreateBlogpost={handleCreateBlogpost}
      handleSelectChange={handleSelectChange}
      setTitle={setTitle}
    />
  );
};

export default CreateBlogPostContainer;
