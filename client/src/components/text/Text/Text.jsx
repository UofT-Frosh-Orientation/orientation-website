import React from 'react';
import PropTypes from 'prop-types';
import './Text.scss';

const Text = ({ children, type, style, onClick, href }) => {
  return type === 'link' ? (
    <div onClick={onClick} className={'text-link'}>
      <a className={'text-link'} href={href}>
        {children}
      </a>
    </div>
  ) : (
    <div className={`text-${type}`} style={style}>
      {children}
    </div>
  );
};

Text.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  href: PropTypes.string,
  type: PropTypes.oneOf([
    'paragraph',
    'info',
    'accent',
    'accent-small',
    'accent-secondary',
    'accent-small-secondary',
    'link',
  ]).isRequired,
  style: PropTypes.object,
};

export { Text };
