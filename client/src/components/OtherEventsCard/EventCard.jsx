import React from 'react';
import './EventCard.scss';
import PropTypes from 'prop-types';

const EventCard = ({ title, content, photoUrl, bgColorClass, textColorClass }) => {
  return (
    <div className={`event-card ${bgColorClass} ${textColorClass}`}>
      <div className="card-content">
        <div className="text-section">
          <h2>{title}</h2>
          <p>{content}</p>
          <button
            className={`learn-more-btn ${
              textColorClass == 'bg-white' ? 'button-white' : 'button-black'
            }`}
          >
            Learn More
          </button>
        </div>
        <div className="triangle" />
        <div className="image-section">
          <img src={photoUrl} alt="event visual" />
        </div>
      </div>
    </div>
  );
};

export { EventCard };

EventCard.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  photoUrl: PropTypes.string.isRequired,
  bgColorClass: PropTypes.string,
  textColorClass: PropTypes.string,
};

// EventCard.defaultProps = {
//   bgColorClass: 'bg-yellow',
//   textColorClass: 'text-black',
// };
