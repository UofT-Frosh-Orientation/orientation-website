import React from 'react';
import PropTypes from 'prop-types';

const HeaderSection = ({ children }) => (
  <div className={'section-title-container'}>
    <div className={'section-title'}>{children}</div>
  </div>
);

HeaderSection.propTypes = {
  children: PropTypes.node,
};
