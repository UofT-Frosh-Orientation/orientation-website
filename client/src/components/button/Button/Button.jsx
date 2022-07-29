import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({ label, onClick, isSecondary, isDisabled, style, class_options }) => {
  return (
    <div
      onClick={onClick}
      style={style}
      className={
        `button ${isSecondary ? 'button-secondary' : ''} ${isDisabled ? 'button-disabled' : ''} ` +
        class_options
      }
    >
      {label}
    </div>
  );
};

Button.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onClick: PropTypes.func,
  isSecondary: PropTypes.bool,
  isDisabled: PropTypes.bool,
  style: PropTypes.object,
  class_options: PropTypes.object,
};

export { Button };
