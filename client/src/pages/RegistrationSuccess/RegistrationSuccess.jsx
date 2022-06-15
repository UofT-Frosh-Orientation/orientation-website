import React, { useCallback, useEffect, useRef, useState } from 'react';
import './RegistrationSuccess.scss';
import { Confetti } from '../../components/misc/Confetti/Confetti';
import { Button } from '../../components/button/Button/Button';
import { ButtonOutlined } from '../../components/button/ButtonOutlined/ButtonOutlined';
import { Link, useLocation } from 'react-router-dom';

// To get to this page you need to supply the state when routing
/* <Link state={{name: "James", froshGroup: "Lambda", froshGroupIcon: "λ"}} to={"/registration-success"}><ButtonOutlined label="Watch" isSecondary/></Link> */

const PageRegistrationSuccess = () => {
  const location = useLocation();
  const [animate, setAnimate] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    if (location.state !== undefined && location.state !== null) {
      setData(location.state);
    }
    setTimeout(() => {
      setAnimate(false);
    }, 1000);
    setTimeout(() => {
      setAnimate(true);
    }, 9700);
  }, []);

  if (location.state === undefined || location.state === null) {
    return (
      <div className="registration-success-page-container">
        <h1>An error occured.</h1>
      </div>
    );
  }

  return (
    <div>
      <Confetti animate={animate} />
      <div className="navbar-space-top" />
      <div className="registration-success-page-progress-bar" />
      <div className="registration-success-page-progress-bar registration-success-page-progress-bar2" />
      <div className="registration-success-page-container">
        <div className="registration-success-page-step1">
          <h1>Thank you for Registering</h1>
          <h2>for F!rosh Week 2T2</h2>
          <p className="registration-success-wait-msg">{data.name + ', your F!rosh group is...'}</p>
        </div>
        <div className="registration-success-page-step2-disappear">
          <div className="registration-success-page-step2">
            <h1>Welcome to...</h1>
          </div>
        </div>
        <div className="registration-success-page-step3">
          <h1>{data.froshGroupIcon}</h1>
          <h2>{data.froshGroup + '!'}</h2>
          <div className="registration-success-page-step4">
            <Link to={'/profile'}>
              <Button label="View My F!rosh Profile" />
            </Link>
          </div>
          <div className="registration-success-page-step5">
            <Link
              state={{
                name: data.name,
                froshGroup: data.froshGroup,
                froshGroupIcon: data.froshGroupIcon,
              }}
              to={'/registration-success'}
            >
              <ButtonOutlined label="Watch Again" isSecondary />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export { PageRegistrationSuccess };
