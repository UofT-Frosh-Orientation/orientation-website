import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Checkboxes.scss';

const Checkboxes = ({
  values,
  initialSelectedIndices,
  onSelected,
  disabledIndices,
  disabledValues,
  highlightValues,
  maxCanSelect,
  label,
  localStorageKey,
  filterLabel,
  selectAll,
  setSelectAll,
  autoFocus,
}) => {
  useEffect(() => {
    if (selectAll) {
      if (selectedIndices.length >= values.length) {
        setSelectedIndices([]);
        for (let index = 0; index <= values.length; index++) {
          if (disabledIndices && disabledIndices.includes(index)) continue;
          if (disabledValues && disabledValues.includes(values[index])) continue;
          onSelected(values[index], index, false, []);
        }
      } else {
        const allIndices = [];
        for (let index = 0; index < values.length; index++) {
          if (disabledIndices && disabledIndices.includes(index)) continue;
          if (disabledValues && disabledValues.includes(values[index])) continue;
          allIndices.push(index);
          onSelected(values[index], index, true, allIndices);
        }
        setSelectedIndices(allIndices);
      }
      setSelectAll(false);
    }
  }, [selectAll]);

  useEffect(() => {
    if (localStorageKey !== undefined) {
      try {
        const storedString = localStorage.getItem(localStorageKey);
        if (storedString === null) {
          if (initialSelectedIndices !== undefined) {
            values.map((value, index) => {
              const initialSelectedIndicesCopy = [...initialSelectedIndices];
              onSelected(
                value,
                index,
                initialSelectedIndices.includes(index),
                initialSelectedIndicesCopy,
              );
            });
          }
        } else {
          JSON.parse(storedString).map((value, index) => {
            onSelected(
              value,
              index,
              JSON.parse(storedString).includes(index),
              JSON.parse(storedString),
            );
          });
          setSelectedIndices(JSON.parse(storedString));
        }
      } catch (e) {
        localStorage.setItem(localStorageKey, '[]');
      }
    } else if (initialSelectedIndices !== undefined) {
      values.map((value, index) => {
        const initialSelectedIndicesCopy = [...initialSelectedIndices];
        onSelected(
          value,
          index,
          initialSelectedIndices.includes(index),
          initialSelectedIndicesCopy,
        );
      });
    }
  }, []);

  const [selectedIndices, setSelectedIndices] = useState(
    initialSelectedIndices === undefined ? [] : initialSelectedIndices,
  );
  const [isAllDisabled, setIsAllDisabled] = useState(
    initialSelectedIndices === undefined ? false : initialSelectedIndices.length >= maxCanSelect,
  );

  const onClickedCheckbox = (value, index) => {
    if (selectedIndices.includes(index)) {
      let selectedIndicesCopy = [...selectedIndices.filter((valIndex) => index !== valIndex)];
      setSelectedIndices(selectedIndicesCopy);
      onSelected(value, index, false, selectedIndicesCopy);
      if (isAllDisabled) {
        setIsAllDisabled(false);
      }
      if (localStorageKey) {
        localStorage.setItem(localStorageKey, JSON.stringify(selectedIndicesCopy));
      }
    } else {
      let selectedIndicesCopy = [...selectedIndices];
      selectedIndicesCopy.push(index);
      setSelectedIndices(selectedIndicesCopy);

      onSelected(value, index, true, selectedIndicesCopy);
      if (selectedIndicesCopy.length >= maxCanSelect) {
        setIsAllDisabled(true);
      } else if (isAllDisabled) {
        setIsAllDisabled(false);
      }
      if (localStorageKey) {
        localStorage.setItem(localStorageKey, JSON.stringify(selectedIndicesCopy));
      }
    }
  };

  return (
    <>
      {label !== undefined ? <p className="checkbox-input-title">{label}</p> : <></>}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        {values.map((value, index) => {
          let isDisabled = false;
          let isHighlighted = false;
          if (disabledIndices !== undefined) isDisabled = disabledIndices.includes(index);
          if (disabledValues !== undefined) isDisabled = disabledValues.includes(value);
          if (highlightValues !== undefined) isHighlighted = highlightValues.includes(value);
          let allDisabled = isAllDisabled && !selectedIndices.includes(index);
          return (
            <React.Fragment key={`${label}-${index}-${value}`}>
              <label
                className={
                  'form-control' + (isDisabled || allDisabled ? ' form-control-disabled' : '')
                }
                key={value}
                id={value}
              >
                <input
                  type="checkbox"
                  name={label ?? 'name'}
                  checked={selectedIndices.includes(index)}
                  onChange={() => {
                    onClickedCheckbox(value, index);
                  }}
                  disabled={isDisabled || allDisabled}
                  autoFocus={autoFocus}
                />
                {filterLabel ? filterLabel(value.toString()) : value.toString()}
                {isHighlighted ? <span className="checkbox-highlight">✔</span> : <></>}
              </label>
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};

Checkboxes.propTypes = {
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  initialSelectedIndices: PropTypes.arrayOf(PropTypes.number),
  onSelected: PropTypes.func,
  disabledIndices: PropTypes.arrayOf(PropTypes.number),
  disabledValues: PropTypes.arrayOf(PropTypes.string),
  highlightValues: PropTypes.arrayOf(PropTypes.string),
  maxCanSelect: PropTypes.number,
  label: PropTypes.string,
  localStorageKey: PropTypes.string,
  filterLabel: PropTypes.func,
  selectAll: PropTypes.bool,
  setSelectAll: PropTypes.func,
  autoFocus: PropTypes.bool,
};

export { Checkboxes };
