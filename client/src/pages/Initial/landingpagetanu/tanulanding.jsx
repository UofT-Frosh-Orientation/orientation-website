import React from 'react';
import './tanulanding.scss';
import InstagramLogo from '../../../assets/social/instagram_icon.png';

const TanuLanding = () => {
  return (
    <div className="tanu-landing-page-container">
      <div className="tanu-landing-page-title-container">
        <h1 className="tanu-landing-page-under-construction-text">UNDER CONSTRUCTION</h1>
        <h2 className="tanu-landing-page-subtitle-text">
          Stay Tuned F!rosh, we are working hard to give you the best experience!
        </h2>
        <h2 className="tanu-landing-page-subtitle-text">
          Registration for F!rosh Week will open soon.
        </h2>
      </div>

      <hr className="tanu-landing-page-hrline"></hr>
      <div className="tanu-landing-page-social-container">
        <div className="tanu-landing-page-froshweek">
          <a
            href="https://www.instagram.com/froshweek/"
            target="_blank"
            rel="noreferrer"
            className="tanu-landing-page-insta-logo"
          >
            <img
              src={InstagramLogo}
              className="instagram-logo"
              alt="Instagram logo links to F!rosh Instagram page"
            />
          </a>
          <p className="tanu-landing-page-froshweek-text">Follow us at @froshweek for updates</p>
        </div>
        <div className="tanu-landing-page-froshnomore">
          <a
            href="https://www.instagram.com/froshnomore/"
            target="_blank"
            rel="noreferrer"
            className="tanu-landing-page-insta-logo"
          >
            <img
              src={InstagramLogo}
              className="instagram-logo"
              alt="Instagram logo links to F!rosh Instagram page"
            />
          </a>
          <p className="tanu-landing-page-froshnomore-text">Get Involved at @froshnomore</p>
        </div>
      </div>
    </div>
  );
};

export { TanuLanding };
