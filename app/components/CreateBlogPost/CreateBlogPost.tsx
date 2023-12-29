// 'use client';

import { quillConfig } from '@/configs/quillConfig';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageInputWithDrag from '../common/ImageInputWithDrag';
import SubmitLoadingBtn from '../common/SubmitLoadingBtn';

interface Props {
  imageFile: File | undefined;
  inputRef: React.RefObject<HTMLInputElement>;
  quillRef: React.MutableRefObject<any>;
  textValue: string;
  isBlogpostCreating: boolean;
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  setTextValue: React.Dispatch<React.SetStateAction<string>>;
  handleCreateBlogpost: () => Promise<void>;
}

const CreateBlogPost: React.FC<Props> = ({
  imageFile,
  inputRef,
  quillRef,
  textValue,
  isBlogpostCreating,
  setFile,
  setTextValue,
  handleCreateBlogpost,
}) => {
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
          className="mb-8"
          ref={quillRef}
          theme="snow"
          value={textValue}
          onChange={setTextValue}
          modules={quillConfig}
        />
        <SubmitLoadingBtn
          customClassName="!w-[20%]"
          type="button"
          btnText="Create Blogpost"
          loadingText="Creating"
          isFetching={isBlogpostCreating}
          handleSubmit={handleCreateBlogpost}
        />
      </div>
    </div>
  );
};

export default CreateBlogPost;
