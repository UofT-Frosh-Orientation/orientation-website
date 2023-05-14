---
layout: default
title: Frontend
parent: Onboarding
---

# Frontend

💻 Hello, and welcome to a beginner’s guide to frontend web development! 💻

This guide is here to help you get started with frontend development in React and is meant to be an iterative and dynamic guide, so you are encouraged to add any resources you found helpful as well.

For those that don’t know,

{: .quote }
"... frontend is a term used to describe the client side of a website or application. It involves creating the user interface (UI) and functionality that users interact with”

Frontend development involves using a combination of HTML, scss, and JavaScript. HTML (Hypertext Markup Language) is used to structure the content of a web page, for example, all the text and images on a website are embedded in HTML tags. scss (Cascading Style Sheets) is used to style and change the layout of the pages, for example changing the colours of components and centring items. Finally, JavaScript is used to add functionality to the page and make it interactive for the users, this includes things like clicking buttons.

React is a JavaScript framework that allows you to build user interfaces in a very modular way using components. We kinda describe components like building blocks hence the modularity. They can be nested inside each other allowing you to easily build more complex components by combining smaller ones. For example, an entire page is a component made up of smaller components like text boxes, buttons, images, etc. Note that the file extension for React is .jsx, just something to be careful of when creating new files!

{: .new-note }
A framework is like a set of tools that you can use to build applications that make it easier for you to maintain and update your applications (overall making your life easier)!

---

## React Functional Components

There are two ways you can write components in React, **functional** and **class** components. 

For the orientation website, we write everything in functional components because it’s a lot simpler and easier to understand!

{: .quote }
Conceptually, components are like JavaScript functions. They accept inputs (called “props” short for properties) and return React elements (HTML) describing what should appear on the screen.

There are multiple ways that you can write functional components as well, 

There are multiple ways that you can write functional components as well, 

### Function Keyword

```jsx
function MyComponent(prop1, prop2) {
  return (
    <> 
      <h1>{prop1}</h1>
      <h2>Hello</h2>
    </>
  )
}
```

### Arrow Function

```jsx
const MyComponent = ({prop1, prop2}) =>  {
  return (
    <> 
      <h1>{prop1}</h1>
      <h2>Hello</h2>
    </>
  )
}
```

{: .new-important }
When naming components make sure to use Pascal Case, e.g., FirstName and LastName!

---

## Writing Your First Component

### Importing

```jsx
import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import './yourFile.sscss';
```

These three lines are pretty important! 

1. `useState`, `useEffect` and `useContext` are built-in functions in React, we typically use useState and useEffect which will be discussed further in a later section. 

  {: .new-note }
  Instead of useContext, we use Redux, which allows us to pass and update states across multiple components. No worries if this concept of “State” is unclear, it will be described later!

2. Secondly, PropTypes allows for built-in type checking when you pass in any props to your component.

3. Lastly, make sure to import your .sscss file! Sscss includes all the features of scss but has more features. You can treat your Sscss file as a regular scss file.

In addition to those three important lines, you might also need to import images or components!

#### Importing Images

```jsx
import ImageName from './filepath'
```

`ImageName` is a name that you declare yourself, you will use this name to “call” or “instantiate” the image. 

#### Importing Components

```jsx
import { Component1, Component2 } from './filepath'
import { Component3, Component4 } from 'package-name'
```

To import a component from another .jsx file, you’ll need to make sure to export the component. For components that are declared and used in the same file, there is no need to import them. More later!

