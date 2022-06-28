import React from 'react';
import PropTypes from 'prop-types';
import './Navbar.scss';

import HomeIconPurple from '../../assets/navbar/house-solid-purple.svg';
import AboutIconPurple from '../../assets/navbar/circle-info-solid-purple.svg';
import MessageIconPurple from '../../assets/navbar/message-solid-purple.svg';
import HomeIconGrey from '../../assets/navbar/house-solid-grey.svg';
import AboutIconGrey from '../../assets/navbar/circle-info-solid-grey.svg';
import MessageIconGrey from '../../assets/navbar/message-solid-grey.svg';
import ProfileIcon from '../../assets/navbar/circle-user-solid-purple.svg';
import MainFroshLogo from '../../assets/logo/frosh-main-logo.svg';

import { Link } from 'react-router-dom';
import { pages } from '../../util/pages';

const Navbar = ({ selectedPage, isLoggedIn, froshInitials, isRegistered }) => {
  return (
    <>
      <div className="navbar-desktop">
        <NavbarDesktop
          selectedPage={selectedPage}
          isLoggedIn={isLoggedIn}
          froshInitials={froshInitials}
          isRegistered={isRegistered}
        ></NavbarDesktop>
      </div>
      <div className="navbar-mobile">
        <NavbarMobile
          selectedPage={selectedPage}
          isLoggedIn={isLoggedIn}
          froshInitials={froshInitials}
          isRegistered={isRegistered}
        ></NavbarMobile>
      </div>
    </>
  );
};

const NavbarDesktop = ({ selectedPage, isLoggedIn, froshInitials, isRegistered }) => {
  return (
    <div className="navbar-container">
      <div className="navbar-main">
        <img className="icon-logo" src={MainFroshLogo} alt="frosh logo"></img>
        {/* MAIN PAGES - Home, About, FAQ */}
        {pages.main.map((page) => {
          return (
            <Link to={page.path} key={page.path}>
              <div className="navbar-sub-container">
                <div className="navbar-link"> {page.label} </div>
                <div
                  className={`navbar-underline ${
                    selectedPage === page.label ? 'underline-selected' : ''
                  }`}
                ></div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="navbar-special">
        {/* SPECIAL PAGES - Profile, Register, Login*/}
        {pages.special.map((page) => {
          // Clicking on profile button
          if (page.label === 'Profile') {
            if (isLoggedIn) {
              // if logged in
              return (
                <Link to={page.path} key={page.path}>
                  <div className="frosh-profile">F!rosh Profile</div>
                  <div className="icon-profile"> {froshInitials} </div>
                </Link>
              );
            }
            // if not logged in
            return (
              <Link to="/login" key="/login">
                <img className="icon-profile-person" alt="profile" src={ProfileIcon}></img>;
              </Link>
            );
          } // Clicking on register button
          else if (page.label === 'Register') {
            // if not logged in
            if (!isLoggedIn) {
              return (
                <Link to="/login" key="/login">
                  <div className="login">Login</div>
                </Link>
              );
            } // if logged in and registered
            else if (isRegistered) {
              return <div></div>; // TODO: hide register button
            } // if logged in but not registered
            return (
              <Link to={page.path} key={page.path}>
                <div className="register">{page.label}</div>
              </Link>
            );
          } // Clicking on login button
          else if (page.label === 'Login' && !isLoggedIn) {
            // if not logged in
            if (!isLoggedIn) {
              return (
                <Link to={page.path} key={page.path}>
                  <div className="login">{page.label}</div>
                </Link>
              );
            } // if logged in
            else {
              return <div></div>; // TODO: hide login button
            }
          }
        })}
      </div>
    </div>
  );
};

// TODO: also make changes (done to web) for mobile
const NavbarMobile = ({ selectedPage, isLoggedIn, froshInitials, isRegistered }) => {
  return (
    <div className="navbar-container">
      <img className="icon-logo" src={MainFroshLogo} alt="frosh logo"></img>

      <div className="navbar-main">
        {/* MAIN PAGES - Home, About, FAQ */}

        {pages.main.map((page) => {
          if (page.label === 'Home') {
            return (
              <Link to={page.path} key={page.path}>
                <div className="navbar-sub-container">
                  <div className="menu-icon">
                    <img
                      className="svg-icon"
                      alt="home"
                      src={selectedPage === page.label ? HomeIconPurple : HomeIconGrey}
                    ></img>
                  </div>
                  <div
                    className={`navbar-underline ${
                      selectedPage === page.label ? 'underline-selected' : ''
                    }`}
                  ></div>
                </div>
              </Link>
            );
          } else if (page.label === 'About') {
            return (
              <Link to={page.path} key={page.path}>
                <div className="navbar-sub-container">
                  <div className="menu-icon">
                    <img
                      className={`svg-icon ${
                        selectedPage === page.label ? 'svg-icon-selected' : ''
                      }`}
                      alt="about"
                      src={selectedPage === page.label ? AboutIconPurple : AboutIconGrey}
                    ></img>
                  </div>
                  <div
                    className={`navbar-underline ${
                      selectedPage === page.label ? 'underline-selected' : ''
                    }`}
                  ></div>
                </div>
              </Link>
            );
          } else if (page.label === 'FAQ') {
            return (
              <Link to={page.path} key={page.path}>
                <div className="navbar-sub-container">
                  <div className="menu-icon">
                    <img
                      className={`svg-icon ${
                        selectedPage === page.label ? 'svg-icon-selected' : ''
                      }`}
                      alt="faq"
                      src={selectedPage === page.label ? MessageIconPurple : MessageIconGrey}
                    ></img>
                  </div>
                  <div
                    className={`navbar-underline ${
                      selectedPage === page.label ? 'underline-selected' : ''
                    }`}
                  ></div>
                </div>
              </Link>
            );
          }
        })}
      </div>

      {pages.special.map((page) => {
        if (page.label === 'Login') {
          if (!isLoggedIn) {
            return (
              <Link to={page.path} key={page.path}>
                <div className="login">{page.label}</div>
              </Link>
            );
          } else if (isLoggedIn) {
            return (
              // mobile: profile icon -> link to frosh profile
              <Link to={page.path} key={page.path}>
                <div className="icon-profile"> {froshInitials} </div>
              </Link>
            );
          }
        }
      })}
    </div>
  );
};

const propTypes = {
  // the page the user is on
  selectedPage: PropTypes.string,

  // button appears if frosh is logged in
  isLoggedIn: PropTypes.bool,

  // frosh initials used for profile
  froshInitials: PropTypes.string,

  // register button disappears if frosh is already registered
  isRegistered: PropTypes.bool,
};

Navbar.propTypes = propTypes;
NavbarDesktop.propTypes = propTypes;
NavbarMobile.propTypes = propTypes;

export { Navbar, NavbarDesktop, NavbarMobile };
