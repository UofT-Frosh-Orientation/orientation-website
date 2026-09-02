import Athavan from '../assets/2t6/judges/Athavan.jpeg';
import ChiLan from '../assets/2t6/judges/Chi_Lan_Tran.jpg';
import James from '../assets/2t6/judges/James.jpg';
import Julia from '../assets/2t6/judges/Julia.jpg';
import Justin from '../assets/2t6/judges/Justin.jpg';
import Karys from '../assets/2t6/judges/Karys.jpg';
import Kate from '../assets/2t6/judges/Kate.jpeg';
import Katy from '../assets/2t6/judges/Katy.jpeg';
import Luke from '../assets/2t6/judges/Luke.jpg';
import Mahi from '../assets/2t6/judges/Mahi.jpeg';
import Ophir from '../assets/2t6/judges/Ophir.jpg';
import Richard from '../assets/2t6/judges/Richard.jpeg';
import Selena from '../assets/2t6/judges/Selena.jpg';
import Shashank from '../assets/2t6/judges/Shashank.webp';
import Tom from '../assets/2t6/judges/Tom.jpeg';
import Tristan from '../assets/2t6/judges/Tristan.jpg';
import Nick from '../assets/2t6/judges/Nick.jpg';
import Webmasters from '../assets/2t6/judges/Webmasters.jpg';
import FroshLogo from '../assets/logo/2T6logo.png';

// Export simple data array for judges. Extend with extra fields as needed.
// `placeholder: true` marks judges whose photo we don't have yet - they show the F!rosh logo.
export const scuntJudges = [
  { name: 'Karys', img: Karys },
  { name: 'Tech Team', img: Webmasters },
  { name: 'Luke', img: Luke },
  { name: 'Athavan', img: Athavan },
  { name: 'Nick', img: Nick },
  { name: 'Julia', img: Julia },
  { name: 'Mahi', img: Mahi },
  { name: 'Katy', img: Katy },
  { name: 'Ophir', img: Ophir },
  { name: 'Kate', img: Kate },
  { name: 'Chi Lan', img: ChiLan },
  { name: 'Selena', img: Selena },
  { name: 'Richard', img: Richard },
  { name: 'Justin', img: Justin },
  { name: 'James', img: James },
  { name: 'Shashank', img: Shashank },
  { name: 'Tristan', img: Tristan },
  { name: 'Tom', img: Tom },
];

// Consumers (e.g., `ScuntJudgesShowWrapper`) can now import { scuntJudges }.

