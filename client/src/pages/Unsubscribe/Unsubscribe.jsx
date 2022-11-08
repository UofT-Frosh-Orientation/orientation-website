import { React, useState, useContext } from 'react';
import { TextInput } from '../../components/input/TextInput/TextInput';
import { Button } from '../../components/button/Button/Button';
import { SnackbarContext } from '../../util/SnackbarProvider';
import './unsubscribe.scss';
import EmailValidator from 'email-validator';
import { useDispatch } from 'react-redux';
import { unsubscribeUser } from '../../state/user/saga';

const PageUnsubscribe = () => {
  const [email, setEmail] = useState('');
  const { setSnackbar } = useContext(SnackbarContext);

  const dispatch = useDispatch();

  return (
    <div className="unsubscribe-page">
      <div className="unsubscribe-container">
        <h1 style={{ color: 'var(--black)' }}>Hello There!</h1>

        <p style={{ color: 'var(--black)' }}>
          If you wish to unsubscribe from all future announcement emails please input the email
          associated with your account here.
        </p>

        <div className="full-width-input">
          <TextInput
            label="Email"
            placeholder={'john.doe@email.com'}
            autocomplete={'email'}
            onChange={(value) => {
              setEmail(value);
            }}
            localStorageKey={'user-email'}
          />
        </div>

        <div className="unsubscribe-button">
          <Button
            label="Unsubscribe"
            style={{ margin: 0 }}
            isDisabled={email === ''}
            onClick={async () => {
              if (!EmailValidator.validate(email)) {
                setSnackbar('Please submit a valid email.', true);
              } else {
                dispatch(unsubscribeUser({ email, setSnackbar }));
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export { PageUnsubscribe };
