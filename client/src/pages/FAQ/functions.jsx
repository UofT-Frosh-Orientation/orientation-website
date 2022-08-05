import useAxios from '../../hooks/useAxios';
const { axios } = useAxios();

export function getInformation() {
  return 'FAQ';
}

export async function getQuestions(setSnackbar) {
  // await new Promise(r => setTimeout(r, 2000));
  try {
    const response = await axios.get('/faq/answered');
    return response.data.faqs;
  } catch (e) {
    setSnackbar(e.toString());
  }
  // return [
  //   {
  //     question: 'What is F!rosh week?',
  //     answer:
  //       "F!rosh week is the first week of the Fall semester where incoming first year students are introduced to the SKULE community. Students will join F!rosh groups with other incoming first years and upper year leedurs to learn more about UofT's engineering traditions and culture. For more information check out the About Page. ",
  //     lastUpdated: '2:00 pm',
  //     category: 'General',
  //   },
  //   {
  //     question: 'What is the best place to get information about F!rosh Week?',
  //     answer:
  //       "There's a ton of ways we'll be sending you information this summer as we get closer to F!rosh Week. This site is one of the best starting places where you can check out these FAQs, find the F!rosh Week schedule, read about our team and more! The next best place is on social media! Go follow us on Instagram and TikTok (both @froshweek) to stay up to date on everything F!rosh Week this summer! Lastly, but maybe most importantly, check your email! All throughout the summer we'll be sending important updates and information to the email that you've signed up with on this site so make sure you're checking that inbox.",
  //     lastUpdated: '2:00 pm',
  //     category: 'General',
  //   },
  //   {
  //     question: 'Who is part of F!rosh Week?',
  //     answer:
  //       'All engineering students are part of F!rosh Week! The incoming first years will be participating in the activities and current engineering students are helping run and organize the event. ',
  //     lastUpdated: '2:00 pm',
  //     category: 'General',
  //   },
  //   {
  //     question: 'What are in the F!rosh Kits?',
  //     answer:
  //       "Lots of fun items to make your F!rosh Week memorable! It includes a yellow hard hat, F!rosh Shirt, a water bottle to keep you hydrated and many more suprises! Just not a pet dino because they didn't fit in the box :(",
  //     lastUpdated: '2:00 pm',
  //     category: 'F!rosh Kits',
  //   },
  //   {
  //     question: 'When and How are we getting the F!rosh kits?',
  //     answer:
  //       "You can pick up a pre-distributed portion of your kit in August (information about this will be emailed to you later this summer). The rest of your kit will be given to you during F!rosh Week where you'll also be able to pick up the pre-distributed kit if you haven't already.",
  //     lastUpdated: '2:00 pm',
  //     category: 'F!rosh Kits',
  //   },
  //   {
  //     question: 'Can we choose our F!rosh groups or people to be with us?',
  //     answer:
  //       'Unfortunately, no the groups are designed to be randomized and mixed across disciplines and other factions which gives you the amazing opportunity to meet a wide range of incoming First Years and make some new friends!',
  //     lastUpdated: '2:00 pm',
  //     category: 'F!rosh Group',
  //   },
  //   {
  //     question: 'Will there be events prior to F!rosh Week with our F!rosh Groups',
  //     answer:
  //       "There is no prior events for F!rosh groups in particular but you can get involved in outreach meet-ups that'll be happening all summer! Check out our Instagram (@froshweek) for more information or the Home Page of the website.",
  //     lastUpdated: '2:00 pm',
  //     category: 'F!rosh Group',
  //   },
  // ];
}

export async function submitQuestion(question) {
  try {
    const response = await axios.post('/faq/create', question);
    // console.log(response);
    return true;
  } catch (error) {
    console.log(error);
    console.log(error.response.data.message);
    return error.response.data.message;
  }
}
