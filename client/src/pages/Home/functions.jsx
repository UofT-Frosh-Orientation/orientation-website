import useAxios from '../../hooks/useAxios.jsx';
const { axios } = useAxios();

import slideshow1 from '../../assets/homeSlideshow/DSC_0309.webp';
import slideshow2 from '../../assets/homeSlideshow/DSC_0336.webp';
import slideshow3 from '../../assets/homeSlideshow/DSC_0411.webp';
import slideshow4 from '../../assets/homeSlideshow/DSC_0898.webp';
import slideshow5 from '../../assets/homeSlideshow/IMG_293.webp';
import slideshow6 from '../../assets/homeSlideshow/IMG_7642.webp';
import slideshow7 from '../../assets/homeSlideshow/IMG_7848.webp';
import slideshow8 from '../../assets/homeSlideshow/IMG_8857.webp';
import slideshow9 from '../../assets/homeSlideshow/IMG_8879.webp';
import slideshow10 from '../../assets/homeSlideshow/IMG_9541.webp';

import slideshowTiny1 from '../../assets/homeSlideshow/tiny/DSC_0309.webp';
import slideshowTiny2 from '../../assets/homeSlideshow/tiny/DSC_0336.webp';
import slideshowTiny3 from '../../assets/homeSlideshow/tiny/DSC_0411.webp';
import slideshowTiny4 from '../../assets/homeSlideshow/tiny/DSC_0898.webp';
import slideshowTiny5 from '../../assets/homeSlideshow/tiny/IMG_293.webp';
import slideshowTiny6 from '../../assets/homeSlideshow/tiny/IMG_7642.webp';
import slideshowTiny7 from '../../assets/homeSlideshow/tiny/IMG_7848.webp';
import slideshowTiny8 from '../../assets/homeSlideshow/tiny/IMG_8857.webp';
import slideshowTiny9 from '../../assets/homeSlideshow/tiny/IMG_8879.webp';
import slideshowTiny10 from '../../assets/homeSlideshow/tiny/IMG_9541.webp';

export async function getTimelineEvents() {
  try {
    const response = await axios.get('/timeline');
    return response.data.timelines;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export function getSlideshowImages() {
  return shuffleArray([
    {
      src: slideshow1,
      placeholder: slideshowTiny1,
    },
    {
      src: slideshow2,
      placeholder: slideshowTiny2,
    },
    {
      src: slideshow3,
      placeholder: slideshowTiny3,
    },
    {
      src: slideshow4,
      placeholder: slideshowTiny4,
    },
    {
      src: slideshow5,
      placeholder: slideshowTiny5,
    },
    {
      src: slideshow6,
      placeholder: slideshowTiny6,
    },
    {
      src: slideshow7,
      placeholder: slideshowTiny7,
    },
    {
      src: slideshow8,
      placeholder: slideshowTiny8,
    },
    {
      src: slideshow9,
      placeholder: slideshowTiny9,
    },
    {
      src: slideshow10,
      placeholder: slideshowTiny10,
    },
  ]);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
