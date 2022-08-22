import React from 'react';
import PropTypes from 'prop-types';
import './Timeline.scss';

const Timeline = ({ dates, onClick }) => {
  const options = {
    weekday: 'short',
    year: undefined,
    month: 'short',
    day: 'numeric',
    timeZone: 'America/Toronto',
  };
  return (
    <>
      <div className="timeline-container">
        <div className="timeline-line" />
        <div className="timeline-space" />
        {dates.map((date) => {
          let formattedDate = new Date(
            date.date.substring(0, date.date.length - 1),
          ).toLocaleDateString('en-CA', options);
          return (
            <div
              key={formattedDate + date.name}
              className={
                'timeline-date-container ' +
                (date.description ? ' timeline-date-container-clickable' : '')
              }
              onClick={() => {
                date.description ? onClick(date, formattedDate) : 0;
              }}
            >
              <h1 className="timeline-date-container-date">{formattedDate}</h1>
              <div className="timeline-date-container-name">{date.eventName}</div>
              {date.description ? <div className="timeline-read-more">Read more</div> : <></>}
            </div>
          );
        })}
        <div className="timeline-space" />
      </div>
    </>
  );
};

Timeline.propTypes = {
  dates: PropTypes.arrayOf(PropTypes.object),
  onClick: PropTypes.func,
};

export { Timeline };
