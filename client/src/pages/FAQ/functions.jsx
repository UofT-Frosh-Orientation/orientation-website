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
      question: 'What is F!rosh Week?',
      answer:
        'F!rosh Week happens the week before the beginning of classes in the Fall semester. During this week, incoming first-year students are introduced to the Skule™ community. Students will join F!rosh groups with other incoming first years and upper year leedurs to learn more about U of T Engineering’s traditions and culture. For more information, check out the About Page.',
      lastUpdated: '2:00 pm',
      category: 'General',
    },
    {
      question: 'What is the best place to get information about F!rosh Week?',
      answer:
        "There's a ton of ways we'll be sending you information this summer as we get closer to F!rosh Week:\n• F!rosh Website: This site is one of the best starting places where you can check out these FAQs, find the F!rosh Week schedule, read about our team, and more!\n• Social Media: The next best place is on social media! Go follow us on Instagram and TikTok (both @froshweek) to stay up to date on everything F!rosh Week this summer!\n    • Our Discord server: Join our Discord server https://discord.gg/C39WHaN3G to chat with fellow first-years and your upper-year Leedurs\n• Your email: Lastly, but maybe most importantly, check your email! All throughout the summer we'll be sending important updates and information to the email that you've signed up with on this site so make sure you're checking that inbox.",
      lastUpdated: '2:00 pm',
      category: 'General',
    },
    {
      question: 'Who is part of F!rosh Week?',
      answer:
        'All engineering students are part of F!rosh Week! Incoming first-years will be participating in the various activities while upper-year students help run and organize the event. ',
      lastUpdated: '2:00 pm',
      category: 'General',
    },
    // {
    //   question: "What if I can't afford the ticket for F!rosh Week?",
    //   answer: 'That’s okay! You can apply for a bursary when you sign up for F!rosh Week!',
    //   lastUpdated: '12:17pm, Jun 22, 2024',
    //   category: 'General',
    // },
    {
      question: 'What should I bring on the first day?',
      answer:
        'Definitely bring:\n    • Yourself!\n    • A good attitude!\n    • And a whole lotta HYPE!\nBut also these:\n    • Proof of registration (more info on what proof is needed when you register!)\n    • Sunscreen (#safetyissexy)\n    • Comfortable shoes.\n    • Health card (just in case you need it).\n    • A bathing suit.',
      lastUpdated: '12:21pm, Jun 22, 2024',
      category: 'General',
    },
    {
      question: 'What do I do if I arrive late?',
      answer:
        'Please try to arrive on time. Toronto transit and traffic can be unpredictable, so we highly recommend adding a bit of a buffer to your travels! If you arrive late due to unforeseen circumstances, make your way to the Drive-In (you can ask anyone wearing a F!rosh Week shirt that isn’t yellow about this) and we can get you to your group from there! If you know in advance that you will be arriving late, please send us a message at registration@orientation.skule.ca after registering so your Leedurs can plan accordingly!',
      lastUpdated: '12:21pm, Jun 22, 2024',
      category: 'General',
    },
    {
      question: 'How do I register for F!rosh Week?',
      answer:
        'Register for F!rosh Week at orientation.skule.ca starting June 29th! Follow us on Instagram @froshweek and join the F!rosh Week 2T6 Discord server https://discord.gg/C39WHaN3G to stay up-to-date throughout the summer! Important links can also be found at our Linktree linktr.ee/froshweek. ',
      lastUpdated: '18:10pm, Jun 28, 2025',
      category: 'Registration',
    },
    {
      question: 'What do I get by registering?',
      answer:
        '• Access to all F!rosh Week events!\n• Your very own F!rosh Kit, full of Skule™-themed items!\n• Memories that will last a lifetime <3',
      lastUpdated: '12:30pm, Jun 22, 2024',
      category: 'Registration',
    },
    {
      question: 'When is the deadline to register for F!rosh Week?',
      answer:
        'The last day to register for F!rosh week is August 30. The last day to register for F!rosh Retreat is September 4 (12 PM)',
      lastUpdated: '14:17pm, Jul 29, 2026',
      category: 'Registration',
    },
    {
      question: 'Is it possible to get a refund?',
      answer:
        'Yes, if you decide you do not want to participate anymore, both the F!rosh Week tickets and F!rosh Retreat tickets are refundable until August 17th/24th at 11:59 PM. After that, we will not be able to issue any refunds.',
      lastUpdated: '18:12pm, Jun 28, 2025',
      category: 'Registration',
    },
    {
      question: 'What comes in the F!rosh Kits?',
      answer:
        '• A dashing yellow hardhat!\n• A Skule™ bag to hold all of your super awesome new merch.\n• A water bottle to keep you hydrated #hydrationissexy :)\n• Not one, but TWO snazzy t-shirts.\n• So. Much. F!rosh. Swag.',
      lastUpdated: '12:30pm, Jun 22, 2024',
      category: 'F!rosh Kits',
    },
    {
      question: 'When and how are we getting the F!rosh kits?',
      answer:
        'You will get your MEGA kit (a pre-kit and the F!rosh kit) on the day of F!rosh during registration.',
      lastUpdated: '3:00 am, Aug 23, 2024',
      category: 'F!rosh Kits',
    },
    {
      question: 'Can we choose our F!rosh groups or people to be with us?',
      answer:
        'Unfortunately, you cannot choose your F!rosh group. The groups are designed to be randomized and mixed across disciplines and other factors to give you the amazing opportunity to meet a wide range of incoming first-years and make new friends!',
      lastUpdated: '2:00 pm',
      category: 'F!rosh Group',
    },
    {
      question: 'Will there be events prior to F!rosh Week with our F!rosh Groups?',
      answer:
        'There are no prior events for F!rosh groups specifically, but you can join us in outreach meet-ups that will be happening all summer! Check out our Instagram (@froshweek) for more information',
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
