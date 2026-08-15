import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { SingleAccordion } from '../../text/Accordion/SingleAccordion/SingleAccordion';
import './ScheduleHome.scss';
import { data } from '../../../assets/schedule/data';
import { homebase_data } from '../../../assets/schedule/homebase-schedule-data';
import location from '../../../assets/misc/loc.svg';
import locationdark from '../../../assets/misc/locdark.svg';
import { DarkModeContext } from '../../../util/DarkModeProvider';

function getDaysSchedule() {
  return Object.keys(data);
}

// Format months
const formatMonth = (monthStr) => {
  if (!monthStr) return '';
  const upper = monthStr.toUpperCase();
  return upper.startsWith('SEPT') ? 'SEPT' : upper.substring(0, 3);
};

// Format navigation tabs
const TabButton = ({ isActive, onClick, prefixText, dayOfWeekShort, dateString }) => (
  <button className={`schedule-component-tab-button ${isActive ? 'active' : ''}`} onClick={onClick}>
    <p className="schedule-component-day-tab">
      {prefixText && (
        <span className="schedule-component-tab-prefix-text">
          {prefixText}
          <br />
        </span>
      )}
      <span className="schedule-component-tab-day-text">{dayOfWeekShort} </span>
      <span className="schedule-component-tab-date-text">{dateString}</span>
    </p>
  </button>
);

TabButton.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  prefixText: PropTypes.string, // Not required since it can be null
  dayOfWeekShort: PropTypes.string.isRequired,
  dateString: PropTypes.string.isRequired,
};

const ScheduleComponent = () => {
  const today = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  const todayString = today.toLocaleDateString('en-US', options).replace(',', '');

  // Find the index of today in the schedule data
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
  const [activeTrack, setActiveTrack] = useState('frosh'); // Tracks 'frosh' or 'homebase'
  const [closeAll, setCloseAll] = useState(false);

  // Determine which data to use based on the active track
  const activeDataset = activeTrack === 'frosh' ? data : homebase_data;
  const activeDayKey = Object.keys(activeDataset)[selectedDayIndex];
  const timelineData = activeDataset[activeDayKey];

  return (
    <div className="schedule-section-container">
      {/*HORIZONTAL TABS ROW for navigation */}

      <div className="schedule-navigation-container">
        {/* ROW 1: Frosh Schedule Tabs Row */}
        <div className="schedule-component-tabs-row frosh-row">
          {Object.keys(data).map((day, index) => {
            // Splitting 'Monday Sept 1' -> 'MON' & 'SEPT 1'
            const parts = day.split(' ');
            const dayOfWeekShort = parts[0].substring(0, 3).toUpperCase();
            const dateString = `${parts[1]} ${parts[2] || ''}`;
            const needFroshTag = dayOfWeekShort === 'MON' || dayOfWeekShort === 'TUE';

            return (
              <TabButton
                key={`frosh-${index}`}
                isActive={activeTrack === 'frosh' && selectedDayIndex === index}
                onClick={() => {
                  setSelectedDayIndex(index);
                  setActiveTrack('frosh');
                  setCloseAll(!closeAll);
                }}
                prefixText={needFroshTag ? 'F!rosh' : null}
                dayOfWeekShort={dayOfWeekShort}
                dateString={dateString}
              />
            );
          })}
        </div>

        {/* ROW 2: Homebase Schedule Tabs Row */}
        <div className="schedule-component-homebase-banner-row">
          {/* The Drive-in Schedule Buttons */}
          {Object.keys(homebase_data).map((day, index) => {
            const parts = day.split(' ');
            const dayOfWeekShort = parts[0].substring(0, 3).toUpperCase();
            const dateString = `${formatMonth(parts[1])} ${parts[2] || ''}`;

            return (
              <TabButton
                key={`homebase-${index}`}
                isActive={activeTrack === 'homebase' && selectedDayIndex === index}
                onClick={() => {
                  setSelectedDayIndex(index);
                  setActiveTrack('homebase');
                  setCloseAll(!closeAll);
                }}
                prefixText="Drive-In"
                dayOfWeekShort={dayOfWeekShort}
                dateString={dateString}
              />
            );
          })}

          {/* The Banner Text and car image*/}
          <div className="schedule-component-homebase-banner-text-container">
            <span className="schedule-component-homebase-banner-text">Chill at Drive-In</span>
            {/* Add your <img src={carImage} /> right here later! */}
          </div>
        </div>
      </div>

      {/* TIMELINE BLOCKS STACK */}
      <div className="schedule-timeline-stack">
        {timelineData &&
          timelineData.map((scheduleDay, index) => (
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
