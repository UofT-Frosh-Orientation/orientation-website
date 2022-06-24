import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './PopupModal.scss';
import XMark from '../../assets/misc/xmark-solid-white.svg';

const PopupModal = ({
  trigger,
  setTrigger,
  heading,
  children,
  bgWidth,
  bgHeight,
  bgHeightMobile,
  containerTop,
  exitIcon,
  blurBackground,
}) => {
  return (
    <>
      <div className="popup-modal-desktop">
        <PopupModalDesktop
          trigger={trigger}
          setTrigger={setTrigger}
          heading={heading}
          bgWidth={bgWidth}
          bgHeight={bgHeight}
          bgHeightMobile={bgHeightMobile}
          containerTop={containerTop}
          exitIcon={exitIcon}
          blurBackground={blurBackground}
        >
          {children}
        </PopupModalDesktop>
      </div>
      <div className="popup-modal-mobile">
        <PopupModalMobile
          trigger={trigger}
          setTrigger={setTrigger}
          heading={heading}
          bgWidth={bgWidth}
          bgHeightMobile={bgHeightMobile}
          containerTop={containerTop}
          exitIcon={exitIcon}
          blurBackground={blurBackground}
        >
          {children}
        </PopupModalMobile>
      </div>
    </>
  );
};

const PopupModalDesktop = ({
  trigger,
  setTrigger,
  heading,
  children,
  bgWidth,
  bgHeight,
  containerTop,
  exitIcon,
  blurBackground,
}) => {
  return (
    <div
      className="popup-background-container"
      style={{ width: `${bgWidth}`, height: `${bgHeight}` }}
    >
      {trigger ? (
        blurBackground ? (
          <div
            className="popup-background-show-blur"
            onClick={() => {
              setTrigger(false);
            }}
            style={{ height: `${bgHeight}` }}
          ></div>
        ) : (
          <div
            className="popup-background-show"
            onClick={() => {
              setTrigger(false);
            }}
            style={{ height: `${bgHeight}` }}
          ></div>
        )
      ) : blurBackground ? (
        <div className="popup-background-hide-blur" style={{ height: `${bgHeight}` }}></div>
      ) : (
        <div className="popup-background-hide" style={{ height: `${bgHeight}` }}></div>
      )}

      {trigger ? (
        <div className={'popup-container-show'} style={{ top: `${containerTop}` }}>
          <PopupModalContents
            trigger={trigger}
            setTrigger={setTrigger}
            exitIcon={exitIcon}
            heading={heading}
          >
            {children}
          </PopupModalContents>
        </div>
      ) : (
        <div className={'popup-container-hide'} style={{ top: `${containerTop}` }}>
          <PopupModalContents
            trigger={trigger}
            setTrigger={setTrigger}
            exitIcon={exitIcon}
            heading={heading}
          >
            {children}
          </PopupModalContents>
        </div>
      )}
    </div>
  );
};

const PopupModalMobile = ({
  trigger,
  setTrigger,
  heading,
  children,
  bgHeightMobile,
  bgWidth,
  containerTop,
  exitIcon,
  blurBackground,
}) => {
  return (
    <div
      className="popup-background-container"
      style={{ width: `${bgWidth}`, height: `${bgHeightMobile}` }}
    >
      {/* background displays */}
      {trigger ? (
        blurBackground ? (
          <div
            className="popup-background-show-blur"
            onClick={() => {
              setTrigger(false);
            }}
            style={{ height: `${bgHeightMobile}` }}
          ></div>
        ) : (
          <div
            className="popup-background-show"
            onClick={() => {
              setTrigger(false);
            }}
            style={{ height: `${bgHeightMobile}` }}
          ></div>
        )
      ) : blurBackground ? (
        <div className="popup-background-hide-blur" style={{ height: `${bgHeightMobile}` }}></div>
      ) : (
        <div className="popup-background-hide" style={{ height: `${bgHeightMobile}` }}></div>
      )}

      {trigger ? (
        <div className={'popup-container-show'} style={{ top: `${containerTop}` }}>
          <PopupModalContents
            trigger={trigger}
            setTrigger={setTrigger}
            exitIcon={exitIcon}
            heading={heading}
          >
            {children}
          </PopupModalContents>
        </div>
      ) : (
        <div className={'popup-container-hide'} style={{ top: `${containerTop}` }}>
          <PopupModalContents
            trigger={trigger}
            setTrigger={setTrigger}
            exitIcon={exitIcon}
            heading={heading}
          >
            {children}
          </PopupModalContents>
        </div>
      )}
    </div>
  );
};

const PopupModalContents = ({ trigger, setTrigger, exitIcon, heading, children }) => {
  return (
    <>
      {exitIcon ? (
        <img
          className="popup-x-mark"
          src={XMark}
          alt="x-mark"
          onClick={() => {
            setTrigger(false);
          }}
        ></img>
      ) : (
        <></>
      )}
      {heading !== undefined ? (
        <div className="popup-modal-header-container">
          {' '}
          <h2 className="popup-modal-heading">{heading}</h2>{' '}
        </div>
      ) : (
        <></>
      )}
      <div className="popup-modal-children">{children}</div>
    </>
  );
};

const allprops = {
  trigger: PropTypes.bool, // this is state var
  setTrigger: PropTypes.func, // setState func

  heading: PropTypes.string,
  children: PropTypes.node, // stuff to put inside the container

  // this is the page height and width
  bgWidth: PropTypes.string,
  bgHeight: PropTypes.string, // this is for login page
  bgHeightMobile: PropTypes.string,

  containerTop: PropTypes.string, // distance from the top of the screen

  exitIcon: PropTypes.bool, // display the 'x' mark
  blurBackground: PropTypes.bool,
};

const defaultprops = {
  bgWidth: '100vw',
  bgHeight: '100vh',

  containerTop: '50vh',
  exitIcon: true,
  blurBackground: true,

  bgHeightMobile: '100vh',
  heading: undefined,
};

PopupModal.propTypes = allprops;
PopupModalMobile.propTypes = allprops;
PopupModalDesktop.propTypes = allprops;
PopupModalContents.propTypes = allprops;

PopupModal.propTypes = defaultprops;
PopupModalDesktop.defaultProps = defaultprops;
PopupModalMobile.defaultProps = defaultprops;
PopupModalContents.defaultProps = defaultprops;

export { PopupModal };
