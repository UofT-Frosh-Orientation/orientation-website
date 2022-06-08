import React from 'react';
import PropTypes from 'prop-types';
import './ListBox.scss';

const ListBox = ({ title, label, onClick }) => {
  return (
    <div
      className={'list-box-container' + (onClick ? ' list-box-container-click' : '')}
      onClick={() => onClick(title)}
    >
      <div className="list-box-title">{title}</div>
      <div className="list-box-label">
        <p>{label}</p>
      </div>
    </div>
  );
};

ListBox.propTypes = {
  title: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export { ListBox };
