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
  const [expandedIds, setExpandedIds] = useState([]); // accounts with their scopes open
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

  const toggleExpanded = (accountId) =>
    setExpandedIds((prev) =>
      prev.includes(accountId) ? prev.filter((id) => id !== accountId) : [...prev, accountId],
    );

  const allExpanded = authList.length > 0 && expandedIds.length === authList.length;
  const toggleExpandAll = () =>
    setExpandedIds(allExpanded ? [] : authList.map((account) => account.id));

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

      <div className="all-accounts-buttons">
        <ButtonRound
          label={allExpanded ? 'Collapse All' : 'Expand All'}
          style={{ marginTop: '0px', borderWidth: '3px', marginBottom: '5px' }}
          onClick={toggleExpandAll}
        />
      </div>

      <table className="all-accounts-table">
        <tbody>
          <tr className="all-accounts-table-header-row">
            <th className="all-accounts-table-header-left-align">Name</th>
            <th className="all-accounts-table-header-left-align">Email</th>
            <th className="all-accounts-table-header-left-align">Subcom/Frosh Group</th>
            <th className="all-accounts-table-header-left-align">Auth Scopes</th>
          </tr>
          {authList.map((account) => (
            <RowComponentAuth
              key={account.id ?? account.email}
              pointerEvents={editMode ? { pointerEvents: 'all' } : { pointerEvents: 'none' }}
              account={account}
              editMode={editMode}
              expanded={expandedIds.includes(account.id)}
              onToggleExpanded={() => toggleExpanded(account.id)}
              onToggleScope={(authreq, approve) => setScopeApproval(account.id, authreq, approve)}
              onToggleAll={(approve) => setAllScopesApproval(account.id, approve)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const RowComponentAuth = ({
  account,
  editMode,
  pointerEvents,
  expanded,
  onToggleExpanded,
  onToggleScope,
  onToggleAll,
}) => {
  const total = account.auth.length;
  const approvedCount = account.auth.filter((a) => a.approve).length;
  const allApproved = total > 0 && approvedCount === total;
  const pendingCount = total - approvedCount;

  return (
    <>
      {/* Collapsed header row - the whole row toggles the scope list, which keeps
          the page short when there are a lot of accounts. */}
      <tr
        className={`all-accounts-row auth-account-row ${expanded ? 'auth-account-row-open' : ''}`}
        onClick={onToggleExpanded}
      >
        <td className="all-account-data-verified">
          <p className="all-account-data-name">
            <span className={`auth-scope-chevron ${expanded ? 'auth-scope-chevron-open' : ''}`} />
            {account.name}
          </p>
        </td>
        <td className="all-account-data">
          <p className="all-account-data-email">{account.email}</p>
        </td>
        <td className="all-account-data">
          <p className="all-account-data-email">{account.group}</p>
        </td>
        <td className="all-account-data">
          <div className="auth-scope-summary">
            <span className="account-status-badge account-status-approved">
              {approvedCount} approved
            </span>
            {pendingCount > 0 ? (
              <span className="account-status-badge account-status-pending">
                {pendingCount} pending
              </span>
            ) : (
              <></>
            )}
          </div>
        </td>
      </tr>

      {expanded ? (
        <tr className="auth-scopes-detail-row">
          <td className="auth-scopes-detail" colSpan={4}>
            {editMode ? (
              <ButtonRound
                label={allApproved ? 'Unapprove All Scopes' : 'Approve All Scopes'}
                style={bubbleButtonStyleAuth}
                onClick={() => onToggleAll(!allApproved)}
              />
            ) : (
              <></>
            )}
            <div className="auth-scopes-list">
              {account.auth.map((authreq) => (
                <div className="auth-req-container" key={authreq.authreq}>
                  <ApproveDenyCheckbox
                    approve={authreq.approve}
                    deny={!authreq.approve}
                    // ApproveDenyCheckbox flips both flags on a click; both calls agree
                    // on the resulting approval so either order lands on the same value.
                    setApprove={(value) => onToggleScope(authreq.authreq, value)}
                    setDeny={(value) => onToggleScope(authreq.authreq, !value)}
                    setChangesMade={() => {}}
                    pointerEvents={pointerEvents}
                  />
                  <p className="auth-req-text">{authreq.authreq}</p>
                </div>
              ))}
              {total === 0 ? <p className="auth-req-text">No scopes requested.</p> : <></>}
            </div>
          </td>
        </tr>
      ) : (
        <></>
      )}
    </>
  );
};

RowComponentAuth.propTypes = {
  account: PropTypes.object,
  pointerEvents: PropTypes.object,
  editMode: PropTypes.bool,
  expanded: PropTypes.bool,
  onToggleExpanded: PropTypes.func,
  onToggleScope: PropTypes.func,
  onToggleAll: PropTypes.func,
};

export { AuthenticationRequests };
