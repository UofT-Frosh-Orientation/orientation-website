import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './Dropdown.scss';

const Dropdown = ({ items, onSelect, label, selected, isDisabled }) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownItems = items.map((item, index) => (
    <div
      className={'dropdown-item'}
      onClick={() => {
        onSelect(item);
        setIsOpen(false);
      }}
      key={`dropdownItem-${index}`}
    >
      {item.label}
    </div>
  ));

  return (
    <div className={'dropdown-container'}>
      <div className={'dropdown-header'}>{label}</div>
      <div
        onClick={() => !isDisabled && setIsOpen(!isOpen)}
        className={`dropdown-selected${isDisabled ? '-disabled' : ''}`}
      >
        <div className={'dropdown-selected-label'}>{selected.label}</div>
        <div className={'dropdown-image'}>
          <img
            alt={'arrow'}
            src={`../../../assets/icons/${isOpen ? 'angle-up-solid.svg' : 'angle-down-solid.svg'}`}
          />
        </div>
      </div>
      {isOpen && <div className={'dropdown-list-container'}>{dropdownItems}</div>}
    </div>
  );
};

Dropdown.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
      isSelected: PropTypes.bool,
    }),
  ),
  onSelect: PropTypes.func,
  label: PropTypes.string,
  selected: PropTypes.object,
  isDisabled: PropTypes.bool,
};

export { Dropdown };
