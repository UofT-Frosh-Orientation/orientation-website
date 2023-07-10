import React, { useState, useRef, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import './Dropdown.scss';
import { useWrapperRef } from '../../../hooks/useWrapperRef';
import Arrow from '../../../../assets/icons/angle-down-solid.svg';
import ArrowDarkMode from '../../../assets/darkmode/icons/angle-down-solid.svg';
import { DarkModeContext } from '../../../util/DarkModeProvider';

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
  const { darkMode, setDarkModeStatus } = useContext(DarkModeContext);

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
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          onSelect(value);
          setSelected(value);
          if (localStorageKey) {
            localStorage.setItem(localStorageKey, value);
          }
          setIsOpen(false);
        }
      }}
      key={`dropdownItem-${value}`}
      tabIndex="0"
    >
      {filterLabel ? filterLabel(value.toString()) : value.toString()}
    </div>
  ));

  return (
    <>
      {label !== undefined ? (
        <div className={`dropdown-header ${isDisabled === true ? 'dropdown-header-disabled' : ''}`}>
          {label}
        </div>
      ) : (
        <></>
      )}
      <div className={'dropdown-container'} ref={wrapperRef}>
        <div
          onClick={() => !isDisabled && setIsOpen(!isOpen)}
          className={`dropdown-selected${isDisabled ? '-disabled' : ''}`}
          tabIndex="0"
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              !isDisabled && setIsOpen(!isOpen);
            }
          }}
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
            {darkMode ? (
              <img alt={'arrow'} src={ArrowDarkMode} className="dropdown-arrow" />
            ) : (
              <img alt={'arrow'} src={Arrow} className="dropdown-arrow" />
            )}
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
