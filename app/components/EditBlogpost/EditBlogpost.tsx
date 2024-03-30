import { BlogpostTags, SelectOption } from '@/types/blogTypes';
import CustomSelect from '../common/CustomSelect';
import { selectOptions } from '@/configs/selectConfig';
import ReactQuill from 'react-quill';
import { quillConfig } from '@/configs/quillConfig';
import 'react-quill/dist/quill.snow.css';
import ImageInputWithDrag from '../common/ImageInputWithDrag';
import FormButton from '../ui/FormButton';

interface Props {
  blogpostFields: {
    title: string;
    tag: BlogpostTags;
    text: string;
  };
  imageInputRef: React.RefObject<HTMLInputElement>;
  quillRef: React.MutableRefObject<any>;
  imageFile: File | undefined;
  setImageFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  setBlogpostFeilds: React.Dispatch<
    React.SetStateAction<{
      title: string;
      tag: BlogpostTags;
      text: string;
    }>
  >;
  clientAction: () => Promise<void>;
  handleSelectChange: (newValue: SelectOption) => void;
}

const EditBlogpost: React.FC<Props> = ({
  blogpostFields: { tag, text, title },
  imageInputRef,
  quillRef,
  imageFile,
  setImageFile,
  setBlogpostFeilds,
  clientAction,
  handleSelectChange,
}) => {
  return (
    <div>
      <ImageInputWithDrag
        customDragClassName="xsm:h-[200px]"
        customPlaceholderClassName="xsm:text-xl"
        file={imageFile}
        inputRef={imageInputRef}
        placeholder="Select or drop here your new blogpost image"
        isSubmitBtnDisabled
        setFile={setImageFile}
      />
      <div>
        <form className="w-full" action={clientAction}>
          <label htmlFor="title" id="title" />
          <input
            className="w-full mb-4 px-2 py-2"
            type="text"
            id="title"
            placeholder="Enter blogpost title"
            maxLength={125}
            value={title}
            onChange={(e) =>
              setBlogpostFeilds((prevState) => ({
                ...prevState,
                title: e.target.value,
              }))
            }
          />

          <CustomSelect
            selectOptions={selectOptions}
            selectValue={tag}
            classNamePrefix="blogpost"
            className="mb-5"
            placeholder="Select blogpost tag..."
            onSelectChange={handleSelectChange}
          />

          <ReactQuill
            className="mb-8"
            ref={quillRef}
            theme="snow"
            value={text}
            onChange={(value) => {
              setBlogpostFeilds((prevState) => ({
                ...prevState,
                text: value,
              }));
            }}
            modules={quillConfig}
          />

          <FormButton
            // customClassName="!w-1/2"
            btnText="Edit blogpost"
            loadingText="Sending"
          />
        </form>
      </div>
    </div>
  );
};

export default EditBlogpost;
