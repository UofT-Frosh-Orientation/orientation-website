import React from 'react';
import PropTypes from 'prop-types';
import './RadioButtons.scss';

const RadioButtons = ({ values, initialSelectedIndex, onSelected }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
      <form action="">
        {values.map((value, index) => {
          return (
            <label className="form-control" key={value} id={value}>
              <input
                type="radio"
                name="radio"
                defaultChecked={initialSelectedIndex === index ? true : false}
                onClick={() => {
                  onSelected(value);
                }}
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
};

export { RadioButtons };
