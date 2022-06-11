import React, { useState } from 'react';
import './tabs.scss';
import PropTypes from 'prop-types';
import { Button } from '../button/Button/Button';
import { Dropdown } from '../form/Dropdown/Dropdown';

const Tabs = ({ tabs }) => {
  return (
    <div>
      <div className="Tabs-desktop">
        <TabsDesktop tabs={tabs} />
      </div>
      <div className="Tabs-mobile">
        <TabsMobile tabs={tabs} />
      </div>
    </div>
  );
};

const TabsDesktop = ({ tabs }) => {
  // const location = useLocation();
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log(currentIndex);
  return (
    <div className="tab-main">
      <div className="tab-container tabs-center">
        <div className="tabs-center relative">
          {tabs.map((tab, index) => {
            {
              var css_class =
                index == currentIndex ? 'nav-btn active_link' : 'nav-btn non_active_link';
            }
            return (
              <Button
                key={index}
                label={tab.tabTitle}
                onClick={() => setCurrentIndex(index)}
                style={css_class}
              />
            );
          })}
        </div>
        <div className="tab-content block">
          {tabs[currentIndex]['component']}

          <div className="inline-block footer">
            <div className=" btn-left">
              {currentIndex > 0 && (
                <Button
                  label={
                    <div>
                      <div className="inline-block tabs-link ">
                        {tabs[currentIndex - 1]['tabTitle']}
                      </div>
                      <div className="inline-block icon_container ">
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
                    </div>
                  }
                  onClick={() => setCurrentIndex(nextIndex(currentIndex, 'left'))}
                  isSecondary={true}
                />
              )}
            </div>
            <div className="btn-right">
              {currentIndex < tabs.length - 1 && (
                <Button
                  label={
                    <div className="tabs-block">
                      <div className="inline-block tabs-link">
                        {tabs[currentIndex + 1]['tabTitle']}
                      </div>
                      <div className="inline-block icon_container">
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
                    </div>
                  }
                  onClick={() => setCurrentIndex(nextIndex(currentIndex, 'right'))}
                  isSecondary={true}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TabsMobile = ({ tabs }) => {
  var dropDownItemsArr = [];
  const [currentIndex, setCurrentIndex] = useState(0);

  tabs.map((tab, index) => {
    dropDownItemsArr[index] = { label: tab.tabTitle, value: '1', isSelected: false };
  });

  return (
    <div>
      <Dropdown
        selected={currentIndex}
        label={'Label'}
        items={dropDownItemsArr}
        onSelect={setCurrentIndex}
        isDisabled={false}
      />
    </div>
  );
};

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

TabsMobile.propTypes = {
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
