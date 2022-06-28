export function getInformation() {
  return 'FAQ';
}

export function getQuestions() {
  return [
    {
      question: 'Test Question 1',
      answer: 'Test Answer 1',
      lastUpdated: '2:00 pm',
      category: 'General',
    },
    {
      question: 'Test Question 2',
      answer: 'Test Answer 1',
      lastUpdated: '2:00 pm',
      category: 'General',
    },
    {
      question: 'Test Question 3',
      answer: 'Test Answer 1',
      lastUpdated: '2:00 pm',
      category: 'F!rosh Kits',
    },
    {
      question: 'Test Question 4',
      answer: 'Test Answer 1',
      lastUpdated: '2:00 pm',
      category: 'F!rosh Kits',
    },
    {
      question: 'Test Question 5',
      answer: 'Test Answer 2',
      lastUpdated: '2:00 pm',
      category: 'F!rosh Group',
    },
    {
      question: 'Test Question 6',
      answer: 'Test Answer 3',
      lastUpdated: '2:00 pm',
      category: 'F!rosh Group',
    },
  ];
}

export async function submitQuestion(question) {
  console.log(question);
  /*eslint no-undef: 0*/
  let promise = new Promise((res, rej) => {
    setTimeout(() => res('An error occured!'), 1000);
  });
  let result = await promise;
  return true; //returns true for now to simulate a successful call to the database
}
