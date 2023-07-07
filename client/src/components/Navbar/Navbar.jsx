import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import './Navbar.scss';

import HomeIconPurple from '../../assets/navbar/house-solid-purple.svg';
import AboutIconPurple from '../../assets/navbar/circle-info-solid-purple.svg';
import MessageIconPurple from '../../assets/navbar/message-solid-purple.svg';
import HomeIconGrey from '../../assets/navbar/house-solid-grey.svg';
import AboutIconGrey from '../../assets/navbar/circle-info-solid-grey.svg';
import MessageIconGrey from '../../assets/navbar/message-solid-grey.svg';

import HomeIconHighlightDarkMode from '../../assets/darkmode/navbar/house-solid-purple.svg';
import AboutIconHighlightDarkMode from '../../assets/darkmode/navbar/circle-info-solid-purple.svg';
import MessageIconHighlightDarkMode from '../../assets/darkmode/navbar/message-solid-purple.svg';
import HomeIconDefaultDarkMode from '../../assets/darkmode/navbar/house-solid-grey.svg';
import AboutIconDefaultDarkMode from '../../assets/darkmode/navbar/circle-info-solid-grey.svg';
import MessageIconDefaultDarkMode from '../../assets/darkmode/navbar/message-solid-grey.svg';

import ProfileIcon from '../../assets/navbar/circle-user-solid-purple.svg';
import ProfileIconDarkMode from '../../assets/darkmode/navbar/circle-user-solid-purple.svg';
import MainFroshLogo from '../../assets/logo/frosh-main-logo-with-bg.svg';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { pages } from '../../util/pages';
import { profilePages } from '../../util/profile-pages';
import { PopupModal } from '../popup/PopupModal';
import { Button } from '../button/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../state/user/saga';
import { ProfileDropdown } from '../ProfileDropdown/ProfileDropdown';
import { DarkModeContext } from '../../util/DarkModeProvider';
import { userSelector } from '../../state/user/userSlice';

const Navbar = ({ isLoggedIn, froshInitials, isRegistered }) => {
  const { darkMode, setDarkModeStatus } = useContext(DarkModeContext);

  return (
    <>
      {/* <div
        onClick={() => {
          setDarkModeStatus(!darkMode);
        }}
        style={{
          height: '100px',
          width: '100px',
          backgroundColor: 'red',
          position: 'absolute',
          top: 0,
          right: 0,
          zIndex: 100,
        }}
      ></div> */}
      <div className="navbar-desktop">
        <NavbarDesktop
          isLoggedIn={isLoggedIn}
          froshInitials={froshInitials}
          isRegistered={isRegistered}
        ></NavbarDesktop>
      </div>
      <div className="navbar-mobile">
        <NavbarMobile
          isLoggedIn={isLoggedIn}
          froshInitials={froshInitials}
          isRegistered={isRegistered}
        ></NavbarMobile>
      </div>
    </>
  );
};

const NavbarDesktop = ({ isLoggedIn, froshInitials, isRegistered }) => {
  const { pathname } = useLocation();
  const [openProfileDropdown, setOpenProfileDropdown] = useState(false);
  const { darkMode, setDarkModeStatus } = useContext(DarkModeContext);
  const { user } = useSelector(userSelector);
  const leader = user?.userType === 'leadur';

  return (
    <>
      {isLoggedIn ? (
        isRegistered === true || leader === true ? (
          <ProfileDropdown
            open={openProfileDropdown}
            setOpen={setOpenProfileDropdown}
            items={profilePages.register}
          />
        ) : (
          <ProfileDropdown
            open={openProfileDropdown}
            setOpen={setOpenProfileDropdown}
            items={profilePages.login}
          />
        )
      ) : (
        <ProfileDropdown
          open={openProfileDropdown}
          setOpen={setOpenProfileDropdown}
          items={profilePages.preRegistration}
        />
      )}

      <div className="navbar-container">
        <div className="navbar-main">
          <img className="icon-logo" src={MainFroshLogo} alt="frosh logo"></img>
          {/* MAIN PAGES - Home, About, FAQ */}
          {pages.main.map((page) => {
            return (
              <React.Fragment key={page.path}>
                <Link
                  to={pathname === page.path ? {} : page.path}
                  key={page.path}
                  style={pathname === page.path ? { pointerEvents: 'none' } : {}}
                >
                  <div className="navbar-sub-container" key={page.path}>
                    <div className="navbar-link"> {page.label} </div>
                    {pathname === page.path ? (
                      <div className="underline-page-selected"></div>
                    ) : (
                      <div className="navbar-underline"></div>
                    )}
                  </div>
                </Link>
              </React.Fragment>
            );
          })}
        </div>
        <div className="navbar-special">
          {/* SPECIAL PAGES - Profile, Register, Login*/}
          {pages.special.map((page) => {
            // Clicking on profile button
            if (page.label === 'Profile') {
              if (isLoggedIn && froshInitials !== 'undefinedundefined') {
                // if logged in
                return (
                  <>
                    <div
                      key={page.path}
                      className="icon-profile"
                      onClick={() => {
                        setOpenProfileDropdown(!openProfileDropdown);
                      }}
                    >
                      {' '}
                      {froshInitials}{' '}
                    </div>
                  </>
                );
              } else {
                // if not logged in
                return (
                  <div
                    key={page.path}
                    className="icon-profile-person-container"
                    onClick={() => {
                      setOpenProfileDropdown(!openProfileDropdown);
                    }}
                  >
                    {!darkMode ? (
                      <img className="icon-profile-person" alt="profile" src={ProfileIcon}></img>
                    ) : (
                      <img
                        className="icon-profile-person"
                        alt="profile"
                        src={ProfileIconDarkMode}
                      ></img>
                    )}
                  </div>
                );
              }
            }
          })}
        </div>
      </div>
    </>
  );
};

