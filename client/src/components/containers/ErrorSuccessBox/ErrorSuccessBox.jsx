import React from 'react';
import PropTypes from 'prop-types';
import './ErrorSuccessBox.scss';

const ErrorSuccessBox = ({ content, success, error, style }) => {
  if (content === '' || content === undefined) {
    return <></>;
  }
  return (
    <div
      style={style}
      className={`error-success-box-container ${success ? 'error-success-box-success' : ''} ${
        error ? 'error-success-box-error' : ''
      }`}
    >
      {content}
    </div>
  );
};

ErrorSuccessBox.propTypes = {
  content: PropTypes.string.isRequired,
  success: PropTypes.bool,
  error: PropTypes.bool,
  style: PropTypes.object,
};

export { ErrorSuccessBox };
