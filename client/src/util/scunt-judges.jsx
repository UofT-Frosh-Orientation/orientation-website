import Athavan from '../assets/judges/athavan_balakumar.jpg';
import Azmi from '../assets/judges/azmi_rahim.jpg';
import Evelyn from '../assets/judges/evelyn_fallah.jpg';
import Hannah from '../assets/judges/hannah_lila.jpg';
import Isobel from '../assets/judges/isobel_arseneau.jpg';
import Julian from '../assets/judges/julian_papasodaro.jpg';
import Lauren from '../assets/judges/lauren_altomare.png';
import Martin from '../assets/judges/martin_gutierrez_ramirez.jpg';
import Melanie from '../assets/judges/melanie_ye.jpg';
import Mila from '../assets/judges/mila_markovski.jpg';
import Sahana from '../assets/judges/sahana.jpg';
import Sam from '../assets/judges/sam_denomme.jpg';
import Sebastian from '../assets/judges/sebastian_kiernan.jpg';
import Sophia from '../assets/judges/sophia_hill.png';
import Tyler from '../assets/judges/tyler_delabarre.png';
import Yanni from '../assets/judges/yanni_alevras.jpg';
import Maria from '../assets/judges/maria.jpg';
import Novera from '../assets/judges/novera.jpg';
import TechTeam from '../assets/judges/tech.jpg';

// Export simple data array for judges. Extend with extra fields as needed.
export const scuntJudges = [
  // Co-Chairs (landscape assets) - flagged for special styling
  { name: 'Maria', img: Maria, coChair: true },
  { name: 'Novera', img: Novera, coChair: true },
  // Other Judges
  { name: 'Athavan', img: Athavan },
  { name: 'Azmi', img: Azmi },
  { name: 'Evelyn', img: Evelyn },
  { name: 'Hannah', img: Hannah },
  { name: 'Isobel', img: Isobel },
  { name: 'Julian', img: Julian },
  { name: 'Lauren', img: Lauren },
  { name: 'Martin', img: Martin },
  { name: 'Melanie', img: Melanie },
  { name: 'Mila', img: Mila },
  { name: 'Sahana', img: Sahana },
  { name: 'Sam', img: Sam },
  { name: 'Sebastian', img: Sebastian },
  { name: 'Sophia', img: Sophia },
  { name: 'Tyler', img: Tyler },
  { name: 'Yanni', img: Yanni },
  {
    name: 'Tech Team',
    img: TechTeam,
    description:
      "Collective guardians of the codebase and purveyors of arcane digital challenges. Pictured are your Webmasters Nusaiba and Alyssa, but our lovely site wouldn't be possible without the help of Ablah, Kevin, Eileen and Sunny as well!",
    content: [
      'Beat Akinator.',
      'Find someone with the original Angry Birds app.',
      'Make us a Phainon pointer (google it).',
      "Full combo What's up? Pop! Expert on Project Sekai",
      'Pull on Nusaiba’s gacha account; rarity of the pull scales your points.',
      'Beat Kevin’s Chrome Dino high score (13k).',
      'Connect with Nusaiba on LinkedIn.',
    ],
  },
];

// Consumers (e.g., `ScuntJudgesShowWrapper`) can now import { scuntJudges }.

