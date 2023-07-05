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
import slideshowTiny10 from '../../assets/homeSlideshow/tiny/IMG_9541_smaller.webp';

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
      src: slideshow10,
      placeholder: slideshowTiny10,
    },
    // slideshow1,
    // slideshow2,
    // slideshow3,
    // slideshow4,
    // slideshow5,
    // slideshow6,
    // slideshow7,
    // slideshow8,
    // slideshow9,
    // slideshow10,
    // 'https://photos.smugmug.com/photos/i-LB9g6Pz/0/L/i-LB9g6Pz-L.jpg',
    // 'https://photos.smugmug.com/photos/i-bgkRBSR/0/L/i-bgkRBSR-L.jpg',
    // 'https://photos.smugmug.com/photos/i-q3gvVgQ/0/L/i-q3gvVgQ-L.jpg',
    // 'https://photos.smugmug.com/photos/i-qW5qHLf/0/L/i-qW5qHLf-L.jpg',
    // 'https://photos.smugmug.com/photos/i-MR2Cwz3/0/L/i-MR2Cwz3-L.jpg',
    // 'https://photos.smugmug.com/photos/i-TSH4vRv/0/L/i-TSH4vRv-L.jpg',
    // 'https://photos.smugmug.com/photos/i-hc2CZ98/0/L/i-hc2CZ98-L.jpg',
    // 'https://photos.smugmug.com/photos/i-xQgqRnW/0/L/i-xQgqRnW-L.jpg',
    // 'https://photos.smugmug.com/photos/i-5wbnHLZ/0/L/i-5wbnHLZ-L.jpg',
    // 'https://photos.smugmug.com/photos/i-GfcnGmx/0/L/i-GfcnGmx-L.jpg',
    // 'https://photos.smugmug.com/photos/i-HHVczSc/0/L/i-HHVczSc-L.jpg',
  ]);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
