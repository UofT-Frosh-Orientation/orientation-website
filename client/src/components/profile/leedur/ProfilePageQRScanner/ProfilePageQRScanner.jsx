import React, { useContext, useEffect, useState } from 'react';
import './ProfilePageQRScanner.scss';
import { useDispatch, useSelector } from 'react-redux';
import { SnackbarContext } from '../../../../util/SnackbarProvider';
import { registeredFroshSelector } from '../../../../state/frosh/froshSlice';
import { QRScannerDisplay } from '../../../../components/QRScannerDisplay/QRScannerDisplay';
import { ErrorSuccessBox } from '../../../containers/ErrorSuccessBox/ErrorSuccessBox';
import { Button } from '../../../button/Button/Button';
import { TextInput } from '../../../input/TextInput/TextInput';
import { ButtonOutlined } from '../../../button/ButtonOutlined/ButtonOutlined';
import { getFrosh } from '../../../../state/frosh/saga';
import {
  capitalizeFirstLetter,
  parseQRCode,
  scannedUserKeys,
  signInFrosh,
} from '../../../../pages/Profile/functions';

export const ProfilePageQRScanner = () => {
  const { setSnackbar } = useContext(SnackbarContext);
  const [clearText, setClearText] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [searchFor, setSearchFor] = useState('');
  const [results, setResults] = useState([
    {
      id: '0123456789',
    },
  ]);
  const [scannedData, setScannedData] = useState('');
  const [scannedUserData, setScannedUserData] = useState('');
  const { registeredFrosh } = useSelector(registeredFroshSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFrosh({ showAllUsers: false }));
  }, []);

  let searchTimeout;

  // debounce input to improve performance when searching >800 frosh
  useEffect(() => {
    // clear timeout if they typed
    clearTimeout(searchTimeout);
    if (!searchFor || searchFor === '') {
      setResults([]);
    } else {
      // set timeout to wait for them to finish typing before searching
      searchTimeout = setTimeout(() => {
        const lowerCaseSearch = searchFor.toLowerCase();
        const filteredFrosh = registeredFrosh.filter(
          (f) =>
            `${f?.firstName} ${f?.lastName}`?.toLowerCase()?.includes(lowerCaseSearch) ||
            f?.email?.toLowerCase()?.includes(lowerCaseSearch) ||
            f?.preferredName?.toLowerCase()?.includes(lowerCaseSearch) ||
            f?.utorid?.toLowerCase()?.includes(lowerCaseSearch),
        );
        setResults(filteredFrosh);
      }, 500);
    }
  }, [searchFor]);

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
    hour: 'numeric',
    minute: 'numeric',
  };

  return (
    <div className="profile-page-qr-code-scanner profile-page-side-section">
      <QRScannerDisplay
        setScannedData={(data) => setScannedData(parseQRCode(data))}
      ></QRScannerDisplay>
      <div
        className={`profile-page-scanned-data ${
          submitSuccess ? 'profile-page-scanned-data-success' : ''
        } ${submitError !== false ? 'profile-page-scanned-data-error' : ''}`}
      >
        {scannedData === '' ? (
          'Nothing scanned yet!'
        ) : (
          <div>
            <h3>Current Scanned Data</h3>
            <div style={{ height: '7px' }} />
            <b>{'ID: '}</b>
            {scannedData?.id?.toString()}
          </div>
        )}
      </div>
      {scannedUserData === '' ? (
        <></>
      ) : (
        <div
          className={`profile-page-scanned-data ${
            submitSuccess ? 'profile-page-scanned-data-success' : ''
          } ${submitError !== false ? 'profile-page-scanned-data-error' : ''}`}
        >
          <div>
            <h3>Scanned User Info</h3>
            <div style={{ height: '7px' }} />
            <>
              <div>
                <b>Name:</b>
                {scannedUserData?.preferredName === '' || !scannedUserData?.preferredName
                  ? scannedUserData?.firstName
                  : scannedUserData?.preferredName}
              </div>
              {scannedUserKeys().map((keyPassed) => {
                const key = keyPassed.toString();
                return (
                  <div key={key}>
                    <b>{capitalizeFirstLetter(key) + ': '}</b>
                    {scannedUserData[key]?.toString()}
                  </div>
                );
              })}
              {scannedUserData['signInDate'] !== undefined ? (
                <div style={{ color: 'black' }}>
                  <ErrorSuccessBox
                    error
                    content={`User already signed in on ${new Date(
                      scannedUserData['signInDate'],
                    )?.toLocaleDateString(undefined, options)}`}
                  />
                </div>
              ) : (
                <></>
              )}
            </>
          </div>
        </div>
      )}
      <Button
        label={'Submit'}
        onClick={async () => {
          setClearText(true);
          if (scannedData === '' || !scannedData) {
            setSnackbar('Please scan a QR code first!', true);
            return;
          }
          const result = await signInFrosh(scannedData?.id?.toString());
          if (result.status === 200) {
            setScannedUserData(result?.data?.returnedUser);
            setScannedData('');
            setSubmitSuccess(true);
            setTimeout(() => {
              setSubmitSuccess(false);
            }, 450);
            if (submitError !== false) {
              setSubmitError(false);
            }
            if (!results.length) {
              setResults([]);
            }
          } else {
            setSubmitError(result.response.data.message);
            setScannedData('');
          }
        }}
      />
      <p>
        <i>{submitError !== false ? 'Error: ' + submitError : ''}</i>
      </p>
      <h2 className="profile-page-manual-entry-header">Manual Entry</h2>
      <div style={{ padding: '0px 10px', width: '100%' }}>
        <TextInput
          placeholder={'Search by Email, Name, or UtorID'}
          onEnterKey={(value) => {
            setSearchFor(value);
          }}
          clearText={clearText}
          setClearText={(value) => {
            setClearText(value);
            setSearchFor('');
          }}
        />
      </div>
      <div className="manual-sign-in-frosh-search-result-container">
        {results.slice(0, 5).map((frosh, index) => {
          return (
            <ButtonOutlined
              onClick={() => {
                setScannedData(frosh);
              }}
              key={frosh.email + index}
              label={
                <div>
                  <h3>{`${frosh.preferredName === '' ? frosh.firstName : frosh.preferredName} ${
                    frosh.lastName
                  }`}</h3>
                  <p>{frosh.email}</p>
                  <p>{frosh.utorid}</p>
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
