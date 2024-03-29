'use client';

import { BlogpostTags, IBlogPost, SelectOption } from '@/types/blogTypes';
import { useRef, useState } from 'react';
import EditBlogpost from './EditBlogpost';
import { updateMyBlogpost } from '@/actions/updateMyBlogpost';
import { convertBase64 } from '@/utils/convertToBase64';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface Props {
  blogpost: IBlogPost;
}

const EditBlogpostContainer: React.FC<Props> = ({ blogpost }) => {
  const [blogpostFields, setBlogpostFeilds] = useState({
    title: blogpost.title,
    tag: blogpost.tag,
    text: blogpost.text,
  });
  const [imageFile, setImageFile] = useState<File>();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const quillRef = useRef<any>(null);
  const router = useRouter();

  const handleSelectChange = (newValue: SelectOption) => {
    if (newValue?.value) {
      setBlogpostFeilds((prevState) => ({
        ...prevState,
        tag: newValue?.value,
      }));
    } else {
      setBlogpostFeilds((prevState) => ({
        ...prevState,
        tag: '' as BlogpostTags,
      }));
    }
  };

  const clientAction = async () => {
    // 1. Получаем base64 версию картинки если она есть
    let base64Image: any = undefined;

    if (imageFile) {
      base64Image = await convertBase64(imageFile);
    }

    // 2. Биндим аргументы в серверный экшен
    const bindnedAction = updateMyBlogpost.bind(null, blogpost._id, {
      title: blogpostFields.title,
      tag: blogpostFields.tag,
      text: blogpostFields.text,
      image: base64Image || undefined,
    });

    const actionResponse = await bindnedAction();

    if (actionResponse?.errMsg) {
      toast.error(actionResponse.errMsg);
      return;
    }

    toast.success('Successfully updated blogpost!');
    router.back();
  };

  return (
    <EditBlogpost
      blogpostFields={blogpostFields}
      imageInputRef={imageInputRef}
      quillRef={quillRef}
      imageFile={imageFile}
      setImageFile={setImageFile}
      setBlogpostFeilds={setBlogpostFeilds}
      clientAction={clientAction}
      handleSelectChange={handleSelectChange}
    />
  );
};

export default EditBlogpostContainer;
