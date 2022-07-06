export function sendApprovedEmails() {
  // parameter: an array of all the approved and denied emails
  console.log('sendApprovedEmails function');

  return;
}

export const TestEmails = [
  {
    id: 1,
    valid: true,
    email: 'abc@gmail.com',
    approved: false,
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
    deny: false,
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

// export const AllAccounts = [
//     {
//         valid: true,
//         email: "aaaa@gmail.com",
//         approved: false,
//     },
// ];

// export const AuthScopes = [
//     {
//         name: "first last",
//         email: "aaaaa@gmail.com",
//         group: 'leedurs',
//         auth: [
//             {
//                 authReq: 'admin',
//                 approved: 'false',
//             },
//             {
//                 authReq: 'other',
//                 approved: 'false',
//             }
//         ],
//     }
// ];

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
