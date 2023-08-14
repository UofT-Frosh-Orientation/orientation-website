import { lazy } from 'react';
const Page404 = lazy(() => import('../pages/404/404'));
const PageAbout = lazy(() => import('../pages/About/About'));
const PageFAQ = lazy(() => import('../pages/FAQ/FAQ'));
const PageFAQLeaders = lazy(() => import('../pages/FAQLeaders/FAQLeaders'));
const PageHome = lazy(() => import('../pages/Home/Home'));
const PageMaintenance = lazy(() => import('../pages/Maintenance/Maintenance'));
const PagePaymentError = lazy(() => import('../pages/PaymentError/PaymentError'));
const PageProfile = lazy(() => import('../pages/Profile/Profile'));
const PageProfileEdit = lazy(() => import('../pages/ProfileEdit/ProfileEdit'));
const PageProfileEditUnregistered = lazy(() =>
  import('../pages/ProfileEditUnregistered/ProfileEditUnregistered'),
);
const PageRegistrationForm = lazy(() => import('../pages/Registration/RegistrationForm'));
const PageLogin = lazy(() => import('../pages/Login/Login'));
const PageRegistrationSuccess = lazy(() =>
  import('../pages/RegistrationSuccess/RegistrationSuccess'),
);
const PageSignUp = lazy(() => import('../pages/SignUp/SignUp'));
const PageAccountsApproval = lazy(() => import('../pages/AccountsApproval/AccountsApproval'));
import AuthorizedPage from './AuthorizedPage';
const PasswordReset = lazy(() => import('../pages/PasswordReset/PasswordReset'));
const PageFroshInfoTable = lazy(() => import('../pages/FroshInfoTable/FroshInfoTable'));
const PageFroshRedistribution = lazy(() =>
  import('../pages/FroshRedistribution/FroshRedistribution'),
);
const PageScopeRequest = lazy(() => import('../pages/ScopeRequest/ScopeRequest'));
// const PageScuntJudgeForm  = lazy(() => import('../pages/ScuntJudgeForm/ScuntJudgeForm'));
// const PageScuntMissionsList  = lazy(() => import('../pages/ScuntMissionsList/ScuntMissionsList'));
// const PageScuntHome  = lazy(() => import('../pages/ScuntHome/ScuntHome'));
// const PageScuntRules  = lazy(() => import('../pages/ScuntRules/ScuntRules'));
const PageTimelineAdmin = lazy(() => import('../pages/TimelineAdmin/TimelineAdmin'));
const PageAnnounceDash = lazy(() => import('../pages/AnnouncementDashboard/AnnounceDash'));
const PageUnsubscribe = lazy(() => import('../pages/Unsubscribe/Unsubscribe'));
const PageResubscribe = lazy(() => import('../pages/Resubscribe/Resubscribe'));
// const ScuntJudges  = lazy(() => import('../pages/ScuntJudges/ScuntJudges'));
// const ScuntLeaderboard  = lazy(() => import('../pages/ScuntLeaderboard/ScuntLeaderboard'));
const FroshRetreat = lazy(() => import('../pages/FroshRetreat/FroshRetreat'));
const PagePaymentSuccess = lazy(() => import('../pages/PagePaymentSuccess/PagePaymentSuccess'));
// const ScuntGameSettings  = lazy(() => import('../pages/ScuntGameSettings/ScuntGameSettings'));
// const PageScuntMissionsDashboard  = lazy(() => import('../pages/ScuntMissionsDashboard/ScuntMissionsDashboard'));
// const ScuntTransactions  = lazy(() => import('../pages/ScuntTransactions/ScuntTransactions'));
const PageEmailConfirmed = lazy(() => import('../pages/EmailConfirmed/EmailConfirmed'));
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
      label: 'Profile',
      component: (
        <AuthorizedPage>
          <PageProfile />
        </AuthorizedPage>
      ),
      path: '/profile',
      includeFooter: true,
    },
    {
      label: 'Email Confirmed',
      component: <PageEmailConfirmed />,
      path: '/verify-user-email/:email/:emailToken',
      includeFooter: false,
    },
    {
      label: 'Unsubscribe',
      component: <PageUnsubscribe />,
      path: '/unsubscribe',
      includeFooter: false,
    },
    {
      label: 'Resubscribe',
      component: (
        <AuthorizedPage>
          <PageResubscribe />
        </AuthorizedPage>
      ),
      path: '/resubscribe',
      includeFooter: false,
    },
  ],
  hidden: [
    {
      label: 'Announcements Dashboard',
      component: (
        <AuthorizedPage
          authScopes={['announcements:delete', 'announcements:create', 'announcements:edit']}
        >
          <PageAnnounceDash />
        </AuthorizedPage>
      ),
      path: '/announcement-dashboard',
      includeFooter: true,
    },
    {
      label: 'Request Permissions',
      component: (
        <AuthorizedPage leaderOnly>
          <PageScopeRequest />
        </AuthorizedPage>
      ),
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
      label: 'Registration Success Retreat',
      component: (
        <PagePaymentSuccess
          title={'Frosh Retreat'}
          message={
            'Thank you for choosing to participate in the Frosh retreat, we will be reaching out to you for next steps and further details!'
          }
        />
      ),
      path: '/registration-success-retreat',
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
      label: 'profile-edit-unregistered',
      component: (
        <AuthorizedPage>
          <PageProfileEditUnregistered />
        </AuthorizedPage>
      ),
      path: '/profile-edit-unregistered',
    },
    {
      label: 'payment-error',
      component: <PagePaymentError link={'/registration'} />,
      path: '/payment-error',
    },
    {
      label: 'payment-error-retreat',
      component: <PagePaymentError link={'/frosh-retreat'} />,
      path: '/payment-error-retreat',
    },
    {
      label: 'frosh-retreat',
      component: (
        <AuthorizedPage>
          <FroshRetreat />
        </AuthorizedPage>
      ),
      path: '/frosh-retreat',
      includeFooter: true,
    },
    {
      label: 'approve-accounts',
      component: (
        <AuthorizedPage leaderOnly>
          <PageAccountsApproval />
        </AuthorizedPage>
      ),
      path: '/approve-accounts',
    },
    {
      label: 'password-reset',
      component: <PasswordReset />,
      path: '/password-reset/:token',
    },
    {
      label: 'FAQAdmin',
      component: (
        <AuthorizedPage authScopes={['faq:edit']}>
          <PageFAQLeaders />
        </AuthorizedPage>
      ),
      path: '/faq-admin',
    },
    {
      label: 'TimelineAdmin',
      component: (
        <AuthorizedPage authScopes={['timeline:create', 'timeline:edit', 'timeline:delete']}>
          <PageTimelineAdmin />
        </AuthorizedPage>
      ),
      path: '/timeline-admin',
    },
    {
      label: 'frosh-info-table',
      component: (
        <AuthorizedPage leaderOnly>
          <PageFroshInfoTable />
        </AuthorizedPage>
      ),
      path: '/frosh-info-table',
    },
    {
      label: 'frosh-redistribution',
      component: (
        <AuthorizedPage leaderOnly>
          <PageFroshRedistribution />
        </AuthorizedPage>
      ),
      path: '/frosh-redistribution',
    },
  ],
  scunt: [
    // {
    //   label: 'Scunt',
    //   scuntLabel: 'Home',
    //   component: <PageScuntHome />,
    //   path: '/scunt',
    //   includeFooter: true,
    // },
    // {
    //   label: 'Judges',
    //   scuntLabel: 'Judges',
    //   component: <ScuntJudges />,
    //   path: '/scunt-judges',
    //   includeFooter: true,
    // },
    // {
    //   label: 'Missions',
    //   scuntLabel: 'Missions',
    //   component: <PageScuntMissionsList />,
    //   path: '/scunt-missions',
    //   includeFooter: true,
    // },
    // {
    //   label: 'Leaderboard',
    //   scuntLabel: 'Leaderboard',
    //   component: <ScuntLeaderboard />,
    //   path: '/scunt-leaderboard',
    //   includeFooter: true,
    // },
    // {
    //   label: 'Rules',
    //   scuntLabel: 'Rules',
    //   component: <PageScuntRules />,
    //   path: '/scunt-rules',
    //   includeFooter: true,
    // },
  ],
  scuntHidden: [
    // {
    //   label: 'Scunt Judge Form',
    //   component: (
    //     <AuthorizedPage leaderOnly>
    //       <PageScuntJudgeForm />
    //     </AuthorizedPage>
    //   ),
    //   path: '/scunt-judge-form',
    //   includeFooter: true,
    // },
    // {
    //   label: 'start-scunt',
    //   component: (
    //     <AuthorizedPage authScopes={['scunt:exec game controls']}>
    //       <ScuntGameSettings />
    //     </AuthorizedPage>
    //   ),
    //   path: '/scunt-game-controls',
    // },
    // {
    //   label: 'Scunt Missions Dashboard',
    //   component: (
    //     <AuthorizedPage
    //       authScopes={[
    //         'scunt:exec show missions',
    //         'scunt:exec hide missions',
    //         'scunt:exec create missions',
    //         'scunt:exec delete missions',
    //       ]}
    //     >
    //       <PageScuntMissionsDashboard />
    //     </AuthorizedPage>
    //   ),
    //   path: '/scunt-missions-dashboard',
    // },
    // {
    //   label: 'Scunt Point Transactions',
    //   path: '/scunt-transactions',
    //   component: (
    //     <AuthorizedPage authScopes={['scunt:exec view transactions']}>
    //       <ScuntTransactions />
    //     </AuthorizedPage>
    //   ),
    // },
  ],
};
