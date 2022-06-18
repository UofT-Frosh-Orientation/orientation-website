export function getTimelineDates() {
  return [
    {
      date: new Date('2022-05-31T00:00:00'),
      name: 'Test 1234',
      description: 'Join other frosh and meetup! This is a really long description. ',
    },
    {
      date: new Date('2022-06-02T00:00:00'),
      name: 'Meetups 2',
      description: 'Join other frosh and meetup!',
    },
    {
      date: new Date('2022-06-04T00:00:00'),
      name: 'Meetups 2',
    },
    {
      date: new Date('2022-06-07T00:00:00'),
      name: 'Meetups 2',
      description: 'Join other frosh and meetup!',
    },
  ];
}

export function getScheduleData() {
  return [
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
}
