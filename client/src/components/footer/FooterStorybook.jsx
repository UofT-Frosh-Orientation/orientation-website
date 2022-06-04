import React from 'react';
import PropTypes from 'prop-types';
import './Footer.scss';

import FacebookIcon from '../../assets/social/facebook-square-brands.svg';
import InstagramIcon from '../../assets/social/instagram-square-brands.svg';
import TwitterIcon from '../../assets/social/twitter-square-brands.svg';
import SnapchatIcon from '../../assets/social/snapchat-square-brands.svg';
import YoutubeIcon from '../../assets/social/youtube-square-brands.svg';

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
const socials = [
  {
    label: 'Facebook',
    link: 'https://bit.ly/froshfb',
    icon: FacebookIcon,
  },
  {
    label: 'Instagram',
    link: 'https://bit.ly/froshig',
    icon: InstagramIcon,
  },
  {
    label: 'Twitter',
    link: 'https://bit.ly/froshweektwitter',
    icon: TwitterIcon,
  },
  {
    label: 'Snapchat',
    link: 'https://bit.ly/2N3dlXt',
    icon: SnapchatIcon,
  },
  {
    label: 'YoutubeIcon',
    link: 'https://bit.ly/froshtube',
    icon: YoutubeIcon,
  },
];

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
        <div className="footer-message">Made with 💜 by the F!rosh Week 2T2 Tech Team</div>
      </div>
    </div>
  );
};

export { FooterStorybook };
