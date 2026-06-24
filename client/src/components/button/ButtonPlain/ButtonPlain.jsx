import React from 'react';
import PropTypes from 'prop-types';
import './ButtonPlain.scss';

const ButtonPlain = ({ label, sub, onClick, isSecondary, isDisabled, style, className }) => {
  return (
    <div
      style={style}
      onClick={onClick}
      className={`button-plain ${isSecondary ? 'button-plain-secondary' : ''} ${
        isDisabled ? 'button-plain-disabled' : ''
      } ${className}`}
    >
      <div className="text-container">
        <h1>{label}</h1>
        <h2>{sub}</h2>
      </div>
    </div>
  );
};

ButtonPlain.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  sub: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onClick: PropTypes.func,
  isSecondary: PropTypes.bool,
  isDisabled: PropTypes.bool,
  style: PropTypes.object,
  className: PropTypes.string,
};

export { ButtonPlain };
