import useAxios from '../../hooks/useAxios.jsx';
const { axios } = useAxios();

export async function getTimelineEvents() {
  try {
    const response = await axios.get('/timeline');
    return response.data.timelines;
  } catch (error) {
    console.log('Error', error.message);
    return [];
  }
}

export function getSlideshowImages() {
  return shuffleArray([
    'https://photos.smugmug.com/photos/i-LB9g6Pz/0/L/i-LB9g6Pz-L.jpg',
    'https://photos.smugmug.com/photos/i-bgkRBSR/0/L/i-bgkRBSR-L.jpg',
    'https://photos.smugmug.com/photos/i-GsvZfKM/0/L/i-GsvZfKM-L.jpg',
    'https://photos.smugmug.com/photos/i-q3gvVgQ/0/L/i-q3gvVgQ-L.jpg',
    'https://photos.smugmug.com/photos/i-qW5qHLf/0/L/i-qW5qHLf-L.jpg',
    'https://photos.smugmug.com/photos/i-MR2Cwz3/0/L/i-MR2Cwz3-L.jpg',
    'https://photos.smugmug.com/photos/i-TSH4vRv/0/L/i-TSH4vRv-L.jpg',
    'https://photos.smugmug.com/photos/i-9FDSjLV/0/L/i-9FDSjLV-L.jpg',
    'https://photos.smugmug.com/photos/i-rB4wmHB/0/L/i-rB4wmHB-L.jpg',
    'https://photos.smugmug.com/photos/i-hc2CZ98/0/L/i-hc2CZ98-L.jpg',
    'https://photos.smugmug.com/photos/i-xQgqRnW/0/L/i-xQgqRnW-L.jpg',
    'https://photos.smugmug.com/photos/i-5wbnHLZ/0/L/i-5wbnHLZ-L.jpg',
    'https://photos.smugmug.com/photos/i-GfcnGmx/0/L/i-GfcnGmx-L.jpg',
    'https://photos.smugmug.com/photos/i-HHVczSc/0/L/i-HHVczSc-L.jpg',
  ]);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
