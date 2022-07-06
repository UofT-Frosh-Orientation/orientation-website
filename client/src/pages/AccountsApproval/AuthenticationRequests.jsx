import { useState } from 'react';
import PropTypes from 'prop-types';
import { React, useEffect } from 'react';
import './AccountsApproval.scss';
import './AccountsPageNumber.scss';

import { TestAuth } from './functions';
import { ButtonOutlined } from '../../components/button/ButtonOutlined/ButtonOutlined';
import { ApproveDenyCheckbox } from './ApproveDenyCheckbox/ApproveDenyCheckbox';

import ArrowRight from '../../assets/steps/arrow-right-solid-purple.svg';
import ArrowLeft from '../../assets/steps/arrow-left-solid-purple.svg';

const bubbleButtonStyleAuth = {
  fontSize: '14px',
  borderWidth: '3px',
  padding: '8px 26px',
  borderRadius: '10px',
  margin: '3px',
};

const AuthenticationRequests = ({ numResultsDisplayed }) => {
  const [emailList, setEmailList] = useState(TestAuth);

  useEffect(() => {
    setEmailList(TestAuth);
    //console.log("email list", emailList);
  }, [emailList]);

  // states for displaying n results per page
  const [currentPage, setCurrentPage] = useState(1); // default to display page 1

  // numResultsDisplayed = the number of results you want to display per page
  let pageNumber = Math.ceil(emailList.length / numResultsDisplayed); // the number of page numbers you will have
  let numCurrentlyDisplayed = 0;
  let nthAccount = numResultsDisplayed * (currentPage - 1); // the nth account that is the first to be displayed on the page

  console.log(currentPage);

  // make an array that stores page numbers
  let pageNumberList = [];
  for (let i = 1; i <= pageNumber; i++) {
    pageNumberList.push(i); // add each page # to list
  }

  return (
    <div className="all-accounts-container">
      <table className="all-accounts-table">
        <tbody>
          <tr className="all-accounts-table-header-row">
            <th className="all-accounts-table-header-left-align">Name</th>
            <th className="all-accounts-table-header-left-align">Email</th>
            <th className="all-accounts-table-header-left-align">Subcom/Frosh Group</th>
            <th className="all-accounts-table-header-left-align">Requested Auth Scopes</th>
          </tr>
          {emailList.map((account) => {
            const [approveAll, setApproveAll] = useState(false);

            numCurrentlyDisplayed++;

            // only display the account, if the number is between the ranges
            if (
              numCurrentlyDisplayed >= nthAccount + 1 &&
              numCurrentlyDisplayed <= nthAccount + numResultsDisplayed
            ) {
              return (
                <tr className="all-accounts-row" key={account.id}>
                  <td className="all-account-data-verified">
                    {/* .includes checks if the id is the isCheck array */}
                    <p className="all-account-data-name">{account.name}</p>
                  </td>
                  <td className="all-account-data">
                    {/* verified indication */}
                    <p className="all-account-data-email">{account.email}</p>
                  </td>
                  <td className="all-account-data">
                    {/* email */}
                    <p className="all-account-data-email">{account.group}</p>
                  </td>
                  <td className="all-account-data">
                    {/* approve or deny component */}
                    {account.auth.map((authreq) => {
                      return (
                        <div className="auth-req-container" key={authreq}>
                          <ApproveDenyCheckbox approveCheck={approveAll} />
                          <p className="auth-req-text">{authreq}</p>
                        </div>
                      );
                    })}

                    <ButtonOutlined
                      label={approveAll ? 'Approved All' : 'Approve All Requested Scopes'}
                      style={bubbleButtonStyleAuth}
                      isSecondary={true}
                      onClick={() => {
                        setApproveAll(!approveAll);
                      }}
                    />
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>

      {/* <AccountsPageNumber pageNumber={pageNumbers} /> */}
      {/* page numbers thing */}
      <div className="accounts-page-number-container">
        <div className="page-number-arrow-container">
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
        <div className="page-number-arrow-container">
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
    </div>
  );
};

AuthenticationRequests.propTypes = {
  numResultsDisplayed: PropTypes.number,
};

export { AuthenticationRequests };
