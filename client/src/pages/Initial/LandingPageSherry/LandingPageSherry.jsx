import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import './LandingPageSherry.scss';
import InstagramLogo from '../../../assets/social/instagram_icon.png';

const SZLandingPage = () => {
  return (
    <>
      <section className="sz-wrapper-landing">
        <div className="sz-landing-top">2023 Fall</div>
        <div className="sz-landing-bottom" aria-hidden="true">
          2023 Fall
        </div>
        <h1 className="szlanding-title-text">
          F!rosh Week<br></br>is Approaching...
        </h1>
        <a href="https://www.instagram.com/froshweek/" target="_blank" rel="noreferrer">
          <img
            src={InstagramLogo}
            className="sz-landing-instagram-logo"
            alt="logo for F!rosh Instagram page"
          />
        </a>
      </section>
    </>
  );
};

export { SZLandingPage };
