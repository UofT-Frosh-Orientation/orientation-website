import React from 'react';
import PropTypes from 'prop-types';
import './Timeline.scss';

const Timeline = ({ dates, onClick }) => {
  const options = { weekday: undefined, year: undefined, month: 'long', day: 'numeric' };
  return (
    <>
      <div className="timeline-container">
        <div className="timeline-line" />
        <div style={{ width: '2vw' }} />
        {dates.map((date) => {
          let formattedDate = new Date(date.date).toLocaleDateString(undefined, options);
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
              <div className="timeline-date-container-name">{date.name}</div>
              {date.description ? <div className="timeline-read-more">Read more</div> : <></>}
            </div>
          );
        })}
        <div style={{ width: '2vw' }} />
      </div>
    </>
  );
};

Timeline.propTypes = {
  dates: PropTypes.arrayOf(PropTypes.object),
  onClick: PropTypes.func,
};

export { Timeline };
