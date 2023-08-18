import PropTypes from 'prop-types';
import './ApproveDenyCheckbox.scss';

import GrayCheck from '../../assets/misc/check-solid-gray.svg';
import WhiteCheck from '../../assets/misc/check-solid-white.svg';

const ApproveDenyCheckbox = ({
  style,
  approve,
  deny,
  setApprove,
  setDeny,
  pointerEvents,
  setChangesMade,
}) => {
  return (
    <div className="approve-deny-checkbox-container" style={style}>
      {/* approve check checkbox */}
      <div
        onClick={() => {
          setChangesMade(true);
          if (deny === true) {
            setDeny(false);
            setApprove(true);
          } else {
            setApprove(false);
            setDeny(true);
          }
        }}
        className={`approve-deny-checkbox ${
          approve ? 'approve-green-check' : 'approve-gray-checkbox'
        }`}
        style={pointerEvents}
      >
        <img
          className="approve-icon"
          src={`${approve ? WhiteCheck : GrayCheck}`}
          alt="approval check"
        />
      </div>
    </div>
  );
};

ApproveDenyCheckbox.propTypes = {
  style: PropTypes.object,
  approve: PropTypes.bool,
  deny: PropTypes.bool,
  setApprove: PropTypes.func,
  setDeny: PropTypes.func,
  pointerEvents: PropTypes.object,
  setChangesMade: PropTypes.func,
};

export { ApproveDenyCheckbox };
