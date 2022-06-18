import { React, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './Schedule.scss';
import { ButtonSelector } from '../../buttonSelector/buttonSelector/ButtonSelector';
import { SingleAccordion } from '../../text/Accordion/SingleAccordion/SingleAccordion';

const Schedule = ({ scheduleList }) => {
  const days = [];
  const dayEvents = [];

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

  const buttonsRef = useRef();
  const [buttonsWidth, setButtonsWidth] = useState();
  const getWidth = () => {
    const curWidth = buttonsRef.current.offsetWidth;
    setButtonsWidth(curWidth);
  };

  useEffect(() => {
    getWidth();
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

  const [closeAll, setCloseAll] = useState(0);
  for (var i = 0; i < scheduleList.length; i++) {
    let day = scheduleList[i].date.slice(0, scheduleList[i].date.indexOf(' '));
    let date = scheduleList[i].date.slice(scheduleList[i].date.indexOf(' '));
    let buttonDayDate = (
      <div className={'schedule-day-date'}>
        <div>{day}</div>
        <div className={'schedule-date desktop-only'}>{date}</div>
      </div>
    );
    var dateVal = { name: [buttonDayDate] };
    days.push(dateVal);
    const dayList = scheduleList[i].events.map((dayData, index) => (
      <div className={'schedule-events'} key={index}>
        <ScheduleAccordionWrapper
          scheduleData={dayData}
          closeAll={closeAll}
          index={index}
          windowDimensions={windowDimensions}
        />
      </div>
    ));
    dayEvents.push(dayList);
  }

  const outerCircleIcons = scheduleList.map((data, index) => (
    <div
      key={index}
      className={'schedule-circle-outer desktop-only'}
      style={{ top: `${122 * index}px` }}
    ></div>
  ));

  const innerCircleIcons = scheduleList.map((data, index) => (
    <div
      key={index}
      className={'schedule-circle-inner desktop-only'}
      style={{ top: `${122 * index}px` }}
    ></div>
  ));

  const today = new Date();
  const options = { weekday: 'long' };
  const todayString = today.toLocaleDateString('en-US', options).replace(',', '');
  let count = 0;
  for (var k = 0; k < scheduleList.length; k++) {
    if (scheduleList[k].date.slice(0, scheduleList[k].date.indexOf(' ')) === todayString) {
      break;
    }
    count++;
  }
  if (count >= scheduleList.length) {
    count = 0;
  }
  console.log(count);
  const [selectedDayIndex, setSelectedDayIndex] = useState(count);

  return (
    <div className={'schedule-container'}>
      <div className={'schedule-circle-container'}>
        <div ref={circleRef}>{outerCircleIcons}</div>
        <svg
          className={'schedule-circle-line desktop-only'}
          height={122 * (scheduleList.length - 1) + 15 * scheduleList.length}
          width={12}
          strokeWidth="10"
        >
          <line
            y1={45}
            y2={122 * (scheduleList.length - 1) + 15 * scheduleList.length}
            className={'schedule-line'}
          />
        </svg>
        <div>{innerCircleIcons}</div>
      </div>
      <div className={'schedule-button-selector'} ref={buttonsRef}>
        <ButtonSelector
          buttonList={days}
          activeIndex={selectedDayIndex}
          setActiveIndex={(index) => {
            setSelectedDayIndex(index);
            setCloseAll(!closeAll);
          }}
          scroll={windowDimensions.width > 767}
          maxWidthButton={buttonsWidth}
          isScheduleComponent={true}
          style={{
            width: windowDimensions.width > 767 ? '100%' : '',
            paddingLeft: windowDimensions.width > 1100 || windowDimensions.width < 767 ? '' : '3px',
          }}
        ></ButtonSelector>
      </div>
      <div
        className={'schedule-accordion'}
        style={{ width: `${windowDimensions.width > 767 ? '70%' : '100%'}` }}
      >
        {dayEvents[selectedDayIndex]}
      </div>
    </div>
  );
};

Schedule.propTypes = {
  scheduleList: PropTypes.array.isRequired,
};

const ScheduleAccordionWrapper = ({ scheduleData, index, windowDimensions, closeAll }) => {
  let currentTime = new Date();
  let hour = currentTime.getHours();
  const meridian = hour > 12 ? 'PM' : 'AM';
  hour = hour > 12 ? hour - 12 : hour;

  let scheduleTime = scheduleData.time;
  const hourScheduleTime = parseInt(scheduleTime.split(':')[0]);
  const meridianScheduleTime = scheduleTime.split(' ')[1];

  const [isOpen, setIsOpen] = useState(
    hour === hourScheduleTime && meridian === meridianScheduleTime,
  );

  console.log(hour === hourScheduleTime);

  useEffect(() => {
    setIsOpen(hour === hourScheduleTime && meridian === meridianScheduleTime);
  }, [closeAll]);

  var accordionHeader = (
    <div className={'schedule-accordion-container'}>
      <span className={'schedule-accordion-header'}>{scheduleData.name}</span>
      <span className={'schedule-accordion-time'}>{scheduleData.time}</span>
    </div>
  );
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
  closeAll: PropTypes.bool,
};

export { Schedule };
