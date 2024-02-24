import { BlogpostOption, BlogpostTags } from '@/types/blogTypes';

export const selectOptions: Array<BlogpostOption> = Object.entries(
  BlogpostTags
).map((value) => ({
  label: value[1],
  value: value[1],
}));
