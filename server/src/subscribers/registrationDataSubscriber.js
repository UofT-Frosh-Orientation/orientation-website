const Queue = require('bull');
const UserServices = require('../services/UserServices');
const EmailServices = require('../services/EmailServices');

const pronouns = ['He/Him', 'She/Her', 'They/Them', 'Prefer Not to Say', 'Other'];
const disciplines = [
  'Chemical',
  'Civil',
  'Electrical & Computer',
  'Engineering Science',
  'Industrial',
  'Mechanical',
  'Mineral',
  'Materials',
  'Track One (Undeclared)',
];

const registrationDataSubsciption = new Queue('registrationData', {
  redis: { port: process.env.REDIS_PORT, host: 'redis', password: process.env.REDIS_PASSWORD },
});

registrationDataSubsciption.process(async (job, done) => {
  const emailAddresses = process.env.REGISTRATION_DATA_EMAIL_ADDRESSES.split(',');
  const defaultObject = {
    totalUsers: 0,
    isRegistered: 0,
    isRetreat: 0,
    bursaryRequested: 0,
    scunt: 0,
    'He/Him': 0,
    'She/Her': 0,
    'They/Them': 0,
    'Prefer Not to Say': 0,
    Other: 0,
    Chemical: 0,
    Civil: 0,
    'Electrical & Computer': 0,
    'Engineering Science': 0,
    Industrial: 0,
    Mechanical: 0,
    Mineral: 0,
    Materials: 0,
    'Track One (Undeclared)': 0,
  };
  const users = await UserServices.getAllUsers();
  const data = users.reduce((prev, curr) => {
    if (pronouns.includes(curr.pronouns)) {
      prev[curr.pronouns]++;
    }
    if (disciplines.includes(curr.discipline)) {
      prev[curr.discipline]++;
    }
    if (curr.bursaryRequested) {
      prev.bursaryRequested++;
    }
    if (curr.isRegistered) {
      prev.isRegistered++;
    }
    if (curr.scunt) {
      prev.scunt++;
    }
    if (curr.isRetreat) {
      prev.isRetreat++;
    }
    prev.totalUsers++;
    return prev;
  }, defaultObject);

  // if (process.env.CLIENT_BASE_URL == 'http://localhost:3000') {
  //   await EmailServices.sendSimpleEmail(
  //     emailAddresses,
  //     `pls work im begging you`,
  //     'it worked yippee',
  //     'tech@orientation.skule.ca',
  //   );
  // }
  await EmailServices.sendSimpleEmail(
    emailAddresses,
    `<div>
    ${
      process.env.CLIENT_BASE_URL == 'http://localhost:3000'
        ? '<h1>Frosh Data Localhost (Ignore)</h1>'
        : '<h1>Frosh Data</h1>'
    }
    <h3>Total Users: ${data.totalUsers}</h3>
    <h3>Total Paid Users: ${data.isRegistered}</h3>
    <h3>Total Attending Retreat: ${data.isRetreat}</h3>
    <h3>Pronouns</h3> 
    <ul>
      ${pronouns.map((pronoun) => `<li>${pronoun}: ${data[pronoun]}</li>`).join('')}
    </ul>
    <h3>Disciplines</h3>
    <ul>
      ${disciplines.map((discipline) => `<li>${discipline}: ${data[discipline]}</li>`).join('')}
    </ul>
    </div>`,
    `Frosh Data\n${Object.keys(data).reduce((prev, item) => {
      return prev + `\t- ${item}: ${data[item]}\n`;
    }, '')}`,
    'Daily Registration Report',
    'tech@orientation.skule.ca',
  );
  done();
});

{
  /* <ul>${Object.keys(data).reduce((prev, item) => {
  return prev + `<li>${item}: ${data[item]}</li>`;
}, '')}</ul> */
}

module.exports = registrationDataSubsciption;
