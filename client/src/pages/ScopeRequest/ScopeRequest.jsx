import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import './ScopeRequest.scss';
import { getTotalRegistrationScopes, getTotalScopes, submitScopes } from './functions';
import { Dropdown } from '../../components/form/Dropdown/Dropdown';
import { Checkboxes } from '../../components/form/Checkboxes/Checkboxes';
import { Button } from '../../components/button/Button/Button';
import { ErrorSuccessBox } from '../../components/containers/ErrorSuccessBox/ErrorSuccessBox';
import { SnackbarContext } from '../../util/SnackbarProvider';
import { useDispatch } from 'react-redux';
import { requestAuthScopes } from '../../state/user/saga';

function convertCamelToLabel(text) {
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
        <div className="navbar-space-top" />
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
            return (
              <div key={scope} style={{ paddingRight: '25px' }}>
                <Checkboxes
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
