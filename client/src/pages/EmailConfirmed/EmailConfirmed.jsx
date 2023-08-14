import { useEffect, useState } from 'react';
import { Button } from '../../components/button/Button/Button';
import './EmailConfirmed.scss';
import { Link, useParams } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';

const PageEmailConfirmed = () => {
  const { email } = useParams();
  const { emailToken } = useParams();
  const [validEmailToken, setvalidEmailToken] = useState(false);

  function verifyEmailToken(email, emailToken) {
    const { axios } = useAxios();

    try {
      const emailAndEmailToken = {
        email: email,
        emailToken: emailToken,
      };
      axios.post('/user/verify-user-email', emailAndEmailToken);
      setvalidEmailToken(true);
    } catch (err) {
      setvalidEmailToken(false);
    }
  }

  useEffect(() => {
    verifyEmailToken(email, emailToken);
  }, []);

  return (
    <div>
      {validEmailToken ? (
        <div className="email-confirmed-page">
          <div className="email-confirmed-container">
            <h1>Perfect!</h1>
            <h2>Your email is now verified. Head to the login page to get started!</h2>
            <Link to={'/login'} style={{ textDecoration: 'none' }} className={'no-link-style'}>
              <Button label="Login Page" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="email-confirmed-page">
          <div className="email-confirmed-container">
            <h1>Oh no! :( </h1>
            <h2>An error occurred when trying to verify your email. Please try again later.</h2>
            <Link to={'/login'} style={{ textDecoration: 'none' }} className={'no-link-style'}>
              <Button label="Go back to login page" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export { PageEmailConfirmed };
