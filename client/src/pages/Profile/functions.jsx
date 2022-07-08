import useAxios from '../../hooks/useAxios';

const { axios } = useAxios();

// function checks if email is valid and sends a reset password email
export async function resetPassword(email) {
  console.log(email);
  let promise = new Promise((res, rej) => {
    setTimeout(() => res(''), 1000);
    // currently does not display this ^ response as the display for error message,

    // uses the result to check what response to display
    // false -> "We didn't recognize that email, please try again!"
    // true  -> "Success, an email has been sent!"
  });
  let result = await promise;
  return true;
}

export async function getTasks() {
  try {
    const response = await axios.get('/announcements');
    console.log(response);
    return response.data.announcements;
  } catch (error) {
    console.log(error);
  }
  // return [
  //   {
  //     name: 'Welcome to your F!rosh profile page',
  //     description:
  //       "Take a look around and explore! You'll find your personalized Frosh group schedule and more information here. You can check this off when you're ready!",
  //     dateCreated: new Date('2022-05-31T00:00:00'),
  //     completed: true,
  //   },
  //   {
  //     name: 'Welcome to your F!rosh profile page 2',
  //     description: 'More talky talk and walky walk text...',
  //     dateCreated: new Date('2022-05-31T00:00:00'),
  //     completed: true,
  //   },
  // ];
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

export function qrKeys() {
  return ['email', 'name', 'pronouns', 'shirtSize', 'froshGroup', 'discipline'];
}

export function parseQRCode(qrString) {
  try {
    let qrStringSplit = qrString.split('|');
    return {
      email: qrStringSplit[0],
      name: qrStringSplit[1],
      pronouns: qrStringSplit[2],
      shirtSize: qrStringSplit[3],
      froshGroup: qrStringSplit[4],
      discipline: qrStringSplit[5],
    };
  } catch (e) {
    return {
      email: undefined,
      name: undefined,
      pronouns: undefined,
      shirtSize: undefined,
      froshGroup: undefined,
      discipline: undefined,
    };
  }
}

export async function getQRCodeString() {
  // Keep in this order:
  // email | full name or preferred name | pronouns | shirt size | frosh group | discipline
  try {
    const response = await axios.get('/user/info');
    let allDetails = response.data.user.email;
    return allDetails.concat(
      '|',
      response.data.user.name,
      '|',
      response.data.user.pronouns,
      '|',
      response.data.user.shirtSize,
      '|',
      response.data.user.froshGroup,
      '|',
      response.data.user.discipline,
    );
  } catch (error) {
    console.log(error);
  }
}

//Return true if successful
//Return an error string if not
export function signInFrosh(email) {
  return true;
}

export function searchForFrosh(nameOrEmail) {
  return [
    {
      email: nameOrEmail,
      name: nameOrEmail,
      pronouns: 'he/him',
      shirtSize: 'L',
      froshGroup: 'Lambda',
      discipline: 'Comp eng.',
    },
    {
      email: 'hello@hello.com',
      name: 'hello there',
      pronouns: undefined,
      shirtSize: undefined,
      froshGroup: undefined,
      discipline: undefined,
    },
  ];
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export async function getFroshData() {
  try {
    const response = await axios.get('/user/info');
    const splitName = response.data.user.name.trim().split(/\s+/);
    return {
      froshGroupIcon: 'λ',
      froshGroup: response.data.user.froshGroup,
      firstName: splitName[0],
      lastName: splitName[1],
      discipline: response.data.user.discipline,
      email: response.data.user.email,
    };
  } catch (error) {
    console.log(error);
  }
}

export function canLeaderScanQR() {
  return false;
}

export function isLeader() {
  return false;
}
