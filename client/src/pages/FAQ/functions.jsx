import useAxios from '../../hooks/useAxios';
const { axios } = useAxios();

export function getInformation() {
  return 'FAQ';
}

export async function getQuestions(setSnackbar) {
  // await new Promise(r => setTimeout(r, 2000));

  // load FAQs from API
  /* try {
    const response = await axios.get('/faq/answered');
    return response.data.faqs;
  } catch (e) {
    setSnackbar(e.toString());
  } */

  return [
    {
      question: 'What is F!rosh week?',
      answer:
        "F!rosh week is the first week of the Fall semester where incoming first year students are introduced to the SKULE community. Students will join F!rosh groups with other incoming first years and upper year leedurs to learn more about UofT's engineering traditions and culture. For more information check out the About Page. ",
      lastUpdated: '2:00 pm',
      category: 'General',
    },
    {
      question: 'What is the best place to get information about F!rosh Week?',
      answer:
        "There's a ton of ways we'll be sending you information this summer as we get closer to F!rosh Week. This site is one of the best starting places where you can check out these FAQs, find the F!rosh Week schedule, read about our team and more! The next best place is on social media! Go follow us on Instagram and TikTok (both @froshweek) to stay up to date on everything F!rosh Week this summer! Lastly, but maybe most importantly, check your email! All throughout the summer we'll be sending important updates and information to the email that you've signed up with on this site so make sure you're checking that inbox.",
      lastUpdated: '2:00 pm',
      category: 'General',
    },
    {
      question: 'Who is part of F!rosh Week?',
      answer:
        'All engineering students are part of F!rosh Week! The incoming first years will be participating in the activities and current engineering students are helping run and organize the event. ',
      lastUpdated: '2:00 pm',
      category: 'General',
    },
    {
      question: "What if I can't afford the ticket for F!rosh Week?",
      answer: 'That’s okay! You can apply for a bursary when you sign up for F!rosh Week!',
      lastUpdated: '12:17pm, Jun 22, 2024',
      category: 'General',
    },
    {
      question: 'What should I bring on the first day?',
      answer:
        'Yourself! A good attitude! And a whole lotta HYPE! But also these: Proof of Registration(more info on what proof is needed when you register!); Sunscreen! #safetyissexy; Comfortable shoes; Health Card (just in case you need it)',
      lastUpdated: '12:21pm, Jun 22, 2024',
      category: 'General',
    },
    {
      question: 'What do I do if I arrive late?',
      answer:
        'Please try to arrive on time (Toronto transit and traffic can be unpredictable, so we highly recommend a bit of buffer!), but if you arrive late due to unforeseen circumstances, make your way to The Garden (you can ask anyone wearing a F!rosh Week shirt that isn’t yellow) and we can get you to your group from there! \n\n If you know in advance that you will be arriving late, please send us a message at registration@orientation.skule.ca after registering so your leedurs can plan accordingly!',
      lastUpdated: '12:21pm, Jun 22, 2024',
      category: 'General',
    },
    {
      question: 'How do I register for F!rosh Week?',
      answer:
        'Register for F!rosh Week at orientation.skule.ca starting July 5th! Follow us on Instagram @froshweek and join the F!rosh Week 2T4 Discord server. To stay up to date throughout the summer! Important links can also be found at linktr.ee/froshweek. Link to Discord server: https://discord.gg/RQrPQMYrHw',
      lastUpdated: '12:30pm, Jun 22, 2024',
      category: 'Registration',
    },
    {
      question: 'What do I get by registering?',
      answer:
        'Access to all F!rosh week events! Your very own F!rosh Kit, full of skule-themed items! Memories that will last a lifetime <3',
      lastUpdated: '12:30pm, Jun 22, 2024',
      category: 'Registration',
    },
    {
      question: 'When is the deadline to register for F!rosh week?',
      answer:
        'No official deadline, but you should sign up before August 26th if you want to participate in all of the activities!',
      lastUpdated: '13:30pm, Jun 30, 2024',
      category: 'Registration',
    },
    /*{
      question: 'What are in the F!rosh Kits?',
      answer:
        "Lots of fun items to make your F!rosh Week memorable! It includes a yellow hard hat, F!rosh Shirt, a water bottle to keep you hydrated and many more suprises! Just not a pet dino because they didn't fit in the box :(",
      lastUpdated: '2:00 pm',
      category: 'F!rosh Kits',
    },*/ //old frosh kits answer before 2T4
    {
      question: 'What comes in the F!rosh Kits?',
      answer:
        'A dashing yellow hardhat!; SkuleTM bag to hold all of your super awesome new merch; Water bottle to keep you hydrated #hydrationissexy :) ; Not one, but TWO snazzy t-shirts; So. much. F!rosh. Swag.',

      lastUpdated: '12:30pm, Jun 22, 2024',
      category: 'F!rosh Kits',
    },
    {
      question: 'When and How are we getting the F!rosh kits?',
      answer:
        "You can pick up a pre-distributed portion of your kit in August (information about this will be emailed to you later this summer). The rest of your kit will be given to you during F!rosh Week where you'll also be able to pick up the pre-distributed kit if you haven't already.",
      lastUpdated: '2:00 pm',
      category: 'F!rosh Kits',
    },
    {
      question: 'Can we choose our F!rosh groups or people to be with us?',
      answer:
        'Unfortunately, no the groups are designed to be randomized and mixed across disciplines and other factions which gives you the amazing opportunity to meet a wide range of incoming First Years and make some new friends!',
      lastUpdated: '2:00 pm',
      category: 'F!rosh Group',
    },
    {
      question: 'Will there be events prior to F!rosh Week with our F!rosh Groups',
      answer:
        "There is no prior events for F!rosh groups in particular but you can get involved in outreach meet-ups that'll be happening all summer! Check out our Instagram (@froshweek) for more information or the Home Page of the website.",
      lastUpdated: '2:00 pm',
      category: 'F!rosh Group',
    },
  ];
}

export async function submitQuestion(question) {
  try {
    const response = await axios.post('/faq/create', question);

    return true;
  } catch (error) {
    console.error(error);

    return error.response.data.message;
  }
}
