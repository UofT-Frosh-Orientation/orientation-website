import React from 'react';
import img from '../../assets/social/uoftlogo.png';
import { ImageCarousel } from './ImageCarousel';

export default {
  title: 'ImageCarousel',
  component: ImageCarousel,
};

export const ImageCarouselStory = (args) => <ImageCarousel {...args} />;
ImageCarouselStory.storyName = 'ImageCarousel';
ImageCarouselStory.args = {
  items: [
    {
      name: 'University of Toronto',
      website: 'https://www.utoronto.ca/',
      backgroundColor: '#ff0505',
      image: img,
    },
    {
      name: 'University of Toronto',
      website: 'https://www.utoronto.ca/',
      backgroundColor: '#ff7e05',
      image: img,
    },
    {
      name: 'University of Toronto',
      website: 'https://www.utoronto.ca/',
      backgroundColor: '#ffc505',
      image: img,
    },
    {
      name: 'University of Toronto',
      website: 'https://www.utoronto.ca/',
      backgroundColor: '#2fff05',
      image: img,
    },
    {
      name: 'University of Toronto',
      website: 'https://www.utoronto.ca/',
      backgroundColor: '#0548ff',
      image: img,
    },
  ],
  redirect: true,
};
