import { Page404 } from '../pages/404/404';
import { PageAbout } from '../pages/About/About';
import { PageFAQ } from '../pages/FAQ/FAQ';
import { PageFAQLeaders } from '../pages/FAQLeaders/FAQLeaders';
import { PageHome } from '../pages/Home/Home';
import { PageMaintenance } from '../pages/Maintenance/Maintenance';
import { PagePaymentError } from '../pages/PaymentError/PaymentError';
import { PageProfile } from '../pages/Profile/Profile';
import { PageProfileEdit } from '../pages/ProfileEdit/ProfileEdit';
import { PageProfileEditUnregistered } from '../pages/ProfileEditUnregistered/ProfileEditUnregistered';
import { PageRegistrationForm } from '../pages/Registration/RegistrationForm';
import { PageLogin } from '../pages/Login/Login';
import { PageRegistrationSuccess } from '../pages/RegistrationSuccess/RegistrationSuccess';
import { PageSignUp } from '../pages/SignUp/SignUp';
import { PageAccountsApproval } from '../pages/AccountsApproval/AccountsApproval';
import AuthorizedPage from './AuthorizedPage';
import { PasswordReset } from '../pages/PasswordReset/PasswordReset';
import { PageFroshInfoTable } from '../pages/FroshInfoTable/FroshInfoTable';
import { PageFroshRedistribution } from '../pages/FroshRedistribution/FroshRedistribution';
import { PageScopeRequest } from '../pages/ScopeRequest/ScopeRequest';
import { PageScuntJudgeForm } from '../pages/ScuntJudgeForm/ScuntJudgeForm';
import { PageScuntMissionsList } from '../pages/ScuntMissionsList/ScuntMissionsList';
import { PageScuntHome } from '../pages/ScuntHome/ScuntHome';
import { PageScuntRules } from '../pages/ScuntRules/ScuntRules';
import { PageTimelineAdmin } from '../pages/TimelineAdmin/TimelineAdmin';
import { PageAnnounceDash } from '../pages/AnnouncementDashboard/AnnounceDash';
import { PageUnsubscribe } from '../pages/Unsubscribe/Unsubscribe';
import { PageResubscribe } from '../pages/Resubscribe/Resubscribe';
import { ScuntJudges } from '../pages/ScuntJudges/ScuntJudges';
import { ScuntLeaderboard } from '../pages/ScuntLeaderboard/ScuntLeaderboard';
import { FroshRetreat } from '../pages/FroshRetreat/FroshRetreat';
import { PagePaymentSuccess } from '../pages/PagePaymentSuccess/PagePaymentSuccess';
import { ScuntGameSettings } from '../pages/ScuntGameSettings/ScuntGameSettings';
import { PageScuntMissionsDashboard } from '../pages/ScuntMissionsDashboard/ScuntMissionsDashboard';
import { ScuntTransactions } from '../pages/ScuntTransactions/ScuntTransactions';
import { PageEmailConfirmed } from '../pages/EmailConfirmed/EmailConfirmed';

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
    {
      label: 'Scunt',
      scuntLabel: 'Home',
      component: <PageScuntHome />,
      path: '/scunt',
      includeFooter: true,
    },
    {
      label: 'Judges',
      scuntLabel: 'Judges',
      component: <ScuntJudges />,
      path: '/scunt-judges',
      includeFooter: true,
    },
    {
      label: 'Missions',
      scuntLabel: 'Missions',
      component: <PageScuntMissionsList />,
      path: '/scunt-missions',
      includeFooter: true,
    },
    {
      label: 'Leaderboard',
      scuntLabel: 'Leaderboard',
      component: <ScuntLeaderboard />,
      path: '/scunt-leaderboard',
      includeFooter: true,
    },
    {
      label: 'Rules',
      scuntLabel: 'Rules',
      component: <PageScuntRules />,
      path: '/scunt-rules',
      includeFooter: true,
    },
  ],
  scuntHidden: [
    {
      label: 'Scunt Judge Form',
      component: (
        <AuthorizedPage leaderOnly>
          <PageScuntJudgeForm />
        </AuthorizedPage>
      ),
      path: '/scunt-judge-form',
      includeFooter: true,
    },
    {
      label: 'start-scunt',
      component: (
        <AuthorizedPage authScopes={['scunt:exec game controls']}>
          <ScuntGameSettings />
        </AuthorizedPage>
      ),
      path: '/scunt-game-controls',
    },
    {
      label: 'Scunt Missions Dashboard',
      component: (
        <AuthorizedPage
          authScopes={[
            'scunt:exec show missions',
            'scunt:exec hide missions',
            'scunt:exec create missions',
            'scunt:exec delete missions',
          ]}
        >
          <PageScuntMissionsDashboard />
        </AuthorizedPage>
      ),
      path: '/scunt-missions-dashboard',
    },
    {
      label: 'Scunt Point Transactions',
      path: '/scunt-transactions',
      component: (
        <AuthorizedPage authScopes={['scunt:exec view transactions']}>
          <ScuntTransactions />
        </AuthorizedPage>
      ),
    },
  ],
};
