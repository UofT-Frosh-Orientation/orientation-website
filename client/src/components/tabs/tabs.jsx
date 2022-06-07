import React, { useState } from 'react';
import './tabs.scss';
import PropTypes from 'prop-types';

const Tabs = ({ tabs }) => {
  return (
    <div className="Tabs-desktop">
      <TabsDesktop tabs={tabs} />
    </div>
  );
};

const TabsDesktop = ({ tabs }) => {
  // const location = useLocation();
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log(currentIndex);
  return (
    <div className="main">
      <div className="container center">
        <div className="center relative">
          {tabs.map((tab, index) => {
            {
              var css_class =
                index == currentIndex
                  ? 'btn nav-btn inline-block active_link'
                  : 'btn nav-btn inline-block non_active_link';
            }
            return (
              <button
                className={css_class}
                onClick={() => setCurrentIndex(index)}
                type="button"
                key={index}
              >
                <div className="link">{tab.tabTitle}</div>
              </button>
            );
          })}
        </div>
        <div className="content block">
          {tabs[currentIndex]['component']}

          <div className="inline-block footer">
            <div className="btn btn-left">
              {currentIndex > 0 && (
                <button
                  className="btn arrow-link link center vertical-center"
                  onClick={() => setCurrentIndex(nextIndex(currentIndex, 'left'))}
                  type="button"
                >
                  <div className="link">{tabs[currentIndex]['tabTitle']}</div>
                  <div className="icon_container inline-block">
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
                  </div>
                </button>
              )}
            </div>
            <div className="btn btn-right">
              {currentIndex < tabs.length - 1 && (
                <button
                  className="btn arrow-link link center vertical-center"
                  onClick={() => setCurrentIndex(nextIndex(currentIndex, 'right'))}
                  type="button"
                >
                  {console.log(currentIndex)}
                  <div className="link">{tabs[currentIndex]['tabTitle']}</div>
                  <div className="icon_container inline-block">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ width: 'inherit', height: 'inherit' }}
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TabsMobile = () => {};

function nextIndex(currentIndex, Direction) {
  var NextIndex = 0;
  if (Direction == 'right') {
    NextIndex = currentIndex + 1;
  } else {
    NextIndex = currentIndex - 1;
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

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      tabTitle: PropTypes.string,
      component: PropTypes.object,
    }),
  ),
};

TabsDesktop.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      tabTitle: PropTypes.string,
      component: PropTypes.object,
    }),
  ),
};

nextIndex.propTypes = {
  currentIndex: PropTypes.number,
  Direction: PropTypes.string,
};

Tabs.propTypes = PropTypes;
TabsDesktop.propTypes = PropTypes;
TabsMobile.propTypes = PropTypes;

export { Tabs, TabsDesktop, TabsMobile };
