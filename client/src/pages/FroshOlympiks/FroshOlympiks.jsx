import React, { useState, useEffect, useContext } from 'react';
import './FroshOlympiks.scss';
import { Link, useNavigate } from 'react-router-dom';
import { registeredSelector, userSelector } from '../../state/user/userSlice';
import { useSelector } from 'react-redux';
import { ScheduleComponent } from '../../components/schedule/ScheduleOlympiks/ScheduleOlympiks';
import useAxios from '../../hooks/useAxios';
const { axios } = useAxios();
import waveBottom from '../../assets/misc/wave-reverse.png';
import waveBottomDarkMode from '../../assets/darkmode/misc/wave-reverse.png';
import { DarkModeContext } from '../../util/DarkModeProvider';

export const FroshOlympiks = () => {
  const navigate = useNavigate();
  const isRegistered = useSelector(registeredSelector);

  useEffect(() => {
    if (!isRegistered) {
      navigate('/profile');
    }
  }, [isRegistered]);

  return (
    <>
      <OlympiksSchedule />
    </>
  );
};

const OlympiksSchedule = () => {
  const { user } = useSelector(userSelector);
  const { darkMode, setDarkModeStatus } = useContext(DarkModeContext);

  const disciplineSignUpLinks = {
    Materials: 'https://www.signupgenius.com/go/10C0A4CAFA92FA3FAC07-50910872-msefrosh',
    Chemical: 'https://www.signupgenius.com/go/10C0A4CAFA92FA3FAC07-50908742-chem#/',
    Civil: 'https://www.signupgenius.com/go/10C0A4CAFA92FA3FAC07-50908850-civmin#/',
    Mineral: 'https://www.signupgenius.com/go/10C0A4CAFA92FA3FAC07-50908850-civmin#/',
    'Electrical & Computer':
      'https://www.signupgenius.com/go/10C0A4CAFA92FA3FAC07-50908861-ecefrosh',
    Industrial: 'https://www.signupgenius.com/go/10C0A4CAFA92FA3FAC07-50910875-indy',
    Mechanical: 'https://www.signupgenius.com/go/10C0A4CAFA92FA3FAC07-50908792-mech',
    'Engineering Science': 'https://www.signupgenius.com/go/10C0A4CAFA92FA3FAC07-50908470-engsci',
    'Track One (Undeclared)':
      'https://www.signupgenius.com/go/10C0A4CAFA92FA3FAC07-50910868-trackone',
  };

  const signupLink = disciplineSignUpLinks[user.discipline] || '#';

  return (
    <>
      <div className="home-page-schedule">
        <h2 className="home-page-section-header">DISCIPLINE: {user.discipline.toUpperCase()}</h2>
        <div className="home-page-schedule-warning">
          Want to represent your discipline in a specific event? Sign up{' '}
          <a href={signupLink} target="_blank" rel="noopener noreferrer">
            here
          </a>
        </div>
        <ScheduleComponent />
      </div>
      {darkMode ? (
        <img
          className="wave-image home-page-bottom-wave-image"
          src={waveBottomDarkMode}
          alt="wave"
        ></img>
      ) : (
        <img className="wave-image home-page-bottom-wave-image" src={waveBottom} alt="wave"></img>
      )}
      {/* <img
        src={reverseWave}
        className="wave-image home-page-bottom-wave-image"
        alt="wave-img"
      ></img> */}
    </>
  );
};
