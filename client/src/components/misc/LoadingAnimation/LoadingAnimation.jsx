import React from 'react';
import PropTypes from 'prop-types';
import './LoadingAnimation.scss';

const LoadingAnimation = ({ size }) => {
  if (size == undefined) {
    size = '30px';
  }
  return (
    <div className="loading-animation-container">
      <div className="loading-animation" style={{ width: size, height: size }}></div>
    </div>
  );
};

export default LoadingAnimation;

LoadingAnimation.propTypes = {
  size: PropTypes.string,
};
