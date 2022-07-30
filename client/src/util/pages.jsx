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
import { PageAccountsApproval } from '../pages/AccountsApproval/AccountsApproval';
import AuthorizedPage from './AuthorizedPage';
import { PasswordReset } from '../pages/PasswordReset/PasswordReset';
// import { logout } from '../pages/Login/saga';

// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';

// // profile dropdown icons
// import LoginIcon from '../assets/profiledropdown/arrow-right-to-bracket-solid.svg';
// import RegisterIcon from '../assets/profiledropdown/file-invoice-dollar-solid.svg';
// import ProfileIcon from '../assets/profiledropdown/user-solid.svg';
// import DarkModeIcon from '../assets/profiledropdown/moon-solid.svg';
// import LogoutIcon from '../assets/profiledropdown/arrow-right-from-bracket-solid.svg';

// import LoginIconDarkMode from '../assets/darkmode/profiledropdown/arrow-right-to-bracket-solid.svg';
// import RegisterIconDarkMode from '../assets/darkmode/profiledropdown/file-invoice-dollar-solid.svg';
// import ProfileIconDarkMode from '../assets/darkmode/profiledropdown/user-solid.svg';
// import DarkModeIconDarkMode from '../assets/darkmode/profiledropdown/moon-solid.svg';
// import LogoutIconDarkMode from '../assets/darkmode/profiledropdown/arrow-right-from-bracket-solid.svg';

// function darkmodefunc() {
//   console.log('toggle darkmode here');
// }

// function logoutfunction({ navigate, dispatch }) {
//   dispatch(logout({ navigate }));
//   navigate(`/`);
// }
import { PageFroshInfoTable } from '../pages/FroshInfoTable/FroshInfoTable';
import { PageLeadurScopeRequest } from '../pages/LeadurScopeRequest/LeadurScopeRequest';
import { PageScuntJudgeForm } from '../pages/ScuntJudgeForm/ScuntJudgeForm';
import { PageScuntMissionsList } from '../pages/ScuntMissionsList/ScuntMissionsList';
import { PageScuntHome } from '../pages/ScuntHome/ScuntHome';
import { PageScuntRules } from '../pages/ScuntRules/ScuntRules';

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
  hidden: [
    {
      label: 'Request Permissions',
      component: <PageLeadurScopeRequest />,
      path: '/permission-request',
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
      label: 'approve-accounts',
      component: <PageAccountsApproval />,
      path: '/approve-accounts',
    },
    {
      label: 'password-reset',
      component: <PasswordReset />,
      path: '/password-reset/:token',
    },
    {
      label: 'frosh-info-table',
      component: <PageFroshInfoTable />,
      path: '/frosh-info-table',
    },
  ],
  scunt: [
    {
      label: 'Scunt',
      scuntLabel: 'Home',
      //component: <PageScuntHome />,
      path: '/scunt',
      includeFooter: true,
    },
    {
      label: 'Judges',
      scuntLabel: 'Judges',
      component: <div />,
      path: '/scunt-judges',
      includeFooter: true,
    },
    {
      label: 'Missions',
      scuntLabel: 'Missions',
      //component: <PageScuntMissionsList />,
      path: '/scunt-missions',
      includeFooter: true,
    },
    {
      label: 'Leaderboard',
      scuntLabel: 'Leaderboard',
      component: <div />,
      path: '/scunt-leaderboard',
      includeFooter: true,
    },
    {
      label: 'Rules',
      scuntLabel: 'Rules',
      //component: <PageScuntRules />,
      path: '/scunt-rules',
      includeFooter: true,
    },
  ],
  scuntHidden: [
    {
      label: 'Scunt Judge Form',
      component: <PageScuntJudgeForm />,
      path: '/scunt-judge-form',
      includeFooter: true,
    },
  ],
};
