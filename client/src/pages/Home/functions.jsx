import useAxios from '../../hooks/useAxios.jsx';
const { axios } = useAxios();

import slideshow1 from '../../assets/homeSlideshow/2T5/back.jpg';
import slideshow2 from '../../assets/homeSlideshow/2T5/band.jpg';
import slideshow3 from '../../assets/homeSlideshow/2T5/walkaround.jpg';
import slideshow4 from '../../assets/homeSlideshow/2T5/sign.jpg';
import slideshow5 from '../../assets/homeSlideshow/2T5/build.jpg';
import slideshow6 from '../../assets/homeSlideshow/2T5/dye.jpg';
import slideshow7 from '../../assets/homeSlideshow/2T5/back2.jpg';
import slideshow8 from '../../assets/homeSlideshow/2T5/purple.jpg';

import slideshowTiny1 from '../../assets/homeSlideshow/2T5/back.jpg';
import slideshowTiny2 from '../../assets/homeSlideshow/2T5/band.jpg';
import slideshowTiny3 from '../../assets/homeSlideshow/2T5/walkaround.jpg';
import slideshowTiny4 from '../../assets/homeSlideshow/2T5/sign.jpg';
import slideshowTiny5 from '../../assets/homeSlideshow/2T5/build.jpg';
import slideshowTiny6 from '../../assets/homeSlideshow/2T5/dye.jpg';
import slideshowTiny7 from '../../assets/homeSlideshow/2T5/back2.jpg';
import slideshowTiny8 from '../../assets/homeSlideshow/2T5/purple.jpg';

// Maybe
import slideshow9 from '../../assets/homeSlideshow/2T5/crowd.jpg';
import slideshow10 from '../../assets/homeSlideshow/2T5/band2.jpg';
import slideshow11 from '../../assets/homeSlideshow/2T5/selfie.jpg';
// import slideshow12 from '../../assets/homeSlideshow/2T5/group2.jpg';
import slideshow13 from '../../assets/homeSlideshow/2T5/mat.jpg';
import slideshow14 from '../../assets/homeSlideshow/2T5/mat2.jpg';

import slideshowTiny9 from '../../assets/homeSlideshow/2T5/crowd.jpg';
import slideshowTiny10 from '../../assets/homeSlideshow/2T5/band2.jpg';
import slideshowTiny11 from '../../assets/homeSlideshow/2T5/selfie.jpg';
// import slideshowTiny12 from '../../assets/homeSlideshow/2T5/group2.jpg';
import slideshowTiny13 from '../../assets/homeSlideshow/2T5/mat.jpg';
import slideshowTiny14 from '../../assets/homeSlideshow/2T5/mat2.jpg';

// import slideshowTiny9 from '../../assets/homeSlideshow/tiny/cjancheta_sigma_9293-Ti.webp';
// import slideshowTiny10 from '../../assets/homeSlideshow/tiny/VedantGupta_Pi-7292-4K.jpg';

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
    {
      src: slideshow11,
      placeholder: slideshowTiny11,
    },
    // {
    //   src: slideshow12,
    //   placeholder: slideshowTiny12,
    // },
    {
      src: slideshow13,
      placeholder: slideshowTiny13,
    },
    {
      src: slideshow14,
      placeholder: slideshowTiny14,
    },
  ]);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 1; i--) {
    const j = Math.floor(Math.random() * i) + 1;
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
