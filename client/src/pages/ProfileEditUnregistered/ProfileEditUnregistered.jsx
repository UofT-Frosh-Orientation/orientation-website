import { React, useContext } from 'react';
import './ProfileEditUnregistered.scss';
import { registeredSelector, userSelector } from '../../state/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserInfo } from '../../state/user/saga';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import MainFroshLogo from '../../assets/logo/frosh-main-logo-with-bg.svg';
import { TextInput } from '../../components/input/TextInput/TextInput';
import { Button } from '../../components/button/Button/Button';
import { SnackbarContext } from '../../util/SnackbarProvider';
import LoadingAnimation from '../../components/misc/LoadingAnimation/LoadingAnimation';

const PageProfileEditUnregistered = () => {
  const { user } = useSelector(userSelector);
  const isRegistered = useSelector(registeredSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [accountObj, setAccountObj] = useState({});
  const [anyErrors, setAnyErrors] = useState({});
  const [pageState, setPageState] = useState('form');
  const [errors, setErrors] = useState({});

  const { setSnackbar } = useContext(SnackbarContext);
  const [isLoading, setIsLoading] = useState(false);

  if (isRegistered) {
    navigate('/profile');
  }

  const submitForm = (newInfo) => {
    setIsLoading(true);
    dispatch(updateUserInfo({ setSnackbar, setIsLoading, newInfo, navigate, isRegistered }));
  };

  const checkErrors = (sendFeedback = true, feedbackToSend = []) => {
    let anyErrorsNow = false;
    const errorsCopy = {};
    if (accountObj['firstName'] === undefined || accountObj['firstName'] === '') {
      errorsCopy['firstName'] = 'Please enter a first name';
      anyErrorsNow = true;
    }
    if (accountObj['lastName'] === undefined || accountObj['lastName'] === '') {
      errorsCopy['lastName'] = 'Please enter a last name';
      anyErrorsNow = true;
    }
    if (sendFeedback) {
      setErrors(errorsCopy);
    }
    if (sendFeedback === false) {
      const errorObject = {};
      for (let send of feedbackToSend) {
        errorObject[send] = errorsCopy[send];
      }
      setErrors(errorObject);
    }
    // console.log(errorObject)
    setAnyErrors(anyErrorsNow);
    return anyErrorsNow;
  };

  return (
    <>
      {!isRegistered && (
        <>
          <div>
            <div
              className={`profile-edit-page ${
                pageState !== 'form' ? 'profile-edit-page-disappear' : ''
              }`}
              style={{ display: pageState === 'success' ? 'none' : '' }}
            >
              <div className="navbar-space-top" />
              <div className="profile-edit-container">
                <img className={`profile-edit-logo`} src={MainFroshLogo}></img>
                <h1 style={{ color: 'var(--black)' }}>Edit Account Info</h1>
                <h3 style={{ color: 'var(--black)' }}>For F!rosh Week 2T3, UofT Engineering</h3>

                {!isLoading ? (
                  <>
                    <div className="profile-edit-input">
                      <TextInput
                        label="First Name"
                        isRequiredInput
                        placeholder={'John'}
                        errorFeedback={errors['firstName']}
                        onChange={(value) => {
                          accountObj['firstName'] = value;
                          //checkErrors(false);
                        }}
                        localStorageKey={'profile-edit-firstName'}
                      />
                    </div>
                    <div className="profile-edit-input">
                      <TextInput
                        label="Last Name"
                        isRequiredInput
                        placeholder={'Doe'}
                        errorFeedback={errors['lastName']}
                        onChange={(value) => {
                          accountObj['lastName'] = value;
                          // checkErrors(false);
                        }}
                        localStorageKey={'profile-edit-lastName'}
                      />
                    </div>
                    <div className="profile-edit-input">
                      <TextInput
                        label="Preferred Name"
                        placeholder={'Joey'}
                        errorFeedback={errors['preferredName']}
                        onChange={(value) => {
                          accountObj['preferredName'] = value;
                          // checkErrors(false);
                        }}
                        localStorageKey={'profile-edit-preferredName'}
                      />
                    </div>

                    <Button
                      label="Confirm Change"
                      onClick={async () => {
                        const anyErrors = checkErrors(true);
                        if (anyErrors === false) {
                          submitForm(accountObj);
                        }
                      }}
                    />
                  </>
                ) : (
                  <>
                    <div style={{ zIndex: 10, padding: '50px' }}>
                      <LoadingAnimation size={'60px'} />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export { PageProfileEditUnregistered };
