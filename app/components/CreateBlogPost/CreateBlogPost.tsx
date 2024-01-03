import { quillConfig } from '@/configs/quillConfig';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageInputWithDrag from '../common/ImageInputWithDrag';
import SubmitLoadingBtn from '../common/SubmitLoadingBtn';
import { BlogpostOption, BlogpostTags } from '@/types/blogTypes';
import CustomSelect from '../common/CustomSelect';

interface Props {
  imageFile: File | undefined;
  inputRef: React.RefObject<HTMLInputElement>;
  quillRef: React.MutableRefObject<any>;
  textValue: string;
  isBlogpostCreating: boolean;
  selectOptions: Array<BlogpostOption>;
  selectValue: BlogpostTags | '';
  title: string;
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  setTextValue: React.Dispatch<React.SetStateAction<string>>;
  handleCreateBlogpost: () => Promise<void>;
  handleSelectChange: any;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}

const CreateBlogPost: React.FC<Props> = ({
  imageFile,
  inputRef,
  quillRef,
  textValue,
  isBlogpostCreating,
  selectOptions,
  selectValue,
  title,
  setFile,
  setTextValue,
  handleCreateBlogpost,
  setTitle,
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
        <form
          className="w-full"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <label htmlFor="title" id="title" />
          <input
            className="w-full mb-4 px-2 py-2"
            type="text"
            id="title"
            placeholder="Enter blogpost title"
            maxLength={125}
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
        </form>

        <CustomSelect
          selectOptions={selectOptions}
          selectValue={selectValue}
          classNamePrefix="blogpost"
          className="mb-5"
          placeholder="Select blogpost tag..."
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
