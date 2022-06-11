import React from 'react';
import PropTypes from 'prop-types';

const ExecProfile = () => {
  return <div className="exec-container"></div>;
};

ExecProfile.propTypes = {
  name: PropTypes.string,
  role: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string, // use this for the name e.g. import "NAME"
};

export { ExecProfile };
