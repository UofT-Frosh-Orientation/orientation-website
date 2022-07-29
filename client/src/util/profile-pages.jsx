import { logout } from '../pages/Login/saga';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// profile dropdown icons
import LoginIcon from '../assets/profiledropdown/arrow-right-to-bracket-solid.svg';
import RegisterIcon from '../assets/profiledropdown/file-invoice-dollar-solid.svg';
import ProfileIcon from '../assets/profiledropdown/user-solid.svg';
import DarkModeIcon from '../assets/profiledropdown/moon-solid.svg';
import LogoutIcon from '../assets/profiledropdown/arrow-right-from-bracket-solid.svg';

import LoginIconDarkMode from '../assets/darkmode/profiledropdown/arrow-right-to-bracket-solid.svg';
import RegisterIconDarkMode from '../assets/darkmode/profiledropdown/file-invoice-dollar-solid.svg';
import ProfileIconDarkMode from '../assets/darkmode/profiledropdown/user-solid.svg';
import DarkModeIconDarkMode from '../assets/darkmode/profiledropdown/moon-solid.svg';
import LogoutIconDarkMode from '../assets/darkmode/profiledropdown/arrow-right-from-bracket-solid.svg';

function darkmodefunc() {
  console.log('toggle darkmode here');
}

function logoutfunction({ navigate, dispatch }) {
  dispatch(logout({ navigate }));
  navigate(`/`);
}

export const profilePages = {
  notLogin: [
    {
      label: 'Log in',
      icon: LoginIcon,
      iconDark: LoginIconDarkMode,
      path: '/login',
    },
    // {
    //   label: 'Dark Mode',
    //   icon: DarkModeIcon,
    //   iconDark: DarkModeIconDarkMode,
    //   function: darkmodefunc,
    // },
  ],
  login: [
    {
      label: 'Register',
      icon: RegisterIcon,
      iconDark: RegisterIconDarkMode,
      path: '/registration',
    },
    {
      label: 'Profile',
      icon: ProfileIcon,
      iconDark: ProfileIconDarkMode,
      path: '/profile',
    },
    // {
    //   label: 'Dark Mode',
    //   icon: DarkModeIcon,
    //   iconDark: DarkModeIconDarkMode,
    //   function: darkmodefunc,
    //   // add a function here that will be called on onClick
    // },
    {
      label: 'Log Out',
      icon: LogoutIcon,
      iconDark: LogoutIconDarkMode,
      function: logoutfunction,
    },
  ],
  register: [
    {
      label: 'Profile',
      icon: ProfileIcon,
      path: '/profile',
    },
    // {
    //   label: 'Dark Mode',
    //   icon: DarkModeIcon,
    //   function: darkmodefunc,
    // },
    {
      label: 'Log Out',
      icon: LogoutIcon,
      function: logoutfunction,
    },
  ],
};
