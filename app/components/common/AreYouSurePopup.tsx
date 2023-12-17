import { ImCross } from 'react-icons/im';

interface Props {
  popupPhrase: string;
}

const AreYouSurePopup: React.FC<Props> = ({ popupPhrase }) => {
  return (
    <div className="absolute">
      <button className="absolute">
        <ImCross size={24} />
      </button>
      <p>Are you sure you want to {popupPhrase}</p>

      <div>
        <button>Yes</button>
        <button>No</button>
      </div>
    </div>
  );
};

export default AreYouSurePopup;
