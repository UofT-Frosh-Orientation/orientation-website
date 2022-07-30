import { React, useEffect, useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { DarkModeContext } from '../../util/DarkModeProvider';

import DarkModeIcon from '../../assets/profiledropdown/moon-solid.svg';
import DarkModeIconDarkMode from '../../assets/darkmode/profiledropdown/sun-solid.svg';

import './ProfileDropdown.scss';

const ProfileDropdown = ({ open, setOpen, items }) => {
  const { darkMode, setDarkModeStatus } = useContext(DarkModeContext);

  let count = 0; // counts which page
  let totalItems = items.length;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  return (
    <>
      <div
        className={`profile-dropdown-bg ${
          open ? 'profile-dropdown-bg-display' : 'profile-dropdown-bg-hide'
        }`}
        onClick={() => {
          setOpen(false);
        }}
      >
        <div
          className={`profile-dropdown-container ${
            open ? 'profile-dropdown-container-display' : ''
          }`}
        >
          {items.map((item) => {
            count++;

            if (item.path === undefined) {
              return (
                <div
                  key={item.label}
                  className="profile-dropdown-item-container"
                  style={
                    count === 1 ? { borderTopLeftRadius: '5px', borderTopRightRadius: '5px' } : {}
                  }
                  onClick={() => {
                    item.function({ navigate, dispatch });
                  }}
                >
                  {darkMode ? (
                    <img
                      src={item.iconDark}
                      alt={item.label}
                      className="profile-dropdown-item-img"
                    />
                  ) : (
                    <img src={item.icon} alt={item.label} className="profile-dropdown-item-img" />
                  )}
                  <p className="profile-dropdown-item-label">{item.label}</p>
                </div>
              );
            } else {
              return (
                <Link
                  to={pathname === item.path ? {} : item.path}
                  key={item.path}
                  style={pathname === item.path ? { pointerEvents: 'none' } : {}}
                >
                  <div
                    key={item.label}
                    className={`profile-dropdown-item-container ${
                      pathname === item.path ? 'profile-dropdown-item-container-selected' : ''
                    }`}
                    style={
                      count === 1 ? { borderTopLeftRadius: '5px', borderTopRightRadius: '5px' } : {}
                    }
                  >
                    {darkMode ? (
                      <img
                        src={item.iconDark}
                        alt={item.label}
                        className="profile-dropdown-item-img"
                      />
                    ) : (
                      <img src={item.icon} alt={item.label} className="profile-dropdown-item-img" />
                    )}

                    <p className="profile-dropdown-item-label">{item.label}</p>
                  </div>
                </Link>
              );
            }
          })}
          <div
            className="profile-dropdown-item-container"
            style={{ borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px' }}
            onClick={() => {
              setDarkModeStatus(!darkMode);
            }}
          >
            {darkMode ? (
              <img
                src={DarkModeIconDarkMode}
                alt={'dark mode icon'}
                className="profile-dropdown-item-img"
              />
            ) : (
              <img
                src={DarkModeIcon}
                alt={'dark mode icon'}
                className="profile-dropdown-item-img"
              />
            )}
            <p className="profile-dropdown-item-label">{darkMode ? 'Light Mode' : 'Dark Mode'}</p>
          </div>
        </div>
      </div>
    </>
  );
};

ProfileDropdown.propTypes = {
  open: PropTypes.bool, // opens the profile dropdown menu
  setOpen: PropTypes.func,

  items: PropTypes.array, // array of objects with pages to be displayed
};

export { ProfileDropdown };
