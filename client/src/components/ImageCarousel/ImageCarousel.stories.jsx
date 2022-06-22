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
      website: 'https://www.utoronto.ca/',
      image: img,
    },
    {
      website: 'https://www.utoronto.ca/',
      image: img,
    },
    {
      website: 'https://www.utoronto.ca/',
      image: img,
    },
    {
      website: 'https://www.utoronto.ca/',
      image: img,
    },
    {
      website: 'https://www.utoronto.ca/',
      image: img,
    },
  ],
};
