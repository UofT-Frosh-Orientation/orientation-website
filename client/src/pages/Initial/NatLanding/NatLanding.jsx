import React from 'react';
import PropTypes from 'prop-types';
import './NatLanding.scss';
import InstagramLogo from '../../../assets/social/instagram_icon.png';

const NatLanding = () => {
  return (
    <>
      <div className="initial-page">
        <div className="container">
          {/* Title Section */}
          <div className="title">
            <h1 className="title-text">
              SOMETHING AWESOME<br></br>IS IN THE WORKS
            </h1>
            <hr className="line"></hr>
            <p className="subtitle">
              Hey F!rosh! We are working hard to give you the best experience, check back soon!
            </p>
          </div>

          {/* Registration Info */}
          <div className="info">
            <a
              className="no-link-style"
              href="https://www.instagram.com/froshweek/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={InstagramLogo}
                className="instagram-logo no-link-style"
                alt="Instagram logo links to F!rosh Instagram page"
              />
            </a>
            <p className="info-text">Follow us on Instagram for more updates about F!rosh Week!</p>
          </div>

          {/* Footer */}
          <div className="footer">
            <h2 className="footer-text">Made with 💜 by the F!rosh Week 2T3 Tech Team</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export { NatLanding };
