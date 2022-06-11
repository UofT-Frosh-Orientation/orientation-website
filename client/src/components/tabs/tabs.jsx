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
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  return (
    <div className="tab-main">
      <div className="tab-container tabs-center">
        <div className="tabs-center relative">
          {tabs.map((tab, index) => {
            {
              var css_class = tab == currentTab ? 'nav-btn active_link' : 'nav-btn non_active_link';
            }
            return (
              <Button
                key={index}
                label={tab.tabTitle}
                onClick={() => setCurrentTab(tab)}
                class_options={css_class}
              />
            );
          })}
        </div>
        <div className="tab-content block">
          {currentTab['component']}

          <div className="inline-block footer">
            <div className=" btn-left">
              {tabs.indexOf(currentTab) > 0 && (
                <Button
                  label={
                    <div className="tabs-block">
                      <div className="inline-block tabs-link ">{'Back'}</div>
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
                  onClick={() => setCurrentTab(nextTab(tabs, currentTab, 'left'))}
                  isSecondary={true}
                />
              )}
            </div>
            <div className="btn-right">
              {tabs.indexOf(currentTab) < tabs.length - 1 && (
                <Button
                  label={
                    <div className="tabs-block">
                      <div className="inline-block tabs-link">{'Next'}</div>
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
                  onClick={() => setCurrentTab(nextTab(tabs, currentTab, 'right'))}
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
  const [currentTab, setCurrentTab] = useState(tabs[0]);

  tabs.map((tab, index) => {
    dropDownItemsArr[index] = tab.tabTitle;
  });
  const items = ['Option 1', 'Option 2', 'Option 3'];

  return (
    <div className="tab-main">
      <div className="tab-container tabs-center">
        <div className="tabs-center relative">
          {/* <Dropdown
          initialSelectedIndex={tabs.indexOf(currentTab)}
          label={'Label'}
          items={items}
          onSelect={setCurrentTab}
          isDisabled={false}
        /> */}
        </div>
        <div className="tab-content block">
          {currentTab['component']}

          <div className="inline-block footer">
            <div className=" btn-left">
              {tabs.indexOf(currentTab) > 0 && (
                <Button
                  label={
                    <div>
                      <div className="inline-block tabs-link ">{'Back'}</div>
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
                  onClick={() => setCurrentTab(nextTab(tabs, currentTab, 'left'))}
                  isSecondary={true}
                />
              )}
            </div>
            <div className="btn-right">
              {tabs.indexOf(currentTab) < tabs.length - 1 && (
                <Button
                  label={
                    <div className="tabs-block">
                      <div className="inline-block tabs-link">{'Next'}</div>
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
                  onClick={() => setCurrentTab(nextTab(tabs, currentTab, 'right'))}
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

function nextTab(tabs, currentTab, Direction) {
  const currentIndex = tabs.indexOf(currentTab);
  var NextIndex = 0;
  if (Direction == 'right') {
    NextIndex = currentIndex + 1;
  } else {
    NextIndex = currentIndex - 1;
  }
  return tabs[NextIndex];
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

nextTab.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      tabTitle: PropTypes.string,
      component: PropTypes.object,
    }),
  ),
  currentTab: PropTypes.number,
  Direction: PropTypes.string,
};

Tabs.propTypes = PropTypes;
TabsDesktop.propTypes = PropTypes;
TabsMobile.propTypes = PropTypes;

export { Tabs, TabsDesktop, TabsMobile };
