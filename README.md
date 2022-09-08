# Orientation Website
This repository holds the source code for UofT Engineering's Orientation Website! This fullstack website is 
split into two "packages". First, there is the frontend package, `client`, and second there is the backend
package `server`.
## Getting started
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
Pages are stored in `./client/src/util/pages.jsx`. To add a page, add it to the respective category. This can modify the navigation bar, footer links, etc, as other components rely on this file. Pages are routed automatically in `App.jsx`, specifically the `TransitionRoutes` component
#### Snackbar Provider
The SNackbar provider is wrapped at the root of the app. Therefore it can be accessed by the child components. You can use setSnackbar to show a snackbar message. 

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
The Darkmode provider is wrapped at the root of the app. Therefore it can be accessed by the child components. You can use setDarkmode to show toggle the color theme. 

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
Note: Due to the nature of React, all CSS classes written have a global behaviour. Use specefic class names for specefic features on the website to not have overlapping styles. This section lists useful generic class names for quick styling.
* `no-link-style` removed the underline from any `a` link (This includes the `<Link>` component)
* `display-only-desktop` only displays the contents on a normal computer screen size, otherwise hidden
* `display-only-tablet` only displays the contents on a tablet/phone screen size, otherwise hidden
#### SCSS Mixins 
Import mixins into your SCSS using `@import '../../scssStyles/mixins';`
THis allows you to use device specefic selectors such as `tablet`. The SCSS file: `./client/src./scssStyles./_mixins.scss` has more information

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
More to come
### Scunt
More to come
