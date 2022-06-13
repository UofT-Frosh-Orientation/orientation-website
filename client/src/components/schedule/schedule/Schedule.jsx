import { React, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Schedule.scss';
import { ButtonSelector } from '../../buttonSelector/buttonSelector/ButtonSelector';
import { SingleAccordion } from '../../text/Accordion/SingleAccordion/SingleAccordion';

const Schedule = ({ scheduleList }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const days = [];
  const dayEvents = [];

  useEffect(() => {
    const buttonsHeight = document.getElementById('buttonSelector').offsetHeight;
    const circleSpacing = buttonsHeight / scheduleList.length;
    console.log(circleSpacing);
  });

  for (var i = 0; i < scheduleList.length; i++) {
    let day = scheduleList[i].date.slice(0, scheduleList[i].date.indexOf(' '));
    let date = scheduleList[i].date.slice(scheduleList[i].date.indexOf(' '));
    let buttonDayDate = (
      <div className={'schedule-day-date'}>
        <div>{day}</div>
        <div className={'schedule-date'}>{date}</div>
      </div>
    );
    var dateVal = { name: [buttonDayDate] };
    days.push(dateVal);
    const dayList = scheduleList[i].events.map((dayData, index) => (
      <div className={'schedule-events'} key={index}>
        <ScheduleAccordionWrapper scheduleData={dayData} index={index} />
      </div>
    ));
    dayEvents.push(dayList);
  }

  console.log(days);
  return (
    <div className={'schedule-container'}>
      <div style={{ width: '5%' }}>
        <div className={'schedule-circle'}></div>
      </div>
      <div style={{ width: '25%' }} id="buttonSelector">
        <ButtonSelector
          buttonList={days}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          style={{ width: '100%' }}
        ></ButtonSelector>
      </div>
      <div style={{ width: '70%' }}>{dayEvents[activeIndex]}</div>
    </div>
  );
};

Schedule.propTypes = {
  scheduleList: PropTypes.array.isRequired,
};

const ScheduleAccordionWrapper = ({ scheduleData, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <SingleAccordion
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      header={scheduleData.name}
      time={scheduleData.time}
    >
      {scheduleData.description}
    </SingleAccordion>
  );
};

ScheduleAccordionWrapper.propTypes = {
  scheduleData: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
};

export { Schedule };
