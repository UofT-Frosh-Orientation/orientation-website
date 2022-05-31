import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import './Dropdown.scss';

const useWrapperRef = (onClickOutside) => {
  const ref = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside(event);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
  }, [ref]);
  return ref;
};

const Dropdown = ({ items, onSelect, label, selected, isDisabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useWrapperRef(() => setIsOpen(false));

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
    <div className={'dropdown-container'} ref={wrapperRef}>
      <div className={'dropdown-header'}>{label}</div>
      <div
        onClick={() => !isDisabled && setIsOpen(!isOpen)}
        className={`dropdown-selected${isDisabled ? '-disabled' : ''}`}
      >
        <div className={'dropdown-selected-label'}>{selected.label}</div>
        <div className={`dropdown-image${isOpen ? ' open' : ''}`}>
          <img alt={'arrow'} src={'../../../assets/icons/angle-down-solid.svg'} />
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
