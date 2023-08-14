import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

import './AccountsApproval.scss';
import './AccountsPageNumber.scss';
import './ApproveDenyCheckbox.scss';

import { Button } from '../../components/button/Button/Button';
import { ButtonOutlined } from '../../components/button/ButtonOutlined/ButtonOutlined';
import { ApproveDenyCheckbox } from './ApproveDenyCheckbox';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthRequests, updateAuthRequests } from '../../state/accounts/saga';
import { authRequestsSelector } from '../../state/accounts/accountSlice';
import { SnackbarContext } from '../../util/SnackbarProvider';

const bubbleButtonStyleAuth = {
  fontSize: '14px',
  borderWidth: '3px',
  padding: '8px 26px',
  borderRadius: '10px',
  margin: '3px',
};

const AuthenticationRequests = () => {
  const [authList, setAuthList] = useState([]); // email list that is displayed
  const [modifiedIds, setModifiedIds] = useState([]);
  const [accountStatus, setAccountStatus] = useState({});
  const [isSave, setIsSave] = useState(false); // state for whether the save button is clicked
  const [changesMade, setChangesMade] = useState(false);
  const [editMode, setEditMode] = useState(false); // not in edit mode

  let accountCount = 0; // this is just used to make sure there are unique keys for map
  const { setSnackbar } = useContext(SnackbarContext);

  const dispatch = useDispatch();

  const { authRequests } = useSelector(authRequestsSelector);

  useEffect(() => {
    dispatch(getAuthRequests());
  }, []);

  useEffect(() => {
    setAuthList(authRequests);
  }, [authRequests]);

  useEffect(() => {
    if (editMode && isSave && !changesMade) {
      // if in editMode and isSave is clicked, turn off changes made
      setChangesMade(false);
    } else if (editMode && !isSave && changesMade) {
      setChangesMade(true);
    } else {
      setChangesMade(false);
    }
  }, [editMode]);

  return (
    <div className="all-accounts-container">
      <div className="all-accounts-buttons">
        {editMode ? (
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Button
              label="Save"
              style={{ alignSelf: 'start', marginTop: '0px', marginBottom: '5px' }}
              onClick={() => {
                dispatch(
                  updateAuthRequests({
                    setSnackbar,
                    userAuthScopes: authList?.filter((auth) => modifiedIds.includes(auth.id)),
                  }),
                );
                setIsSave(true);
                setChangesMade(false);
                setModifiedIds([]);
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <ButtonOutlined
                label="Exit Edit Mode"
                style={{ marginTop: '0px', borderWidth: '3px', marginBottom: '5px' }}
                onClick={() => {
                  setEditMode(false);
                }}
              />
              {changesMade && !isSave ? (
                <p className="all-accounts-approve-ver-note">Please save your changes!</p>
              ) : (
                <></>
              )}
            </div>
          </div>
        ) : (
          <div className="all-accounts-buttons">
            <Button
              label="Enter Edit Mode"
              style={{ marginTop: '0px', borderWidth: '3px', marginBottom: '5px' }}
              onClick={() => {
                setEditMode(true);
                setIsSave(false);
              }}
            />
          </div>
        )}
      </div>

      <table className="all-accounts-table">
        <tbody>
          <tr className="all-accounts-table-header-row">
            <th className="all-accounts-table-header-left-align">Name</th>
            <th className="all-accounts-table-header-left-align">Email</th>
            <th className="all-accounts-table-header-left-align">Subcom/Frosh Group</th>
            <th className="all-accounts-table-header-left-align">Requested Auth Scopes</th>
          </tr>
          {authList.map((account) => {
            accountCount++;
            return (
              <RowComponentAuth
                key={account.email}
                pointerEvents={editMode ? { pointerEvents: 'all' } : { pointerEvents: 'none' }}
                account={account}
                onUpdate={(authreq, approve, deny) => {
                  setAuthList((prev) =>
                    prev.map((p) => {
                      if (p.id === account.id) {
                        return {
                          ...p,
                          auth: p.auth.map((a) => {
                            if (a.authreq === authreq) {
                              if (!modifiedIds.includes(account.id)) {
                                setModifiedIds((prev) => [...prev, account.id]);
                              }
                              return { ...a, authreq, approve, deny };
                            } else return a;
                          }),
                        };
                      } else {
                        return p;
                      }
                    }),
                  );
                }}
                accountStatus={accountStatus}
                setAccountStatus={setAccountStatus}
                count={accountCount}
                setChangesMade={setChangesMade}
                editMode={editMode}
                isSave={isSave}
                setIsSave={setIsSave}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const RowComponentAuth = ({
  account,
  accountStatus,
  setAccountStatus,
  onUpdate,
  count,
  setChangesMade,
  pointerEvents,
  editMode,
  isSave,
  setIsSave,
}) => {
  const [approveAll, setApproveAll] = useState(false);

  return (
    <tr className="all-accounts-row" key={count + '_' + account.email}>
      <td className="all-account-data-verified">
        <p className="all-account-data-name">{account.name}</p>
      </td>
      <td className="all-account-data">
        <p className="all-account-data-email">{account.email}</p>
      </td>
      <td className="all-account-data">
        <p className="all-account-data-email">{account.group}</p>
      </td>
      <td className="all-account-data">
        {editMode ? (
          <ButtonOutlined
            label={approveAll ? 'Unapproved All Scopes' : 'Approve All Scopes'}
            style={bubbleButtonStyleAuth}
            isSecondary={true}
            onClick={() => {
              setApproveAll(!approveAll);
              setChangesMade(true);
            }}
          />
        ) : (
          <></>
        )}
        {account.auth
          .filter(
            (
              (s) => (o) =>
                ((k) => !s.has(k) && s.add(k))(['authreq'].map((k) => o[k]).join('|'))
            )(new Set()),
          )
          .map((authreq, index) => {
            const [approve, setApprove] = useState(authreq.approve);
            const [deny, setDeny] = useState(authreq.deny);

            const initialApprove = authreq.approve;
            const initialDeny = authreq.deny;

            useEffect(() => {
              if (approveAll) {
                setApprove(true);
                setDeny(false);
              } else {
                setApprove(false);
                setDeny(true);
              }
            }, [approveAll]);

            // useEffect to update state object to be sent to backend
            useEffect(() => {
              // first check if the email is in the object
              if (accountStatus[account.email] !== undefined) {
                if (accountStatus[account.email][authreq.authreq] != undefined) {
                  // if auth key already in the object, update
                  accountStatus[account.email][authreq.authreq].approve = approve;
                  accountStatus[account.email][authreq.authreq].deny = deny;
                  onUpdate(authreq.authreq, approve, deny);
                } else {
                  // auth key not in the object yet, add it
                  accountStatus[account.email][authreq.authreq] = {
                    approve: approve,
                    deny: deny,
                  };
                }
              } else {
                // is email key not in object, add the key and the auth key
                accountStatus[account.email] = {};
                accountStatus[account.email][authreq.authreq] = {
                  approve: approve,
                  deny: deny,
                };
              }
            }, [approve, deny]);

            useEffect(() => {
              if (!editMode && !isSave) {
                setApprove(initialApprove);
                setDeny(initialDeny);
                setIsSave(false);
              } else if (!editMode && isSave) {
                // use the states from the state object so backend has time to change the actual account array
                setApprove(accountStatus[account.email][authreq.authreq].approve);
                setDeny(!accountStatus[account.email][authreq.authreq].approve);
              }
            });

            return (
              <div
                className="auth-req-container"
                key={account.email + '_' + authreq.authreq + index.toString()}
              >
                <ApproveDenyCheckbox
                  approve={approve}
                  deny={deny}
                  setApprove={setApprove}
                  setDeny={setDeny}
                  setChangesMade={setChangesMade}
                  pointerEvents={pointerEvents}
                />
                <p className="auth-req-text">{authreq.authreq}</p>
              </div>
            );
          })}
      </td>
    </tr>
  );
};

RowComponentAuth.propTypes = {
  account: PropTypes.object,
  accountStatus: PropTypes.object,
  setAccountStatus: PropTypes.func,
  count: PropTypes.number,
  setChangesMade: PropTypes.func,
  pointerEvents: PropTypes.object,
  editMode: PropTypes.bool,
  isSave: PropTypes.bool,
  setIsSave: PropTypes.func,
  onUpdate: PropTypes.func,
};

export { AuthenticationRequests };
