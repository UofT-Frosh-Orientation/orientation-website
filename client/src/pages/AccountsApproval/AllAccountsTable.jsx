import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { React, useEffect } from 'react';

import './AccountsApproval.scss';
import './AccountsPageNumber.scss';
import './ApproveDenyCheckbox.scss';

import { ButtonRound } from '../../components/button/ButtonRound/ButtonRound';
import { ApproveDenyCheckbox } from './ApproveDenyCheckbox';

import ArrowRight from '../../assets/steps/arrow-right-solid-purple.svg';
import ArrowLeft from '../../assets/steps/arrow-left-solid-purple.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getAccounts, updateAccounts } from '../../state/accounts/saga';
import { accountsSelector } from '../../state/accounts/accountSlice';
import { SnackbarContext } from '../../util/SnackbarProvider';

const bubbleButtonStyle = {
  borderWidth: '3px',
  marginBottom: '5px',
  marginTop: '0px',
};

// Accounts still waiting on a decision are the ones that need attention, so they
// sort to the front; approved accounts stay listed underneath for reference.
const pendingFirst = (accounts) =>
  [...accounts].sort((a, b) => {
    if (a.savedApproved !== b.savedApproved) return a.savedApproved ? 1 : -1;
    return (a.email ?? '').localeCompare(b.email ?? '');
  });

// `savedApproved` is what the server currently has, and never changes as the admin
// edits. `approved` is the pending edit. Keeping the two apart is what lets the
// table say whether an account is already approved or awaiting a decision.
const toEditableList = (accounts) =>
  pendingFirst(
    (accounts ?? []).map((account) => ({ ...account, savedApproved: account.approved === true })),
  );

