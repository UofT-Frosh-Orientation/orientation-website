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

export function getFroshScheduleData() {
  return [
    {
      date: 'Monday September 5', //This date format must be followed!
      events: [
        {
          name: 'Meet your F! group!',
          time: '8:00 AM - 9:00 AM', //This time format must be followed!
          Color: 'purple',
        },
        {
          name: 'Matriculation',
          description:
            'Our kickoff the frosh week, and introduction to all things SKULE™. We all gather in to Convocation Hall',
          time: '9:00 AM - 11:00 AM',
          Color: 'yellow',
        },
        {
          name: 'Lunch',
          time: '11:00 AM - 12:00 PM',
          Color: 'green',
        },
        {
          name: 'Frosh Games / Dye',
          description:
            'Frosh Games: Compete against other frosh groups in the craziest competitions imaginable\nDye: When I say purple you say purple! Where F!rosh and Leedurs alike dye their bodies (or parts thereof) purple. The colour purple represents great significance in the traditions of engineering schools across Canada.',
          time: '12:00 PM - 3:00 PM',
          Color: 'yellow',
        },
        {
          name: 'Group Time',
          time: '3:00 PM - 3:30 PM',
          Color: 'purple',
        },
        {
          name: 'Downtown Walkaround',
          description:
            'Join us for a lovely tour of Toronto’s downtown with 1000 of your newest friends and classmates',
          time: '3:30 PM - 5:30 PM',
          Color: 'yellow',
        },
        {
          name: 'Break / Dinner',
          time: '5:30 PM - 6:30 PM',
          Color: 'blue',
        },
        {
          name: 'Nitelife',
          description:
            'You thought F!rosh week stopped at 6:00 pm? Think again we have activities every day of F!rosh Week for you to engage in!',
          time: '6:30 PM - Late',
          Color: 'dark-purple',
        },
      ],
    },
    {
      date: 'Tuesday September 6',
      events: [
        {
          name: 'Group Time',
          time: '8:00 AM - 9:00 AM',
          Color: 'purple',
        },
        {
          name: 'Engineering Success Seminar',
          time: '9:00 AM - 10:30 AM',
          Color: 'gray',
        },
        {
          name: 'Campus Tour / E4TW',
          description:
            'Campus Tour: Where our Frosh leedurs will lead you through a tour of campus to find all the best places to study, work on projects, and nap!\nE4TW (Engineers 4 The World) is your very first design challenge here at U of T Engineering!',
          time: '10:30 AM - 1:00 PM',
          Color: 'yellow',
        },
        {
          name: 'Lunch',
          description:
            'Campus Tour: Where our Frosh leedurs will lead you through a tour of campus to find all the best places to study, work on projects, and nap!\nE4TW (Engineers 4 The World) is your very first design challenge here at U of T Engineering!',
          time: '1:00 PM - 2:00 PM',
          Color: 'green',
        },
        {
          name: 'Campus Tour / E4TW',
          description:
            'Campus Tour: Where our Frosh leedurs will lead you through a tour of campus to find all the best places to study, work on projects, and nap!\nE4TW (Engineers 4 The World) is your very first design challenge here at U of T Engineering!',
          time: '2:00 PM - 3:30 PM',
          Color: 'yellow',
        },
        {
          name: 'Group Time',
          time: '3:30 PM - 4:30 PM',
          Color: 'purple',
        },
        {
          name: 'Cheer Off',
          time: '4:30 PM - 5:30 PM',
          Color: 'purple',
        },
        {
          name: 'Break / Dinner',
          time: '5:30 PM - 6:30 PM',
          Color: 'blue',
        },
        {
          name: 'Nitelife',
          description:
            'You thought F!rosh week stopped at 6:00 pm? Think again we have activities every day of F!rosh Week for you to engage in!',
          time: '6:30 PM - Late',
          Color: 'dark-purple',
        },
      ],
    },
    {
      date: 'Wednesday September 7',
      events: [
        {
          name: 'Faculty Events',
          time: '8:00 AM - 6:00 PM',
          Color: 'gray',
        },
        {
          name: 'Havenger Scunt',
          description:
            'The longest items list you’ve ever seen. Join us for a full fledged scavenger hunt all over the city of Toronto!',
          time: '6:00 PM - Late',
          Color: 'dark-purple',
        },
      ],
    },
    {
      date: 'Thursday September 8',
      events: [
        {
          name: 'Class Starts',
          time: '8:00 AM - 6:00 PM',
          Color: 'gray',
        },
        {
          name: 'Nitelife',
          description:
            'You thought F!rosh week stopped at 6:00 pm? Think again we have activities every day of F!rosh Week for you to engage in!',
          time: '6:00 PM - Late',
          Color: 'dark-purple',
        },
      ],
    },
    {
      date: 'Friday September 9',
      events: [
        {
          name: 'Class Starts',
          time: '8:00 AM - 6:00 PM',
          Color: 'gray',
        },
        {
          name: 'Nitelife',
          description:
            'You thought F!rosh week stopped at 6:00 pm? Think again we have activities every day of F!rosh Week for you to engage in!',
          time: '6:00 PM - Late',
          Color: 'dark-purple',
        },
      ],
    },
  ];
}

export function getDaysFroshSchedule(froshGroup) {
  console.log('get schedule for ' + froshGroup);
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
      response.data.user.fullName,
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
    const { user } = response.data;
    return {
      froshGroupIcon: 'λ',
      froshGroup: user.froshGroup, //TODO: add non-static icons that changes depending on froshGroup
      firstName: user.firstName,
      lastName: user.lastName,
      discipline: user.discipline,
      email: user.email,
    };
  } catch (error) {
    console.log(error);
  }
}
