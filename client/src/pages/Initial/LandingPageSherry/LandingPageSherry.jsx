import React, { useState, useEffect, useContext } from 'react';
import './LandingPageSherry.scss';
import InstagramLogo from '../../../assets/social/instagram_icon.png';

const SZLandingPage = () => {
  return (
    <>
      <section className="sz-wrapper-landing">
      <div className="sz-landing-text">
        2023 Fall
      </div>
      <p className="szlanding-small-text">F!rosh Week is Approaching...</p>
        <div className="szlanding-logo-container">
        <h2 className="szlanding-bubble">Want to learn more?</h2>
          <a href="https://www.instagram.com/froshweek/" target="_blank" rel="noreferrer">
            <img
              src={InstagramLogo}
              className="sz-landing-instagram-logo"
              alt="logo for F!rosh Instagram page"
            />
          </a><p>Check out our F!rosh Instagram page</p>
          <a href="https://www.instagram.com/froshnomore/" target="_blank" rel="noreferrer">
            <img
              src={InstagramLogo}
              className="sz-landing-instagram-logo"
              alt="logo for leedur/skule upper years Instagram page"
            />
          </a><p>Check out our FroshNoMore Instagram page</p>
        </div>
      </section>
    </>
  );
};

export { SZLandingPage };
