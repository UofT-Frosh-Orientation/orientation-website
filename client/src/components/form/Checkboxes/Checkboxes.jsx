import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Checkboxes.scss';

const Checkboxes = ({
  values,
  initialSelectedIndices,
  onSelected,
  disabledIndices,
  maxCanSelect,
  label,
  localStorageKey,
}) => {
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

  return (
    <>
      {label !== undefined ? <p className="checkbox-input-title">{label}</p> : <></>}
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        <form action="">
          {values.map((value, index) => {
            let isDisabled = false;
            if (disabledIndices !== undefined) isDisabled = disabledIndices.includes(index);
            let allDisabled = isAllDisabled && !selectedIndices.includes(index);
            return (
              <label
                className={
                  'form-control' + (isDisabled || allDisabled ? ' form-control-disabled' : '')
                }
                key={value}
                id={value}
              >
                <input
                  type="checkbox"
                  name="checkbox"
                  defaultChecked={
                    initialSelectedIndices === undefined
                      ? false
                      : initialSelectedIndices.includes(index)
                  }
                  checked={selectedIndices.includes(index)}
                  onClick={() => {
                    if (selectedIndices.includes(index)) {
                      let selectedIndicesCopy = [
                        ...selectedIndices.filter((valIndex) => index !== valIndex),
                      ];
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
                      // console.log(selectedIndicesCopy);
                      // console.log(value, index);
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
                  }}
                  disabled={isDisabled || allDisabled}
                />
                {value}
              </label>
            );
          })}
        </form>
      </div>
    </>
  );
};

Checkboxes.propTypes = {
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  initialSelectedIndices: PropTypes.arrayOf(PropTypes.number),
  onSelected: PropTypes.func,
  disabledIndices: PropTypes.arrayOf(PropTypes.number),
  maxCanSelect: PropTypes.number,
  label: PropTypes.string,
  localStorageKey: PropTypes.string,
};

export { Checkboxes };
