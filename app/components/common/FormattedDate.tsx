interface Props {
  customClassName?: string;
  date: string;
  locales?: Intl.LocalesArgument;
  options?: Intl.DateTimeFormatOptions | undefined;
}

const FormattedDate: React.FC<Props> = ({
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

export default FormattedDate;
