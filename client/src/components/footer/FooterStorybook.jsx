import React from 'react';
import PropTypes from 'prop-types';
import './Footer.scss';
import { socials } from '../../util/socials';

const pages = {
  main: [
    {
      label: 'Home',
      path: '/',
    },
    {
      label: 'About',
      path: '/about',
    },
    {
      label: 'FAQ',
      path: '/faq',
    },
  ],
};

const FooterStorybook = () => {
  return (
    <div className="footer-container">
      <div className="sitemap">
        <div className="sitemap-text">Site Map</div>
        <div className="sitemap-links">
          {pages.main.map((page, index) => {
            return (
              <div key={page.path}>
                <ul className="links" key={page.path}>
                  {page.label}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      <div className="socials">
        <div className="icons">
          {socials.map((social) => {
            return (
              <img
                key={social.label}
                className="svg-icons"
                alt={social.label}
                src={social.icon}
              ></img>
            );
          })}
          {/* <img className="svg-icons" alt="instagram" src={InstagramLogo}></img> */}
        </div>
        <div className="footer-message">Made with 💜 by the F!rosh Week 2T3 Tech Team</div>
      </div>
    </div>
  );
};

export { FooterStorybook };
