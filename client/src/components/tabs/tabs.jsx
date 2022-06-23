import React, { useState } from 'react';
import './tabs.scss';
import PropTypes from 'prop-types';
import { Button } from '../button/Button/Button';
import { ButtonSelector } from '../buttonSelector/buttonSelector/ButtonSelector';
import ArrowRight from '../../assets/steps/arrow-right-solid.svg';
import ArrowLeft from '../../assets/steps/arrow-left-solid.svg';
import { useEffect } from 'react';

const Tabs = ({ tabs, maxWidthTab, selectedTabPassed, go }) => {
  useEffect(() => {
    if (selectedTabPassed !== undefined) {
      setSelectedTab(selectedTabPassed);
    }
  }, [selectedTabPassed, go]);

  const tabTitles = tabs.map((tab) => {
    return { name: tab.title };
  });
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <div className="tabs">
      <div className="tabs-button-selector-container">
        <ButtonSelector
          classNameSelector={'tabs-button-selector'}
          maxWidthButton={maxWidthTab}
          classNameButton={'tabs-button-tab'}
          buttonList={tabTitles}
          setActiveIndex={setSelectedTab}
          activeIndex={selectedTab}
        />
      </div>
      <div className="tabs-content">
        {tabs.map((tab, index) => {
          return (
            <div
              key={tab.title + index}
              className={selectedTab === index ? 'tabs-visible' : 'tabs-hidden'}
            >
              {tab.component}
            </div>
          );
        })}
        <div className="tabs-buttons">
          {selectedTab !== 0 ? (
            <Button
              label={
                <div className="tab-button-label">
                  {' '}
                  <img src={ArrowLeft} style={{ marginRight: '10px', marginLeft: '-7px' }} />{' '}
                  Previous
                </div>
              }
              onClick={() => {
                setSelectedTab(selectedTab - 1);
              }}
            />
          ) : (
            <div />
          )}
          {selectedTab !== tabs.length - 1 ? (
            <Button
              label={
                <div className="tab-button-label">
                  Next <img src={ArrowRight} style={{ marginLeft: '10px', marginRight: '-7px' }} />{' '}
                </div>
              }
              onClick={() => {
                setSelectedTab(selectedTab + 1);
              }}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      component: PropTypes.instanceOf(Element),
    }),
  ).isRequired,
  maxWidthTab: PropTypes.number,
  selectedTabPassed: PropTypes.number,
  go: PropTypes.bool,
};

export { Tabs };
