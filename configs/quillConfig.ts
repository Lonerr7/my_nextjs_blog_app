const toolbarOptions = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote'],
  ['link'],
];

export const imageHandler = async (quillRef: React.MutableRefObject<any>) => {
  const input = document.createElement('input');

  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.click();
  input.onchange = async () => {
    const file: any = input && input.files ? input.files[0] : null;
    const formData = new FormData();
    formData.append('file', file);
    console.log(file);

    let quillObj = quillRef?.current?.getEditor();
    const range = quillObj.getSelection();
    quillObj.getEditor().insertEmbed(range?.index, 'image', file);
  };
};

export const quillConfig = {
  toolbar: {
    container: toolbarOptions,
    // handlers: {
    //   image: () => {
    //     imageHandler(quillRef);
    //   },
    // },
  },
};
