'use client';

import { quillConfig } from '@/configs/quillConfig';
import { useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import s from './page.module.css';
import ImageInputWithDrag from '../common/ImageInputWithDrag';

const CreateBlogPost = () => {
  const [value, setValue] = useState('');
  const [imageFile, setFile] = useState<File>();
  const inputRef = useRef<HTMLInputElement>(null);
  const quillRef = useRef<any>(null);

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

      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={setValue}
        modules={quillConfig}
      />

      <div
        className={s.page}
        dangerouslySetInnerHTML={{ __html: value || '' }}
      ></div>
    </div>
  );
};

export default CreateBlogPost;
