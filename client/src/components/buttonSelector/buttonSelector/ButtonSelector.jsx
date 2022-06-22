import { React } from 'react';
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
}) => {
  function setActiveButton(index) {
    setActiveIndex(index);
  }

  const buttonItems = buttonList.map((item, index) => (
    <ButtonOutlined
      key={index}
      onClick={() => setActiveButton(index)}
      label={item.name}
      style={{
        backgroundColor: `${item.buttonColor}`,
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: maxWidthButton,
        ...style,
      }}
      className={classNameButton}
      isSecondary={index == activeIndex ? false : true}
    ></ButtonOutlined>
  ));

  return <div className={`button-selector-items ${classNameSelector}`}>{buttonItems}</div>;
};

ButtonSelector.propTypes = {
  buttonList: PropTypes.array.isRequired,
  activeIndex: PropTypes.number.isRequired,
  setActiveIndex: PropTypes.func.isRequired,
  maxWidthButton: PropTypes.number,
  style: PropTypes.object,
  classNameButton: PropTypes.string,
  classNameSelector: PropTypes.string,
};

export { ButtonSelector };
