import s from './BurgerBtn.module.css';

interface Props {
  customClassName?: string;
  customBurgerIcon?: React.ReactNode;
  toggleMenuHandler: () => void;
}

const BurgerBtn: React.FC<Props> = ({
  customClassName,
  customBurgerIcon,
  toggleMenuHandler,
}) => {
  return (
    <>
      {customBurgerIcon ? (
        <button className={customClassName} onClick={toggleMenuHandler}>
          {customBurgerIcon}
        </button>
      ) : (
        <button
          className={`${s.btn} dark:after:bg-white dark:before:bg-white ${customClassName}`}
          onClick={toggleMenuHandler}
        >
          <span className="dark:bg-white" />
        </button>
      )}
    </>
  );
};

export default BurgerBtn;
