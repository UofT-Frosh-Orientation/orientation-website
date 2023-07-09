import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({ type, label, onClick, isSecondary, isDisabled, style, class_options }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      style={style}
      className={
        `button ${isSecondary ? 'button-secondary' : ''} ${isDisabled ? 'button-disabled' : ''} ` +
        class_options
      }
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(['submit', 'button', 'reset', 'menu']).isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onClick: PropTypes.func,
  isSecondary: PropTypes.bool,
  isDisabled: PropTypes.bool,
  style: PropTypes.object,
  class_options: PropTypes.string,
};

Button.defaultProps = {
  type: 'button',
};

export { Button };
