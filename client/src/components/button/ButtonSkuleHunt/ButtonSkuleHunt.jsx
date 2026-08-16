import React from 'react';
import PropTypes from 'prop-types';
import './ButtonSkuleHunt.scss';

const ButtonSkuleHunt = ({ label, sub, onClick, isSecondary, isDisabled, style, className }) => {
  return (
    <div
      style={style}
      onClick={onClick}
      className={`button-skule-hunt ${isSecondary ? 'button-skule-hunt-secondary' : ''} ${
        isDisabled ? 'button-skule-hunt-disabled' : ''
      } ${className}`}
    >
      <div className="text-container">
        <h1>{label}</h1>
        <h2>{sub}</h2>
      </div>
    </div>
  );
};

ButtonSkuleHunt.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  sub: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onClick: PropTypes.func,
  isSecondary: PropTypes.bool,
  isDisabled: PropTypes.bool,
  style: PropTypes.object,
  className: PropTypes.string,
};

export { ButtonSkuleHunt };
