import React, { useEffect, useState } from 'react';
import './ProfilePageQRScanner.scss';
import { useDispatch, useSelector } from 'react-redux';
import { froshListSelector, froshSelector } from '../../../../state/frosh/froshSlice';
import { QRScannerDisplay } from '../../../../components/QRScannerDisplay/QRScannerDisplay';
import { ErrorSuccessBox } from '../../../containers/ErrorSuccessBox/ErrorSuccessBox';
import { TextInput } from '../../../input/TextInput/TextInput';
import { ButtonOutlined } from '../../../button/ButtonOutlined/ButtonOutlined';
import {
  signInFrosh,
  preKitPickUp,
  searchFroshList,
  clearFroshList,
} from '../../../../state/frosh/saga';
import PropTypes from 'prop-types';
import { capitalizeFirstLetter } from '../../../../pages/Profile/functions';

export const ProfilePageQRScanner = ({ scopes }) => {
  const [scannerType, setScannerType] = useState('');
  const [clearText, setClearText] = useState(false);

  const { froshList } = useSelector(froshListSelector);
  const { frosh, error } = useSelector(froshSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    if (scopes?.includes('scanner:registration')) {
      setScannerType('registration');
    } else if (scopes?.includes('scanner:kits')) {
      setScannerType('kits');
    }
  }, [scopes]);

  useEffect(() => {
    dispatch(clearFroshList());
  }, [dispatch]);

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
    hour: 'numeric',
    minute: 'numeric',
  };

  const scannerInfo = () => {
    switch (scannerType) {
      case 'registration':
        return (
          <>
            {frosh['signInDate'] !== undefined ? (
              <div style={{ color: 'black' }}>
                <ErrorSuccessBox
                  error
                  content={`User already signed in on ${new Date(
                    frosh['signInDate'],
                  )?.toLocaleDateString(undefined, options)}`}
                />
              </div>
            ) : (
              <div style={{ color: 'black' }}>
                <ErrorSuccessBox success content={'User Signed in!'} />
              </div>
            )}
            {!frosh['preKit'] && (
              <div style={{ color: 'black' }}>
                <ErrorSuccessBox
                  content={'This Frosh needs a pre kit'}
                  style={{
                    backgroundColor: '#f2d768',
                  }}
                />
              </div>
            )}
          </>
        );
      case 'kits':
        return (
          <>
            {frosh['preKit'] ? (
              <div style={{ color: 'black' }}>
                <ErrorSuccessBox error content={'Pre kit already picked up'} />
              </div>
            ) : (
              <div style={{ color: 'black' }}>
                <ErrorSuccessBox success content={'Pre kit picked up!'} />
              </div>
            )}
          </>
        );
    }
  };

  return (
    <div className="profile-page-qr-code-scanner profile-page-side-section">
      <h2 className="profile-page-manual-entry-header">{`Scanning for ${scannerType}`}</h2>
      <QRScannerDisplay
        setScannedData={(id) => {
          if (id) {
            if (scannerType === 'registration') {
              dispatch(signInFrosh({ userID: id }));
            } else if (scannerType === 'kits') {
              dispatch(preKitPickUp({ userID: id }));
            }
          }
        }}
      />

      {/* Frosh Info */}

      {frosh && (
        <div className={`profile-page-scanned-data ${error && 'profile-page-scanned-data-error'}`}>
          <div>
            <h3>Scanned User Info</h3>
            <div style={{ height: '7px' }} />
            <div>
              <b>Name: </b>
              {frosh?.preferredName === '' || !frosh?.preferredName
                ? frosh?.firstName
                : frosh?.preferredName}
            </div>

            {Object.keys(frosh).map((keyPassed) => {
              const key = keyPassed.toString();
              return (
                !['_id', 'signInDate', 'userType', 'firstName', 'preferredName', 'preKit'].includes(
                  key,
                ) && (
                  <div key={key}>
                    <b>{capitalizeFirstLetter(key) + ': '}</b>
                    {frosh[key]?.toString()}
                  </div>
                )
              );
            })}

            {/* Scanner specific */}

            {scannerInfo()}
          </div>
        </div>
      )}

      <p>
        <i>{error && 'Error: ' + error}</i>
      </p>

      {/* Manual Search */}

      <h2 className="profile-page-manual-entry-header">Manual Entry</h2>
      <div style={{ padding: '0px 10px', width: '100%' }}>
        <TextInput
          placeholder={'Search by Email, Name, or UtorID'}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              dispatch(
                searchFroshList({
                  searchTerm: event.target.value,
                  fields: ['email', 'firstName', 'lastName', 'preferredName', 'utorid'],
                }),
              );
              setClearText(true);
            }
          }}
          clearText={clearText}
          setClearText={setClearText}
        />
      </div>

      <div className="manual-sign-in-frosh-search-result-container">
        {froshList.slice(0, 5).map((searchResultFrosh, index) => {
          return (
            <ButtonOutlined
              onClick={() => {
                if (scannerType === 'registration') {
                  dispatch(signInFrosh({ userID: searchResultFrosh._id }));
                } else if (scannerType === 'kits') {
                  dispatch(preKitPickUp({ userID: searchResultFrosh._id }));
                }
              }}
              key={searchResultFrosh.email + index}
              label={
                <div>
                  <h3>{`${
                    searchResultFrosh.preferredName === ''
                      ? searchResultFrosh.firstName
                      : searchResultFrosh.preferredName
                  } ${searchResultFrosh.lastName}`}</h3>
                  <p>{searchResultFrosh.email}</p>
                  <p>{searchResultFrosh.utorid}</p>
                </div>
              }
              className="manual-sign-in-frosh-search-result"
            />
          );
        })}
      </div>
    </div>
  );
};

ProfilePageQRScanner.propTypes = {
  scopes: PropTypes.array.isRequired,
};
