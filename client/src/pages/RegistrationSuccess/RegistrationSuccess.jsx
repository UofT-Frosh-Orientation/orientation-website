import React, { useCallback, useEffect, useRef, useState } from 'react';
import './RegistrationSuccess.scss';
import { Confetti } from '../../components/misc/Confetti/Confetti';
import { Button } from '../../components/button/Button/Button';
import { ButtonOutlined } from '../../components/button/ButtonOutlined/ButtonOutlined';
import { Link, useLocation } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import { userSelector } from '../../state/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '../../state/user/saga';

// To get to this page you need to supply the state when routing
/* <Link state={{name: "James", froshGroup: "Lambda", froshGroupIcon: "λ"}} to={"/registration-success"}><ButtonOutlined label="Watch" isSecondary/></Link> */

const PageRegistrationSuccess = () => {
  // const location = useLocation();
  const { user, error } = useSelector(userSelector);

  // const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const [animate, setAnimate] = useState(true);
  // const [data, setData] = useState({});

  useEffect(() => {
    dispatch(getUserInfo);
  }, []);

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        setAnimate(false);
      }, 1000);
      setTimeout(() => {
        setAnimate(true);
      }, 9700);
    }
  }, [user]);

  if (error) {
    return (
      <div className="registration-success-page-container">
        <h1 style={{ color: 'var(--black)' }}>An error occurred.</h1>
      </div>
    );
  }

  return (
    <div>
      {user && (
        <>
          <Confetti animate={animate} />

          <div className="registration-success-page-progress-bar" />
          <div className="registration-success-page-progress-bar registration-success-page-progress-bar2" />
          <div style={{ padding: '0 5%' }}>
            <div className="registration-success-page-container">
              <div className="registration-success-page-step1">
                <div className="registration-success-page-step1-1-disappear">
                  <h1 style={{ color: 'var(--black)' }}>Thank you for Registering</h1>
                </div>
                <div className="registration-success-page-step1-2-disappear">
                  <h2 style={{ color: 'var(--black)' }}>for F!rosh Week 2T3</h2>
                  <p style={{ color: 'var(--black)' }} className="registration-success-wait-msg">
                    {`${
                      user.preferredName === '' || !user.preferredName
                        ? user.firstName
                        : user.preferredName
                    }, your F!rosh group is...`}
                  </p>
                </div>
              </div>
              <div className="registration-success-page-step2-disappear">
                <div className="registration-success-page-step2">
                  <h1 style={{ color: 'var(--black)' }}>Welcome to...</h1>
                </div>
              </div>
              <div className="registration-success-page-step3">
                <svg className="frosh-group-text-line">
                  <text x="50%" dominantBaseline="middle" textAnchor="middle" y="50%">
                    {user.froshGroupIcon}
                  </text>
                </svg>
                <div className="registration-success-page-step4">
                  <h2 style={{ color: 'var(--black)' }}>{user.froshGroup + '!'}</h2>
                </div>
                <div className="registration-success-page-step5">
                  <Link to={'/profile'} className="no-link-style">
                    <Button label="View My F!rosh Profile" />
                  </Link>
                </div>
                <div className="registration-success-page-step6">
                  <Link
                    state={{
                      name: user.name,
                      froshGroup: user.froshGroup,
                      froshGroupIcon: user.froshGroupIcon,
                    }}
                    to={'/registration-success'}
                    className="no-link-style"
                  >
                    <ButtonOutlined label="Watch Again" isSecondary />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export { PageRegistrationSuccess };
