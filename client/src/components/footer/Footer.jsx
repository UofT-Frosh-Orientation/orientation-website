import React from 'react';
import PropTypes from 'prop-types';
import './Footer.scss';
import { pages } from '../../util/pages';
import { Link } from 'react-router-dom';
import { socials } from '../../util/socials';

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="sitemap">
        <div className="sitemap-text">Site Map</div>
        <div className="sitemap-links">
          {pages.main.map((page, index) => {
            return (
              <div key={page.path}>
                <Link className="links" to={page.path} key={page.path}>
                  {page.label}
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <div className="socials">
        <div className="icons">
          {socials.map((social) => {
            return (
              <a href={social.link} target="_blank" rel="noreferrer" key={social.label}>
                <img className="svg-icons" alt={social.label} src={social.icon}></img>
              </a>
            );
          })}
        </div>
        <div className="footer-message">Made with 💜 by the F!rosh Week 2T2 Tech Team</div>
      </div>
    </div>
  );
};

export { Footer };
