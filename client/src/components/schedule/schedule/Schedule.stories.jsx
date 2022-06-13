import { React } from 'react';
import { Schedule } from './Schedule';

export default {
  title: 'Schedule',
  component: Schedule,
};

export const schedule = () => {
  const data = [
    {
      date: 'Monday September 5',
      events: [
        {
          name: 'Meet your frosh group',
          description: 'description',
          time: '10:00 AM - 11:00 AM',
        },
        {
          name: 'Matriculation',
          description: 'description',
          time: '10:00 AM - 12:00 PM',
        },
      ],
    },
    {
      date: 'Tuesday September 6',
      events: [
        {
          name: 'Meet 1',
          description: 'description',
          time: '10:00 AM - 11:00 AM',
        },
        {
          name: 'Meet 2',
          description: 'description',
          time: '10:00 AM - 12:00 PM',
        },
      ],
    },
  ];

  return (
    <div>
      <Schedule scheduleList={data}></Schedule>
    </div>
  );
};
