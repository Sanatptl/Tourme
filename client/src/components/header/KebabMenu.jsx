import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsisVertical,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';

const KebabMenu = ({ isActive, onClick }) => {
  return (
    <>
      <div className="kebab_menu" onClick={onClick}>
        {isActive ? (
          <FontAwesomeIcon icon={faArrowRight} className="fa_arrow" />
        ) : (
          <FontAwesomeIcon
            icon={faEllipsisVertical}
            className="fa_vertical_dots"
          />
        )}
      </div>
    </>
  );
};

export default KebabMenu;
