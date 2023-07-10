import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../state/user/userSlice';
import { getDaysSchedule, getFroshGroupSchedule } from '../../../pages/Profile/functions';
import { ButtonSelector } from '../../buttonSelector/buttonSelector/ButtonSelector';
import { ScheduleComponentAccordion } from '../../schedule/ScheduleHome/ScheduleHome';
import './ProfilePageSchedule.scss';
// import { froshGroups } from '../../../util/frosh-groups';

export const ProfilePageSchedule = () => {
  const { user } = useSelector(userSelector);
  const [froshGroup, setFroshGroup] = useState(user?.froshGroup);
  const scheduleData = getFroshGroupSchedule(froshGroup);
  const days = getDaysSchedule(scheduleData);
  const today = new Date();
  const options = { weekday: 'long' };
  const todayString = today.toLocaleDateString('en-US', options).replace(',', '');

  let count = 0;
  for (let day of days) {
    if (day === todayString) {
      break;
    }
    count++;
  }
  if (count >= Object.keys(scheduleData).length) {
    count = 0;
  }
  const [selectedDayIndex, setSelectedDayIndex] = useState(count);
  const [closeAll, setCloseAll] = useState(false);
  const buttonList = Object.keys(scheduleData).map((item) => {
    return { name: item };
  });

  // const froshGroupNames = [];
  // for (let froshGroup of froshGroups) {
  //   froshGroupNames.push(froshGroup?.name);
  // } // i think this is for leedur page, but not sure where the code went...

  return (
    <div className="profile-page-schedule">
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h2 className="profile-page-section-header profile-page-section-header-schedule">
          Schedule
        </h2>
      </div>
      <div className="profile-page-schedule-content">
        <ButtonSelector
          buttonList={buttonList}
          activeIndex={selectedDayIndex}
          setActiveIndex={(index) => {
            setSelectedDayIndex(index);
            setCloseAll(!closeAll);
          }}
          style={{
            maxWidth: '250px',
            marginTop: '0px',
            marginBottom: '10px',
            padding: '11px 15px',
          }}
        />
        <div className="profile-page-schedule-accordions">
          {scheduleData[Object.keys(scheduleData)[selectedDayIndex]].map((scheduleDay, index) => {
            return (
              <ScheduleComponentAccordion
                key={index}
                scheduleDay={scheduleDay}
                closeAll={closeAll}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
