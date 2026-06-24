import React from 'react';
import PropTypes from 'prop-types';
import './ButtonOutlined.scss';

const ButtonOutlined = ({ label, sub, onClick, isSecondary, isDisabled, style, className }) => {
  return (
    <div
      style={style}
      onClick={onClick}
      className={`button-outlined ${isSecondary ? 'button-outlined-secondary' : ''} ${
        isDisabled ? 'button-outlined-disabled' : ''
      } ${className}`}
    >
      <div className="text-container">
        <h1>{label}</h1>
        <h2>{sub}</h2>
      </div>
    </div>
  );
};

ButtonOutlined.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  sub: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onClick: PropTypes.func,
  isSecondary: PropTypes.bool,
  isDisabled: PropTypes.bool,
  style: PropTypes.object,
  className: PropTypes.string,
};

export { ButtonOutlined };
