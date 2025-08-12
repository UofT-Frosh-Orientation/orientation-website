import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../state/user/userSlice';
import { getDaysSchedule, getFroshGroupSchedule } from '../../../pages/Profile/functions';
import { ButtonSelector } from '../../buttonSelector/buttonSelector/ButtonSelector';
import { ScheduleComponentAccordion } from '../../schedule/ScheduleHome/ScheduleHome';
import './ProfilePageSchedule.scss';
import { froshGroups } from '../../../util/frosh-groups';
import { data } from '../../../assets/schedule/data';

export const ProfilePageSchedule = () => {
  const { user } = useSelector(userSelector);
  const [froshGroup, setFroshGroup] = useState(user?.froshGroup);
  const scheduleData = data; // replace with getFroshGroupSchedule(froshGroup) if you want to use unique group schedules
  const days = getDaysSchedule(scheduleData);

  const today = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
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
  // const buttonList = Object.keys(scheduleData).map((item) => {
  //   return { name: item, sub: item };
  // });
  const buttonList = Object.keys(scheduleData).map((item) => {
    const dayOfWeek = item.split(' ')[0];
    const date = item.split(' ')[1] + ' ' + item.split(' ')[2];
    return { name: dayOfWeek, title: dayOfWeek, sub: date };
  });

  const froshGroupNames = [];
  for (let froshGroup of froshGroups) {
    froshGroupNames.push(froshGroup?.name);
  } // i think this is for leedur page, but not sure where the code went...

  return (
    <div className="profile-page-schedule">
      <h2 className="profile-page-section-header">SCHEDULE</h2>
      <p className="profile-p-text">
        *Once you have arrived to F!rosh Week on Monday and Tuesday you do not need to worry about
        the schedule as it is your head leedurs’ responsibility to keep track of the schedule of
        events.
      </p>

      <div className="profile-page-schedule-content">
        <ButtonSelector
          buttonList={buttonList}
          activeIndex={selectedDayIndex}
          setActiveIndex={(index) => {
            setSelectedDayIndex(index);
            setCloseAll(!closeAll);
          }}
          style={{
            maxWidth: '160px',
            marginTop: '0px',
            marginBottom: '10px',
            padding: '11px 15px',
          }}
        />
        <div className="profile-page-schedule-accordions">
          <div className="gap-small"></div>
          {scheduleData[Object.keys(scheduleData)[selectedDayIndex]].map((scheduleDay, index) => {
            return (
              <ScheduleComponentAccordion
                className="profile-page-schedule-accordion"
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
