import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import './Dropdown.scss';
import { useWrapperRef } from '../../../hooks/useWrapperRef';
import Arrow from '../../../../assets/icons/angle-down-solid.svg';
import ArrowDarkMode from '../../../assets/darkmode/icons/angle-down-solid.svg';

const Dropdown = ({
  values,
  onSelect,
  label,
  isDisabled,
  initialSelectedIndex,
  localStorageKey,
  filterLabel,
  maxLetters,
}) => {
  useEffect(() => {
    if (localStorageKey !== undefined) {
      const storedString = localStorage.getItem(localStorageKey);
      if (storedString === null) {
        if (initialSelectedIndex !== undefined) {
          onSelect(values[initialSelectedIndex]);
        } else {
          onSelect(values[0]);
        }
      } else {
        if (initialSelectedIndex !== undefined) {
          onSelect(storedString);
          setSelected(storedString);
        }
      }
    } else if (initialSelectedIndex !== undefined) {
      onSelect(values[initialSelectedIndex]);
    } else {
      onSelect(values[0]);
    }
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useWrapperRef(() => setIsOpen(false));
  const [selected, setSelected] = useState(
    initialSelectedIndex === undefined ? values[0] : values[initialSelectedIndex],
  );

  const dropdownItems = values.map((value, index) => (
    <div
      className={'dropdown-item'}
      onClick={() => {
        onSelect(value);
        setSelected(value);
        if (localStorageKey) {
          localStorage.setItem(localStorageKey, value);
        }
        setIsOpen(false);
      }}
      key={`dropdownItem-${value}`}
    >
      {filterLabel ? filterLabel(value.toString()) : value.toString()}
    </div>
  ));

  return (
    <>
      <div className={`dropdown-header ${isDisabled === true ? 'dropdown-header-disabled' : ''}`}>
        {label}
      </div>
      <div className={'dropdown-container'} ref={wrapperRef}>
        <div
          onClick={() => !isDisabled && setIsOpen(!isOpen)}
          className={`dropdown-selected${isDisabled ? '-disabled' : ''}`}
        >
          <div className={'dropdown-selected-label'}>
            {maxLetters
              ? (filterLabel ? filterLabel(selected.toString()) : selected.toString()).substring(
                  0,
                  maxLetters,
                ) +
                ((filterLabel ? filterLabel(selected.toString()) : selected.toString()).length >
                maxLetters
                  ? '...'
                  : '')
              : filterLabel
              ? filterLabel(selected.toString())
              : selected.toString()}
          </div>
          <div className={`dropdown-image${isOpen ? ' open' : ''}`}>
            <img alt={'arrow'} src={Arrow} className="dropdown-arrow-default" />
            <img alt={'arrow'} src={ArrowDarkMode} className="dropdown-arrow-darkmode" />
          </div>
        </div>
        <div
          className={'dropdown-list-container' + (isOpen ? ' dropdown-list-container-open' : '')}
        >
          {dropdownItems}
        </div>
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
  localStorageKey: PropTypes.string,
  filterLabel: PropTypes.func,
  maxLetters: PropTypes.number,
};

export { Dropdown };
