'use client';

import { quillConfig } from '@/configs/quillConfig';
import { useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import s from './page.module.css';
import ImageInputWithDrag from '../common/ImageInputWithDrag';
import { createBlogpost } from '@/services/blogServices';
import { useSession } from 'next-auth/react';
import { convertBase64 } from '@/utils/convertToBase64';
import { toast } from 'react-hot-toast';

const CreateBlogPost = () => {
  const { data } = useSession();

  const [textValue, setTextValue] = useState('');
  const [imageFile, setFile] = useState<File>();
  const inputRef = useRef<HTMLInputElement>(null);
  const quillRef = useRef<any>(null);

  const handleCreateBlogpost = async () => {
    //  Если нет картинки - выдаем ошибку
    if (!imageFile) {
      toast.error('Please select an image!');
      return;
    }

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
  };

  return (
    <div>
      <div className="flex justify-center">
        <div className="w-1/2">
          <ImageInputWithDrag
            file={imageFile}
            inputRef={inputRef}
            placeholder="Select or drop here your blogpost image"
            isSubmitBtnDisabled
            setFile={setFile}
          />
        </div>
      </div>

      <div>
        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={textValue}
          onChange={setTextValue}
          modules={quillConfig}
        />
        <button onClick={handleCreateBlogpost}>Create Blogpost</button>
      </div>

      <div
        className={s.page}
        dangerouslySetInnerHTML={{ __html: textValue || '' }}
      ></div>
    </div>
  );
};

export default CreateBlogPost;
