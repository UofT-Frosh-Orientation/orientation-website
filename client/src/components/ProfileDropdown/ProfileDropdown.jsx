import { React, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import './ProfileDropdown.scss';

//import Triangle from '../../assets/navbar/profiledropdown/triangle.svg'

const ProfileDropdown = ({ open, setOpen, items }) => {
  // pass in pages array --> array for when not logged in
  // array for when logged in

  //const [items, setItems] = useState(0);
  let count = 0; // counts which page
  let totalItems = items.length;

  const { pathname } = useLocation();
  //console.log(items);
  //console.log(pathname);

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
        <div className="profile-dropdown-container">
          {/* <img src={Triangle} className='profile-dropdown-triangle' alt='triangle' ></img> */}
          {items.map((item) => {
            count++;

            if (item.path === undefined) {
              return (
                <div
                  key={item.label}
                  className="profile-dropdown-item-container"
                  style={
                    totalItems === 1
                      ? { borderRadius: '5px' }
                      : count === 1
                      ? { borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }
                      : count === totalItems
                      ? { borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px' }
                      : {}
                  }
                  onClick={item.function}
                >
                  <img
                    src={item.icon}
                    alt={item.label}
                    className="profile-dropdown-item-img hide-darkmode"
                  />
                  <img
                    src={item.iconDark}
                    alt={item.label}
                    className="profile-dropdown-item-img show-darkmode"
                  />
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
                      totalItems === 1
                        ? { borderRadius: '5px' }
                        : count === 1
                        ? { borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }
                        : count === totalItems
                        ? { borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px' }
                        : {}
                    }
                  >
                    <img
                      src={item.icon}
                      alt={item.label}
                      className="profile-dropdown-item-img hide-darkmode"
                    />
                    <img
                      src={item.iconDark}
                      alt={item.label}
                      className="profile-dropdown-item-img show-darkmode"
                    />
                    <p className="profile-dropdown-item-label">{item.label}</p>
                  </div>
                </Link>
              );
            }
          })}
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
