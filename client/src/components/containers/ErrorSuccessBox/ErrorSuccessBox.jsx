import React from 'react';
import PropTypes from 'prop-types';
import './ErrorSuccessBox.scss';

const ErrorSuccessBox = ({ content, success, error }) => {
  if (content === '' || content === undefined) {
    return <></>;
  }
  return (
    <div
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
};

export { ErrorSuccessBox };
