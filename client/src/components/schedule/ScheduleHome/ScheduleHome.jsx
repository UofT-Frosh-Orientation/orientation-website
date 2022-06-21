import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { ButtonSelector } from '../../buttonSelector/buttonSelector/ButtonSelector';
import { SingleAccordion } from '../../text/Accordion/SingleAccordion/SingleAccordion';
import './ScheduleHome.scss';
import { data } from '../../../assets/schedule/data';

function getDaysSchedule() {
  const scheduleData = data;
  const days = [];
  console.log(Object.keys(scheduleData));
  for (let day of Object.keys(scheduleData)) {
    days.push(day.split(' ')[0]);
  }
  return days;
}

const ScheduleComponent = () => {
  const today = new Date();
  const options = { weekday: 'long' };
  const todayString = today.toLocaleDateString('en-US', options).replace(',', '');
  let count = 0;
  for (let day of getDaysSchedule()) {
    if (day === todayString) {
      break;
    }
    count++;
  }
  if (count >= Object.keys(data).length) {
    count = 0;
  }
  const [selectedDayIndex, setSelectedDayIndex] = useState(count);
  const [closeAll, setCloseAll] = useState(false);
  const buttonList = Object.keys(data).map((item) => {
    return { name: item };
  });
  return (
    <div className="schedule-container">
      <div className="mobile-only">
        <ButtonSelector
          buttonList={buttonList}
          activeIndex={selectedDayIndex}
          setActiveIndex={(index) => {
            setSelectedDayIndex(index);
            setCloseAll(!closeAll);
          }}
          style={{
            maxWidth: '250px',
            marginTop: '0px',
            marginBottom: '10px',
            padding: '11px 15px',
            minWidth: '110px',
          }}
        />
      </div>
      <div className="schedule-container-dates desktop-only">
        {Object.keys(data).map((day, index) => {
          const dayOfWeek = day.split(' ')[0];
          const date = day.split(' ')[1] + ' ' + day.split(' ')[2];
          return (
            <div className="schedule-container-left" key={day + index}>
              <div
                style={{
                  top: index === 0 ? '42.5px' : 'unset',
                  height: index === Object.keys(data).length - 1 ? '42.5px' : '',
                }}
                className="schedule-container-line"
              />
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className="schedule-container-dot" />
                <div className="schedule-container-dot2" />
              </div>
              <div
                className={`schedule-container-dates-container ${
                  selectedDayIndex === index ? 'schedule-container-dates-container-selected' : ''
                }`}
                onClick={() => {
                  setSelectedDayIndex(index);
                  setCloseAll(!closeAll);
                }}
              >
                <h1>{dayOfWeek}</h1>
                <h2>{date}</h2>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        {data[Object.keys(data)[selectedDayIndex]].map((scheduleDay, index) => {
          return (
            <ScheduleComponentAccordion
              key={Object.keys(data)[index] + index}
              scheduleDay={scheduleDay}
              closeAll={closeAll}
            />
          );
        })}
      </div>
    </div>
  );
};

const ScheduleComponentAccordion = ({ scheduleDay, closeAll }) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setIsOpen(false);
  }, [closeAll]);

  return (
    <div className="schedule-accordion">
      <SingleAccordion
        className={`schedule-background-${scheduleDay['Color']}`}
        header={
          <div className="schedule-accordion-header" closeAll={closeAll}>
            <h1>{scheduleDay['Event Name']}</h1>
            <h2>{scheduleDay['Start Time'] + ' - ' + scheduleDay['End Time']}</h2>
          </div>
        }
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        canOpen={scheduleDay['Event Description'] !== undefined}
      >
        <p>{scheduleDay['Event Description']}</p>
      </SingleAccordion>
    </div>
  );
};

ScheduleComponentAccordion.propTypes = {
  scheduleDay: PropTypes.object,
  closeAll: PropTypes.bool,
};

export { ScheduleComponent };