export const people = [
  {
    name: 'Karys',
    description:
      'Hi everyone, my name is Karys! I’m an Engsci BME 2T8 and one of this year’s Skule Hunt Co-Chairs!',
    content: [],
    img: Karys,
  },
  {
    name: 'Tech Team',
    description:
      "Collective guardians of the codebase and purveyors of arcane digital challenges. Pictured are your Webmasters Ablah and Parth, but our lovely site wouldn't be possible without the help of Linden, Jiya, Sumedhaa, Harshita and Ryan as well! Also please do come bribe us we promise you will not be disappointed coughcoughwehaveallthepowercoughcough haha must be the wind",
    // Skule™ Hunt easter egg: rendered in the judge modal as invisible text that
    // only shows up when highlighted. Step 2 of the trail (step 1 is the nudge
    // in the "Where?" section of /skule-hunt).
    hiddenNote: 'check the coming soon page',
    content: [
      "1. Get us a referral to a big tech company (bonus points if it's BME or AI/ML)",
      '2. Create a CAD of Robarts',
      '3. Beat the Wikipedia game in 2 mins (https://www.thewikigame.com/)',
      '4. Tell me your most diabolical high school drama',
      "5. Beat the F!rosh website's easter egg",
      '6. Explain a technical/engineering concept in brainrot terms',
      "7. Solve today's leetcode daily in front of us",
      '8. Learn and perform a breakdance move',
      '9. Find a picture of either of us on https://photos.skule.ca',
      '10. Email a Prof/faculty member (professionally) telling them how excited you are for their class/ or excited about U of T eng AND GET A REPLY (points only if they reply)',
    ],
    img: Webmasters,
  },
  {
    name: 'Luke Plesea',
    description:
      "Hi guys! You're looking at a 2nd year ECE (EE best eng) that is also your Ultimate F!rosh! I enjoy circuits, art, and books! Feel free to find me during or after F!rosh Week, I am involved in all things Skule so I might have great stories for you!!",
    content: [],
    img: Luke,
  },
  {
    name: 'Athavan Balakumar',
    description:
      "Hi everyone, my name is Athavan! I'm an ECE 2T7, currently on PEY. I'm a judge for Skule Hunt, and also an HL for Delta this year.",
    content: [],
    img: Athavan,
  },
  {
    name: 'Nick Oré',
    description:
      "Nick Oré, MIN 2T8 - Someone brought this dude over from Peru and placed him here, he now represents 20% of the entire MIN student body. He's often doing way too many sidequests such as Mine Rescue, the Board of Directors, managing the Myhal Vending Machines, leading the Skule Commuters, and anything related to mining in general. He also likes cycling, messing around on Ableton, and is also a huge football fan that will get triggered if you tell him that Messi is better than Ronaldo. You can spam him all that talk at @nicolas__ore on IG.",
    content: [],
    img: FroshLogo,
  },
  {
    name: 'Julia',
    description:
      "Hello! My name is Julia, and I'm ECE 2T9 + PEY. I like to sing, ice skate and draw BUT... I LIVE to try different food combinations: chicken+cereal, chicken+macha, chicken+... you get it :)",
    content: [],
    img: Julia,
  },
  {
    name: 'Mahi Shukla',
    description:
      'Hiii! My name is Mahi, I’m a Civ 2T8 + PEY. This is my first year judging, and 2nd year as a Head Leedur! I’m so excited to see what crazy things you guys come up with, and as always, bonus points for creativity ✨🫶',
    content: [],
    img: Mahi,
  },
  {
    name: 'Katy Mezei',
    description:
      "helloooo my name is Katy and I'm a Chem 2T7+PEY! I love music (shoutout Skule Stageband), fashion, art, and cooking, but most of all I am excited to meet you all at Skule Hunt this year!",
    content: [],
    img: Katy,
  },
  {
    name: 'Ophir Strumpf',
    description:
      "Hi!! My name is Ophir, and I'm an ECE 2T8 + PEY. I'm involved in Skule Orchestra, HPVDT, Innertube Waterpolo Intramurals, and F!ROSH WEEK (of course!! 💜). Ask me anything about living in Toronto (as a local born and raised), HLing, transferring disciplines, and work life balance! Always love a good chat so feel free to come talk to me about anything!",
    content: [],
    img: Ophir,
  },
  {
    name: 'Kate Shepherd',
    description:
      'Hi guys, Kate here! I’m an EngSci BME 2T8 +PEY (EngSci best sci WOOOO) and I’m so excited to be a judge for skule hunt this year! I grew up in Ohio as a lover of all things musical, artistic, and/or country. I’ve played most mainstream sports at some point in my life and still play quite a few through EAA intramurals (would recommend, it’s a blast). So hyped to be a part of your skule introduction!',
    content: [],
    img: Kate,
  },
  {
    name: 'Chi Lan Tran',
    description:
      "I'm an EngSci Robo 2T8 + PEY and I love being outdoors, hiking, camping, running away from mosquitoes, all that fun jazz! As an avid procrastinator, you'll probably find me roaming campus or napping. I'm really looking forward to meeting everyone during S!kule Hunt!",
    content: [],
    img: ChiLan,
  },
  {
    name: 'Selena Li',
    description:
      "Hello F!rosh! I'm Selena, a Mech 2T7 and the current Toike Oike Editor-in-Chief! In addition to being a former Concrete Toboggan design team co-captain, Skule™ Agenda editor, and F!rosh Handbook editor, I am also an avid enjoyer of media. If you ask me about any of my interests, I will not stop talking. I also love making art, learning music, and playing volleyball.",
    content: [],
    img: Selena,
  },
  {
    name: 'Richard',
    description:
      'I’m Richard! Aka Richard the looong way. I’m in electrical engineering and I also competed with the varsity rowing team for 2 years. This year I’ve taken a step back from competitive sport to become a Don at Knox Residence, so come say hi, especially if you live at Knox!',
    content: [],
    img: Richard,
  },
  {
    name: 'Justin Fang',
    description:
      "Hey everyone! I'm Justin, an ECE 2T7 + PEY. I like all things Skule™ and food (rhyme?)",
    content: [],
    img: Justin,
  },
  {
    name: 'James Huynh',
    description:
      "Hello! I'm James!! You may have seen me around, as your current Blue and Gold Committee Gold chair. I was also last year's EngSoc systems administrator! Outside of Skule™ stuff, you might see me at UofT's card game club, scrolling through cat reels, or at various builds!!",
    content: [],
    img: James,
  },
  {
    name: 'Shashank Shukla',
    description:
      "Hellooo Hunters! I'm Shashank, ECE 2T7 + PEY. I have a horrible attention span, so you'll find me studying at Gerstein one hour, at an intramural game the next, and then somehow in a Bahen lab by midnight. I love listening to music and trying different. I also have a Diet Coke problem that I'm choosing not to address. Can't wait to meet you all!",
    content: [],
    img: Shashank,
  },
  {
    name: 'Tristan Seto',
    description:
      "Heyo, my name's Tristan and I am an ECE 2T6 + PEY. After a my PEY bank tour I'm finally landing myself back here at Skule™ for fourth year as your Director of External Relations, which also means I'll be travelling a lot. If you love networking or you want to travel, you can come network and travel with me and I'll make sure you get opportunities to network with engineering students from around the country! I've also been around on Hi-Skule (if any of you have been to an event), Skulebook, Photography, Stores and Iron Pin and you might be able to find some legacy from me somewhere if you look hard enough. And I'm always listening to K-Pop or at a concert.",
    content: [],
    img: Tristan,
  },
  {
    name: 'Tom Hafner',
    description:
      'Tom is a lover of music and theatre, electronics and power systems, and skateboarding! You may have seen him running Matriculation on day 1 of Frosh week. For Skule Hunt, he isn’t just interested in WHAT you can bring him… but the STORY that you can tell with your bribes and challenges. Get hunting!',
    content: [],
    img: Tom,
  },
];