[Packages](https://www.npmjs.com/package/image) are like components made by other people that you can use! Packages must be installed first using npm or yarn.

#### Exporting Components

To use components that you’ve built from other files, you must export the component!

{: .new-note }
Note, you can export multiple components from one file as well!

There are two syntaxes for exporting your components, you can add **export** before the **const** keyword, or you can export all the components at the end of your code (we recommend this!).

```jsx
export const MyComponent = () => {
  return ()
}
```

```jsx
const Component1 = () => {
  return ()
}

const Component2 = () => {
  return ()
}

export { Component1, Component2 }
```

### Important HTML Notes

Some of the most important tags you’ll need to know are, `<div>`, `<h1>` to `<h6>`, `<p>`, and sometimes `<span>`.

`<div>` tags define a section of the document, and we would recommend using them for pretty much anything you need!

React syntax is slightly different than HTML, so here is the general format of any tag,

```jsx
<div className="class-name" style={{display: 'flex', color: 'red'}}>
  {children}
</div>

<img className="class-img" src={ImportedImage}></img>
```

{: .new-note }
We refer to anything inside the tag, this can be plain text, other tags or components as the children.

You can add classes using `className` to specify multiple styles, these classes are imported from your Sscss file, or you can add style similar to an object.

#### Multiple Classes

```jsx
<div className="class1 class2"></div>
```

#### Conditional Classes

```jsx
<div className={ condition ? "class1" : ""}> </div>
```

In words, it means, if the condition is true, it will apply the style from class1, if the condition is false, it will not apply any style (hence the empty string)

#### Multiple & Conditional Classes

```jsx
<tag className={` class ${ condition ? 'true-class' : 'false-class'} `}></tag>
```

{: .new-important }
> We recommend getting really familiar with the conditional (ternary) operator!
>
> ```condition ? ifTrue : ifFalse```

#### Alternative Style Attribute

```jsx
// define your style object
const styleTag = {
  display: 'flex',
  color: 'red'
}

<div style={styleTag} />
```

{: .new-note }
Generally, all the tags that you use in HTML can be used in React.

### Important Sscss Notes

Once again Sscss, works the exact same way as scss. We keep all the style code in another file and import it to our .jsx file.

When you’re writing your style code, here are some important styles you should keep in mind as well as general syntax!

```scss
.class-name {
  /* these three lines below aligns the contents to the center of a container */
  display: flex;
  justify-content: center;
  align-items: center;
	
  background-color: green;
  transition: background-color 200ms;

  /* the ampersand means that you’re applying the style to the current component */
  &:hover {
    /* just like it sounds, this style “actives” when you hover over with your mouse */
    background-color: red;
    transition: background-color 200ms;
  }

  &:active {
    /* this style actives when you press and hold */
    background-color: blue;
    transition background-color 200ms;
  }
}
```

#### Apply Style to Multiple Components

```scss
.class-one,
.class-two {
  &:hover{}
  &:active{} 
}
```

#### Apply to All Components

```scss
* {}
```

#### Apply Style to All Tags

```scss
h1, 
h2, 
div {}
```

You might also notice that :root, uses two dashes `--`. These are style variables that we assign in scss. They can be used for color to make sure everything follows the same style guide or transitions!

```scss
:root {
  --purple: #AA98A9; /* we define the variable purple with a certain HEX code */
}

.class-name {
  color: var(--purple)
}
```

### PropTypes

{: .new-important }
> The package that we use for props is slightly annoying because the capitalization of certain characters is very particular and easy to mess up (or maybe it's just me).
>
> So make sure to follow this!

```jsx
import PropTypes from 'prop-types';
```

Lets take a look at an example now!

```jsx
const propTypesObj = {
  propBool: PropTypes.bool, 
  propString: PropTypes.string, 
  propObject: PropTypes.object,
  children: PropTypes.node,
};

const defaultProps = {
  propBool: true,
  propString: "default string",
};

Component.propTypes = propTypes;
Component.defaultProps  = defaultProps;
```

Here, we are creating an object called `propTypesObj`, with the following properties, `propBool`, `propString`, `propObject`, and `children`. Whenever we create props, we need to identify the type, for example `propBool` will be a **bool**, etc.

`PropTypes.object` is typically used for creating props that allow you to add in style for example the style object mentioned above.

The property `children` with `PropTypes.node` is what we use for components that have children, i.e., components that are nested inside other components. For example, 

```jsx
const Component = ({children}) => {
  return(
    <div>{children}</div>
  )
}
```

You can name your props, however, you would like, just make sure that the naming is logical for anyone that wants to use the component!

Next, you can also assign **default props**, when the user doesn’t provide a prop! So if you’re calling `MyComponent` in another file

```jsx
export const MyComponent = ({propBool, propString, propObject, children}) => {
  return(
    <div style={propObject}>
      <h1>{propString}</h1>
      {children}
      { propBool ? (<p>{propString}</p>) : (<></>) }
    </div>
  )
}
```

```jsx
export const ParentComponent = () => {
  return (
    <div>
      <MyComponent propString='Example' >
        <h1>Hello</h1>
      </MyComponent>
    <div>
  )
}
```

Note that the line `<h1>Hello</h1>` is the children prop! 

In this example above, due to `deafultProps`, although `propBool` isn’t stated, it will automatically be assigned the value **true**.

{: .confused}
Let us know how we can help and improve this section! Feel free to check out the link [here](https://www.freecodecamp.org/news/how-to-use-proptypes-in-react/) as well, we mentioned the main propTypes you’ll need but there are others that you can look into!

### Handling Events

One important aspect of any component is something called handling events. These events involve responding to user interactions like clicks, keyboard inputs, etc.

One event handler that you might be familiar with is the `onClick` (in HTML, `onclick`). In React, you can pass a function as the event handler. These event handlers are written inside the HTML or component tag.

```jsx
<Component onClick={ () => { console.log("click") } } />
```

Alternatively, you can declare the function separately, and pass it into the component,

```jsx
const function = () => { console.log("click") }
<Component onClick={ function }/>
```

{: .new-note }
Here are some more examples for [reference](https://www.w3schools.com/react/react_events.asp)!

### useState and useEffect

State and Effect are two really important features to learn when using React – once you have these two mastered, you’re pretty much good to go!

#### useState

State(s) are like properties of the component that can be updated with user interactions. Similar to a light switch that has an on state and an off state.

A component can have multiple states, and these states can change as a response to user interactions or other system-generated events, and these changes can change the behaviour of a component (for example changing the appearance of the component or page, limiting or enabling ways that the user can interact, etc.).

We can take a look at a simple component generated with the help of ChatGPT 😉, 

```jsx
import React, { useState } from 'react';

export const Button = () => {
  const [count, setCount] = useState(0);
  const [click, setClick] = useState(false);

  const clickFunction = () => {
    setCount(count + 1);
    setClick(!click);
    console.log("click?", click);
  }

  return (
    <div onClick={ clickFunction }>
      You clicked me {count} times!
    </div>
  );
}
```

Lets walk through the code snippet starting with initializing your state variables.

Here is the general syntax,

```jsx
const [state, setState] = useState();
```

- `state` is the name of your state variable, 
- `setState` is a function that can changes your state variable, as observed in the code above, 
	- `setCount` increments `count` by 1,  
	- `setClick` sets `click` to the opposite value.
- And finally, `useState` is used to set the initial value of the `state`, as shown above, we can see that,
	- `count` is initially set to  
	- `click` is initially set to false.

{: .new-note }
> You can kinda think of setState like this, 
>
> `setState(newState)` → `state = newState`

Using the event handler we introduced previously, we see that when the user clicks the component, the code executes the `clickFunction`, which changes the state variables.

{: .new-important }
The most important note to keep in mind is that everytime the state changes, we’re technically rendering a new component.

#### useEffect

`UseEffect` is like a function that runs on every render. This could be when you first render a page, or when state variables change and render the components.

Here is the general syntax of useEffect, 

```jsx
useEffect(() => {
  // this runs on every render
  // no dependencies
});
```

We can specify how we want `useEffect` to run using a dependency array. The dependency array can be empty, or contain multiple values.

```jsx
useEffect(() => {
  // this runs on the first render (i.e., rendering the page)
  // empty dependency array
}, []);
```

```jsx
useEffect(() => {
  // this runs on the first render and runs everytime the any of the dependency values change
}, [ state, props]);
```

Typically, we can pass state variables or props, since we may want some action to occur when they change.

{: .new-note }
Click [here](https://www.w3schools.com/react/react_useeffect.asp) for more examples!

### Debugging the Frontend

So generally, debugging the frontend, is very easy! 

In order to see all the components, you can go into the Inspect tab / Developer Tools on your browser, you can press the **F12** key or **Ctrl + Shift + I**.

When debugging I recommend using `console.log()` which prints to the Console to check if your state variables and useEffect are working as intended. 

Next you can go to the Elements page and Inspect the components on the page. If you notice that the style you added isn’t what you expected, you can easily test out different styles in the Element tab. 

Finally, you can change the size of your screen and check for responsiveness! This is especially important since our website needs to be built for laptops and computers but also phones!

---

#### Disclaimer

And you've made it to the end!🎉 Thank you for reading up to here, I really appreciate it!

To be completetly honest, I'm still learning too so please send me a message if you're still confused or need further clarification on something!

(🤫I also didn't test any of the code that I included on this document, so please let me know if there are any issues)

Thanks again and happy coding~

*Natalie* 😊





