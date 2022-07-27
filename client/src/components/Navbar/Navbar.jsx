import { React, useState, useEffect } from 'react';
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
import { useDispatch } from 'react-redux';
import { logout } from '../../pages/Login/saga';
import { ProfileDropdown } from '../ProfileDropDown/ProfileDropdown';

const Navbar = ({ isLoggedIn, froshInitials, isRegistered }) => {
  return (
    <>
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
  const [showlogoutPopup, setShowLogoutPopup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [openProfileDropdown, setOpenProfileDropdown] = useState(false);

  return (
    <>
      {isLoggedIn ? (
        isRegistered ? (
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

      <PopupModal
        trigger={showlogoutPopup}
        setTrigger={setShowLogoutPopup}
        heading={'Are you sure you want to logout?'}
        exitIcon={true}
        blurBackground={false}
      >
        <Button
          isSecondary={true}
          label={'Logout'}
          onClick={() => {
            console.log('Logging out');
            dispatch(logout({ navigate, setShowLogoutPopup }));
          }}
        />
      </PopupModal>

      <div className="navbar-container">
        <div className="navbar-main">
          <img className="icon-logo" src={MainFroshLogo} alt="frosh logo"></img>
          {/* MAIN PAGES - Home, About, FAQ */}
          {pages.main.map((page) => {
            return (
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
            );
          })}
        </div>
        <div className="navbar-special">
          {/* {isLoggedIn ? (
            <div
              style={{ cursor: 'pointer' }}
              className="navbar-logout-button"
              onClick={() => {
                setShowLogoutPopup(true);
              }}
            >
              Logout
            </div>
          ) : (
            <></>
          )} */}
          {/* SPECIAL PAGES - Profile, Register, Login*/}
          {pages.special.map((page) => {
            // Clicking on profile button
            if (page.label === 'Profile') {
              if (isLoggedIn) {
                // if logged in
                return (
                  // <Link
                  //   to={page.path}
                  //   key={page.path}
                  //   style={pathname === page.path ? { pointerEvents: 'all' } : {}}
                  // >
                  <>
                    {/* <div className="frosh-profile" onClick={()=> {
                      setOpenProfileDropdown(!openProfileDropdown)
                    }}>Profile</div> */}

                    <div
                      className="icon-profile"
                      onClick={() => {
                        setOpenProfileDropdown(!openProfileDropdown);
                      }}
                    >
                      {' '}
                      {froshInitials}{' '}
                    </div>
                  </>
                  // </Link>
                );
              }
              // if not logged in
              return (
                // <Link
                //   to={page.path}
                //   key={page.path}
                //   style={
                //     pathname === page.path || pathname === '/login' ? { pointerEvents: 'none' } : {}
                //   }
                // >
                <div
                  className="icon-profile-person-container"
                  onClick={() => {
                    setOpenProfileDropdown(!openProfileDropdown);
                  }}
                >
                  <img className="icon-profile-person" alt="profile" src={ProfileIcon}></img>
                  <img
                    className="icon-profile-person-darkmode"
                    alt="profile"
                    src={ProfileIconDarkMode}
                  ></img>
                </div>
                // </Link>
              );
            } // Clicking on register button
            // else if (page.label === 'Register' && isLoggedIn && !isRegistered) {
            //   // if logged in and not registered
            //   return (
            //     <Link
            //       to={page.path}
            //       key={page.path}
            //       style={pathname === page.path ? { pointerEvents: 'none' } : {}}
            //     >
            //       <div className="register">{page.label}</div>
            //     </Link>
            //   );
            // } // Clicking on login button
            // else if (page.label === 'Login' && !isLoggedIn) {
            //   // if not logged in, display login button
            //   return (
            //     <Link
            //       to={page.path}
            //       key={page.path}
            //       style={useLocation().pathname === page.path ? { pointerEvents: 'none' } : {}}
            //     >
            //       <div className="login">{page.label}</div>
            //     </Link>
            //   );
            // }
          })}
        </div>
      </div>
    </>
  );
};

const NavbarMobile = ({ isLoggedIn, froshInitials, isRegistered }) => {
  let pathname = useLocation().pathname;
  const [openProfileDropdown, setOpenProfileDropdown] = useState(false);

  return (
    <>
      {isLoggedIn ? (
        isRegistered ? (
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
              <Link
                to={page.path}
                key={page.path}
                style={pathname === page.path ? { pointerEvents: 'none' } : {}}
              >
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
                    <img
                      className="navbar-svg-icon-darkmode"
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
                  </div>
                  {pathname === page.path ? (
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
                // <Link
                //   to={page.path}
                //   key={page.path}
                //   style={pathname === page.path ? { pointerEvents: 'none' } : {}}
                // >
                // <div className="login">{page.label}</div>
                <div
                  className="icon-profile-person-container"
                  onClick={() => {
                    setOpenProfileDropdown(!openProfileDropdown);
                  }}
                >
                  <img className="icon-profile-person" alt="profile" src={ProfileIcon}></img>
                  <img
                    className="icon-profile-person-darkmode"
                    alt="profile"
                    src={ProfileIconDarkMode}
                  ></img>
                </div>
                // </Link>
              );
            } else if (isLoggedIn) {
              return (
                // mobile: profile icon -> link to frosh profile
                // <Link
                //   to={page.path}
                //   key={page.path}
                //   style={pathname === page.path ? { pointerEvents: 'none' } : {}}
                // >
                // <div className="icon-profile"> {froshInitials} </div>
                <div
                  className="icon-profile"
                  onClick={() => {
                    setOpenProfileDropdown(!openProfileDropdown);
                  }}
                >
                  {' '}
                  {froshInitials}{' '}
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
