import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './LeadurScopeRequest.scss';
import { getTotalRegistrationScopes, getTotalScopes, submitScopes } from './functions';
import { Dropdown } from '../../components/form/Dropdown/Dropdown';
import { Checkboxes } from '../../components/form/Checkboxes/Checkboxes';
import { Button } from '../../components/button/Button/Button';
import { ErrorSuccessBox } from '../../components/containers/ErrorSuccessBox/ErrorSuccessBox';

function convertCamelToLabel(text) {
  const result = text.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
}

export const PageLeadurScopeRequest = () => {
  const [selectAllRegistrationScopes, setSelectAllRegistrationScopes] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [requestScopes, setRequestedScopes] = useState({});

  const totalScopes = getTotalScopes();
  const totalRegistrationScopes = getTotalRegistrationScopes();
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className="leadur-scope-request-page">
        <div className="navbar-space-top" />
        <h1>Leadur Permissions Request</h1>
        <h2>General Permissions</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {Object.keys(totalScopes).map((scope) => {
            return (
              <div key={scope} style={{ paddingRight: '25px' }}>
                <Dropdown
                  filterLabel={convertCamelToLabel}
                  label={convertCamelToLabel(scope)}
                  values={totalScopes[scope]}
                  initialSelectedIndex={0}
                  onSelect={(value) => {
                    requestScopes[scope] = value;
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
            requestScopes[label] = value;
          }}
        />
      </div>
      <Button
        onClick={() => {
          const result = submitScopes(requestScopes);
          if (result === true) {
            setSuccess('Successfully submitted request');
          } else {
            setError(result);
          }
        }}
        label={'Submit'}
        isSecondary
      />
      <ErrorSuccessBox error content={error} />
      <ErrorSuccessBox success content={success} />
    </div>
  );
};
