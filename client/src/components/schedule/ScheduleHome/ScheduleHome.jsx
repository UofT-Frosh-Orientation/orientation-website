import React, { useState, useEffect, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { ButtonSelector } from '../../buttonSelector/buttonSelector/ButtonSelector';
import { SingleAccordion } from '../../text/Accordion/SingleAccordion/SingleAccordion';
import './ScheduleHome.scss';
import { data } from '../../../assets/schedule/data';
import location from '../../../assets/misc/location.png';
import { DarkModeContext } from '../../../util/DarkModeProvider';

function getDaysSchedule() {
  const scheduleData = data;
  const days = [];
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
      <div style={{ width: '100%' }}>
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

export const ScheduleComponentAccordion = ({ scheduleDay, closeAll }) => {
  const [isOpen, setIsOpen] = useState(true);
  const { darkMode, setDarkModeStatus } = useContext(DarkModeContext);

  useEffect(() => {
    setIsOpen(false);
  }, [closeAll]);

  let startTime = scheduleDay['Start Time'];
  if (startTime.includes(':00 a1/p1')) {
    startTime = startTime.replace(':00 a1/p1', '');
    startTime = convertTime(startTime);
  }
  let endTime = scheduleDay['End Time'];
  if (endTime.includes(':00 a1/p1')) {
    endTime = endTime.replace(':00 a1/p1', '');
    endTime = convertTime(endTime);
  }

  return (
    <div className="schedule-accordion">
      <SingleAccordion
        className={`schedule-background-${scheduleDay['Color']}`}
        header={
          <div className="schedule-accordion-header-container">
            <div className="schedule-accordion-header">
              <h1>{scheduleDay['Event Name']}</h1>
              {scheduleDay['Event Location'] ? (
                <div className="schedule-accordion-header-location-container">
                  <img
                    style={{ filter: darkMode ? 'invert(0.8)' : 'invert(0.6)' }}
                    src={location}
                    className="schedule-accordion-header-location-icon"
                  ></img>
                  <h3 className="schedule-accordion-location">{scheduleDay['Event Location']}</h3>
                </div>
              ) : (
                <></>
              )}
            </div>
            <h2>{startTime + ' - ' + endTime}</h2>
          </div>
        }
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        canOpen={scheduleDay['Event Description'] !== undefined}
      >
        <p dangerouslySetInnerHTML={{ __html: scheduleDay['Event Description'] }} />
      </SingleAccordion>
    </div>
  );
};

ScheduleComponentAccordion.propTypes = {
  scheduleDay: PropTypes.object,
  closeAll: PropTypes.bool,
};

export { ScheduleComponent };

function convertTime(time) {
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)?$/) || [time];

  if (time.length > 1) {
    time = time.slice(1);
    time[5] = +time[0] < 12 ? '  AM' : '  PM';
    time[0] = +time[0] % 12 || 12;
  } else {
    return time + ' AM';
  }
  return time.join('');
}
