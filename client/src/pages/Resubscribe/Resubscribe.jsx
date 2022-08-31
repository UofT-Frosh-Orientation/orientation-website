import { React, useState, useContext } from 'react';
import { TextInput } from '../../components/input/TextInput/TextInput';
import { Button } from '../../components/button/Button/Button';
import { SnackbarContext } from '../../util/SnackbarProvider';
import './resubscribe.scss';
import EmailValidator from 'email-validator';
import { useDispatch } from 'react-redux';
import { resubscribeUser } from '../../state/user/saga';

const PageResubscribe = () => {
  const [email, setEmail] = useState('');
  const { setSnackbar } = useContext(SnackbarContext);

  const dispatch = useDispatch();

  return (
    <div className="resubscribe-page">
      <div className="resubscribe-container">
        <h1 style={{ color: 'var(--black)' }}>Hello There!</h1>

        <p style={{ color: 'var(--black)' }}>
          If you wish to resubscribe to all future announcement emails please input the email
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

        <div className="resubscribe-button">
          <Button
            label="Resubscribe"
            style={{ margin: 0 }}
            isDisabled={email === ''}
            onClick={async () => {
              if (!EmailValidator.validate(email)) {
                setSnackbar('Please submit a valid email.', true);
              } else {
                dispatch(resubscribeUser({ email, setSnackbar }));
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export { PageResubscribe };
