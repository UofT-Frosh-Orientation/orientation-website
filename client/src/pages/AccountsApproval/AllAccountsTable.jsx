import { useState } from 'react';
import PropTypes from 'prop-types';
import { React, useEffect } from 'react';

import './AccountsApproval.scss';
import './AccountsPageNumber.scss';
import './ApproveDenyCheckbox.scss';

import { TestEmails, sendApprovedEmails } from './functions';
import { ButtonOutlined } from '../../components/button/ButtonOutlined/ButtonOutlined';
import { Button } from '../../components/button/Button/Button';
import { ApproveDenyCheckbox } from './ApproveDenyCheckbox';
import { ErrorSuccessBox } from '../../components/containers/ErrorSuccessBox/ErrorSuccessBox';

import ArrowRight from '../../assets/steps/arrow-right-solid-purple.svg';
import ArrowLeft from '../../assets/steps/arrow-left-solid-purple.svg';

const bubbleButtonStyle = {
  borderWidth: '3px',
  marginBottom: '5px',
  marginTop: '0px',
};

const AllAccountsTable = ({ numResultsDisplayed }) => {
  const [emailList, setEmailList] = useState(TestEmails); // email list that is displayed
  const [isApproveVerified, setIsApproveVerified] = useState(false); // approve state for emails that match frosh leedur email list
  const [accountStatus, setAccountStatus] = useState({}); // object to send approve deny status to backend
  const [isSave, setIsSave] = useState(false); // state for whether the save button is clicked
  const [showSaveMessage, setShowSaveMessage] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false); // displays error or success box depending on bool
  const [currentPage, setCurrentPage] = useState(1); // default to display page 1
  const [editMode, setEditMode] = useState(false); // not in edit mode
  const [changesMade, setChangesMade] = useState(false);

  useEffect(() => {
    setEmailList(TestEmails);
  }, [emailList]);

  useEffect(() => {
    setIsSave(false);
    setEditMode(false);
  }, [currentPage]);

  useEffect(() => {
    // when you leave edit mode, turn off the errorsuccess box
    setShowSaveMessage(false);
  }, [editMode]);

  // numResultsDisplayed = the number of results you want to display per page
  let pageNumber = Math.ceil(emailList.length / numResultsDisplayed); // the number of page numbers you will have
  let numCurrentlyDisplayed = 0;
  let nthAccount = numResultsDisplayed * (currentPage - 1); // the nth account that is the first to be displayed on the page

  // make an array that stores page numbers
  let pageNumberList = [];
  for (let i = 1; i <= pageNumber; i++) {
    pageNumberList.push(i); // add each page # to list
  }

  return (
    <div className="all-accounts-container">
      {/* adding buttons */}

      {editMode ? (
        <AllAccountsEditButton
          accountStatus={accountStatus}
          editMode={editMode}
          setEditMode={setEditMode}
          isApproveVerified={isApproveVerified}
          setIsApproveVerified={setIsApproveVerified}
          isSave={isSave}
          setIsSave={setIsSave}
          changesMade={changesMade}
          setChangesMade={setChangesMade}
          setSaveSuccess={setSaveSuccess}
          setShowSaveMessage={setShowSaveMessage}
        />
      ) : (
        <div className="all-accounts-buttons">
          <Button
            label="Enter Edit Mode"
            style={{ marginTop: '0px' }}
            onClick={() => {
              setEditMode(true);
              //setShowSaveMessage(false);
            }}
          />
        </div>
      )}
      <table className="all-accounts-table">
        <tbody>
          <tr className="all-accounts-table-header-row">
            <th className="all-accounts-table-header">Verified</th>
            <th className="all-accounts-table-header-left-align">Email</th>
            <th className="all-accounts-table-header">Approve/Deny</th>
          </tr>
          {emailList.map((account) => {
            numCurrentlyDisplayed = numCurrentlyDisplayed + 1;

            // only display a certain number of accounts if the number is between the ranges
            if (
              numCurrentlyDisplayed >= nthAccount + 1 &&
              numCurrentlyDisplayed <= nthAccount + numResultsDisplayed
            ) {
              return (
                <RowComponent
                  key={account.email}
                  pointerEvents={editMode ? { pointerEvents: 'all' } : { pointerEvents: 'none' }}
                  account={account}
                  accountStatus={accountStatus}
                  setAccountStatus={setAccountStatus}
                  currentPage={currentPage}
                  isApproveVerified={isApproveVerified}
                  setIsApproveVerified={setIsApproveVerified}
                  isSave={isSave}
                  setIsSave={setIsSave}
                  setSaveSuccess={setSaveSuccess}
                  changesMade={changesMade}
                  setChangesMade={setChangesMade}
                  editMode={editMode}
                />
              );
            }
          })}
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

      {showSaveMessage ? (
        <ErrorSuccessBox
          style={{ margin: '0px 0px' }}
          content={saveSuccess ? 'Successfully saved!' : 'Unsuccessful save. Please try again!'}
          success={saveSuccess}
          error={!saveSuccess}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

// displays each row of the table
const RowComponent = ({
  account,
  accountStatus,
  setAccountStatus,
  currentPage,
  isApproveVerified,
  setIsApproveVerified,
  pointerEvents,
  setSaveSuccess,
  changesMade,
  setChangesMade,
  editMode,
  isSave,
  setIsSave,
}) => {
  // get states from the array with info, is appoved=true or deny=true, it will already "light up"
  // TODO: Update account approval status (back-end)
  const [approve, setApprove] = useState(account.approved);
  const [deny, setDeny] = useState(!account.approved);

  // initial states --- from backend
  const initialApprove = account.approved;
  const initialDeny = !account.approved;

  useEffect(() => {
    if (!editMode && !isSave) {
      // if exiting exit mode, and save button not pressed
      console.log('bbbbbbb');
      setApprove(initialApprove);
      setDeny(initialDeny);
      setIsSave(false);
    } else if (!editMode && isSave) {
      console.log('sssssssss');
      setApprove(accountStatus[account.email].approve);
      setDeny(!accountStatus[account.email].approve);
    }
  });

  useEffect(() => {
    // useEffect that executes when the page changes
    setIsApproveVerified(false);
    setTimeout(() => {
      setAccountStatus({});
    }, 0);
  }, [currentPage]);

  useEffect(() => {
    if (isApproveVerified && account.valid) {
      setApprove(true);
      setDeny(false);
    } else if (!account.valid) {
      setApprove(approve);
      setDeny(deny);
    } else {
      setApprove(false);
    }
  }, [isApproveVerified]);

  useEffect(() => {
    // executes when ever approve or deny chnages to update the state object
    if (accountStatus[account.email] !== undefined) {
      // if the key is already in the object, update contents
      accountStatus[account.email].approve = approve;
      accountStatus[account.email].deny = deny;
    } else {
      // if the key is not in the object, add it to the object
      accountStatus[account.email] = {
        approve: approve,
        deny: deny,
      };
    }
  }, [approve, deny, currentPage, editMode]);

  return (
    <tr className="all-accounts-row" key={account.email}>
      <td className="all-account-data-verified-container">
        <div
          className={`verified-circle ${
            account.valid ? 'green-verified-circle' : 'gray-verified-circle'
          }`}
        ></div>
      </td>
      <td className="all-account-data">
        <p className="all-account-data-email">{account.email}</p>
      </td>
      <td className="all-account-data-checkboxes">
        <ApproveDenyCheckbox
          style={{ marginLeft: 'auto', marginRight: 'auto' }}
          approve={approve}
          deny={deny}
          setApprove={setApprove}
          setDeny={setDeny}
          pointerEvents={pointerEvents}
          changesMade={changesMade}
          setChangesMade={setChangesMade}
        />
      </td>
    </tr>
  );
};

const AllAccountsEditButton = ({
  editMode,
  setEditMode,
  isApproveVerified,
  setIsApproveVerified,
  isSave,
  setIsSave,
  accountStatus,
  setSaveSuccess,
  changesMade,
  setChangesMade,
  setShowSaveMessage,
}) => {
  useEffect(() => {
    if (editMode && isSave && !changesMade) {
      // if in editMode and isSave is clicked, turn off changes made
      setChangesMade(false);
    } else if (editMode && !isSave && changesMade) {
      setChangesMade(true);
    } else {
      setChangesMade(false);
    }

    setIsSave(false);
  }, [editMode]);

  return (
    <div className="all-accounts-buttons">
      <div className="all-accounts-approve-ver-button">
        <ButtonOutlined
          label={
            !isApproveVerified ? 'Approved Verified Accounts' : 'Unapprove All Verified Accounts'
          }
          style={bubbleButtonStyle}
          isSecondary={true}
          onClick={() => {
            setIsApproveVerified(!isApproveVerified);
            setChangesMade(true);
          }}
        />
        <p className="all-accounts-approve-ver-note">
          This only approves accounts on the current page
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Button
          label="Save"
          style={{ alignSelf: 'start', marginTop: '0px', marginBottom: '5px' }}
          onClick={() => {
            setIsSave(true);
            setShowSaveMessage(true);
            setSaveSuccess(sendApprovedEmails(accountStatus));
            setChangesMade(false);
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <ButtonOutlined
            label="Exit Edit Mode"
            style={{ marginTop: '0px', borderWidth: '3px', marginBottom: '5px' }}
            onClick={() => {
              setEditMode(false);
              setShowSaveMessage(false);
              setChangesMade(false);
            }}
          />
          {changesMade && !isSave ? (
            <p className="all-accounts-approve-ver-note">Please save your changes!</p>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

RowComponent.propTypes = {
  account: PropTypes.object,
  accountStatus: PropTypes.object,
  setAccountStatus: PropTypes.func,
  currentPage: PropTypes.number,
  isApproveVerified: PropTypes.bool,
  setIsApproveVerified: PropTypes.func,
  pointerEvents: PropTypes.object,
  setSaveSuccess: PropTypes.func,
  changesMade: PropTypes.bool,
  setChangesMade: PropTypes.func,
  editMode: PropTypes.bool,
  isSave: PropTypes.bool,
  setIsSave: PropTypes.func,
};

AllAccountsTable.propTypes = {
  numResultsDisplayed: PropTypes.number,
};

AllAccountsEditButton.propTypes = {
  editMode: PropTypes.bool,
  setEditMode: PropTypes.func,
  isApproveVerified: PropTypes.bool,
  setIsApproveVerified: PropTypes.func,
  isSave: PropTypes.bool,
  setIsSave: PropTypes.func,
  accountStatus: PropTypes.object,
  setSaveSuccess: PropTypes.func,
  changesMade: PropTypes.bool,
  setChangesMade: PropTypes.func,
  setShowSaveMessage: PropTypes.func,
};

export { AllAccountsTable };
