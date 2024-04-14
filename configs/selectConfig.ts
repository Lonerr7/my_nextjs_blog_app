import { SelectOption, BlogpostTags } from '@/types/blogTypes';

export const selectOptions: Array<SelectOption> = Object.entries(
  BlogpostTags
).map((value) => ({
  label: value[1],
  value: value[1],
}));
