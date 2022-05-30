import React from 'react';
import PropTypes from 'prop-types';
import './NavbarMobile-Storybook.scss';

const pages = {
  404: {
    label: '404',
  },
  main: [
    {
      label: 'Home',
    },
    {
      label: 'About',
    },
    {
      label: 'FAQ',
    },
  ],
  special: [
    {
      label: 'Login',
    },
    {
      label: 'Register',
    },
    {
      label: 'profile',
    },
  ],
  hidden: [
    {
      label: 'Permission Request',
    },
  ],
};

const NavbarMobileStorybook = () => {
  return (
    <div className="container">
      <div className="icon-logo"></div>

      <div className="main">
        {/* MAIN PAGES - Home, About, FAQ */}

        {pages.main.map((page) => {
          if (page.label === 'Home') {
            return (
              <div className="sub-container">
                <div className="menu-icon"></div>
                {/* <FontAwesomeIcon icon="fa-solid fa-house" /> */}
                <div className="underline"></div>
              </div>
            );
          } else if (page.label === 'About') {
            return (
              <div className="sub-container">
                <div className="menu-icon"></div>
                {/* <FontAwesomeIcon icon="fa-regular fa-circle-info" /> */}
                <div className="underline"></div>
              </div>
            );
          } else if (page.label === 'FAQ') {
            return (
              <div className="sub-container">
                <div className="menu-icon"></div>
                {/* <FontAwesomeIcon icon="fa-solid fa-messages-question" /> */}
                <div className="underline"></div>
              </div>
            );
          }
        })}
      </div>

      {pages.special.map((page) => {
        if (page.label === 'Login') {
          return <div className="login">{page.label}</div>;
        }
      })}
    </div>
  );
};

export { NavbarMobileStorybook };
