![image](https://user-images.githubusercontent.com/50821962/195210327-87d8570e-d5c1-4704-be5b-eb2a609c0972.png)

# Orientation Website

Welcome to the University of Toronto's Frosh engineering orientation website, used by more than 1,000 incoming students each year. This website serves as the primary platform for registering and paying for orientation events, and offers a range of features including a main schedule, announcements, a personal profile page with the ability to edit, a Scunt (scavenger hunt) game, sign-up for the Frosh retreat, QR code scanning for automated registration on event day, and more.

This website is built using React, Express, Mongoose, Stripe, Docker, etc, and serves as a valuable resource for incoming students as they prepare for their first year at the University of Toronto. We hope this website helps to make the orientation process as smooth and enjoyable as possible.

This repository holds the source code for UofT Engineering's Orientation Website! This fullstack website is 
split into two "packages". First, there is the frontend package, `client`, and second there is the backend
package `server`.

## The Frosh 2T3 Web Team
* Soon to come!

## The Frosh 2T2 Web Team
### Webmasters
* [James Kokoska](https://github.com/jameskokoska), [Calum Murray](https://github.com/Cali0707), [Natalie Chan](https://github.com/natapokie)
### Associates
* [Farbod M](https://github.com/Freeassassin), [Luke Yang](https://github.com/lukewarmtemp), [Neo Lou](https://github.com/NeoLou), [Emily N](https://github.com/Emily9023)
### External Contributors
* [Matthew Wilson](https://github.com/MatthewGWilson), [Yash Vardhan](https://github.com/VardhanYash), [Akshat Mengi](https://github.com/akshatm2), [Andrew Kim](https://github.com/AndrewMinyoungKim)

## Getting started
***Note: You will need to contact a project maintainer to get access to the `.env` environment variables and keys.***

To get started, you need to install all the necessary dependencies, and then you need to install docker. This project uses yarn
for dependency management, so the first step is to install yarn.
### Installing yarn
 ```shell
 npm install -g yarn
```
After installing yarn, we are now ready to install the remaining dependencies.
### Installing root dependencies
First, we will install the dependencies in the root directory. To do this, navigate to the root directory of
the repository in your terminal and run:
```shell
yarn install
```
### Installing frontend dependencies
Next, we will install the frontend dependencies. To do this, navigate to the `client` directory in your 
terminal and run:
```shell
yarn install
```
### Installing backend dependencies
Finally, we need to install the backend dependencies. To do this, navigate to the `server` directory in 
your terminal and run:
```shell
yarn install
```
### Installing docker
The easiest way to install docker is to follow the instructions at https://www.docker.com/products/docker-desktop/
## Running the code
When running the code, you can choose whether you want to run just the frontend, just the backend, or both
at the same time. For most purposes, it is recommended to run both. Another common way to run the code is 
run all the stories for the frontend React components. All of these scenarios are explained below.
### Running both the frontend and the backend
To run both the frontend and the backend, you will need docker installed. With docker installed,
navigate to the **root directory** of the repository, then run:
```shell
docker-compose up --build
```
### Running just the frontend
To run just the frontend, navigate to the `client` directory in your terminal and run:
```shell
yarn dev
```
### Running just the backend
To run just the backend, navigate to the `server` directory in your terminal and run:
```shell
yarn start:dev
```
### View all the component stories
To view the stories, navigate to the `client` directory in your terminal and run:
```shell
yarn storybook
```

## Technical Breakdown
### Frontend
The design of the frontend can be found here: https://www.figma.com/file/nm0NklXCnOGmQQfugCk5i3/Frosh-Week-2022?node-id=0%3A1
#### Components
All components use the standard React functional component structure and require `PropTypes`. Components are located in the `./client/src/components`. Components are documented using storybook. You can read more about using storybook here: https://storybook.js.org/
#### Assets
Most frontend assets are located in `./client/src/assets/`. This includes all icons, background art, photos.
#### Constants
Most frontend constants and information is located in `./client/src/util/`. We hope to reduce the amount of frontend constants in the future.
#### Component Documentation
To view the component stories, navigate to the `client` directory in your terminal and run:
```shell
yarn storybook
```
#### Pages
Pages are stored in `./client/src/util/pages.jsx`. To add a page, add it to the respective category. This can modify the navigation bar, footer links, etc, as other components rely on this file. Pages are routed automatically in `App.jsx`, specifically the `TransitionRoutes` component. We use React Router DOM v6, with CSS transitions to achieve routing in React.
#### Snackbar Provider
The Snackbar provider is wrapped at the root of the app. Therefore it can be accessed by the child components. You can use setSnackbar to show a snackbar message. 

An example usage:
```js
// Import useContext from React
import React, { useState, useEffect, useContext } from 'react';
// Import the context
import { SnackbarContext } from '../../util/SnackbarProvider';

// In some component...
const { setSnackbar } = useContext(SnackbarContext);
// Show a snackbar message
setSnackbar("Hello", false)
// Show an error message
setSnackbar("Error!", true)
```
#### Darkmode Provider
The Darkmode provider is wrapped at the root of the app. Therefore, it can be accessed by the child components. You can use setDarkmode to show toggle the color theme. 

An example usage:
```js
// Import useContext from React
import React, { useState, useEffect, useContext } from 'react';
// Import the context
import { DarkModeContext } from '../../util/DarkModeProvider';

//In some component...
const { darkMode, setDarkModeStatus } = useContext(DarkModeContext);
// Toggle the theme
setDarkModeStatus(false);
// Check the current theme mode
console.log(darkMode)
```
#### Colors
The color list is available in `/client/src/util/colors.jsx`. These colors are applied using CSS variables and can be accessed in SCSS styles or inline styles. Dark mode automatically applies the respective color (index 0 - light mode, index 1 - dark mode)
#### Global CSS classes
Note: Due to the nature of React, all CSS classes written have a global behaviour. Use specific class names for specific features on the website to not have overlapping styles. This section lists useful generic class names for quick styling.
* `no-link-style` removed the underline from any `a` link (This includes the `<Link>` component)
* `display-only-desktop` only displays the contents on a normal computer screen size, otherwise hidden
* `display-only-tablet` only displays the contents on a tablet/phone screen size, otherwise hidden
#### SCSS Mixins 
Import mixins into your SCSS using `@import '../../scssStyles/mixins';`
This allows you to use device specific selectors such as `tablet`. The SCSS file: `./client/src./scssStyles./_mixins.scss` has more information

For example:
```SCSS
.some-class {
  ...
  @include devices(tablet) {
    ...
  }
}
```
### Backend
The backend is meticulously organized under the `server` folder in their respective subfolders. `controllers`, `loaders`, `middlewares`, `models`, `routes` etc.

> The general hierarchy is as follows:
> `routes` -> `middlewares` -> `controller` -> `services` -> *logic here for a route*

### Scunt

Scunt is broken down into 3 models:

* GameSettings

Game settings are specified before the game begins and used for certain logic functions. For example when generating teams, the game settings are used to see how many teams are specified. The logic for if a game is running/if users can see certain information on their profile page about Scunt will be stored here. The game settings can be set on the frontend Scunt Game Settings page. You can also set the amount of starter bribe points, and the amount of leeway judges are allowed to give from the base recommended points of a mission.

* Missions

The missions are used for the objectives the frosh must complete. Usually, a spreadsheet populates this. `number`, `name`, `category`, `points`, `isHidden`, `isJudgingStation`
`isHidden` will hide the mission from other users and can be changed anytime during a game to remove any missions requested by the faculty during the game or to release new missions during the game. `isJudgingStation` is a bool that indicates to the players of Scunt that they must complete the mission in front of a judge (video/photo is not accepted at the time of judging). All these flags do not have any effect on the functionality of the game apart from points.

* Teams

The teams group contains information about a team. This includes the teams nickname and amount of points. Within this collection a list of all the teams transactions can be found. For example, if a judge adds points to a team for a certain task, it is stored here. This also includes bribe points and subtraction points. The subcollection is a log of all transactions that have occurred on that team. It is usually large and only admins have access to this information. 

> For more information and to better understand the architecture, be sure to check out the `models` folder and analyze the Scunt backend structure.
