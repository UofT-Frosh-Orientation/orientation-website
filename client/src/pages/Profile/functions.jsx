export function getTasks() {
  return [
    {
      name: 'Welcome to your F!rosh profile page',
      description:
        "Take a look around and explore! You'll find your personalized Frosh group schedule and more information here. You can check this off when you're ready!",
      dateCreated: new Date('2022-05-31T00:00:00'),
      completed: true,
    },
    {
      name: 'Welcome to your F!rosh profile page 2',
      description: 'More talky talk and walky walk text...',
      dateCreated: new Date('2022-05-31T00:00:00'),
      completed: true,
    },
  ];
}

export function onDoneTask(task) {
  console.log(task);
}

export function getFroshScheduleData() {
  return [
    {
      date: 'Monday September 5', //This date format must be followed!
      events: [
        {
          name: 'Meet your frosh group',
          description: 'description',
          time: '10:00 AM - 11:00 AM', //This time format must be followed!
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
    {
      date: 'Wednesday September 7',
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
    {
      date: 'Thursday September 8',
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
}

export function getDaysFroshSchedule() {
  let scheduleData = getFroshScheduleData();
  let days = [];
  for (let day of scheduleData) {
    days.push(day['date'].split(' ')[0]);
  }
  return days;
}

export function getQRCodeString() {
  return 'Hello World';
}
