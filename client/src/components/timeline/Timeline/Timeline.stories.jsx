import React from 'react';

import { Timeline } from './Timeline';

export default {
  title: 'Timeline',
  component: Timeline,
};

export const TimelineStory = (args) => <Timeline {...args} />;
TimelineStory.storyName = 'Timeline';
TimelineStory.args = {
  dates: [
    {
      date: new Date('2022-05-31T00:00:00'),
      name: 'Test 1234',
      description: 'Join other frosh and meetup! This is a really long description. ',
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
  ],
  onClick: (dateObj, formattedDate) => {
    console.log(dateObj);
    console.log(formattedDate);
  },
};
