import './AccountsApproval.scss';
import './AccountsPageNumber.scss';

import { Tabs } from '../../components/tabs/tabs';
import { AllAccountsTable } from './AllAccountsTable';
import { AuthenticationRequests } from './AuthenticationRequests';

// number of results you would like to display on the All Accounts tab
const numResultsDisplayedProp = 50;

const tabs = [
  {
    title: 'All Accounts',
    component: <AllAccountsTable numResultsDisplayed={numResultsDisplayedProp} />,
  },
  {
    title: 'Account Permissions',
    component: <AuthenticationRequests />,
  },
];

const PageAccountsApproval = () => {
  return (
    <div className="accounts-approval-page-container">
      <div className="accounts-approval-tabs-container">
        <Tabs tabs={tabs} displayButtons={false} />
      </div>
    </div>
  );
};

export { PageAccountsApproval };
