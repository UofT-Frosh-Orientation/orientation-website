import { React, useEffect, useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { DarkModeContext } from '../../util/DarkModeProvider';
import './DashboardDropdown.scss';
import { userSelector } from '../../state/user/userSlice';
import Arrow from '../../../assets/icons/angle-down-solid.svg';
import ArrowDarkMode from '../../assets/darkmode/icons/angle-down-solid.svg';

const DashboardDropdown = ({ open, setOpen, items, title, icon }) => {
  const { darkMode, setDarkModeStatus } = useContext(DarkModeContext);
  let count = 0; // counts which page
  const { pathname } = useLocation();

  return (
    <>
      <div className={'dashboard-dropdown-links'} key={title}>
        <div className={'dashboard-dropdown-title'} onClick={() => setOpen(!open)}>
          <img src={icon} className={'dashboard-dropdown-icon'} />
          <h3 className={'dashboard-dropdown-text'}>{title}</h3>
          <div className={`dashboard-dropdown-image${open ? ' open' : ''}`}>
            {darkMode ? (
              <img alt={'arrow'} src={ArrowDarkMode} className="dashboard-dropdown-arrow" />
            ) : (
              <img alt={'arrow'} src={Arrow} className="dashboard-dropdown-arrow" />
            )}
          </div>
        </div>

        <div
          className={`dashboard-dropdown-bg ${
            open ? 'dashboard-dropdown-bg-display' : 'dashboard-dropdown-bg-hide'
          }`}
          onClick={() => {
            setOpen(false);
          }}
        >
          <div
            className={`dashboard-dropdown-container ${
              open ? 'dashboard-dropdown-container-display' : ''
            }`}
          >
            {items.map((item) => {
              return (
                <Link
                  to={pathname === item.link ? {} : item.link}
                  key={item.link}
                  style={pathname === item.link ? { pointerEvents: 'none' } : {}}
                >
                  <div
                    key={item.label}
                    className={`dashboard-dropdown-item-container ${
                      pathname === item.link ? 'dashboard-dropdown-item-container-selected' : ''
                    }`}
                    style={
                      count === 1 ? { borderTopLeftRadius: '5px', borderTopRightRadius: '5px' } : {}
                    }
                  >
                    {/* {darkMode ? (
                      <img
                        src={item.iconDark}
                        alt={item.label}
                        className="dashboard-dropdown-item-img"
                      />
                    ) : (
                      <img src={item.icon} alt={item.label} className="dashboard-dropdown-item-img" />
                    )} */}

                    <p className="dashboard-dropdown-item-label">{item.label}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

DashboardDropdown.propTypes = {
  open: PropTypes.bool, // opens the profile dropdown menu
  setOpen: PropTypes.func,
  items: PropTypes.array, // array of objects with pages to be displayed
  title: PropTypes.string,
  icon: PropTypes.string,
};

export { DashboardDropdown };
