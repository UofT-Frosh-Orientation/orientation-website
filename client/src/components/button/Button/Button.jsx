import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({ label, onClick, isSecondary, isDisabled, style }) => {
  return (
    <div
      onClick={onClick}
      className={`button ${isSecondary ? 'button-secondary' : ''} ${
        isDisabled ? 'button-disabled' : ''
      }`}
    >
      {label}
    </div>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  isSecondary: PropTypes.bool,
  isDisabled: PropTypes.bool,
  style: PropTypes.object,
};

export { Button };
