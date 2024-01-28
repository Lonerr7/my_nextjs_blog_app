import { SelectOption, BlogpostTags } from '@/types/blogTypes';
import Select from 'react-select';

interface Props {
  selectOptions: SelectOption[];
  selectValue: BlogpostTags | '';
  classNamePrefix?: string;
  className?: string;
  placeholder: string;
  onSelectChange: any;
  
}

const CustomSelect: React.FC<Props> = ({
  selectOptions,
  selectValue,
  classNamePrefix,
  className,
  placeholder,
  onSelectChange,
}) => {
  return (
    <Select
      options={selectOptions}
      onChange={onSelectChange}
      classNamePrefix={classNamePrefix}
      isClearable
      defaultInputValue={selectValue}
      className={className}
      placeholder={placeholder}
    />
  );
};

export default CustomSelect;
