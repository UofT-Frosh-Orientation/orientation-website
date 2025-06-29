import React from 'react';
import PropTypes from 'prop-types';
import './ButtonRound.scss';

const ButtonRound = ({ label, onClick, isSecondary, isDisabled, style, className }) => {
  return (
    <div
      style={style}
      onClick={onClick}
      className={`button-round ${isSecondary ? 'button-round-secondary' : ''} ${
        isDisabled ? 'button-round-disabled' : ''
      } ${className}`}
    >
      {label}
    </div>
  );
};

ButtonRound.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  onClick: PropTypes.func,
  isSecondary: PropTypes.bool,
  isDisabled: PropTypes.bool,
  style: PropTypes.object,
  className: PropTypes.string,
};

export { ButtonRound };
