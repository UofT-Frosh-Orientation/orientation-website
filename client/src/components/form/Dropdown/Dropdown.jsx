import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import './Dropdown.scss';
import { useWrapperRef } from '../../../hooks/useWrapperRef';

const Dropdown = ({ values, onSelect, label, isDisabled, initialSelectedIndex }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useWrapperRef(() => setIsOpen(false));
  const [selected, setSelected] = useState(
    initialSelectedIndex == undefined ? values[0] : values[initialSelectedIndex],
  );

  const dropdownItems = values.map((value, index) => (
    <div
      className={'dropdown-item'}
      onClick={() => {
        onSelect(value);
        setSelected(value);
        setIsOpen(false);
      }}
      key={`dropdownItem-${value}`}
    >
      {value}
    </div>
  ));

  return (
    <>
      <div className={'dropdown-header'}>{label}</div>
      <div className={'dropdown-container'} ref={wrapperRef}>
        <div
          onClick={() => !isDisabled && setIsOpen(!isOpen)}
          className={`dropdown-selected${isDisabled ? '-disabled' : ''}`}
        >
          <div className={'dropdown-selected-label'}>{selected}</div>
          <div className={`dropdown-image${isOpen ? ' open' : ''}`}>
            <img alt={'arrow'} src={'../../../assets/icons/angle-down-solid.svg'} />
          </div>
        </div>
        {isOpen && <div className={'dropdown-list-container'}>{dropdownItems}</div>}
      </div>
    </>
  );
};

Dropdown.propTypes = {
  values: PropTypes.arrayOf(PropTypes.string),
  onSelect: PropTypes.func,
  label: PropTypes.string,
  initialSelectedIndex: PropTypes.number,
  isDisabled: PropTypes.bool,
};

export { Dropdown };
