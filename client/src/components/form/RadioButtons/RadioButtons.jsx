import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './RadioButtons.scss';

const RadioButtons = ({
  values,
  initialSelectedIndex,
  onSelected,
  disabledIndices,
  label,
  isDisabled,
  localStorageKey,
}) => {
  useEffect(() => {
    if (localStorageKey !== undefined) {
      const storedString = localStorage.getItem(localStorageKey);
      if (storedString === null) {
        if (initialSelectedIndex !== undefined) {
          onSelected(values[initialSelectedIndex]);
        } else {
          onSelected(values[0]);
        }
      } else {
        if (initialSelectedIndex !== undefined) {
          onSelected(values[parseInt(storedString)]);
          setSelectedIndex(parseInt(storedString));
        }
      }
    } else if (initialSelectedIndex !== undefined) {
      onSelected(values[initialSelectedIndex]);
    } else {
      onSelected(values[0]);
    }
  }, []);

  const [selectedIndex, setSelectedIndex] = useState(
    initialSelectedIndex === undefined ? 0 : initialSelectedIndex,
  );

  return (
    <div className={`${isDisabled ? 'radio-input-disabled-container' : ''}`}>
      {label !== undefined ? <p className="radio-input-title">{label}</p> : <></>}
      <div style={{ display: 'flex', alignItems: 'flex-start' }} className={'radio-buttons'}>
        <form action="">
          {values.map((value, index) => {
            let isDisabledValue = false;
            if (disabledIndices !== undefined) isDisabledValue = disabledIndices?.includes(index);
            if (isDisabled === true) isDisabledValue = true;
            return (
              <>
                <label
                  className={'form-control' + (isDisabledValue ? ' form-control-disabled' : '')}
                  key={value}
                  id={value}
                >
                  <input
                    type="radio"
                    name="radio"
                    defaultChecked={initialSelectedIndex === index ? true : false}
                    onClick={() => {
                      onSelected(value, index);
                      setSelectedIndex(index);
                      if (localStorageKey) {
                        localStorage.setItem(localStorageKey, JSON.stringify(index));
                      }
                    }}
                    disabled={isDisabledValue}
                    checked={selectedIndex === index}
                  />
                  {value}
                </label>
              </>
            );
          })}
        </form>
      </div>
    </div>
  );
};

RadioButtons.propTypes = {
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  initialSelectedIndex: PropTypes.number.isRequired,
  onSelected: PropTypes.func,
  disabledIndices: PropTypes.arrayOf(PropTypes.number),
  label: PropTypes.string,
  isDisabled: PropTypes.bool,
  localStorageKey: PropTypes.string,
};

export { RadioButtons };
