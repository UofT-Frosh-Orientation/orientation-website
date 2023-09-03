import Alumni from '../assets/sponsors/Alumni.jpg';
import Hatchery from '../assets/sponsors/Hatchery.jpg';
import Neo from '../assets/sponsors/Neo.jpg';
import Coco from '../assets/sponsors/Coco.jpg';
import OSPE from '../assets/sponsors/OSPE.jpg';
import PEO from '../assets/sponsors/PEO.png';
import UTSU from '../assets/sponsors/UTSU.jpg';
import Mogu from '../assets/sponsors/MoguMogu.png';
import Nani from '../assets/sponsors/Nanis.png';

export const sponsors = [
  {
    website: 'https://alumni.engineering.utoronto.ca/engineering-alumni-network/',
    image: Alumni, // the sponsor image displayed on homepage (from "./client/src/assets/sponsors")
    scale: 0.82, // can be used to display each image at a different size
    rank: 'diamond', // rank of sponsor, can be used to display border
    label: 'Diamond sponsor: Alumni Office', // the label when user hovers on image in 'View All' state
  },
  {
    website: 'https://www.neomaterials.com/',
    image: Neo,
    scale: 0.7,
    rank: 'gold',
    label: 'Gold sponsor: Neo Performance',
  },
  {
    website: 'https://www.cocofreshtea.ca/',
    image: Coco,
    scale: 0.7,
    rank: 'gold',
    label: 'Silver sponsor: Coco',
  },
  {
    website: 'https://www.utsu.ca/',
    image: UTSU,
    scale: 0.7,
    rank: 'bronze',
    label: 'Bronze sponsor: UTSU',
  },
  {
    website: 'https://www.peo.on.ca/',
    image: PEO,
    scale: 0.82,
    rank: 'bronze',
    label: 'Bronze sponsor: PEO',
  },
  {
    website: 'https://ospe.on.ca/',
    image: OSPE,
    scale: 0.82,
    rank: 'bronze',
    label: 'Bronze sponsor: OSPE',
  },
  {
    image: Mogu,
    scale: 0.82,
    rank: 'bronze',
    label: 'Bronze sponsor: Mogu',
  },
  {
    image: Nani,
    scale: 0.82,
    rank: 'bronze',
    label: 'Bronze sponsor: Nani’s Gelato',
  },
];
