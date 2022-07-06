import useAxios from '../../hooks/useAxios.jsx';
const { axios } = useAxios();
//import axios from 'axios';

export async function getTimelineDates() {
  try {
    const response = await axios.get('/timeline');
    //const response = await axios.get('http://localhost:5001/timeline');
    return response.data.timelines;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
    return [];
  }
  /*
  return [
    {
      date: new Date('2022-05-31T00:00:00'),
      name: 'Test 1234',
      description: 'Join other frosh and meetup! This is a really long description. ',
      link: 'http://www.google.ca',
      linkLabel: 'Click me!',
    },
    {
      date: new Date('2022-06-02T00:00:00'),
      name: 'Meetups 2',
      description: 'Join other frosh and meetup!',
    },
    {
      date: new Date('2022-06-04T00:00:00'),
      name: 'Meetups 2',
    },
    {
      date: new Date('2022-06-07T00:00:00'),
      name: 'Meetups 2',
      description: 'Join other frosh and meetup!',
    },
  ];
  */
}

export function getSlideshowImages() {
  return shuffleArray([
    'https://photos.smugmug.com/2T1-2T2/Frosh-Week/Frosh-Events/Downtown-Walkaround/i-vWJsVcx/0/90d56837/L/P1810092-131-L.jpg',
    'https://photos.smugmug.com/2T1-2T2/Frosh-Week/Frosh-Events/Downtown-Walkaround/i-pQrcHcZ/0/487dda5c/L/P1810102-136-L.jpg',
    'https://photos.smugmug.com/2T1-2T2/Frosh-Week/Frosh-Events/Downtown-Walkaround/i-RbmJjBR/0/1280f4c5/L/P1810219-166-L.jpg',
    'https://photos.smugmug.com/2T1-2T2/Frosh-Week/Frosh-Events/Downtown-Walkaround/i-pZPkxrV/0/e65519ca/L/P1810224-167-L.jpg',
    'https://photos.smugmug.com/2T1-2T2/Frosh-Week/Frosh-Events/Downtown-Walkaround/i-H3Tk9pc/0/9ad4bc8e/L/P1810286-179-L.jpg',
    'https://photos.smugmug.com/2T1-2T2/Frosh-Week/Frosh-Events/Downtown-Walkaround/i-bXf4JNj/0/91a06c4a/L/P1810294-180-L.jpg',
    'https://photos.smugmug.com/2T1-2T2/Frosh-Week/Frosh-Events/Downtown-Walkaround/i-WB3WDrB/0/29d712b4/L/P1810360-194-L.jpg',
    'https://photos.smugmug.com/2T1-2T2/Frosh-Week/Frosh-Events/Downtown-Walkaround/i-JfhXJGp/0/0ff50e71/L/P1810437-209-L.jpg',
    'https://photos.smugmug.com/2T1-2T2/Frosh-Week/Frosh-Events/Downtown-Walkaround/i-qsTj3WK/0/887d18b6/L/P1810606-234-L.jpg',
    'https://photos.smugmug.com/2T1-2T2/Frosh-Week/Frosh-Events/Downtown-Walkaround/i-Jk4k2rh/0/dc983be5/L/P1810717-259-L.jpg',
    'https://photos.smugmug.com/2T1-2T2/Frosh-Week/Frosh-Events/Downtown-Walkaround/i-5TDjGbt/0/4b6dbdca/L/P1810728-263-L.jpg',
    'https://photos.smugmug.com/2T1-2T2/Frosh-Week/Frosh-Events/Downtown-Walkaround/i-9FQh39x/0/7d5b2e4d/L/P1810747-268-L.jpg',
    'https://photos.smugmug.com/2T1-2T2/Frosh-Week/Frosh-Events/Downtown-Walkaround/i-NG2cpwf/0/11f12b48/L/P1810757-270-L.jpg',
    'https://photos.smugmug.com/2T1-2T2/Frosh-Week/Frosh-Events/Downtown-Walkaround/i-MtrsQ6G/0/0dc2b6e5/L/P1820018-315-L.jpg',
    'https://photos.smugmug.com/2T1-2T2/Frosh-Week/Frosh-Events/Downtown-Walkaround/i-BtvZczG/0/8c01f999/L/P1820033-317-L.jpg',
  ]);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
