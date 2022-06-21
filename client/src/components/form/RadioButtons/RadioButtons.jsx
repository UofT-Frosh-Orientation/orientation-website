import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './RadioButtons.scss';

const RadioButtons = ({
  values,
  initialSelectedIndex,
  onSelected,
  disabledIndices,
  label,
  isDisabled,
}) => {
  useEffect(() => {
    if (initialSelectedIndex !== undefined) {
      onSelected(values[initialSelectedIndex]);
    }
  }, []);
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
                    }}
                    disabled={isDisabledValue}
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
};

export { RadioButtons };
