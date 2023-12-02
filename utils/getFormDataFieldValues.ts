export const getFormDataFieldValues = (formData: FormData, ...fields: string[]) => {
  const mappedInputValues: { [key: string]: FormDataEntryValue | null } = {};

  fields.forEach((fieldName) => {
    mappedInputValues[fieldName] = formData.get(fieldName);
  });

  return mappedInputValues;
};
