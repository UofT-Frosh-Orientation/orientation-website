import useAxios from '../../hooks/useAxios';
const { axios } = useAxios();

export function getInformation() {
  return 'FAQ';
}

export function getAnsweredQuestions() {
  // try {
  //   const response = await axios.get('/faq/answered');
  //   //console.log(response.data.faqs);
  //   return response.data.faqs;
  // } catch (error) {
  //   console.log(error);
  // }
  return [
    {
      id: 1,
      question: 'What is F!rosh week?',
      answer:
        "F!rosh week is the first week of the Fall semester where incoming first year students are introduced to the SKULE community. Students will join F!rosh groups with other incoming first years and upper year leedurs to learn more about UofT's engineering traditions and culture. For more information check out the About Page. ",
      lastUpdated: '2:00 pm',
      category: 'General',
    },
    {
      id: 2,
      question: 'What is the best place to get information about F!rosh Week?',
      answer:
        "There's a ton of ways we'll be sending you information this summer as we get closer to F!rosh Week. This site is one of the best starting places where you can check out these FAQs, find the F!rosh Week schedule, read about our team and more! The next best place is on social media! Go follow us on Instagram and TikTok (both @froshweek) to stay up to date on everything F!rosh Week this summer! Lastly, but maybe most importantly, check your email! All throughout the summer we'll be sending important updates and information to the email that you've signed up with on this site so make sure you're checking that inbox.",
      lastUpdated: '2:00 pm',
      category: 'F!rosh Kits',
    },
    {
      id: 4,
      question: 'What is F!rosh week 2?',
      answer:
        "F!rosh week is the first week of the Fall semester where incoming first year students are introduced to the SKULE community. Students will join F!rosh groups with other incoming first years and upper year leedurs to learn more about UofT's engineering traditions and culture. For more information check out the About Page. ",
      lastUpdated: '2:00 pm',
      category: 'General',
    },
  ];
}

export function getUnansweredQuestions() {
  // try {
  //   const response = await axios.get('/faq/unanswered');
  //   console.log(response.data.faqs);
  //   return response.data.faqs;
  // } catch (error) {
  //   console.log(error);
  // }
  return [
    {
      id: 3,
      question: 'What is F!rosh week?',
      answer: '',
      lastUpdated: '2:00 pm',
      category: 'General',
    },
    {
      id: 4,
      question: 'What is the best place to get information about F!rosh Week?',
      answer: '',
      lastUpdated: '2:00 pm',
      category: 'F!rosh Kits',
    },
  ];
}

export function sortQuestions(questions, questionCategories, questionsObjects) {
  for (let i = 0; i < questions.length; i++) {
    if (!questionsObjects.hasOwnProperty(questions[i].category)) {
      questionsObjects[questions[i].category] = [];
      questionsObjects[questions[i].category].push({
        question: questions[i].question,
        answer: questions[i].answer,
        id: questions[i].id,
      });
      questionCategories.push({ name: questions[i].category });
    } else {
      questionsObjects[questions[i].category].push({
        question: questions[i].question,
        answer: questions[i].answer,
        id: questions[i].id,
      });
    }
  }
}

export function deleteQuestion(id) {
  // try {
  //   const response = await axios.delete(`/faq/${id}`);
  //   console.log(response);
  // } catch (error) {
  //   console.log(error);
  // }
  console.log(id);
}

export function submitEdit(id, data) {
  // try {
  //   const response = await axios.patch('/faq/${id}', data);
  //   // console.log(response);
  //   return true;
  // } catch (error) {
  //   console.log(error);
  //   console.log(error.response.data.message);
  //   return error.response.data.message;
  // }
  console.log(data);
  console.log(id);
}

export function submitQuestion(question) {
  // try {
  //   const response = await axios.post('/faq/create', question);
  //   // console.log(response);
  //   return true;
  // } catch (error) {
  //   console.log(error);
  //   console.log(error.response.data.message);
  //   return error.response.data.message;
  // }
  console.log(question);
}
