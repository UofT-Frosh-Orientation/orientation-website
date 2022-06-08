import { React } from 'react';
import PropTypes from 'prop-types';
import './ButtonSelector.scss';
import { ButtonOutlined } from '../../button/ButtonOutlined/ButtonOutlined';

const ButtonSelector = ({ buttonList, activeIndex, setActiveIndex }) => {
  function setActiveButton(index) {
    setActiveIndex(index);
  }

  const buttonItems = buttonList.map((item, index) => (
    <ButtonOutlined
      key={index}
      onClick={() => setActiveButton(index)}
      label={item.name}
      style={{ backgroundColor: `${item.buttonColor}` }}
      isSecondary={index == activeIndex ? false : true}
    ></ButtonOutlined>
  ));

  return <div>{buttonItems}</div>;
};

ButtonSelector.propTypes = {
  buttonList: PropTypes.array.isRequired,
  activeIndex: PropTypes.number.isRequired,
  setActiveIndex: PropTypes.func.isRequired,
};

export { ButtonSelector };
