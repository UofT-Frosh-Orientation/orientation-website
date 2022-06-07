import React from 'react';
import PropTypes from 'prop-types';
import './tabs.scss';
import { pages } from './util';

const Tabs = () => {
  return (
    <>
      <div className="Tabs-desktop">
        <TabsDesktop />
      </div>
      <div className="Tabs-mobile">
        <TabsMobile />
      </div>
    </>
  );
};

const TabsDesktop = () => {
  // const location = useLocation();
  const current_page = window.location.pathname;
  const CurrentIndex = getIndex(current_page, pages.tabs, 'path');
  return (
    <div className="main">
      <div className="container center">
        <div className="center relative">
          {pages.tabs.map((tab, index) => {
            {
              var css_class =
                tab.path == pages.tabs[CurrentIndex]['path']
                  ? 'btn nav-btn inline-block active_link'
                  : 'btn nav-btn inline-block non_active_link';
            }
            return (
              <div className={css_class} key={index}>
                <a className="nav-link link center vertical-center " href={tab.path}>
                  <div>{tab.label}</div>
                </a>
              </div>
            );
          })}
        </div>
        <div className="content block">
          {pages.tabs[CurrentIndex]['component']}

          <div className="inline-block footer">
            <div className="btn-left">
              {CurrentIndex > 0 && <Buttons Direction="left" CurrentIndex={CurrentIndex} />}
            </div>
            <div className="btn-right">
              {CurrentIndex < pages.tabs.length - 1 && (
                <Buttons Direction="right" CurrentIndex={CurrentIndex} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TabsMobile = () => {};

const Buttons = ({ Direction, CurrentIndex }) => {
  const NextIndex = nextIndex(CurrentIndex, Direction);
  return (
    <div className="arrow-btn btn inline-block center yellow">
      <a className="arrow-link link center vertical-center" href={pages.tabs[NextIndex]['path']}>
        <div>
          {pages.tabs[NextIndex]['label']}
          <div className="icon_container inline-block">
            {Direction == 'right' && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: 'inherit', height: 'inherit' }}
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            )}
            {Direction == 'left' && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: 'inherit', height: 'inherit' }}
                className="h-1 w-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            )}
          </div>
        </div>
      </a>
    </div>
  );
};

function nextIndex(CurrentIndex, Direction) {
  var NextIndex = 0;
  if (Direction == 'right') {
    NextIndex = CurrentIndex + 1;
  } else {
    NextIndex = CurrentIndex - 1;
  }
  return NextIndex;
}

function getIndex(value, arr, prop) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i][prop] === value) {
      return i;
    }
  }
  return -1; //to handle the case where the value doesn't exist
}

Buttons.propTypes = {
  Direction: PropTypes.string,
  CurrentIndex: PropTypes.number,
};

nextIndex.propTypes = {
  CurrentIndex: PropTypes.number,
  Direction: PropTypes.string,
};

getIndex.propTypes = {
  value: PropTypes.number,
  arr: PropTypes.array,
  prop: PropTypes.string,
};

// Tabs.propTypes = propTypes;
TabsDesktop.propTypes = PropTypes;
TabsMobile.propTypes = PropTypes;

export { TabsDesktop, TabsMobile };
