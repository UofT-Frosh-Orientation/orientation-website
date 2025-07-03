import React from 'react';
import PropTypes from 'prop-types';
import './ButtonText.scss';

const ButtonText = ({ type, label, onClick, isSecondary, isDisabled, style, className }) => {
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

ButtonText.propTypes = {
  type: PropTypes.oneOf(['submit', 'button', 'reset', 'menu']),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  onClick: PropTypes.func,
  isSecondary: PropTypes.bool,
  isDisabled: PropTypes.bool,
  style: PropTypes.object,
  className: PropTypes.string,
};

ButtonText.defaultProps = {
  type: 'button',
};

export { ButtonText };
