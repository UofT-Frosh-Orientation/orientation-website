import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './PopupModal.scss';
import XMark from '../../assets/misc/xmark-solid-white.svg';

const PopupModal = ({
  trigger,
  setTrigger,
  showHeading,
  heading,
  children,
  bgWidth,
  bgHeight,
  containerWidth,
  containerTop,
}) => {
  return trigger ? (
    <div className="popup-background-show" style={{ width: `${bgWidth}`, height: `${bgHeight}` }}>
      <div className={'popup-container-show'} style={{ top: `${containerTop}` }}>
        <img
          className="popup-x-mark"
          src={XMark}
          alt="x-mark"
          onClick={() => {
            setTrigger(false);
          }}
        ></img>

        {showHeading ? <h2 className="popup-heading">{heading}</h2> : <></>}
        <div className="popup-children">{children}</div>
      </div>
    </div>
  ) : (
    <div className="popup-background-hide" style={{ width: `${bgWidth}`, height: `${bgHeight}` }}>
      <div className={'popup-container-hide'} style={{ top: `${containerTop}` }}>
        <img
          className="popup-x-mark"
          src={XMark}
          alt="x-mark"
          onClick={() => {
            setTrigger(false);
          }}
        ></img>

        {showHeading ? <h2 className="popup-heading">{heading}</h2> : <></>}
        <div className="popup-children">{children}</div>
      </div>
    </div>
  );
};

PopupModal.propTypes = {
  // trigger for displaying popup
  trigger: PropTypes.bool, // this is state var
  setTrigger: PropTypes.func, // setState func

  showHeading: PropTypes.bool,
  heading: PropTypes.string,
  children: PropTypes.node, // stuff to put inside the container

  // this is the page height and width
  bgWidth: PropTypes.string,
  bgHeight: PropTypes.string, // this is for login page

  containerWidth: PropTypes.string,
  containerTop: PropTypes.string, // distance from the top of the screen
};

PopupModal.defaultProps = {
  bgWidth: '100vw',
  bgHeight: '100vh',

  containerTop: '50vh',
};

export { PopupModal };
