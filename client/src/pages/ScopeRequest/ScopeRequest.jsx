import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import './ScopeRequest.scss';
import { getTotalRegistrationScopes, getTotalScopes } from './functions';
import { Dropdown } from '../../components/form/Dropdown/Dropdown';
import { Checkboxes } from '../../components/form/Checkboxes/Checkboxes';
import { Button } from '../../components/button/Button/Button';
import { ErrorSuccessBox } from '../../components/containers/ErrorSuccessBox/ErrorSuccessBox';
import { SnackbarContext } from '../../util/SnackbarProvider';
import { useDispatch, useSelector } from 'react-redux';
import { requestAuthScopes } from '../../state/user/saga';
import { userSelector } from '../../state/user/userSlice';

export function convertCamelToLabel(text) {
  const result = text.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
}

export const PageScopeRequest = () => {
  const [selectAllRegistrationScopes, setSelectAllRegistrationScopes] = useState(false);
  const [selectAllGeneralScopes, setSelectAllGeneralScopes] = useState(false);
  const [requestScopes, setRequestedScopes] = useState({ authScopes: {}, froshDataFields: {} });
  // const [requestRegistrationScopes, setRequestedRegistrationScopes] = useState({});
  const { setSnackbar } = useContext(SnackbarContext);
  const totalScopes = getTotalScopes();
  const totalRegistrationScopes = getTotalRegistrationScopes();
  const dispatch = useDispatch();
  const { user } = useSelector(userSelector);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className="scope-request-page">
        <h1>Leadur Permissions Request</h1>
        <h2>General Permissions</h2>
        <Button
          onClick={() => {
            setSelectAllGeneralScopes(true);
          }}
          label={'Select All'}
        />
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {Object.keys(totalScopes).map((scope) => {
            const highlightFields = [];
            try {
              for (let authScope of user.authScopes.approved) {
                if (scope === authScope.split(':')[0]) {
                  highlightFields.push(authScope.split(':')[1]);
                }
              }
            } catch (e) {
              console.error(e.toString());
            }
            const disabledFields = [...highlightFields];
            try {
              for (let authScope of user.authScopes.requested) {
                if (scope === authScope.split(':')[0]) {
                  disabledFields.push(authScope.split(':')[1]);
                }
              }
            } catch (e) {
              console.error(e.toString());
            }
            return (
              <div key={scope} style={{ paddingRight: '25px' }}>
                <Checkboxes
                  name={scope}
                  highlightValues={highlightFields}
                  disabledValues={disabledFields}
                  label={convertCamelToLabel(scope)}
                  initialSelectedIndices={[]}
                  selectAll={selectAllGeneralScopes}
                  setSelectAll={setSelectAllGeneralScopes}
                  filterLabel={convertCamelToLabel}
                  values={totalScopes[scope]}
                  onSelected={(label, index, value, allIndices) => {
                    const out = [];
                    allIndices.map((index) => out.push(totalScopes[scope][index]));
                    requestScopes.authScopes[scope] = out;
                  }}
                />
              </div>
            );
          })}
        </div>
        <br />
        <h2>Frosh Registration Information</h2>
        <Button
          onClick={() => {
            setSelectAllRegistrationScopes(true);
          }}
          label={'Select All'}
        />
        <Checkboxes
          highlightValues={user.froshDataFields.approved}
          disabledValues={[...user.froshDataFields.approved, ...user.froshDataFields.requested]}
          initialSelectedIndices={[]}
          selectAll={selectAllRegistrationScopes}
          setSelectAll={setSelectAllRegistrationScopes}
          filterLabel={convertCamelToLabel}
          values={totalRegistrationScopes}
          onSelected={(label, index, value) => {
            requestScopes.froshDataFields[label] = value;
          }}
        />
      </div>
      <Button
        onClick={() => {
          const froshDataFields = Object.keys(requestScopes.froshDataFields).filter(
            (k) => requestScopes.froshDataFields[k],
          );
          const authScopes = Object.keys(requestScopes.authScopes).reduce((prev, curr) => {
            prev.push(...requestScopes.authScopes[curr].map((k) => `${curr}:${k}`));
            return prev;
          }, []);
          dispatch(requestAuthScopes({ froshDataFields, authScopes, setSnackbar }));
        }}
        label={'Submit'}
        isSecondary
      />
    </div>
  );
};
