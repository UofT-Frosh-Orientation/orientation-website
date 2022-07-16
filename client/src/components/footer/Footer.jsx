import React from 'react';
import PropTypes from 'prop-types';
import './Footer.scss';
import { pages } from '../../util/pages';
import { Link, useLocation } from 'react-router-dom';
import { socials } from '../../util/socials';
import Wave from '../../assets/misc/wave.png';
import bug from '../../assets/misc/bug-solid.svg';

const Footer = () => {
  return (
    <>
      <img src={Wave} className="wave-image wave-image-footer" />
      <div className="footer-container">
        <div className="sitemap">
          <div className="sitemap-text">Site Map</div>
          <div className="sitemap-links">
            {pages.main.map((page, index) => {
              return (
                <div key={page.path}>
                  <Link
                    className="links"
                    to={useLocation().pathname === page.path ? {} : page.path}
                    key={page.path}
                    style={
                      useLocation().pathname === page.path
                        ? { pointerEvents: 'none', color: 'white' }
                        : {}
                    }
                  >
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
          <div className="footer-message-container">
            <a
              className={`footer-bug-link ${'no-link-style'}`}
              href="https://github.com/UofT-Frosh-Orientation/orientation-website/issues/new?assignees=&labels=bug&template=bug_report.yml&title=%5BBug%5D%3A+"
              target="_blank"
              rel="noreferrer"
            >
              <div className="footer-bug-container">
                <img className="footer-bug" src={bug} alt="bug icon"></img>
                <p className="footer-bug-message">
                  File bugs reports <span className="footer-bug-message-underline">here</span> using
                  your GitHub account!
                </p>
              </div>
            </a>

            <div className="footer-message">Made with 💜 by the F!rosh Week 2T2 Tech Team</div>
          </div>
        </div>
      </div>
    </>
  );
};

export { Footer };
