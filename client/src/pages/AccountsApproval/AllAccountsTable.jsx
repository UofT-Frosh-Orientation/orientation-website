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
};

const AllAccountsTable = ({ numResultsDisplayed }) => {
  const [emailList, setEmailList] = useState(TestEmails); // email list that is displayed
  const [isApproveVerified, setIsApproveVerified] = useState(false); // approve state for emails that match frosh leedur email list
  const [accountStatus, setAccountStatus] = useState({}); // object to send approve deny status to backend
  const [isSave, setIsSave] = useState(false); // state for whether the save button is clicked
  const [saveSuccess, setSaveSuccess] = useState(false); // displays error or success box depending on bool
  const [currentPage, setCurrentPage] = useState(1); // default to display page 1

  useEffect(() => {
    setEmailList(TestEmails);
  }, [emailList]);

  useEffect(() => {
    setIsSave(false);
  }, [currentPage]);

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
            }}
          />
          <p className="all-accounts-approve-ver-note">
            This only approves accounts on the current page
          </p>
        </div>

        <Button
          label="Save"
          style={{ alignSelf: 'start' }}
          onClick={() => {
            setSaveSuccess(sendApprovedEmails(accountStatus));
            setIsSave(true);
          }}
        />
      </div>
      <table className="all-accounts-table">
        <tbody>
          <tr className="all-accounts-table-header-row">
            <th className="all-accounts-table-header">Verified</th>
            <th className="all-accounts-table-header-left-align">Email</th>
            <th className="all-accounts-table-header">Approve/Deny</th>
          </tr>

          {emailList.map((account) => {
            numCurrentlyDisplayed++;

            // only display a certain number of accounts if the number is between the ranges
            if (
              numCurrentlyDisplayed >= nthAccount + 1 &&
              numCurrentlyDisplayed <= nthAccount + numResultsDisplayed
            ) {
              return (
                <RowComponent
                  key={account.email}
                  account={account}
                  accountStatus={accountStatus}
                  setAccountStatus={setAccountStatus}
                  currentPage={currentPage}
                  isApproveVerified={isApproveVerified}
                  setIsApproveVerified={setIsApproveVerified}
                />
              );
            }
          })}
        </tbody>
      </table>

      {/* page numbers thing */}
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
      <p style={{ fontSize: '12px', color: '#b297c7' }}>
        {' '}
        Currently displaying as many as <span>{numResultsDisplayed}</span> results per page
      </p>
      {isSave ? (
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
}) => {
  // get states from the array with info, is appoved=true or deny=true, it will already "light up"
  const [approve, setApprove] = useState(account.approved);
  const [deny, setDeny] = useState(account.deny);

  useEffect(() => {
    // useEffect that executes when the page changes
    setIsApproveVerified(false);
    //setAccountStatus({});
    setTimeout(() => {
      setAccountStatus({});
    }, 0);
  }, [currentPage]);

  useEffect(() => {
    // useEffect that executes when approve button is clicked
    if (isApproveVerified && account.valid) {
      setApprove(true);
      setDeny(false);
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
  }, [approve, deny, currentPage]);

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
        />
      </td>
    </tr>
  );
};

RowComponent.propTypes = {
  account: PropTypes.object,
  setAccountStatus: PropTypes.func,
  currentPage: PropTypes.number,
  isApproveVerified: PropTypes.bool,
  setIsApproveVerified: PropTypes.func,
  accountStatus: PropTypes.object,
};

AllAccountsTable.propTypes = {
  numResultsDisplayed: PropTypes.number,
};

export { AllAccountsTable };
