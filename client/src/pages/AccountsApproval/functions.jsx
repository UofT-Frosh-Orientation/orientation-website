export function sendApprovedEmails(array) {
  // parameter: an array of all the approved and denied emails
  console.log('saving responses');
  console.log(array);
  return;
}

export function sendAuthRequests(array) {
  // parameter: an array of emails and approved or denied auth requests
  console.log('saving responses');
  console.log(array);
}

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
    id: 1,
    name: 'ahjhjhhjhhjjhjjhjhjhjhjhjhhjhja',
    email: 'akbc@gmail.com',
    group: 'leedurs',
    auth: ['admin', 'other'],
  },
  {
    id: 2,
    name: 'aAAAAAAAa',
    email: 'abpc@gmail.com',
    group: 'leedurs',
    auth: ['admin', 'other', 'ggg'],
  },
  {
    id: 3,
    name: 'AAAaa',
    email: 'ab0c@gmail.com',
    group: 'leedurs',
    auth: ['admin'],
  },
  {
    id: 4,
    name: 'aaAAAAA',
    email: 'aboc@gmail.com',
    group: 'leodursSSSSSSSS',
    auth: ['admin', 'other'],
  },
  {
    id: 5,
    name: 'aa',
    email: 'ab7c@gmail.com',
    group: 'leedurs',
    auth: ['admin', 'other'],
  },
  {
    id: 6,
    name: 'aa',
    email: 'aaaaaaaaaaa@gmail.com',
    group: 'leedurs',
    auth: ['admin', 'other'],
  },
];
