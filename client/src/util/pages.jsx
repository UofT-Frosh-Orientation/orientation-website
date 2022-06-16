import { Page404 } from '../pages/404/404';
import { PageAbout } from '../pages/About/About';
import { PageFAQ } from '../pages/FAQ/FAQ';
import { PageHome } from '../pages/Home/Home';
import { PageMaintenance } from '../pages/Maintenance/Maintenance';
import { PageProfile } from '../pages/Profile/Profile';
import { PageRegistrationForm } from '../pages/Registration/RegistrationForm';
import { PageSignUp } from '../pages/SignUp/SignUp';

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
    },
    {
      label: 'About',
      component: <PageAbout />,
      path: '/about',
    },
    {
      label: 'FAQ',
      component: <PageFAQ />,
      path: '/faq',
    },
  ],
  special: [
    {
      label: 'Login',
      component: <div />,
      path: '/login',
    },
    {
      label: 'Register',
      component: <div />,
      path: '/register',
    },
    {
      label: 'profile',
      component: <div />,
      path: '/profile',
    },
  ],
  hidden: [
    {
      label: 'Permission Request',
      component: <div />,
      path: '/permission_request',
    },
    {
      label: 'Maintenance',
      component: <PageMaintenance />,
      path: '/maintenance',
    },
    {
      label: 'Registration',
      component: <PageRegistrationForm />,
      path: '/registration',
    },
    {
      label: 'Profile',
      component: <PageProfile />,
      path: '/profile',
    },
    {
      label: 'sign-up',
      component: <PageSignUp />,
      path: '/sign-up',
    },
  ],
};
