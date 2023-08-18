import { logout } from '../state/user/saga';

// profile dropdown icons
import LoginIcon from '../assets/profiledropdown/arrow-right-to-bracket-solid.svg';
import RegisterIcon from '../assets/profiledropdown/file-invoice-dollar-solid.svg';
import ProfileIcon from '../assets/profiledropdown/user-solid.svg';
import LogoutIcon from '../assets/profiledropdown/arrow-right-from-bracket-solid.svg';

import LoginIconDarkMode from '../assets/darkmode/profiledropdown/arrow-right-to-bracket-solid.svg';
import RegisterIconDarkMode from '../assets/darkmode/profiledropdown/file-invoice-dollar-solid.svg';
import ProfileIconDarkMode from '../assets/darkmode/profiledropdown/user-solid.svg';
import LogoutIconDarkMode from '../assets/darkmode/profiledropdown/arrow-right-from-bracket-solid.svg';

function logoutFunction({ dispatch, navigate }) {
  dispatch(logout({ navigate }));
}

export const profilePages = {
  notLogin: [
    {
      label: 'Log in',
      icon: LoginIcon,
      iconDark: LoginIconDarkMode,
      path: '/login',
    },
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
    {
      label: 'Log Out',
      icon: LogoutIcon,
      iconDark: LogoutIconDarkMode,
      function: logoutFunction,
    },
  ],
  register: [
    {
      label: 'Profile',
      icon: ProfileIcon,
      iconDark: ProfileIconDarkMode,
      path: '/profile',
    },
    {
      label: 'Log Out',
      icon: LogoutIcon,
      iconDark: LogoutIconDarkMode,
      function: logoutFunction,
    },
  ],
};
