import React from 'react';
import PropTypes from 'prop-types';
import { getInformation } from './functions';

const PageFAQ = () => {
  return <div style={{ backgroundColor: 'blue', height: '10vh' }}>{getInformation()}</div>;
};

export { PageFAQ };
