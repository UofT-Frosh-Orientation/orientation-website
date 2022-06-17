import { React, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './ButtonSelector.scss';
import { ButtonOutlined } from '../../button/ButtonOutlined/ButtonOutlined';

const ButtonSelector = ({
  buttonList,
  activeIndex,
  setActiveIndex,
  maxWidthButton,
  style,
  classNameButton,
  classNameSelector,
  scroll,
}) => {
  function setActiveButton(index) {
    setActiveIndex(index);
  }

  const [scrollStatus, setScrollStatus] = useState(true);

  useEffect(() => {
    setScrollStatus(scroll);
  }, [scroll]);

  const buttonItems = buttonList.map((item, index) => (
    <ButtonOutlined
      key={index}
      onClick={() => setActiveButton(index)}
      label={item.name}
      style={{
        backgroundColor: `${item.buttonColor}`,
        maxWidth: maxWidthButton,
        ...style,
      }}
      className={classNameButton}
      isSecondary={index == activeIndex ? false : true}
    ></ButtonOutlined>
  ));

  return (
    <div
      className={`button-selector-items ${classNameSelector}`}
      style={{
        overflowX: scrollStatus ? '' : 'auto',
        whiteSpace: scrollStatus ? '' : 'nowrap',
      }}
    >
      <span>{buttonItems}</span>
    </div>
  );
};

ButtonSelector.propTypes = {
  buttonList: PropTypes.array.isRequired,
  activeIndex: PropTypes.number.isRequired,
  setActiveIndex: PropTypes.func.isRequired,
  maxWidthButton: PropTypes.number,
  style: PropTypes.object,
  classNameButton: PropTypes.string,
  classNameSelector: PropTypes.string,
  scroll: PropTypes.bool,
};

export { ButtonSelector };