export const people = [
  {
    name: 'Mila Markovski',
    description:
      "Hello!! I'm an EngSci 2T5 +PEY +1 and one of your judges this year!! I am in the BioMedical Systems speciality; my main interest is in neuroscience, so I love all things relating to the brain. I'm also a huge nerd — whether it is comics, sci-fi, movies, video games, or fantasy, I'm interested and I probably know a thing or two. Fun fact about me: I've sprained my ankles a cumulative 13 times and I have 3 extra bones in my feet, so while I was formerly known to click my heels around campus, I no longer will.",
    content: [
      'WHOLESOME fanart of your two favourite spirit heads',
      'A bouquet of beautiful flowers, that you have *created*',
      'A rendition of your favourite Shakespearean speech/soliloquy/sonnet as Ariana Grande',
      'Using only Toikes, create an outfit worthy of Milan Fashion Week',
      'Fanfiction of any two Star Trek characters (bonus points if it is over 500 words)',
      'Have one of the Suds manager teach you how to tap a keg (requires video proof and explanation)',
      "Convince the Toike EIC to give you a monthly column for the year. It must have a coherent theme - advice columns don't count",
      'Steal a toboggan.',
      'Give me 42 cents in any European or Asian currency. The more obscure the better.',
    ],
    img: Mila,
  },
  {
    name: 'Julian Papasodaro',
    description:
      "Hey there! I'm Julian, an EngSci 2T5 (Robotics) that enjoys playing soccer and going to the gym with friends",
    content: [
      'Tell me the rigorous definition of a limit, but *artistically*.',
      'Show me a video of a team member(s) completing the crossbar challenge.',
      'Build me a house using an entire deck of cards with calculations to support the design.',
      'Use Python to draw the CN Tower.',
      'Deliver an engineering-related pickup line on the TTC.',
      'Create a new element on the periodic table that represents the Skule community (include discovery history and current uses).',
      'Submit a feedback form to the TTC where you discuss (from an engineering perspective) five things that can be improved (in detail).',
      'Skuleify the lyrics of “Wish You Were Here” by Pink Floyd.',
    ],
    img: Julian,
  },
  {
    name: 'Athavan Balakumar',
    description:
      "Hi I'm Athavan! I'm an electrical eng 2T7. In my free time I hoop, listen to music, and hang out with friends. I'm also an HL for Tau #tauontop",
    content: [
      "I'm a firm believer in the power of friendship, so make a friend in every frosh group (bonus if there’s someone from every discipline).",
      'I love nice cars: take a photo of a car worth > $150,000 CAD (photo must be after Skule Hunt starts).',
      'Bring me someone with the same birthday as me (need proof) (bonus if they’re also an ‘05).',
      'Teach me a pick up line in another language.',
      'Because I’m going into my third year, get me a referral to a big tech company for my PEY.',
      "I'm a big back: bring me a unique snack/bev under $5 that you like.",
      'Come up with a pitch + prototype for IEEE Tech Team’s fall project (bonus if an IEEE exec from 2026 or 2025 approves).',
      'Perform 30 seconds of an unreleased Drake and/or PARTYNEXTDOOR verse.',
      'Draw a fire poster of Shai Gilgeous-Alexander worthy of my wall.',
      'Bring me an orchestral instrument and teach me how to play it.',
    ],
    img: Athavan,
  },
  {
    name: 'Sam Denomme',
    description:
      'I am a Civ 2T5+1+PEY, captain of Concrete Toboggan, past Skule Patrol Chair, Suds Server Bnad Keener and overall Skuligan. I enjoy musc, gaming, and building cool things, and when I’m not doing any of those things I am certainly up to no good.',
    content: [
      'Get a Skule Patroller to give me the thickest cup of Banana Koolaide.',
      'Bring me a cool piece of concrete.',
      'Have you and your four closest friends reenact the “Welcome to the Black Parade” music video.',
      'Write a fanfic about me and your favourite Skule Trinity head.',
      'Have the band serenade me.',
      'Give me a really cool Pokémon card.',
      'Beat me in a Pokémon Showdown Gen 9 Doubles battle.',
      'Make it purple.',
    ],
    img: Sam,
  },
  {
    name: 'Sophia Hill',
    description:
      "Howdy! I'm Sophia (ECE 2T5 +?) and I'm super excited to be a Skule Hunt Judge this year! You may have also seen me around as Toike Oike Editor In Chief (you should totally check out the Toike!) or one of the Head Patrollers in Skule Patrol this year. You can also usually find me at BnG builds, Bnad crashings, checking out pretty buildings on campus, Skule Patrolling, or yapping about my fandoms and cats (Marmalade, Snow, and Milya).",
    content: [
      'Find me someone with the same birthday as (or within a week of) my cats (April 13, 2007).',
      'Do a dramatic reading of your favourite Toike article.',
      'Bring me the delicious beverage from Skule Patrol (and try some yourself — need evidence).',
      'Leave kudos on a Toike AO3 fic.',
      'Make me a friendship bracelet.',
      'Make a donation of up to $5 to the Canadian Cancer Society: https://cancer.ca/en/?form=ca-general.',
      'Follow @thetoikeoike on Instagram.',
      'Sing “All Too Well (10 Minute Version) (Taylor’s Version) (From The Vault)” in full.',
      'Apply to be a Toike F!rosh exec (please).',
      'Find a sticker from a Skule entity stuck in an unconventional place.',
    ],
    img: Sophia,
  },
  {
    name: 'Evelyn Fallah',
    description:
      'Hi, I’m Evelyn and I’m an EngSci ECE 2T7 (going into third year in EngSci in the ECE option). I’m a huge nerd about Skule lore, history, and culture. I regularly attend ****, can be found guarding Ye Olde Mighty Skule Cannon, or helping out with a build. Name a page on Skulepedia and I’ve probably read it. I love traditions in Skule and hope my bribe list helps you get curious about some of them :). In addition to that, I do academic advocacy as the EngSci 3rd year class rep and an Undergrad Assessment Committee student rep. I have also been involved in a variety of clubs like University of Toronto Aerospace Team SAE (VTOL plane), Toike Oike, University of Toronto Engineering Student Consulting Association, and Skule Choir. The past two summers, I did a 4-month CO-OP and summer research in Singapore through the Engineering Science Research Opportunities Program. Feel free to ask me about any of this stuff if you see me around.',
    content: [
      'Beat me at JSTRIS.',
      'Bring me a signed love letter to me from Ass (with proof they signed it).',
      'Deliver me a non-yellow U of T Engineering hard hat (points scale with rarity).',
      'Perform Godiva’s Hymn (at least one verse).',
      'Pitch your personal Skule Trinity.',
      'Give me the location of an engineering mascot (other than ours).',
      'Identify (photo) a concrete declaration of love from EngSci.',
      'Convince Ava (Gold Chair) that Welch’s Fruit Snacks are better than Mott’s Fruitsations.',
      'Take a group photo (≥7 people) with the CN Tower (bonus if it’s dark and the lights are off).',
      'Give me a sword.',
    ],
    img: Evelyn,
  },
  {
    name: 'Sebastian Kiernan',
    description:
      "HI FROSH I'm Sebastian, I'm a TrackOne -> Mech 2T7 (+PEY I hope), and I like to do a few things around here. I'm currently a Blue & Gold Committee co-chair, Engineering Society board representative, class rep, and occasional member of a couple design teams. I'm also a co-chair for running Frosh Games so if you enjoy those PLEASE tell me all about it!! When I'm not overcommitting myself at Skule, I also enjoy trying to do more things than I have free time for - art, playing the trumpet, climbing, going outside (please touch grass y'all), D&D, blah blah blah you get the picture. Basically I have WAY too many interests and I'm always looking for more so you can yap at me about pretty much anything! Anyhoodle yeah see you at the hunt, I promise I'll only be a little judgier than I have to :)",
    content: [
      'Beat me in a thumb war.',
      'Cool bug (alive and safely contained).',
      'Draft a motion for the next EngSoc board meeting.',
      'Leave a nice note on the Blue & Gold door.',
      'Something from the old Pit.',
      "Your finest doohickey/gizmo/etc. (I won't take it — I just wanna see).",
      'A REALLY good Minecraft seed (bonus if you show me in-game).',
      'A fun or obscure idea for a B&G movie night.',
      'Draw your best crayon masterpiece.',
      'A space industry job.',
      'Teach me Tagalog.',
    ],
    img: Sebastian,
  },
  {
    name: 'Melanie Ye',
    description:
      "Hi everyone! I'm Melanie a MECH 2T7 going into Mechatronics (I actually don't know shit about circuits) and Bioengineering (haven't even taken gr12 bio). I was one of the Skule Hunt chair last year so I'm really excited to be back again for this event! I love getting involved around SKULE so you can find me as part of Hi-Skule, EngSoc's social media coordinator, Lady Godiva Memorial Band blah blah blah. In my free time I love playing logic puzzles and trying to catch up on sleep anywhere. I look forward to judging everyone!",
    content: [
      'Cook a meal/snack entirely out of a microwave and let me critique it Gordon Ramsay–style (yes, like my fake frosh bacon-in-microwave prank).',
      'Pour your heart and soul out in a Just Dance — bonus if you sing along.',
      'Convince me to love onions and bell peppers without making me eat them.',
      'Find me a new online puzzle website to obsess over.',
      'Decorate my green hard hat in honour of my EngSoc SMC position (KEEP IT SFW).',
      'Give me a lecture with the tone of a disappointed parent.',
      'Find pictures of me on https://photos.skule.ca/.',
      'Show me the best keychain/pin/patch/sticker.',
      'Reveal a super secret family recipe to me.',
      'Find a frosh Doctor Who fan and have them out-fan me.',
    ],
    img: Melanie,
  },
  {
    name: 'Yanni Alevras',
    description: 'A tiny so cool and fragile ece 2T6 who is hungry, allergy filled, and tired',
    content: [
      'Harvey’s onion rings.',
      'Compliment me in my own language (figure it out).',
      'Beat the Ender Dragon in front of me.',
      'Guess my favourite Pokémon.',
      'Tell me three fun facts about myself.',
      'Beat me in Mario Kart.',
      'Call Lisa.',
      'Bring me Alyssa or LC.',
      'Paint me like one of your French ladies.',
      'Sing me a song I love.',
    ],
    img: Yanni,
  },
  {
    name: 'Isobel Arseneau',
    description:
      'Hi, my name is Izzy! I am an EngSci 2T5 + PEY in the Biomedical Engineering option and I use She/Her pronouns. I am an HL for Beta this year!! A little about me… I love musical theatre, ice cream, and dance! I am a founder and the Educational Director for the Engineering Drama Society (EDS), I was on cast for Skule Nite (the Engineering Musical) for 3 years and was choreographer last year. Last year I was in Trinity College Dramatic Society’s production of Heathers and I will be performing in EDS’s production of Spring Awakening this fall. I’ve been on the Human Powered Vehicle design team for 3 years, I was Equity Director for EngSci club, and I am a SUDS server. Message me if you wanna come to a dance class or be in the musical I’m writing (@isobelarseneau).',
    content: [
      'Pitch the Engineering Drama Society’s next production (pick a show and convince me why; bonus if you find a Toronto venue and a student to direct/choreograph/music-direct).',
      'Bring or make me a friendship bracelet.',
      'Perform a dance from a Broadway show (bonus if it’s from Heathers, A Chorus Line, or Chicago).',
      'Write me a theme song for a TV show about your life (30–60 seconds).',
      'Sing me a song from a musical (I will have karaoke tracks).',
      'Bring me ice cream (preferably chocolate).',
      'Build me a model of an animal or plant cell.',
      'Reenact a Skule Nite sketch I was in.',
      'Convince three people to buy tickets to Spring Awakening (show proof).',
      'Bring me anything Star related.',
      'Bonus (very challenging): Bring me Lincoln Macdonald.',
    ],
    img: Isobel,
  },
  {
    name: 'Martin Gutierrez Ramirez',
    description: 'Just an average joe, who loves a cup of joe',
    content: [
      'Coffee with Chris.',
      'Sing and dance your heart out for me (bonus if you come up with both yourself).',
      'Badr.',
      'Feed me (bonus if you get a Spirit Head to feed me).',
      'Practice your standup routine on me.',
      'Cool rock.',
      'Monster.',
    ],
    img: Martin,
  },
  {
    name: 'Tyler DeLaBarre',
    description:
      "Hi y'all! I'm a Mech 2T5, I like running, trains, and building stuff for concrete toboggan.",
    content: [
      'Shotgun the least shotgunnable beverage you can think of.',
      'Create original art of your favorite train.',
      'Explain concrete toboggan to me (wrong answers only) (bonus if a team member helps).',
      'Pants beer!',
      'One Canadian penny.',
      "An unconventional food combo you think I'll like (≤ $5).",
      'Design my next tattoo for me.',
      'Buzz your hair and dye it green so your classmates can touch grass.',
    ],
    img: Tyler,
  },
  {
    name: 'Sahana',
    description:
      "Hi I'm Sahana <3 (if u wanna know more abt me come complete bribes and we can yap)",
    content: [
      'Choreograph a dance routine to your fav song and perform it as a group (≥2 people).',
      'Find three people in your group who aren’t from here and say hi to me in their languages (bonus if they sing me a song).',
      'Make a poster of cute dogs and cats from the streets of Toronto for me.',
      'Make a random dog on the street do a trick and record it for me.',
      'Love letter from a minister (preferably ASS MINISTER 🤭).',
      'Hug from a Skunt Co-Chair.',
      'Create and perform a funny skit representing your discipline (bonus if multiple disciplines).',
      'Get me a vegan sweet treat (≤ $5).',
    ],
    img: Sahana,
  },
  {
    name: 'Azmi Rahim',
    description:
      "Hey Frosh! My name is Azmi (she/her) and I'm one of your Skule Hunt judges this year! I'm a Mech 2T5 + PEY going into my final year🤩 I like the 2016 Honda Civic, Kdot, and fries. I'll order fries with anything there is nothing that fries doesn't taste good with. I'm also your Skule External Relations Director this year! If you wanna go to some cool conferences (i.e. grown up field trips🤩) you should totally go drop a follow @skule.external (shameless plug). Can't wait to meet you all!",
    content: [
      'Follow Skule External on Instagram: @skule.external.',
      'Like Skule External’s posts on Instagram (X points each).',
      'Comment on Skule External’s posts (Y points each).',
      "Repost Skule External's latest Instagram post and encourage people to follow.",
      'Sign up for the Skule External mailing list.',
      'Rap 30 seconds of *Euphoria* by Kdot.',
      'Get me a can/bottle of Diet Coke 🤩.',
      'Write a rap about why I’m the coolest judge and perform it.',
      'Record a video telling Frosh/Skule students why they should attend conferences (only if you’re okay with being posted on Skule External Instagram).',
      'One photo of your beautiful face for the website.',
    ],
    img: Azmi,
  },
  {
    name: 'Hannah Lila',
    description:
      'hey everyone, i’m hannah! i’m an ece 2t5 + pey (going into fourth year) and i’m super excited to be a professional hater this year (skule hunt judge). yap with me about art, chess, cats, good music, matcha, and more (im what your local performative male is trying to be) and you might be able to score some extra points ;)',
    content: [
      'Find all my signatures on the frosh merch (bonus if you find any unsigned pieces).',
      'Draw your best rendition of a cat in a flower field.',
      'Tell me about your most diabolical situationship.',
      'Follow my art account on Instagram — no hints (prove your private investigator skills).',
      'Make me a friendship bracelet or bag charm.',
      'Get Mario Baker to send me their cookie recipe.',
      'Beat me in a bullet game of chess.',
      'Put me on to your best perfume #notastinkyece (bonus if I can smell it).',
      'Design ECE-themed merch and send it to ECE Club (graphic design is my passion).',
    ],
    img: Hannah,
  },
  {
    name: 'Lauren Altomare',
    description:
      'Hello hello! I’m Lauren, an EngSci 2T6 in the biomedical systems engineering option! I love anything biology, especially when you throw a little tech and entrepreneurship in the mix. At Skule, I frequent various corners of the extracurricular landscape, ranging from WISE, to iGEM, UTBIOME and Skule Nite. Outside of skule, I do rather enjoy being outdoors (i.e. cycling, running, hiking, etc.) and creative stuff (i.e. piano, writing, film). Looking forward to seeing you all purple :)',
    content: [
      'Write and perform a comedy sketch with your newfound f!rosh friends (bonus if a Skule Nite member makes a cameo) (NO AI).',
      'A purple Japanese sweet potato / jicama / parsnip / beet / butternut squash.',
      'Invent a new engineering discipline and give me your 1‑minute elevator pitch (bonus if you acquire faculty support).',
      'Get five strangers on campus to sing Godiva’s Hymn with at least two-part harmony.',
      'Name three uses for a toaster in engineering. Demonstrate one.',
      'Find a rock from every U of T college (label with sticky notes).',
      'Create a Skule-themed tarot card deck and do a three-card reading for me.',
      'Collect seven different types of safety equipment from campus (goggles, gloves, etc.).',
      'Playlist of seven songs that describe the emotional arc of Frosh Week (bonus for cover art).',
      'Draw a technical diagram of a non-engineering thing (e.g., “internal mechanics of an all-nighter”).',
    ],
    img: Lauren,
  },
  {
    name: 'Maria',
    description:
      'hi :0 my name is Maria and I am one of your co-chairs for skule hunt TM this year. Really excited for you to be attending our event and hope you have the most amazing time. Say hi if you see me around and maybe try out one of my bribes!',
    content: [
      'Draw me your best version of Snorlax (the more colour the better).',
      'Write a haiku about your favourite game.',
      'Show me your Pokémon collection in real life and I will rate it.',
      'Dress up as your favourite game character (bonus for creativity).',
      'Beat me in a game of ping-pong (first to 11) (bring rackets and ball).',
      'Make us friendship bracelets.',
      'Redesign the Skule Hunt logo and make a sample T-shirt with the logo.',
      'Bring me the rock from *Everything Everywhere All at Once*.',
      'Give me π on a napkin.',
      'Find someone who went to my high school (with consent and proof).',
    ],
    img: Maria,
  },
  {
    name: 'Novera',
    description:
      "Hiya gang! I'm Novera and I'm your other co chair for Skule Hunt TM 2T5! Can't wait for some tomfoolery and shenanigans to unfold. You may notice us running around, make sure you stop to say hi! I've been doing this for far too long I can't wait to graduate. Can't wait for the night!! ",
    content: [
      'Lobster',
      'convince me to confess to the huzz',
      "bring me your mom's validation",
      "show me a niche hobby you have (bonus if I'm convinced to join)",
      'find and rate a bouldering problem on campus (be safe)',
      'get everyone to Dance Dance Revolution',
      'group pose trend and let me post it on my IG',
      'make me a postcard drawing from your hometown',
      'show me a good rock with mathematical proof',
      'teach me something.',
    ],
    img: Novera,
  },
];
