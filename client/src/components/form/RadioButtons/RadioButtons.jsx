import React from 'react';
import PropTypes from 'prop-types';
import './RadioButtons.scss';

const RadioButtons = ({ values, initialSelectedIndex, onSelected, disabledIndices }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
      <form action="">
        {values.map((value, index) => {
          let isDisabled = disabledIndices.includes(index);
          return (
            <label
              className={'form-control' + (isDisabled ? ' form-control-disabled' : '')}
              key={value}
              id={value}
            >
              <input
                type="radio"
                name="radio"
                defaultChecked={initialSelectedIndex === index ? true : false}
                onClick={() => {
                  onSelected(value);
                }}
                disabled={isDisabled}
              />
              {value}
            </label>
          );
        })}
      </form>
    </div>
  );
};

RadioButtons.propTypes = {
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  initialSelectedIndex: PropTypes.number.isRequired,
  onSelected: PropTypes.func,
  disabledIndices: PropTypes.arrayOf(PropTypes.number),
};

export { RadioButtons };
