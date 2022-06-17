import { React, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './Schedule.scss';
import { ButtonSelector } from '../../buttonSelector/buttonSelector/ButtonSelector';
import { SingleAccordion } from '../../text/Accordion/SingleAccordion/SingleAccordion';

const Schedule = ({ scheduleList }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const days = [];
  const dayEvents = [];
  const innerCircleIcons = [];
  const outerCircleIcons = [];
  const circleRef = useRef();

  const [x, setX] = useState();
  const [y, setY] = useState();
  const getPosition = () => {
    const x = circleRef.current.offsetLeft;
    const y = circleRef.current.offsetTop;
    setX(x);
    setY(y);
  };

  useEffect(() => {
    getPosition();
  });

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  for (var i = 0; i < scheduleList.length; i++) {
    let day = scheduleList[i].date.slice(0, scheduleList[i].date.indexOf(' '));
    let date = scheduleList[i].date.slice(scheduleList[i].date.indexOf(' '));
    var buttonDayDate;
    if (windowDimensions.width > 860) {
      buttonDayDate = (
        <div className={'schedule-day-date-desktop'}>
          <div>{day}</div>
          <div className={'schedule-date'}>{date}</div>
        </div>
      );
    } else {
      buttonDayDate = (
        <div className={'schedule-day-date-mobile'}>
          <div>{day}</div>
        </div>
      );
    }
    var dateVal = { name: [buttonDayDate] };
    days.push(dateVal);
    const dayList = scheduleList[i].events.map((dayData, index) => (
      <div
        className={
          windowDimensions.width > 860 ? 'schedule-events-desktop' : 'schedule-events-mobile'
        }
        key={index}
      >
        <ScheduleAccordionWrapper
          scheduleData={dayData}
          index={index}
          windowDimensions={windowDimensions}
        />
      </div>
    ));
    dayEvents.push(dayList);
  }

  for (var j = 0; j < scheduleList.length; j++) {
    outerCircleIcons.push(
      <div
        className={windowDimensions.width > 860 ? 'schedule-circle-outer' : ''}
        style={{ top: `${115 * j}px` }}
      ></div>,
    );
    innerCircleIcons.push(
      <div
        className={windowDimensions.width > 860 ? 'schedule-circle-inner' : ''}
        style={{ top: `${115 * j}px` }}
      ></div>,
    );
  }

  console.log(days);
  return (
    <div className={'schedule-container'}>
      <div
        className={
          windowDimensions.width > 860
            ? 'schedule-circle-container-desktop'
            : 'schedule-circle-container-mobile'
        }
      >
        <div ref={circleRef}>{outerCircleIcons}</div>
        <svg
          className={windowDimensions.width > 860 ? 'schedule-circle-line' : 'schedule-hide'}
          height={115 * (scheduleList.length - 1) + 15 * scheduleList.length}
          strokeWidth="20"
        >
          <line y1={45} y2={1000} stroke="#ffe863" />
        </svg>
        <div>{innerCircleIcons}</div>
      </div>
      <div
        style={{ width: `${windowDimensions.width > 860 ? '25%' : '100%'}` }}
        id="buttonSelector"
      >
        <div>
          <ButtonSelector
            buttonList={days}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            scroll={windowDimensions.width > 860}
            style={{
              width: windowDimensions.width > 860 ? '100%' : '',
            }}
          ></ButtonSelector>
        </div>
      </div>
      <div style={{ width: `${windowDimensions.width > 860 ? '70%' : '100%'}` }}>
        {dayEvents[activeIndex]}
      </div>
    </div>
  );
};

Schedule.propTypes = {
  scheduleList: PropTypes.array.isRequired,
};

const ScheduleAccordionWrapper = ({ scheduleData, index, windowDimensions }) => {
  const [isOpen, setIsOpen] = useState(false);
  var accordionHeader;
  if (windowDimensions.width > 860) {
    accordionHeader = (
      <div>
        <span>{scheduleData.name}</span>
        <span className={'schedule-accordion-time-desktop'}>{scheduleData.time}</span>
      </div>
    );
  } else {
    accordionHeader = (
      <div>
        <div>{scheduleData.name}</div>
        <div className={'schedule-accordion-time-mobile'}>{scheduleData.time}</div>
      </div>
    );
  }
  return (
    <SingleAccordion isOpen={isOpen} setIsOpen={setIsOpen} header={accordionHeader}>
      {scheduleData.description}
    </SingleAccordion>
  );
};

ScheduleAccordionWrapper.propTypes = {
  scheduleData: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
  windowDimensions: PropTypes.object.isRequired,
};

export { Schedule };
