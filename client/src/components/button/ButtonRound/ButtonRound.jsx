import React from 'react';
import PropTypes from 'prop-types';
import './ButtonRound.scss';

const ButtonRound = ({ type, label, onClick, isSecondary, isDisabled, style, className }) => {
  return (
    <button
      type={type}
      style={style}
      onClick={onClick}
      className={`button-round ${isSecondary ? 'button-round-secondary' : ''} ${
        isDisabled ? 'button-round-disabled' : ''
      } ${className}`}
    >
      {label}
    </button>
  );
};

ButtonRound.propTypes = {
  type: PropTypes.oneOf(['submit', 'button', 'reset', 'menu']),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  onClick: PropTypes.func,
  isSecondary: PropTypes.bool,
  isDisabled: PropTypes.bool,
  style: PropTypes.object,
  className: PropTypes.string,
};

ButtonRound.defaultProps = {
  type: 'button',
};

export { ButtonRound };
