interface Props {
  customClassName?: string;
  date: string;
  locales?: Intl.LocalesArgument;
  options?: Intl.DateTimeFormatOptions | undefined;
}

const BlogpostDate: React.FC<Props> = ({
  customClassName,
  date,
  locales,
  options,
}) => {
  return (
    <p className={customClassName}>
      {new Date(date).toLocaleDateString(locales, options)}
    </p>
  );
};

export default BlogpostDate;
