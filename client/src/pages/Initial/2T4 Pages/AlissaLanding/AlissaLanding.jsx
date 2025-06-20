import React from 'react';
import PropTypes from 'prop-types';
import './AlissaLanding.scss';

import InstagramIcon from '../../../assets/social/instagram_icon.png';

const InstagramButton = ({ link, text }) => {
  return (
    <a href={link} target="_blank" rel="noreferrer" className="no-link-style">
      <div className="button">
        <img src={InstagramIcon} alt="Instagram Icon" className="button-icon" />
        <span className="button-text">{text}</span>
      </div>
    </a>
  );
};

InstagramButton.propTypes = {
  link: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

const AlissaLanding = () => {
  return (
    <div className="coming-soon-page">
      <div className="ax-container">
        <div className="ax-title">
          <h1 className="title-text">COMING SOON!</h1>
          <p className="subtitle">
            Hey F!rosh! Our website is currently under construction. <br></br>Check back soon!
          </p>
        </div>
        <div className="ax-instagram">
          <br></br>
          <div className="button-container">
            <InstagramButton
              link="https://www.instagram.com/froshweek/"
              text="Follow @froshweek for updates"
            />
            <InstagramButton
              link="https://www.instagram.com/froshnomore/"
              text="Follow @froshnomore to get involved"
            />
          </div>
        </div>
      </div>
      <div className="ax-footer">
        <h1 className="footer-text">Made with 💜 by the F!rosh Week 2T4 Tech Team</h1>
      </div>
    </div>
  );
};

export { AlissaLanding };
