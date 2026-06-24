import React, { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../state/user/userSlice';
import PropTypes from 'prop-types';
import { ButtonSelector } from '../../buttonSelector/buttonSelector/ButtonSelector';
import { SingleAccordion } from '../../text/Accordion/SingleAccordion/SingleAccordion';
import { SnackbarContext } from '../../../util/SnackbarProvider';
import './ScheduleOlympiks.scss';
import { dataMSE } from '../../../assets/olympiksSchedule/data';
import location from '../../../assets/misc/location.png';
import { DarkModeContext } from '../../../util/DarkModeProvider';
import LilyDesign from '../../../assets/schedule/lily.svg';
import { getDisciplineOlympikSchedule } from '../../../pages/Profile/functions';
import axios from 'axios';

function getDaysSchedule() {
  return Object.keys(dataMSE);
}

const ScheduleComponent = () => {
  const today = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  const todayString = today.toLocaleDateString('en-US', options).replace(',', '');
  const { user } = useSelector(userSelector);
  const [discipline, setDiscipline] = useState(user?.discipline);
  const scheduleData = getDisciplineOlympikSchedule(discipline);
  const { setSnackbar } = useContext(SnackbarContext);

  let count = 0;
  for (let day of getDaysSchedule()) {
    if (day === todayString) {
      break;
    }
    count++;
  }
  if (count >= Object.keys(scheduleData).length) {
    count = 0;
  }
  const [selectedLocationIndex, setSelectedLocationIndex] = useState(count);
  const [closeAll, setCloseAll] = useState(false);
  const buttonList = Object.keys(scheduleData).map((location) => {
    return { name: location };
  });

  return (
    <div className="schedule-container">
      <div className="schedule-left-container desktop-only">
        <img src={LilyDesign} alt="Lily Design" className="lily-design" />
      </div>
      <div className="schedule-middle-container">
        <div className="mobile-only">
          <ButtonSelector
            buttonList={buttonList}
            activeIndex={selectedLocationIndex}
            setActiveIndex={(index) => {
              setSelectedLocationIndex(index);
              setCloseAll(!closeAll);
            }}
            style={{
              maxWidth: '250px',
              marginTop: '0px',
              marginBottom: '10px',
              padding: '11px 15px',
              minWidth: '110px',
            }}
          />
        </div>
        <div className="schedule-container-dates desktop-only">
          {Object.keys(scheduleData).map((day, index) => {
            const [dayOfWeek, ...locationParts] = day.split(' - ');
            const location = locationParts.join(' ');

            return (
              <div className="schedule-container-left" key={index}>
                <div
                  style={{
                    top: index === 0 ? '42.5px' : 'unset',
                    height: index === Object.keys(scheduleData).length - 1 ? '42.5px' : '',
                  }}
                ></div>
                <div
                  className={`schedule-container-dates-container ${
                    selectedLocationIndex === index
                      ? 'schedule-container-dates-container-selected'
                      : ''
                  }`}
                  onClick={() => {
                    setSelectedLocationIndex(index);
                    setCloseAll(!closeAll);
                  }}
                >
                  <h1>{dayOfWeek.toUpperCase()}</h1>
                  <h2>{location.toUpperCase()}</h2>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="schedule-right-container">
        <div style={{ width: '100%' }}>
          {scheduleData[Object.keys(scheduleData)[selectedLocationIndex]].map((activity, index) => {
            return (
              <ScheduleComponentAccordion key={index} scheduleDay={activity} closeAll={closeAll} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const ScheduleComponentAccordion = ({
  scheduleDay,
  closeAll,
  setScheduleData,
  selectedLocationIndex,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const { darkMode } = useContext(DarkModeContext);
  const { user } = useSelector(userSelector);
  const [discipline, setDiscipline] = useState(user?.discipline);
  const scheduleData = getDisciplineOlympikSchedule(discipline);
  const { setSnackbar } = useContext(SnackbarContext);

  useEffect(() => {
    setIsOpen(false);
  }, [closeAll]);

  let startTime = scheduleDay['Start Time'];
  if (startTime.includes(':00 a1/p1')) {
    startTime = startTime.replace(':00 a1/p1', '');
    startTime = convertTime(startTime);
  }
  let endTime = scheduleDay['End Time'];
  if (endTime.includes(':00 a1/p1')) {
    endTime = endTime.replace(':00 a1/p1', '');
    endTime = convertTime(endTime);
  }

  const handleClick = async () => {
    try {
      // check if there are available spots
      const availableSpots =
        scheduleDay[`max${user.discipline}`] - scheduleDay[`current${user.discipline}`];
      if (availableSpots <= 0) {
        setSnackbar('No spots available for your discipline.');
        return;
      }

      // snd to backend to sign up
      const res = await axios.post('/frosh/olympiks-signup', {
        eventId: scheduleDay._id,
        eventName: scheduleDay.activityName,
        userId: user._id,
        discipline: user.discipline,
      });
      console.log('Signed up successfully:', res.data);
      setSnackbar('Signed up successfully!');

      const updatedSpots = scheduleDay[`current${user.discipline}`] + 1; // update the local state and increase the count in the database

      // update state to reflect the new spot count
      setScheduleData((prevData) => ({
        ...prevData,
        [selectedLocationIndex]: prevData[selectedLocationIndex].map((activity) =>
          activity._id === scheduleDay._id
            ? { ...activity, [`current${user.discipline}`]: updatedSpots }
            : activity,
        ),
      }));

      // update db to have the new spot count
      await axios.put(`/frosh/olympiks-update/${scheduleDay._id}`, {
        [`current${user.discipline}`]: updatedSpots,
      });
    } catch (error) {
      console.error('Could not sign up:', error);
      setSnackbar('Sign up failed. Please try again.');
    }
  };

  const remainingSpots =
    scheduleDay[`max${user.discipline}`] - scheduleDay[`current${user.discipline}`];

  return (
    <>
      <div className="schedule-accordion">
        <SingleAccordion
          className={`schedule-background-${scheduleDay['Color']}`}
          header={
            <div className="schedule-accordion-header-container">
              <div className="schedule-accordion-header">
                <h1>{scheduleDay['Activity Name'].toUpperCase()}</h1>
              </div>
              <h2>{startTime + ' - ' + endTime}</h2>
            </div>
          }
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          canOpen={scheduleDay['Activity Description'] !== undefined}
        >
          <p dangerouslySetInnerHTML={{ __html: scheduleDay['Activity Description'] }} />
          {/* <h3 className="schedule-accordion-spots">{remainingSpots} SPOTS REMAINING!</h3>

        <button className="button button-secondary" onClick={handleClick}>
          Sign Up!
        </button> */}
        </SingleAccordion>
      </div>
    </>
  );
};

ScheduleComponentAccordion.propTypes = {
  scheduleDay: PropTypes.object,
  closeAll: PropTypes.bool,
  setScheduleData: PropTypes.func,
  selectedLocationIndex: PropTypes.number,
};

export { ScheduleComponent };

function convertTime(time) {
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)?$/) || [time];

  if (time.length > 1) {
    time = time.slice(1);
    time[5] = +time[0] < 12 ? '  AM' : '  PM';
    time[0] = +time[0] % 12 || 12;
  } else {
    return time + ' AM';
  }
  return time.join('');
}
