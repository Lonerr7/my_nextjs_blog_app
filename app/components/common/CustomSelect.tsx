import { BlogpostOption, BlogpostTags } from '@/types/blogTypes';
import Select, { ActionMeta, SingleValue } from 'react-select';

interface Props {
  selectOptions: BlogpostOption[];
  selectValue: BlogpostTags | '';
  onSelectChange: any;
}

const CustomSelect: React.FC<Props> = ({
  selectOptions,
  selectValue,
  onSelectChange,
}) => {
  return (
    <Select
      options={selectOptions}
      onChange={onSelectChange}
      isClearable
      defaultInputValue={selectValue}
    />
  );
};

export default CustomSelect;
