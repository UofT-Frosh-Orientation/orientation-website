import React from 'react';
import PropTypes from 'prop-types';
import './AshLanding.scss';
import InstagramIcon from '../../../assets/social/instagram-brands-dark-purple.svg';

const InstagramButton = ({ link, text }) => {
  return (
    <a href={link} target="_blank" rel="noreferrer" className="no-link-style">
      <div className="ash-button">
        <img src={InstagramIcon} alt="Instagram Icon" className="ash-button-icon" />
        <span className="ash-button-text">{text}</span>
      </div>
    </a>
  );
};

InstagramButton.propTypes = {
  link: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

const AshLanding = () => {
  return (
    <>
      <div className="ash-initial-page">
        <div className="ash-container">
          <div className="ash-title">
            <h1 className="ash-title-text">COMING SOON!</h1>
            <hr className="ash-line"></hr>
            <p className="ash-subtitle">
              Hey F!rosh! Our website is currently under construction. Check back soon!
            </p>
          </div>

          <div className="ash-info">
            <div className="ash-button-container">
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
          <div className="ash-footer">
            <h2 className="ash-footer-text">Made with 💜 by the F!rosh Week 2T4 Tech Team</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export { AshLanding };
