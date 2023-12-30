import { quillConfig } from '@/configs/quillConfig';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageInputWithDrag from '../common/ImageInputWithDrag';
import SubmitLoadingBtn from '../common/SubmitLoadingBtn';
import { BlogpostOption, BlogpostTags } from '@/types/blogTypes';
import CustomSelect from '../common/CustomSelect';
import { ActionMeta, SingleValue } from 'react-select';

interface Props {
  imageFile: File | undefined;
  inputRef: React.RefObject<HTMLInputElement>;
  quillRef: React.MutableRefObject<any>;
  textValue: string;
  isBlogpostCreating: boolean;
  selectOptions: Array<BlogpostOption>;
  selectValue: BlogpostTags | '';
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  setTextValue: React.Dispatch<React.SetStateAction<string>>;
  handleCreateBlogpost: () => Promise<void>;
  handleSelectChange: any;
}

const CreateBlogPost: React.FC<Props> = ({
  imageFile,
  inputRef,
  quillRef,
  textValue,
  isBlogpostCreating,
  selectOptions,
  selectValue,
  setFile,
  setTextValue,
  handleCreateBlogpost,
  handleSelectChange,
}) => {
  return (
    <div>
      <div>
        <div>
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
        <CustomSelect
          selectOptions={selectOptions}
          selectValue={selectValue}
          onSelectChange={handleSelectChange}
        />

        <ReactQuill
          className="mb-8"
          ref={quillRef}
          theme="snow"
          value={textValue}
          onChange={setTextValue}
          modules={quillConfig}
        />

        <SubmitLoadingBtn
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