const NavbarMobile = ({ isLoggedIn, froshInitials, isRegistered }) => {
  let pathname = useLocation().pathname;
  const [openProfileDropdown, setOpenProfileDropdown] = useState(false);
  const { darkMode, setDarkModeStatus } = useContext(DarkModeContext);
  const { user } = useSelector(userSelector);
  const leader = user?.userType === 'leadur';

  return (
    <>
      {isLoggedIn ? (
        isRegistered === true || leader === true ? (
          <ProfileDropdown
            open={openProfileDropdown}
            setOpen={setOpenProfileDropdown}
            items={profilePages.register}
          />
        ) : (
          <ProfileDropdown
            open={openProfileDropdown}
            setOpen={setOpenProfileDropdown}
            items={profilePages.login}
          />
        )
      ) : (
        <ProfileDropdown
          open={openProfileDropdown}
          setOpen={setOpenProfileDropdown}
          items={profilePages.notLogin}
        />
      )}

      <div className="navbar-container">
        <img className="icon-logo" src={MainFroshLogo} alt="frosh logo"></img>

        <div className="navbar-main">
          {/* MAIN PAGES - Home, About, FAQ */}
          {pages.main.map((page) => {
            return (
              <React.Fragment key={page.path}>
                <Link
                  to={page.path}
                  key={page.path}
                  style={pathname === page.path ? { pointerEvents: 'none' } : {}}
                >
                  <div className="navbar-sub-container">
                    <div className="navbar-menu-icon">
                      {!darkMode ? (
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
                            pathname === page.path
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
                      ) : (
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
                            pathname === page.path
                              ? page.label === 'Home'
                                ? HomeIconHighlightDarkMode
                                : page.label === 'About'
                                ? AboutIconHighlightDarkMode
                                : page.label === 'FAQ'
                                ? MessageIconHighlightDarkMode
                                : {}
                              : page.label === 'Home'
                              ? HomeIconDefaultDarkMode
                              : page.label === 'About'
                              ? AboutIconDefaultDarkMode
                              : page.label === 'FAQ'
                              ? MessageIconDefaultDarkMode
                              : {}
                          }
                        ></img>
                      )}
                    </div>
                    {pathname === page.path ? (
                      <div className="underline-page-selected"></div>
                    ) : (
                      <div className="navbar-underline"></div>
                    )}
                  </div>
                </Link>
              </React.Fragment>
            );
          })}
        </div>

        {pages.special.map((page) => {
          if (page.label === 'Login') {
            if (isLoggedIn && froshInitials !== 'undefinedundefined') {
              return (
                <div
                  key={page.path}
                  className="icon-profile"
                  onClick={() => {
                    setOpenProfileDropdown(!openProfileDropdown);
                  }}
                >
                  {' '}
                  {froshInitials}{' '}
                </div>
              );
            } else {
              return (
                <div
                  key={page.path}
                  className="icon-profile-person-container"
                  onClick={() => {
                    setOpenProfileDropdown(!openProfileDropdown);
                  }}
                >
                  {!darkMode ? (
                    <img className="icon-profile-person" alt="profile" src={ProfileIcon}></img>
                  ) : (
                    <img
                      className="icon-profile-person"
                      alt="profile"
                      src={ProfileIconDarkMode}
                    ></img>
                  )}
                </div>
                // </Link>
              );
            }
          }
        })}
      </div>
    </>
  );
};

const propTypes = {
  isLoggedIn: PropTypes.bool, // button appears if frosh is logged in
  froshInitials: PropTypes.string, // frosh initials used for profile
  isRegistered: PropTypes.bool,
};

const defaultProps = {
  isLoggedIn: false,
  isRegistered: false,
};

Navbar.propTypes = propTypes;
NavbarDesktop.propTypes = propTypes;
NavbarMobile.propTypes = propTypes;

Navbar.defaultProps = defaultProps;
NavbarDesktop.defaultProps = defaultProps;
NavbarMobile.defaultProps = defaultProps;

export { Navbar, NavbarDesktop, NavbarMobile };
