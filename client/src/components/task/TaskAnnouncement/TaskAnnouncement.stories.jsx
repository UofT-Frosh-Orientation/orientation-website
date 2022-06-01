import React from 'react';

import { TaskAnnouncement } from './TaskAnnouncement';

export default {
  title: 'TaskAnnouncement',
  component: TaskAnnouncement,
};

export const TaskAnnouncementStory = (args) => <TaskAnnouncement {...args} />;
TaskAnnouncementStory.storyName = 'TaskAnnouncement';
TaskAnnouncementStory.args = {
  tasks: [
    {
      name: 'Welcome to your F!rosh profile page',
      description:
        "Take a look around and explore! You'll find your personalized Frosh group schedule and more information here. You can check this off when you're ready!",
      dateCreated: new Date('2022-05-31T00:00:00'),
      completed: false,
    },
    {
      name: 'Welcome to your F!rosh profile page 2',
      description: 'More talky talk and walky walk text...',
      dateCreated: new Date('2022-05-31T00:00:00'),
      completed: true,
    },
  ],
  onDone: (task) => {
    console.log(task);
  },
};
