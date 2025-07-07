import Alumni from '../assets/sponsors/Alumni.jpg';
import OSPE from '../assets/sponsors/OSPE.jpg';
import PEO from '../assets/sponsors/PEO.png';
import peodark from '../assets/sponsors/PEO_white.png';
import Nani from '../assets/sponsors/Nanis.png';
import nanidark from '../assets/sponsors/nanis_white.png';
import Longos from '../assets/sponsors/Longos.png';
import Troost_iLead from '../assets/sponsors/Troost_iLead.jpg';
import troostdark from '../assets/sponsors/troost_white.png';
import EMMO from '../assets/sponsors/EMMO_green.png';
import EMMOdark from '../assets/sponsors/EMMO_white.png';
import Panago from '../assets/sponsors/Panago.png';
import MeetYou from '../assets/sponsors/meetyou.jpeg';
//import MeetYoudark from '../assets/sponsors/meetyou_dark.jpeg';

export const sponsors = [
  {
    website: 'https://emmo.ca/',
    image: EMMO,
    darkimage: EMMOdark,
    scale: 0.82,
    rank: 'diamond',
    label: 'Diamond Sponsor: EMMO',
  },
  {
    website: 'https://www.peo.on.ca/',
    image: PEO,
    darkimage: peodark,
    scale: 0.82,
    rank: 'bronze',
    label: 'Bronze sponsor: PEO',
  },
  {
    website: 'https://www.nanisgelato.com/',
    image: Nani,
    darkimage: nanidark,
    scale: 0.82,
    rank: 'bronze',
    label: 'Bronze sponsor: Nani’s Gelato',
  },
  {
    website: 'https://ilead.engineering.utoronto.ca/',
    image: Troost_iLead,
    darkimage: troostdark,
    scale: 0.82,
    rank: 'bronze',
    label: 'Bronze Sponsor: Troost iLead',
  },
  {
    website: 'https://www.meetyoucafe.com/',
    image: MeetYou,
    darkimage: troostdark,
    scale: 0.82,
    rank: 'gold',
    label: 'Gold Sponsor: MeetYou',
  },
];
