import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './PopupModal.scss';
import XMark from '../../assets/misc/xmark-solid-white.svg';

const PopupModal = ({
  trigger,
  setTrigger,
  heading,
  children,
  // bgWidth,
  // bgHeight,
  // bgHeightMobile,
  // containerTop,
  bodyText,
  exitIcon,
  blurBackground,
}) => {
  return (
    <div className="popup-modal">
      <div
        className={` popup-modal-background
            ${
              trigger
                ? `popup-modal-background-show ${
                    blurBackground ? 'popup-modal-background-color' : 'popup-modal-background-blur'
                  }`
                : `popup-modal-background-hide ${
                    blurBackground
                      ? 'popup-modal-background-hide-blur'
                      : 'popup-modal-background-hide-color'
                  }`
            }`}
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
};

const defaultprops = {
  exitIcon: true,
  blurBackground: true,
  heading: undefined,
};

// PopupModal.propTypes = allprops;
// PopupModal.propTypes = defaultprops;

export { PopupModal };
