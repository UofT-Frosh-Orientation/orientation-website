import { React } from 'react';
import { Schedule } from './Schedule';

export default {
  title: 'Schedule',
  component: Schedule,
};

export const schedule = () => {
  const data = [
    {
      date: 'Monday June 18',
      events: [
        {
          name: 'Meet your frosh group',
          description: 'description',
          time: '2:00 PM  - 3:00 PM',
        },
        {
          name: 'Matriculation',
          description: 'description',
          time: '10:00 AM - 12:00 PM',
        },
      ],
    },
    {
      date: 'Saturday September 6',
      events: [
        {
          name: 'Meet 1',
          description: 'description',
          time: '2:00 PM - 3:00 PM',
        },
        {
          name: 'Meet 2',
          description: 'description',
          time: '10:00 AM - 12:00 PM',
        },
        {
          name: 'Meet 6',
          description: 'description',
          time: '10:00 AM - 12:00 PM',
        },
        {
          name: 'Meet 778',
          description: 'description',
          time: '2:00 PM - 12:00 PM',
        },
      ],
    },
    {
      date: 'Wednesday September 7',
      events: [
        {
          name: 'Meet 9',
          description: 'description',
          time: '10:00 AM - 11:00 AM',
        },
        {
          name: 'Meet 13',
          description: 'description',
          time: '10:00 AM - 12:00 PM',
        },
      ],
    },
    {
      date: 'Thursday September 8',
      events: [
        {
          name: 'Meet 3',
          description: 'description',
          time: '10:00 AM - 11:00 AM',
        },
      ],
    },
    {
      date: 'Friday September 9',
      events: [
        {
          name: 'Meet 5',
          description: 'description',
          time: '10:00 AM - 11:00 AM',
        },
        {
          name: 'Meet 6',
          description: 'description',
          time: '10:00 AM - 12:00 PM',
        },
        {
          name: 'Meet 77338',
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
