import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Snackbar.scss';

const Snackbar = ({ label, closeAfter, isActive }) => {
  /* Make sure that the snackbar is open when its active and closed when its not */
  useEffect(() => {
    if (isActive === true) {
      setClose(false);
    } else {
      setClose(true);
    }
  }, [isActive]);

  const [close, setClose] = useState(true);

  const handleClick = (event) => {
    setClose(true);
  };

  return (
    <div
      className={isActive ? (close ? 'snackbar away' : 'snackbar') : 'snackbar away'}
      style={
        isActive
          ? closeAfter
            ? {
                animation:
                  'goAway 1s cubic-bezier(0.39, 0.58, 0.57, 1) forwards ' + closeAfter + 'ms',
              }
            : {}
          : {}
      }
    >
      <div className="spacer">&#x2716;</div>
      <p type="info" style={{ color: 'white', 'text-align': 'center', margin: 'auto' }}>
        {label}
      </p>
      <div className="close" onClick={handleClick}>
        &#x2716;
      </div>
    </div>
  );
};

Snackbar.propTypes = {
  label: PropTypes.string.isRequired,
  closeAfter: PropTypes.number,
  isActive: PropTypes.bool.isRequired,
};

export { Snackbar };
