import Alumni from '../assets/sponsors/Alumni.jpg';
import Hatchery from '../assets/sponsors/Hatchery.jpg';
import Neo from '../assets/sponsors/Neo.jpg';
import OSPE from '../assets/sponsors/OSPE.jpg';
import PEO from '../assets/sponsors/PEO.png';
import UTSU from '../assets/sponsors/UTSU.jpg';

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
    website: 'https://www.utsu.ca/',
    image: UTSU,
    scale: 0.82,
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
    website: 'https://hatchery.engineering.utoronto.ca/',
    image: Hatchery,
    scale: 0.82,
    rank: 'bronze',
    label: 'Bronze sponsor: Engineering Alumni Network',
  },
];
