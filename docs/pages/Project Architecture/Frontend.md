---
layout: default
title: Frontend
nav_order: 1
permalink: /ProjectArchitecture/Frontend
---

# Frontend

The design of the frontend can be found here: https://www.figma.com/file/nm0NklXCnOGmQQfugCk5i3/Frosh-Week-2022?node-id=0%3A1

## Components

All components use the standard React functional component structure and require `PropTypes`. Components are located in the `./client/src/components`. Components are documented using storybook. You can read more about using storybook here: https://storybook.js.org/

## Assets

Most frontend assets are located in `./client/src/assets/`. This includes all icons, background art, photos.

## Constants

Most frontend constants and information is located in `./client/src/util/`. We hope to reduce the amount of frontend constants in the future.

## Component Documentation

To view the component stories, navigate to the `client` directory in your terminal and run:

```shell
yarn storybook
```

## Pages

Pages are stored in `./client/src/util/pages.jsx`. To add a page, add it to the respective category. This can modify the navigation bar, footer links, etc, as other components rely on this file. Pages are routed automatically in `App.jsx`, specifically the `TransitionRoutes` component. We use React Router DOM v6, with CSS transitions to achieve routing in React.

## Snackbar Provider

The Snackbar provider is wrapped at the root of the app. Therefore it can be accessed by the child components. You can use setSnackbar to show a snackbar message.

An example usage:

```js
// Import useContext from React
import React, { useState, useEffect, useContext } from "react";
// Import the context
import { SnackbarContext } from "../../util/SnackbarProvider";

// In some component...
const { setSnackbar } = useContext(SnackbarContext);
// Show a snackbar message
setSnackbar("Hello", false);
// Show an error message
setSnackbar("Error!", true);
```

## Darkmode Provider

The Darkmode provider is wrapped at the root of the app. Therefore, it can be accessed by the child components. You can use setDarkmode to show toggle the color theme.

An example usage:

```js
// Import useContext from React
import React, { useState, useEffect, useContext } from "react";
// Import the context
import { DarkModeContext } from "../../util/DarkModeProvider";

//In some component...
const { darkMode, setDarkModeStatus } = useContext(DarkModeContext);
// Toggle the theme
setDarkModeStatus(false);
// Check the current theme mode
console.log(darkMode);
```

## Colors

The color list is available in `/client/src/util/colors.jsx`. These colors are applied using CSS variables and can be accessed in SCSS styles or inline styles. Dark mode automatically applies the respective color (index 0 - light mode, index 1 - dark mode)

## Global CSS classes

Note: Due to the nature of React, all CSS classes written have a global behaviour. Use specific class names for specific features on the website to not have overlapping styles. This section lists useful generic class names for quick styling.

- `no-link-style` removed the underline from any `a` link (This includes the `<Link>` component)
- `display-only-desktop` only displays the contents on a normal computer screen size, otherwise hidden
- `display-only-tablet` only displays the contents on a tablet/phone screen size, otherwise hidden

## SCSS Mixins

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
