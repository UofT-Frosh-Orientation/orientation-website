import React from 'react';
import PropTypes from 'prop-types';
import './ButtonOutlined.scss';

const ButtonOutlined = ({ label, onClick, isSecondary, isDisabled, style }) => {
  return (
    <div
      style={style}
      onClick={onClick}
      className={`button-outlined ${isSecondary ? 'button-outlined-secondary' : ''} ${
        isDisabled ? 'button-outlined-disabled' : ''
      }`}
    >
      {label}
    </div>
  );
};

ButtonOutlined.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  isSecondary: PropTypes.bool,
  isDisabled: PropTypes.bool,
  style: PropTypes.object,
};

export { ButtonOutlined };
