import { Page404 } from '../pages/404/404';
import { PageAbout } from '../pages/About/About';
import { PageFAQ } from '../pages/FAQ/FAQ';
import { PageHome } from '../pages/Home/Home';

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
      label: 'Register',
      component: <div />,
      path: '/register',
    },
    {
      label: 'Login',
      component: <div />,
      path: '/login',
    },
    {
      label: 'Profile',
      component: <div />,
      path: '/profile',
    },
  ],
  hidden: [
    {
      label: 'Permission Request',
      component: <div />,
      path: '/permission request',
    },
  ],
};
