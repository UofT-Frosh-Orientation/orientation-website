import { React, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './AccountsApproval.scss';
import './AccountsPageNumber.scss';

import { Tabs } from '../../components/tabs/tabs';
import { AllAccountsTable } from './AllAccountsTable';
import { AuthenticationRequests } from './AuthenticationRequests';

// number of results you would like to display on the All Accounts tab
const numResultsDisplayedProp = 3;

const tabs = [
  {
    title: 'All Accounts',
    component: <AllAccountsTable numResultsDisplayed={numResultsDisplayedProp} />,
  },
  {
    title: 'Authentication Requests',
    component: <AuthenticationRequests />,
  },
];

const PageAccountsApproval = () => {
  return (
    <div className="accounts-approval-page-container">
      <div className="accounts-approval-tabs-container">
        <Tabs tabs={tabs} />
      </div>
    </div>
  );
};

export { PageAccountsApproval };
