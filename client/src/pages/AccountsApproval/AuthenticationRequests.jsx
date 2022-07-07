import { useState } from 'react';
import PropTypes from 'prop-types';
import { React, useEffect } from 'react';

import './AccountsApproval.scss';
import './AccountsPageNumber.scss';
import './ApproveDenyCheckbox.scss';

import { TestAuth, sendApprovedEmails } from './functions';
import { Button } from '../../components/button/Button/Button';
import { ButtonOutlined } from '../../components/button/ButtonOutlined/ButtonOutlined';

import GrayCross from '../../assets/misc/xmark-solid-gray.svg';
import WhiteCross from '../../assets/misc/xmark-solid-white.svg';
import GrayCheck from '../../assets/misc/check-solid-gray.svg';
import WhiteCheck from '../../assets/misc/check-solid-white.svg';

const bubbleButtonStyleAuth = {
  fontSize: '14px',
  borderWidth: '3px',
  padding: '8px 26px',
  borderRadius: '10px',
  margin: '3px',
};

const AuthenticationRequests = () => {
  const [emailList, setEmailList] = useState(TestAuth); // email list that is displayed
  const [accountStatus, setAccountStatus] = useState([]); // this is an array that will store objects -- email and approved and deny status

  useEffect(() => {
    setEmailList(TestAuth);
  }, [emailList]);

  return (
    <div className="all-accounts-container">
      <div className="all-accounts-buttons">
        <Button
          label="Save"
          onClick={() => {
            sendApprovedEmails(accountStatus);
          }}
        />
      </div>

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

            let accountEmail = account.email;

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
                    const [approve, setApprove] = useState(account.approved);
                    const [deny, setDeny] = useState(account.deny);

                    // sets initial states based off the email array given
                    useEffect(() => {
                      if (authreq.approve) {
                        setApprove(true);
                      } else if (authreq.deny) {
                        setDeny(false);
                      }
                    });

                    useEffect(() => {
                      if (approveAll) {
                        setApprove(true);
                        setDeny(false);
                      } else {
                        setApprove(false);
                      }
                    }, [approveAll]);

                    useEffect(() => {
                      const insideArray = {
                        req: authreq,
                        approve: approve,
                        deny: deny,
                      };

                      const object = {
                        email: accountEmail,
                        //auth: [insideArray],
                        //auth: [],
                        auth: insideArray,
                      };

                      // see if email exists in state array
                      if (accountStatus.filter((obj) => obj.email === accountEmail).length > 0) {
                        console.log('update');

                        accountStatus.map((e) => {
                          // if email in array, update authscopes
                          if (e.email === accountEmail) {
                            // e.auth.map((innerArrayItem) => {
                            //     console.log("update");
                            //     innerArrayItem.approve = approve;
                            //     innerArrayItem.deny = deny;
                            // })

                            if (e.auth.req === authreq) {
                              e.auth.approve = approve;
                              e.auth.deny = deny;
                            }
                          }
                        });
                      } else {
                        console.log('add');
                        // TODO: does not initialize with an empty array...
                        // TODO: currently adds another object in the state array, try to make it add another object to the array within accountStatus
                        //object.auth.push(insideArray);
                        setAccountStatus((accountStatus) => accountStatus.concat(object));
                      }
                    }, [approve, deny]);

                    return (
                      <div className="auth-req-container" key={authreq}>
                        {/* <ApproveDenyCheckbox approveCheck={approveAll} /> */}
                        <>
                          <div className="approve-deny-checkbox-container">
                            <div
                              className={`approve-deny-checkbox ${
                                approve ? 'approve-green-check' : 'approve-gray-checkbox'
                              }`}
                              onClick={() => {
                                if (deny) {
                                  setDeny(false);
                                  setApprove(true);
                                } else {
                                  setApprove(!approve);
                                }
                              }}
                            >
                              <img
                                className="approve-icon"
                                src={`${approve ? WhiteCheck : GrayCheck}`}
                                alt="approval check"
                              />
                            </div>

                            <div
                              className={`approve-deny-checkbox ${
                                deny ? 'approve-red-cross' : 'approve-gray-checkbox'
                              }`}
                              onClick={() => {
                                setApproveAll(false);
                                if (approve) {
                                  setApprove(false);
                                  setDeny(true);
                                } else {
                                  setDeny(!deny);
                                }
                              }}
                            >
                              <img
                                className="deny-icon"
                                src={`${deny ? WhiteCross : GrayCross}`}
                                alt="deny cross"
                              />
                            </div>
                          </div>
                        </>
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
            //}
          })}
        </tbody>
      </table>
    </div>
  );
};

export { AuthenticationRequests };
