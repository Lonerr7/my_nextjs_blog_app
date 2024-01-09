import { BlogpostTags } from '@/types/blogTypes';
import CustomSelect from '../common/CustomSelect';
import { selectOptions } from '@/configs/selectConfig';
import ReactQuill from 'react-quill';
import { quillConfig } from '@/configs/quillConfig';
import 'react-quill/dist/quill.snow.css';
import ImageInputWithDrag from '../common/ImageInputWithDrag';

interface Props {
  blogpostFields: {
    title: string;
    tag: BlogpostTags;
    image: string;
    text: string;
  };
  imageInputRef: React.RefObject<HTMLInputElement>;
  quillRef: React.MutableRefObject<any>;
  imageFile: File | undefined;
  setImageFile: React.Dispatch<React.SetStateAction<File | undefined>>;
}

const EditBlogpost: React.FC<Props> = ({
  blogpostFields: { image, tag, text, title },
  imageInputRef,
  quillRef,
  imageFile,
  setImageFile,
}) => {
  return (
    <div>
      <ImageInputWithDrag
        file={imageFile}
        inputRef={imageInputRef}
        placeholder="Select or drop here your new blogpost image"
        isSubmitBtnDisabled
        setFile={setImageFile}
      />
      <div>
        <form
          className="w-full"
          onSubmit={(e) => {
            e.preventDefault(); //! Возможно придется убрать это, так как будем использовтаь серверный экшен
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
            // onChange={(e) => setTitle(e.currentTarget.value)}
          />
        </form>

        <CustomSelect
          selectOptions={selectOptions}
          selectValue={tag}
          classNamePrefix="blogpost"
          className="mb-5"
          placeholder="Select blogpost tag..."
          onSelectChange={() => {}}
        />

        <ReactQuill
          className="mb-8"
          ref={quillRef}
          theme="snow"
          value={text}
          // onChange={setTextValue}
          modules={quillConfig}
        />
      </div>
    </div>
  );
};

export default EditBlogpost;
