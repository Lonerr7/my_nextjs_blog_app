import s from './BurgerBtn.module.css';

interface Props {
  customClassName?: string;
  toggleMenuHandler: () => void;
}

const BurgerBtn: React.FC<Props> = ({ customClassName, toggleMenuHandler }) => {
  return (
    <button
      className={`${s.btn} dark:after:bg-white dark:before:bg-white ${customClassName}` }
      onClick={toggleMenuHandler}
    >
      <span className='dark:bg-white' />
    </button>
  );
};

export default BurgerBtn;
