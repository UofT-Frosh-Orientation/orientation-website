import React from 'react';
import PropTypes from 'prop-types';
import './ButtonBubble.scss';

const ButtonBubble = ({ label, onClick, isSecondary, isDisabled, style }) => {
  return (
    <div
      style={style}
      onClick={onClick}
      className={`button-bubble ${isSecondary ? 'button-bubble-secondary' : ''} ${
        isDisabled ? 'button-bubble-disabled' : ''
      }`}
    >
      {label}
    </div>
  );
};

ButtonBubble.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  isSecondary: PropTypes.bool,
  isDisabled: PropTypes.bool,
  style: PropTypes.object,
};

export { ButtonBubble };
