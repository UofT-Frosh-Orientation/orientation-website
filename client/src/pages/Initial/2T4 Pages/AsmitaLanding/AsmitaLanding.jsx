import React from 'react';
import PropTypes from 'prop-types';
import './AsmitaLanding.scss';
import InstagramIcon from '../../../assets/social/instagram-brands-dark-purple.svg';

const InstagramButton = ({ link, text }) => {
  return (
    <a href={link} target="_blank" rel="noreferrer" className="no-link-style">
      <div className="ac-button">
        <img src={InstagramIcon} alt="Instagram Icon" className="ac-button-icon" />
        <span className="ac-button-text">{text}</span>
      </div>
    </a>
  );
};

InstagramButton.propTypes = {
  link: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

const AsmitaLanding = () => {
  return (
    <>
      <div className="ac-background">
        <div className="container">
          <div className="ac-main">
            <h1 className="ac-main-text">COMING SOON</h1>
            <hr className="ac-empty"></hr>
            <p className="ac-subheading">
              Hey F!rosh! Our magical portal is currently being enchanted. Check back soon to
              witness the wonders we’re creating!
            </p>
          </div>

          <div className="ac-insta">
            <div className="ac-insta-container">
              <InstagramButton
                link="https://www.instagram.com/froshweek/"
                text="follow @froshweek to get updates"
              />
              <InstagramButton
                link="https://www.instagram.com/froshnomore/"
                text="follow @froshnomore to get involved"
              />
            </div>
          </div>

          <div className="ac-credits">
            <h2 className="ac-credits-text">Made with 💜 by the F!rosh Week 2T4 Tech Team</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export { AsmitaLanding };
