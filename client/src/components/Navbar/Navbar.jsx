import { React, useState, useEffect } from 'react';
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

import { Link, useLocation } from 'react-router-dom';
import { pages } from '../../util/pages';

const Navbar = ({ isLoggedIn, froshInitials }) => {
  return (
    <>
      <div className="navbar-desktop">
        <NavbarDesktop isLoggedIn={isLoggedIn} froshInitials={froshInitials}></NavbarDesktop>
      </div>
      <div className="navbar-mobile">
        <NavbarMobile isLoggedIn={isLoggedIn} froshInitials={froshInitials}></NavbarMobile>
      </div>
    </>
  );
};

const NavbarDesktop = ({ isLoggedIn, froshInitials }) => {
  return (
    <div className="navbar-container">
      <div className="navbar-main">
        <img className="icon-logo" src={MainFroshLogo} alt="frosh logo"></img>
        {/* MAIN PAGES - Home, About, FAQ */}
        {pages.main.map((page) => {
          return (
            <Link
              to={useLocation().pathname === page.path ? {} : page.path}
              key={page.path}
              style={useLocation().pathname === page.path ? { pointerEvents: 'none' } : {}}
            >
              <div className="navbar-sub-container" key={page.path}>
                <div className="navbar-link"> {page.label} </div>
                {useLocation().pathname === page.path ? (
                  <div className="underline-page-selected"></div>
                ) : (
                  <div className="navbar-underline"></div>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      <div className="navbar-special">
        {/* SPECIAL PAGES - Profile, Register, Login*/}
        {pages.special.map((page) => {
          if (page.label === 'profile') {
            if (isLoggedIn) {
              return (
                <>
                  <div className="frosh-profile">F!rosh Profile</div>
                  <div className="icon-profile"> {froshInitials} </div>
                </>
              );
            }
            return <img className="icon-profile-person" alt="profile" src={ProfileIcon}></img>;
          } else if (page.label === 'Register' && !isLoggedIn) {
            return (
              <Link to={page.path} key={page.path}>
                <div className="register">{page.label}</div>
              </Link>
            );
          } else if (page.label === 'Login' && !isLoggedIn) {
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

const NavbarMobile = ({ isLoggedIn, froshInitials }) => {
  return (
    <div className="navbar-container">
      <img className="icon-logo" src={MainFroshLogo} alt="frosh logo"></img>

      <div className="navbar-main">
        {/* MAIN PAGES - Home, About, FAQ */}

        {pages.main.map((page) => {
          return (
            <Link to={page.path} key={page.path}>
              <div className="navbar-sub-container">
                <div className="navbar-menu-icon">
                  <img
                    className="navbar-svg-icon"
                    alt={
                      page.label === 'Home'
                        ? 'home'
                        : page.label === 'About'
                        ? 'about'
                        : page.label === 'FAQ'
                        ? 'faq'
                        : ''
                    }
                    src={
                      useLocation().pathname === page.path
                        ? page.label === 'Home'
                          ? HomeIconPurple
                          : page.label === 'About'
                          ? AboutIconPurple
                          : page.label === 'FAQ'
                          ? MessageIconPurple
                          : {}
                        : page.label === 'Home'
                        ? HomeIconGrey
                        : page.label === 'About'
                        ? AboutIconGrey
                        : page.label === 'FAQ'
                        ? MessageIconGrey
                        : {}
                    }
                  ></img>
                </div>
                {useLocation().pathname === page.path ? (
                  <div className="underline-page-selected"></div>
                ) : (
                  <div className="navbar-underline"></div>
                )}
              </div>
            </Link>
          );
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
  isLoggedIn: PropTypes.bool, // button appears if frosh is logged in
  froshInitials: PropTypes.string, // frosh initials used for profile
};

const defaultProps = {
  isLoggedIn: false,
};

Navbar.propTypes = propTypes;
NavbarDesktop.propTypes = propTypes;
NavbarMobile.propTypes = propTypes;

Navbar.defaultProps = defaultProps;
NavbarDesktop.defaultProps = defaultProps;
NavbarMobile.defaultProps = defaultProps;

export { Navbar, NavbarDesktop, NavbarMobile };
