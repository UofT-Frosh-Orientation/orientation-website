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
import { AdminPage } from './AdminPage';
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
import { PageSchedule } from '../pages/Schedule/Schedule';
import { ScuntJudges } from '../pages/ScuntJudges/ScuntJudges';
import { ScuntHSL } from '../pages/ScuntJudges/ScuntHSL';
import { ScuntLeaderboard } from '../pages/ScuntLeaderboard/ScuntLeaderboard';
import { FroshRetreat } from '../pages/FroshRetreat/FroshRetreat';
import { FroshOlympiks } from '../pages/FroshOlympiks/FroshOlympiks';
import { PagePaymentSuccess } from '../pages/PagePaymentSuccess/PagePaymentSuccess';
import { ScuntGameSettings } from '../pages/ScuntGameSettings/ScuntGameSettings';
import { PageScuntMissionsDashboard } from '../pages/ScuntMissionsDashboard/ScuntMissionsDashboard';
import { ScuntTransactions } from '../pages/ScuntTransactions/ScuntTransactions';
import { PageEmailConfirmed } from '../pages/EmailConfirmed/EmailConfirmed';
import { ComingSoon } from '../pages/Initial/ComingSoon/ComingSoon';
import { PageChief } from '../pages/Chief/Chief';

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
      label: 'Schedule',
      component: <PageSchedule />,
      path: '/schedule',
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
    // ---- Skule™ Hunt easter-egg trail (unlinked on purpose) ----
    // /skule-hunt "Where?" → Tech Team judge bio (hidden text) → here →
    // Recycle Bin → hunt.txt cipher → the commit message
    // "Who holds Ye Olde Mighty Skule Cannon?" → /chief.
    {
      label: 'coming-soon',
      component: <ComingSoon routed />,
      path: '/coming-soon',
      includeFooter: false,
    },
    {
      label: 'chief',
      component: <PageChief />,
      path: '/chief',
      includeFooter: false,
    },
    {
      label: 'Announcements Dashboard',
      component: (
        <AdminPage>
          <AuthorizedPage
            authScopes={['announcements:delete', 'announcements:create', 'announcements:edit']}
          >
            <PageAnnounceDash />
          </AuthorizedPage>
        </AdminPage>
      ),
      path: '/announcement-dashboard',
      includeFooter: true,
    },
    {
      label: 'Request Permissions',
      component: (
        <AdminPage>
          <AuthorizedPage leaderOnly>
            <PageScopeRequest />
          </AuthorizedPage>
        </AdminPage>
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
          title={'F!rosh Retreat'}
          message={
            'Thank you for choosing to participate in the F!rosh retreat, we will be reaching out to you for next steps and further details!'
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
      label: 'frosh-olympiks',
      component: (
        <AuthorizedPage>
          <FroshOlympiks />
        </AuthorizedPage>
      ),
      path: '/frosh-olympiks',
      includeFooter: true,
    },
    {
      label: 'approve-accounts',
      component: (
        <AdminPage>
          <AuthorizedPage leaderOnly>
            <PageAccountsApproval />
          </AuthorizedPage>
        </AdminPage>
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
        <AdminPage>
          <AuthorizedPage authScopes={['faq:edit']}>
            <PageFAQLeaders />
          </AuthorizedPage>
        </AdminPage>
      ),
      path: '/faq-admin',
    },
    {
      label: 'TimelineAdmin',
      component: (
        <AdminPage>
          <AuthorizedPage authScopes={['timeline:create', 'timeline:edit', 'timeline:delete']}>
            <PageTimelineAdmin />
          </AuthorizedPage>
        </AdminPage>
      ),
      path: '/timeline-admin',
    },
    {
      label: 'frosh-info-table',
      component: (
        <AdminPage>
          <AuthorizedPage leaderOnly>
            <PageFroshInfoTable />
          </AuthorizedPage>
        </AdminPage>
      ),
      path: '/frosh-info-table',
      includeFooter: true,
    },
    {
      label: 'frosh-redistribution',
      component: (
        <AdminPage>
          <AuthorizedPage leaderOnly>
            <PageFroshRedistribution />
          </AuthorizedPage>
        </AdminPage>
      ),
      path: '/frosh-redistribution',
    },
  ],
  scunt: [
    {
      label: 'Skule™ Hunt',
      scuntLabel: 'Home',
      component: <PageScuntHome />,
      path: '/skule-hunt',
      includeFooter: true,
    },
    {
      label: 'Judges',
      scuntLabel: 'Judges',
      component: <ScuntJudges />,
      path: '/skule-hunt-judges',
      includeFooter: true,
    },
    {
      label: 'HSLs',
      scuntLabel: 'HSLs',
      component: <ScuntHSL />,
      path: '/skule-hunt-hsl',
      includeFooter: true,
    },
    {
      label: 'Missions',
      scuntLabel: 'Missions',
      component: <PageScuntMissionsList />,
      path: '/skule-hunt-missions',
      includeFooter: true,
    },
    {
      label: 'Leaderboard',
      scuntLabel: 'Leaderboard',
      component: <ScuntLeaderboard />,
      path: '/skule-hunt-leaderboard',
      includeFooter: true,
    },
    {
      label: 'Rules',
      scuntLabel: 'Rules',
      component: <PageScuntRules />,
      path: '/skule-hunt-rules',
      includeFooter: true,
    },
  ],
  scuntHidden: [
    {
      label: 'Skule™ Hunt Judge Form',
      component: (
        <AdminPage>
          <AuthorizedPage leaderOnly>
            <PageScuntJudgeForm />
          </AuthorizedPage>
        </AdminPage>
      ),
      path: '/skule-hunt-judge-form',
      includeFooter: true,
    },
    {
      label: 'start-skule-hunt',
      component: (
        <AdminPage>
          <AuthorizedPage authScopes={['scunt:exec game controls']}>
            <ScuntGameSettings />
          </AuthorizedPage>
        </AdminPage>
      ),
      path: '/skule-hunt-game-controls',
      includeFooter: true,
    },
    {
      label: 'Skule™ Hunt Missions Dashboard',
      component: (
        <AdminPage>
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
        </AdminPage>
      ),
      path: '/skule-hunt-missions-dashboard',
    },
    {
      label: 'Skule™ Hunt Point Transactions',
      path: '/skule-hunt-transactions',
      includeFooter: true,
      component: (
        <AdminPage>
          <AuthorizedPage authScopes={['scunt:exec view transactions']}>
            <ScuntTransactions />
          </AuthorizedPage>
        </AdminPage>
      ),
    },
  ],
};
