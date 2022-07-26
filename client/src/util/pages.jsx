import { Page404 } from '../pages/404/404';
import { PageAbout } from '../pages/About/About';
import { PageFAQ } from '../pages/FAQ/FAQ';
import { PageHome } from '../pages/Home/Home';
import { PageMaintenance } from '../pages/Maintenance/Maintenance';
import { PagePaymentError } from '../pages/PaymentError/PaymentError';
import { PageProfile } from '../pages/Profile/Profile';
import { PageProfileEdit } from '../pages/ProfileEdit/ProfileEdit';
import { PageRegistrationForm } from '../pages/Registration/RegistrationForm';
import { PageLogin } from '../pages/Login/Login';
import { PageRegistrationSuccess } from '../pages/RegistrationSuccess/RegistrationSuccess';
import { PageSignUp } from '../pages/SignUp/SignUp';
import AuthorizedPage from './AuthorizedPage';
import { PasswordReset } from '../pages/PasswordReset/PasswordReset';
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

function logoutfunction() {
  //????
  console.log('logging out');
  const navigate = useNavigate();
  console.log('logging out1');
  const dispatch = useDispatch();
  console.log('logging out2');
  //let setShowLogoutPopup = true;
  return dispatch(logout({ navigate }));
}

export const pages = {
  404: {
    label: '404',
    component: <Page404 />,
  },
  main: [
    {
      label: 'Home',
      component: <PageHome />,
      path: '/',
      includeFooter: true,
    },
    {
      label: 'About',
      component: <PageAbout />,
      path: '/about',
      includeFooter: true,
    },
    {
      label: 'FAQ',
      component: <PageFAQ />,
      path: '/faq',
      includeFooter: true,
    },
  ],
  special: [
    {
      label: 'Login',
      component: <PageLogin />,
      path: '/login',
      includeFooter: false,
    },
    {
      label: 'Register',
      component: (
        <AuthorizedPage>
          <PageRegistrationForm />
        </AuthorizedPage>
      ),
      path: '/registration',
    },
    {
      label: 'Profile',
      component: (
        <AuthorizedPage>
          <PageProfile />
        </AuthorizedPage>
      ),
      path: '/profile',
      includeFooter: true,
    },
  ],
  notLogin: [
    {
      label: 'Log in',
      icon: LoginIcon,
      iconDark: LoginIconDarkMode,
      component: <PageLogin />,
      path: '/login',
      includeFooter: false,
    },
    {
      label: 'Dark Mode',
      icon: DarkModeIcon,
      iconDark: DarkModeIconDarkMode,
      function: darkmodefunc,
    },
  ],
  login: [
    {
      label: 'Register',
      icon: RegisterIcon,
      iconDark: RegisterIconDarkMode,
      component: (
        <AuthorizedPage>
          <PageRegistrationForm />
        </AuthorizedPage>
      ),
      path: '/registration',
    },
    {
      label: 'Profile',
      icon: ProfileIcon,
      iconDark: ProfileIconDarkMode,
      component: (
        <AuthorizedPage>
          <PageProfile />
        </AuthorizedPage>
      ),
      path: '/profile',
      includeFooter: true,
    },
    {
      label: 'Dark Mode',
      icon: DarkModeIcon,
      iconDark: DarkModeIconDarkMode,
      function: darkmodefunc,
      // add a function here that will be called on onClick
    },
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
      component: (
        <AuthorizedPage>
          <PageProfile />
        </AuthorizedPage>
      ),
      path: '/profile',
      includeFooter: true,
    },
    {
      label: 'Dark Mode',
      icon: DarkModeIcon,
      function: darkmodefunc,
    },
    {
      label: 'Log Out',
      icon: LogoutIcon,
      function: logoutfunction,
    },
  ],
  hidden: [
    {
      label: 'Permission Request',
      component: <div />,
      path: '/permission_request',
      includeFooter: true,
    },
    {
      label: 'Maintenance',
      component: <PageMaintenance />,
      path: '/maintenance',
      includeFooter: false,
    },
    {
      label: 'Registration',
      component: (
        <AuthorizedPage>
          <PageRegistrationForm />
        </AuthorizedPage>
      ),
      path: '/registration',
      includeFooter: true,
    },
    {
      label: 'Registration Success',
      component: <PageRegistrationSuccess />,
      path: '/registration-success',
    },
    {
      label: 'sign-up',
      component: <PageSignUp />,
      path: '/sign-up',
    },
    {
      label: 'profile-edit',
      component: (
        <AuthorizedPage>
          <PageProfileEdit />
        </AuthorizedPage>
      ),
      path: '/profile-edit',
    },
    {
      label: 'payment-error',
      component: <PagePaymentError />,
      path: '/payment-error',
    },
    {
      label: 'password-reset',
      component: <PasswordReset />,
      path: '/password-reset/:token',
    },
  ],
};
