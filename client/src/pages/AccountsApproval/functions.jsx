export function sendApprovedEmails(object) {
  // parameter: an array of all the approved and denied emails
  console.log('saving approved emails');
  console.log(object);
  return;
}
// NOTE: object looks like below,
let approveEmails = {
  'abd@gmail.com': {
    approve: false,
    deny: false,
  },
  'new@gmail.com': {
    approve: false,
    deny: false,
  },
};

export function sendAuthRequests(object) {
  // parameter: an array of emails and approved or denied auth requests
  console.log('saving authentication request responses');
  console.log(object);
}
// NOTE: object looks like below,
let authRequests = {
  'abd@gmail.com': {
    other: {
      approve: false,
      deny: false,
    },
    admin: {
      approve: false,
      deny: false,
    },
  },
  'new@gmail.com': {
    other: {
      approve: false,
      deny: false,
    },
    admin: {
      approve: false,
      deny: false,
    },
  },
};

export const TestEmails = [
  {
    id: 1,
    valid: true,
    email: 'abc@gmail.com',
    approved: true,
    deny: false,
  },
  {
    id: 2,
    valid: true,
    email: 'abcde@gmail.com',
    approved: false,
    deny: false,
  },
  {
    id: 3,
    valid: false,
    email: 'fgfg@gmail.com',
    approved: false,
    deny: true,
  },
  {
    id: 4,
    valid: true,
    email: 'absscde@gmail.com',
    approved: false,
    deny: false,
  },
  {
    id: 5,
    valid: true,
    email: 'aaa@gmail.com',
    approved: false,
    deny: false,
  },
  {
    id: 6,
    valid: true,
    email: 'bbbb@gmail.com',
    approved: false,
    deny: false,
  },
];

export const TestAuth = [
  {
    name: 'ahjhjhhjhhjjhjjhjhjhjhjhjhhjhja',
    email: 'akbc@gmail.com',
    group: 'leedurs',
    auth: [
      {
        authreq: 'admin',
        approve: false,
        deny: true,
      },
      {
        authreq: 'blah',
        approve: true,
        deny: false,
      },
    ],
  },
  {
    name: 'ahjhjhhjhhjjhjjhjhjhjhjhjhhjhja',
    email: 'akbddddc@gmail.com',
    group: 'leedurs',
    auth: [
      {
        authreq: 'hhhhhh',
        approve: false,
        deny: false,
      },
      {
        authreq: 'blah',
        approve: false,
        deny: false,
      },
    ],
  },
];
