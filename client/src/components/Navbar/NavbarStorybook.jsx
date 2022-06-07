import React from 'react';
import PropTypes from 'prop-types';
import './Navbar.scss';
import HomeIcon from '../../assets/navbar/house-solid.svg';
import AboutIcon from '../../assets/navbar/circle-info-solid.svg';
import MessageIcon from '../../assets/navbar/message-solid.svg';
import ProfileIcon from '../../assets/navbar/circle-user-solid.svg';
import MainFroshLogo from '../../assets/logo/main-frosh-logo.png';

const pages = {
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
};

const NavbarStorybook = ({ selectedPage, isLoggedIn, froshInitials }) => {
  return (
    <>
      <div className="navbar-desktop">
        <NavbarDesktop
          selectedPage={selectedPage}
          isLoggedIn={isLoggedIn}
          froshInitials={froshInitials}
        ></NavbarDesktop>
      </div>
      <div className="navbar-mobile">
        <NavbarMobile
          selectedPage={selectedPage}
          isLoggedIn={isLoggedIn}
          froshInitials={froshInitials}
        ></NavbarMobile>
      </div>
    </>
  );
};

const NavbarDesktop = ({ selectedPage, isLoggedIn, froshInitials }) => {
  return (
    <div className="container">
      <div className="main">
        <img className="icon-logo" alt="frosh logo" src={MainFroshLogo}></img>
        {/* MAIN PAGES - Home, About, FAQ */}
        {pages.main.map((page) => {
          return (
            <li key={page.label}>
              <div className="sub-container">
                <div className="navbar-link"> {page.label} </div>
                {/* <div className="underline"></div> */}
                <div
                  className={`underline ${selectedPage === page.label ? 'underline-selected' : ''}`}
                ></div>
              </div>
            </li>
            // <Link to={page.path} key={page.path}>

            // </Link>
          );
        })}
      </div>

      <div className="special">
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
            return (
              // <Link to={page.path} key={page.path}>
              <img className="icon-profile-person" alt="profile" src={ProfileIcon}></img>
              // <div className="icon-profile-person"></div>
              // </Link>
            );
          } else if (page.label === 'Register' && !isLoggedIn) {
            return (
              // <Link to={page.path} key={page.path}>
              <div className="register">{page.label}</div>
              // </Link>
            );
          } else if (page.label === 'Login' && !isLoggedIn) {
            return (
              // <Link to={page.path} key={page.path}>
              <div className="login">{page.label}</div>
              // </Link>
            );
          }
        })}
      </div>
    </div>
  );
};

const NavbarMobile = ({ selectedPage, isLoggedIn, froshInitials }) => {
  return (
    <div className="container">
      <img className="icon-logo" alt="frosh logo" src={MainFroshLogo}></img>

      <div className="main">
        {/* MAIN PAGES - Home, About, FAQ */}

        {pages.main.map((page) => {
          if (page.label === 'Home') {
            return (
              // <Link to={page.path} key={page.path}>
              <div className="sub-container">
                <div className="menu-icon">
                  <img
                    className={`svg-icon ${selectedPage === page.label ? 'svg-icon-selected' : ''}`}
                    alt="home"
                    src={HomeIcon}
                  ></img>
                </div>
                {/* <div className="underline"></div> */}
                <div
                  className={`underline ${selectedPage === page.label ? 'underline-selected' : ''}`}
                ></div>
              </div>
              // </Link>
            );
          } else if (page.label === 'About') {
            return (
              // <Link to={page.path} key={page.path}>
              <div className="sub-container">
                <div className="menu-icon">
                  <img
                    className={`svg-icon ${selectedPage === page.label ? 'svg-icon-selected' : ''}`}
                    alt="about"
                    src={AboutIcon}
                  ></img>
                  {/* <div className={`svg-icon ${(selectedPage === page.label) ? 'svg-icon-selected' : ''}` }></div> */}
                </div>
                {/* <FontAwesomeIcon icon="fa-regular fa-circle-info" /> */}
                {/* <div className="underline"></div> */}
                <div
                  className={`underline ${selectedPage === page.label ? 'underline-selected' : ''}`}
                ></div>
              </div>
              // </Link>
            );
          } else if (page.label === 'FAQ') {
            return (
              // <Link to={page.path} key={page.path}>
              <div className="sub-container">
                <div className="menu-icon">
                  <img
                    className={`svg-icon ${selectedPage === page.label ? 'svg-icon-selected' : ''}`}
                    alt="faq"
                    src={MessageIcon}
                  ></img>
                </div>
                {/* <FontAwesomeIcon icon="fa-solid fa-messages-question" /> */}
                {/* <div className="underline"></div> */}
                <div
                  className={`underline ${selectedPage === page.label ? 'underline-selected' : ''}`}
                ></div>
              </div>
              // </Link>
            );
          }
        })}
      </div>

      {pages.special.map((page) => {
        if (page.label === 'Login') {
          if (!isLoggedIn) {
            return (
              // <Link to={page.path} key={page.path}>
              <div className="login">{page.label}</div>
              // </Link>
            );
          } else if (isLoggedIn) {
            return (
              // mobile: profile icon -> link to frosh profile
              <div className="icon-profile"> {froshInitials} </div>
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
};

NavbarStorybook.propTypes = propTypes;
NavbarDesktop.propTypes = propTypes;
NavbarMobile.propTypes = propTypes;

export { NavbarStorybook, NavbarDesktop, NavbarMobile };
