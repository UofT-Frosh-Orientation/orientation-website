import React from 'react';
import PropTypes from 'prop-types';
import { getInformation } from './functions';

const PageAbout = () => {
  return <div style={{ backgroundColor: 'red', height: '10vh' }}>{getInformation()}</div>;
};

export { PageAbout };
