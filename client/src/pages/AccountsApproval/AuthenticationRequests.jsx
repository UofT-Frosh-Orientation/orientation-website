import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

import './AccountsApproval.scss';
import './AccountsPageNumber.scss';
import './ApproveDenyCheckbox.scss';

import { ButtonRound } from '../../components/button/ButtonRound/ButtonRound';
import { ApproveDenyCheckbox } from './ApproveDenyCheckbox';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthRequests, updateAuthRequests } from '../../state/accounts/saga';
import { authRequestsSelector } from '../../state/accounts/accountSlice';
import { SnackbarContext } from '../../util/SnackbarProvider';

const bubbleButtonStyleAuth = {
  fontSize: '14px',
  padding: '16px 26px',
  margin: '5px',
  marginBottom: '20px',
};

/**
 * A user's `auth` list can hold the same scope twice: once because it is already
 * approved and once because they requested it again. Keep only the first copy (the
 * approved one, which the server returns first) - both for display and for what gets
 * sent back, so a stale duplicate cannot undo a scope that was just granted.
 */
const dedupeAuth = (auth = []) => {
  const seen = new Set();
  return auth.filter(({ authreq }) => {
    if (seen.has(authreq)) return false;
    seen.add(authreq);
    return true;
  });
};

const toEditableList = (authRequests) =>
  (authRequests ?? []).map((account) => ({ ...account, auth: dedupeAuth(account.auth) }));

const AuthenticationRequests = () => {
  const [authList, setAuthList] = useState([]); // the accounts as currently edited
  const [modifiedIds, setModifiedIds] = useState([]); // accounts with unsaved edits
  const [changesMade, setChangesMade] = useState(false);
  const [editMode, setEditMode] = useState(false); // not in edit mode

  const { setSnackbar } = useContext(SnackbarContext);

  const dispatch = useDispatch();

  const { authRequests } = useSelector(authRequestsSelector);

  useEffect(() => {
    dispatch(getAuthRequests());
  }, []);

  // Whatever the server last told us is the source of truth - adopting it also
  // discards any edits that were already saved (or abandoned).
  useEffect(() => {
    setAuthList(toEditableList(authRequests));
    setModifiedIds([]);
    setChangesMade(false);
  }, [authRequests]);

  const markModified = (accountId) => {
    setModifiedIds((prev) => (prev.includes(accountId) ? prev : [...prev, accountId]));
    setChangesMade(true);
  };

  // Approve/deny a single scope on one account.
  const setScopeApproval = (accountId, authreq, approve) => {
    setAuthList((prev) =>
      prev.map((account) =>
        account.id === accountId
          ? {
              ...account,
              auth: account.auth.map((a) =>
                a.authreq === authreq ? { ...a, approve, deny: !approve } : a,
              ),
            }
          : account,
      ),
    );
    markModified(accountId);
  };

  // Approve/deny every scope on one account.
  const setAllScopesApproval = (accountId, approve) => {
    setAuthList((prev) =>
      prev.map((account) =>
        account.id === accountId
          ? { ...account, auth: account.auth.map((a) => ({ ...a, approve, deny: !approve })) }
          : account,
      ),
    );
    markModified(accountId);
  };

  const modifiedAccounts = authList.filter((account) => modifiedIds.includes(account.id));

  const save = () => {
    if (modifiedAccounts.length === 0) {
      setSnackbar('There are no changes to save.', true);
      return;
    }
    dispatch(updateAuthRequests({ setSnackbar, userAuthScopes: modifiedAccounts }));
    setChangesMade(false);
  };

  const exitEditMode = () => {
    setEditMode(false);
    // Drop anything that was not saved.
    setAuthList(toEditableList(authRequests));
    setModifiedIds([]);
    setChangesMade(false);
  };

  return (
    <div className="all-accounts-container">
      <div className="all-accounts-buttons">
        {editMode ? (
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <ButtonRound
              label="Save"
              style={{
                alignSelf: 'start',
                marginTop: '0px',
                marginBottom: '5px',
                marginRight: '20px',
              }}
              onClick={save}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <ButtonRound
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
        ) : (
          <div className="all-accounts-buttons">
            <ButtonRound
              label="Enter Edit Mode"
              style={{ marginTop: '0px', borderWidth: '3px', marginBottom: '5px' }}
              onClick={() => {
                setEditMode(true);
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
          {authList.map((account) => (
            <RowComponentAuth
              key={account.id ?? account.email}
              pointerEvents={editMode ? { pointerEvents: 'all' } : { pointerEvents: 'none' }}
              account={account}
              editMode={editMode}
              onToggleScope={(authreq, approve) => setScopeApproval(account.id, authreq, approve)}
              onToggleAll={(approve) => setAllScopesApproval(account.id, approve)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const RowComponentAuth = ({ account, editMode, pointerEvents, onToggleScope, onToggleAll }) => {
  const allApproved = account.auth.length > 0 && account.auth.every((a) => a.approve);

  return (
    <tr className="all-accounts-row">
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
          <ButtonRound
            label={allApproved ? 'Unapprove All Scopes' : 'Approve All Scopes'}
            style={bubbleButtonStyleAuth}
            onClick={() => onToggleAll(!allApproved)}
          />
        ) : (
          <></>
        )}
        {account.auth.map((authreq) => (
          <div className="auth-req-container" key={authreq.authreq}>
            <ApproveDenyCheckbox
              approve={authreq.approve}
              deny={!authreq.approve}
              // ApproveDenyCheckbox flips both flags on a click; both calls agree on
              // the resulting approval so either order lands on the same value.
              setApprove={(value) => onToggleScope(authreq.authreq, value)}
              setDeny={(value) => onToggleScope(authreq.authreq, !value)}
              setChangesMade={() => {}}
              pointerEvents={pointerEvents}
            />
            <p className="auth-req-text">{authreq.authreq}</p>
          </div>
        ))}
      </td>
    </tr>
  );
};

RowComponentAuth.propTypes = {
  account: PropTypes.object,
  pointerEvents: PropTypes.object,
  editMode: PropTypes.bool,
  onToggleScope: PropTypes.func,
  onToggleAll: PropTypes.func,
};

export { AuthenticationRequests };
