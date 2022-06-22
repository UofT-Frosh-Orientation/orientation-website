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

export function getCategories() {
  return [{ name: 'General' }, { name: 'F!rosh Kits' }, { name: 'F!rosh Group' }];
}
