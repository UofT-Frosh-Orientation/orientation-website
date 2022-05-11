import React from 'react';
import PropTypes from 'prop-types';
import './Header.scss';

const Header = ({ children, type }) => {
  return type === 'section' ? (
    <div className={'section-title-container'}>
      <div className={`header-${type}`}>{children}</div>
    </div>
  ) : (
    <div className={`header-${type}`}>{children}</div>
  );
};

Header.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['section', 'paragraph', 'bold', 'fancy']).isRequired,
};

export { Header };
