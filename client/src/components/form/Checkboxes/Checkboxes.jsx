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
}) => {
  useEffect(() => {
    if (initialSelectedIndices !== undefined) {
      onSelected(initialSelectedIndices);
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
};

export { Checkboxes };
