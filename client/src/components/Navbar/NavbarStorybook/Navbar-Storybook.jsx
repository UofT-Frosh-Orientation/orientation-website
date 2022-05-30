import React from 'react';
import PropTypes from 'prop-types';
import '../Navbar.scss';

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

const NavbarStorybook = () => {
  return (
    <div className="container">
      <div className="main">
        <div className="icon-logo"></div>
        {/* MAIN PAGES - Home, About, FAQ */}
        {pages.main.map((page) => {
          if (page.label === 'Home') {
            return (
              <div className="sub-container">
                <div className="navbar-link"> {page.label} </div>
                <div className="underline"></div>
              </div>
            );
          } else if (page.label === 'About') {
            return (
              <div className="sub-container">
                <div className="navbar-link"> {page.label} </div>
                <div className="underline"></div>
              </div>
            );
          } else if (page.label === 'FAQ') {
            return (
              <div className="sub-container">
                <div className="navbar-link"> {page.label} </div>
                <div className="underline"></div>
              </div>
            );
          }
        })}
      </div>

      <div className="special">
        {/* SPECIAL PAGES - Profile, Register, Login*/}
        {pages.special.map((page) => {
          if (page.label === 'profile') {
            return <div className="icon-profile"> AA </div>;
          } else if (page.label === 'Register') {
            return <div className="register">{page.label}</div>;
          } else if (page.label === 'Login') {
            return <div className="login">{page.label}</div>;
          }
        })}
      </div>
    </div>
  );
};

export { NavbarStorybook };