const AllAccountsTable = ({ numResultsDisplayed }) => {
  const [emailList, setEmailList] = useState([]); // accounts as currently edited
  const [currentPage, setCurrentPage] = useState(1); // default to display page 1
  const [editMode, setEditMode] = useState(false); // not in edit mode
  const [changesMade, setChangesMade] = useState(false);
  const { setSnackbar } = useContext(SnackbarContext);
  const { accounts } = useSelector(accountsSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAccounts());
  }, []);

  useEffect(() => {
    setEmailList(toEditableList(accounts));
    setChangesMade(false);
  }, [accounts]);

  const setApproval = (accountId, approved) => {
    setEmailList((prev) =>
      prev.map((account) =>
        // An account the server has already approved cannot be revoked from here -
        // /user/account-statuses only ever grants approval.
        account.id === accountId && !account.savedApproved
          ? { ...account, approved, deny: !approved }
          : account,
      ),
    );
    setChangesMade(true);
  };

  const pendingAccounts = emailList.filter((account) => !account.savedApproved);
  const approvedCount = emailList.length - pendingAccounts.length;

  // numResultsDisplayed = the number of results you want to display per page
  const pageNumber = Math.max(1, Math.ceil(emailList.length / numResultsDisplayed));
  const pageStart = numResultsDisplayed * (currentPage - 1);
  const accountsOnPage = emailList.slice(pageStart, pageStart + numResultsDisplayed);

  // make an array that stores page numbers
  const pageNumberList = [];
  for (let i = 1; i <= pageNumber; i++) {
    pageNumberList.push(i); // add each page # to list
  }

  // Only the verified accounts still awaiting a decision on this page can be bulk
  // approved - the rest are either already approved or have no confirmed email.
  const bulkApprovable = accountsOnPage.filter(
    (account) => !account.savedApproved && account.valid,
  );
  const allBulkApproved =
    bulkApprovable.length > 0 && bulkApprovable.every((account) => account.approved);

  const toggleVerifiedOnPage = () => {
    const approved = !allBulkApproved;
    const ids = new Set(bulkApprovable.map((account) => account.id));
    setEmailList((prev) =>
      prev.map((account) =>
        ids.has(account.id) ? { ...account, approved, deny: !approved } : account,
      ),
    );
    setChangesMade(true);
  };

  const save = () => {
    dispatch(updateAccounts({ setSnackbar, accounts: emailList }));
    setChangesMade(false);
  };

  const exitEditMode = () => {
    setEditMode(false);
    setEmailList(toEditableList(accounts)); // drop anything that was not saved
    setChangesMade(false);
  };

  return (
    <div className="all-accounts-container">
      {/* adding buttons */}

      {editMode ? (
        <div className="all-accounts-buttons">
          <div className="all-accounts-approve-ver-button">
            <ButtonRound
              className="round-button"
              label={
                !allBulkApproved ? 'Approve Verified Accounts' : 'Unapprove All Verified Accounts'
              }
              style={bubbleButtonStyle}
              onClick={toggleVerifiedOnPage}
            />
            <p className="all-accounts-approve-ver-note">
              This only approves pending accounts on the current page
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <ButtonRound
              className="round-button"
              label="Save"
              style={{ alignSelf: 'start', marginTop: '0px', marginBottom: '5px' }}
              onClick={save}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <ButtonRound
                className="round-button"
                label="Exit Edit Mode"
                style={{ marginTop: '0px', borderWidth: '3px', marginBottom: '5px' }}
                onClick={exitEditMode}
              />
              {changesMade ? (
                <p className="all-accounts-approve-ver-note">Please save your changes!</p>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="all-accounts-buttons">
          <ButtonRound
            className="round-button"
            label="Enter Edit Mode"
            style={{ marginTop: '0px' }}
            onClick={() => {
              setEditMode(true);
            }}
          />
        </div>
      )}

      <div className="all-accounts-summary">
        <span className="account-status-badge account-status-pending">
          {pendingAccounts.length} pending
        </span>
        <span className="account-status-badge account-status-approved">
          {approvedCount} approved
        </span>
      </div>

      <table className="all-accounts-table">
        <tbody>
          <tr className="all-accounts-table-header-row">
            <th className="all-accounts-table-header">Verified</th>
            <th className="all-accounts-table-header-left-align">Email</th>
            <th className="all-accounts-table-header">Status</th>
            <th className="all-accounts-table-header">Approve</th>
          </tr>
          {accountsOnPage.map((account) => (
            <RowComponent
              key={account.id ?? account.email}
              account={account}
              editMode={editMode}
              onApprovalChange={(approved) => setApproval(account.id, approved)}
            />
          ))}
        </tbody>
      </table>

      {/* page numbers thing */}
      {!editMode ? (
        <div className="accounts-page-number-container">
          <div
            className="page-number-arrow-container"
            style={currentPage > 1 ? {} : { pointerEvents: 'none', cursor: 'default' }}
          >
            <img
              className="page-number-arrow"
              src={ArrowLeft}
              alt="left arrow"
              onClick={() => {
                if (currentPage > 1) {
                  setCurrentPage(currentPage - 1);
                }
              }}
            />
          </div>
          {pageNumberList.map((num) => {
            return (
              <div
                key={num}
                className={`accounts-page-number-box ${
                  num === currentPage ? 'accounts-page-number-box-current' : ''
                }`}
                style={
                  num === 1
                    ? { borderLeftWidth: '2px' }
                    : num === pageNumber
                    ? { borderRightWidth: '2px' }
                    : {}
                }
                onClick={() => {
                  setCurrentPage(num);
                }}
              >
                <p>{num}</p>
              </div>
            );
          })}
          <div
            className="page-number-arrow-container"
            style={currentPage < pageNumber ? {} : { pointerEvents: 'none', cursor: 'default' }}
          >
            <img
              className="page-number-arrow"
              src={ArrowRight}
              alt="right arrow"
              onClick={() => {
                if (currentPage < pageNumber) {
                  setCurrentPage(currentPage + 1);
                }
              }}
            />
          </div>
        </div>
      ) : (
        <></>
      )}
      <p style={{ fontSize: '12px', color: '#b297c7', marginTop: '10px' }}>
        {' '}
        Displaying as many as <span>{numResultsDisplayed}</span> results per page
      </p>
    </div>
  );
};

// displays each row of the table
const RowComponent = ({ account, editMode, onApprovalChange }) => {
  const alreadyApproved = account.savedApproved;
  // Approved accounts are locked: the save route only grants approval, so an
  // unchecked box there would look like a revoke and silently do nothing.
  const pointerEvents =
    editMode && !alreadyApproved ? { pointerEvents: 'all' } : { pointerEvents: 'none' };

  return (
    <tr className={`all-accounts-row ${alreadyApproved ? 'all-accounts-row-approved' : ''}`}>
      <td className="all-account-data-verified-container">
        <div
          className={`verified-circle ${
            account.valid ? 'green-verified-circle' : 'gray-verified-circle'
          }`}
          title={account.valid ? 'Email confirmed' : 'Email not confirmed'}
        ></div>
      </td>
      <td className="all-account-data">
        <p className="all-account-data-email">{account.email}</p>
        {account.name ? <p className="all-account-data-subtext">{account.name}</p> : <></>}
      </td>
      <td className="all-account-data-status">
        {alreadyApproved ? (
          <span className="account-status-badge account-status-approved">Approved</span>
        ) : (
          <span
            className={`account-status-badge ${
              account.approved ? 'account-status-will-approve' : 'account-status-pending'
            }`}
          >
            {account.approved ? 'Approving' : 'Pending'}
          </span>
        )}
      </td>
      <td className="all-account-data-checkboxes">
        <ApproveDenyCheckbox
          style={{ marginLeft: 'auto', marginRight: 'auto' }}
          approve={alreadyApproved || account.approved}
          deny={!(alreadyApproved || account.approved)}
          setApprove={(value) => onApprovalChange(value)}
          setDeny={(value) => onApprovalChange(!value)}
          setChangesMade={() => {}}
          pointerEvents={pointerEvents}
        />
      </td>
    </tr>
  );
};

RowComponent.propTypes = {
  account: PropTypes.object,
  editMode: PropTypes.bool,
  onApprovalChange: PropTypes.func,
};

AllAccountsTable.propTypes = {
  numResultsDisplayed: PropTypes.number,
};

export { AllAccountsTable };
