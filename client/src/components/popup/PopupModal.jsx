import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './PopupModal.scss';
import XMark from '../../assets/misc/xmark-solid-white.svg';

const PopupModal = ({
  trigger,
  setTrigger,
  heading,
  children,
  bodyText,
  exitIcon,
  blurBackground,
  style,
}) => {
  const [hasBeenOpened, setHasBeenOpened] = useState(false);

  useEffect(() => {
    if (hasBeenOpened === false && trigger === true) {
      setHasBeenOpened(true);
    }
  }, [trigger]);

  if (hasBeenOpened === false && trigger === false) {
    return <div></div>;
  }

  return (
    <div className="popup-modal" style={style}>
      <div
        className={` popup-modal-background ${
          blurBackground ? 'popup-modal-background-color' : 'popup-modal-background-blur'
        }
            ${trigger ? `popup-modal-background-show` : `popup-modal-background-hide`}`}
        onClick={() => {
          setTrigger(false);
        }}
      ></div>

      <div className={` ${trigger ? 'popup-modal-container-show' : 'popup-modal-container-hide'}`}>
        {exitIcon ? (
          <img
            className="exit-icon-show"
            onClick={() => {
              setTrigger(false);
            }}
            src={XMark}
            alt="close popup"
          />
        ) : (
          <></>
        )}
        {heading !== undefined ? <h2 className="popup-modal-heading">{heading}</h2> : <></>}
        {bodyText !== undefined ? <p className="popup-modal-body-text">{bodyText}</p> : <></>}
        {children}
      </div>
    </div>
  );
};

PopupModal.propTypes = {
  trigger: PropTypes.bool, // this is state var
  setTrigger: PropTypes.func, // setState func

  heading: PropTypes.string,
  bodyText: PropTypes.string,
  children: PropTypes.node, // stuff to put inside the container

  exitIcon: PropTypes.bool, // display the 'x' mark
  blurBackground: PropTypes.bool,
  style: PropTypes.object,
};

PopupModal.defaultProps = {
  exitIcon: true,
  blurBackground: true,
  heading: undefined,
  bodyText: undefined,
};

export { PopupModal };
