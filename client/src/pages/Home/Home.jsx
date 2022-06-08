import React from 'react';
import PropTypes from 'prop-types';
import { getInformation } from './functions';

const PageHome = () => {
  return <div style={{ backgroundColor: 'green', height: '10vh' }}>{getInformation()}</div>;
};

export { PageHome };
