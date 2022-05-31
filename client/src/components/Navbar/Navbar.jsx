import React from 'react';
import PropTypes from 'prop-types';
import './Navbar.scss';
import { pages } from '../../util/pages';
import { Link } from 'react-router-dom';

const NavbarDesktop = () => {
  return (
    <div className="container">
      <div className="main">
        <div className="icon-logo"></div>
        {/* MAIN PAGES - Home, About, FAQ */}
        {pages.main.map((page) => {
          return (
            <Link to={page.path} key={page.path}>
              <div className="sub-container">
                <div className="navbar-link"> {page.label} </div>
                <div className="underline"></div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="special">
        {/* SPECIAL PAGES - Profile, Register, Login*/}
        {pages.special.map((page) => {
          if (page.label === 'profile') {
            return (
              <Link to={page.path} key={page.path}>
                <div className="icon-profile"> AA </div>
              </Link>
            );
          } else if (page.label === 'Register') {
            return (
              <Link to={page.path} key={page.path}>
                <div className="register">{page.label}</div>
              </Link>
            );
          } else if (page.label === 'Login') {
            return (
              <Link to={page.path} key={page.path}>
                <div className="login">{page.label}</div>
              </Link>
            );
          }
        })}
      </div>
    </div>
  );
};

const NavbarMobile = () => {
  return (
    <div className="container">
      <div className="icon-logo"></div>

      <div className="main">
        {/* MAIN PAGES - Home, About, FAQ */}

        {pages.main.map((page) => {
          if (page.label === 'Home') {
            return (
              <Link to={page.path} key={page.path}>
                <div className="sub-container">
                  <div className="menu-icon"></div>
                  {/* <FontAwesomeIcon icon="fa-solid fa-house" /> */}
                  <div className="underline"></div>
                </div>
              </Link>
            );
          } else if (page.label === 'About') {
            return (
              <Link to={page.path} key={page.path}>
                <div className="sub-container">
                  <div className="menu-icon"></div>
                  {/* <FontAwesomeIcon icon="fa-regular fa-circle-info" /> */}
                  <div className="underline"></div>
                </div>
              </Link>
            );
          } else if (page.label === 'FAQ') {
            return (
              <Link to={page.path} key={page.path}>
                <div className="sub-container">
                  <div className="menu-icon"></div>
                  {/* <FontAwesomeIcon icon="fa-solid fa-messages-question" /> */}
                  <div className="underline"></div>
                </div>
              </Link>
            );
          }
        })}
      </div>

      {pages.special.map((page) => {
        if (page.label === 'Login') {
          return (
            <Link to={page.path} key={page.path}>
              <div className="login">{page.label}</div>
            </Link>
          );
        }
      })}
    </div>
  );
};

const Navbar = () => {
  return (
    <>
      <div className="navbar-desktop">
        <NavbarDesktop></NavbarDesktop>
      </div>
      <div className="navbar-mobile">
        <NavbarMobile></NavbarMobile>
      </div>
    </>
  );
};

const propTypes = {
  // the page the user is on
  selectedPage: PropTypes.string,

  // button appears if frosh is logged in
  isLoggedIn: PropTypes.bool,

  // frosh initials used for profile
  froshInitials: PropTypes.string,
};

Navbar.propTypes = propTypes;
NavbarDesktop.propTypes = propTypes;
NavbarMobile.propTypes = propTypes;

export { Navbar };
