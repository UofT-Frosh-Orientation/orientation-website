import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { SingleAccordion } from '../../text/Accordion/SingleAccordion/SingleAccordion';
import './ScheduleHome.scss';
import { data } from '../../../assets/schedule/data';
import location from '../../../assets/misc/loc.svg';
import locationdark from '../../../assets/misc/locdark.svg';
import { DarkModeContext } from '../../../util/DarkModeProvider';

function getDaysSchedule() {
  return Object.keys(data);
}

const ScheduleComponent = () => {
  const today = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
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

  return (
    <div className="schedule-section-container">
      {/*HORIZONTAL TABS ROW */}
      <div className="schedule-tabs-row">
        {Object.keys(data).map((day, index) => {
          // Splitting 'Monday Sept 1' -> 'MON' & 'SEPT 1'
          const parts = day.split(' ');
          const dayOfWeekShort = parts[0].substring(0, 3).toUpperCase();
          const dateString = `${parts[1] ? parts[1].toUpperCase() : ''} ${parts[2] || ''}`;

          return (
            <button
              key={index}
              className={`schedule-tab-button ${selectedDayIndex === index ? 'active' : ''}`}
              onClick={() => {
                setSelectedDayIndex(index);
                setCloseAll(!closeAll);
              }}
            >
              {' '}
              {/* button for ${day} */}
              <span className="tab-day-text">{dayOfWeekShort}</span>
              <span className="tab-date-text">{dateString}</span>
            </button>
          );
        })}
      </div>

      {/* TIMELINE BLOCKS STACK */}
      <div className="schedule-timeline-stack">
        {data[Object.keys(data)[selectedDayIndex]].map((scheduleDay, index) => (
          <ScheduleComponentAccordion key={index} scheduleDay={scheduleDay} closeAll={closeAll} />
        ))}
      </div>
    </div>
  );
};

export const ScheduleComponentAccordion = ({ scheduleDay, closeAll }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { darkMode } = useContext(DarkModeContext);

  useEffect(() => {
    setIsOpen(false);
  }, [closeAll]);

  let startTime = scheduleDay['Start Time'];
  if (startTime.includes(':00 a1/p1')) {
    startTime = startTime.replace(':00 a1/p1', '').trim();
    startTime = convertTime(startTime);
  }
  let endTime = scheduleDay['End Time'];
  if (endTime.includes(':00 a1/p1')) {
    endTime = endTime.replace(':00 a1/p1', '').trim();
    endTime = convertTime(endTime);
  }

  const timeRangeString = startTime === ' ' && endTime === ' ' ? '' : `${startTime} – ${endTime}`;

  return (
    <div className="schedule-row-item">
      {/* LEFT SIDE: TIME BLOCK */}
      <div className="schedule-time-block">
        <span>{timeRangeString}</span>
      </div>

      {/* RIGHT SIDE: CONTENT EXPANSION BLOCK */}
      <div className="schedule-content-block">
        <SingleAccordion
          className={`schedule-card card-color-${scheduleDay['Color'] || 'general'}`}
          header={
            <div className="card-header-inner">
              <h2 className="event-name">{scheduleDay['Event Name']}</h2>
              {scheduleDay['Event Location'] && (
                <div className="event-location-box">
                  <img src={location} className="location-icon" alt="location pin" />
                  <span className="location-text">{scheduleDay['Event Location']}</span>
                </div>
              )}
            </div>
          }
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          canOpen={scheduleDay['Event Description'] !== undefined}
          dark={scheduleDay['Color'] === 'night' || scheduleDay['Color'] === 'general'}
        >
          <p
            className="event-desc"
            dangerouslySetInnerHTML={{ __html: scheduleDay['Event Description'] }}
          />
        </SingleAccordion>
      </div>
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
    time[5] = +time[0] < 12 ? ' AM' : ' PM';
    time[0] = +time[0] % 12 || 12;
  } else {
    return time + ' AM';
  }
  return time.join('');
}
