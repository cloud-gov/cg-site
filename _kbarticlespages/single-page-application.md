---
layout: post
title: "Single-Page Application"
date: September 20, 2023
excerpt: Single-Page Application with React library
---

## Preamble

This will serve as an informative article regarding hosting a single-page application on the Pages platform using the [React library](https://react.dev/learn/installation) and [React Router v6](https://reactrouter.com/en/main), not as an instructional step by step creation guideline. For more detailed instructions on how to run this locally please refer to the repository [README.md](https://github.com/Ephraim-G/react_spa4#react_spa4). The folders/files referenced in this article will only be the ones where significant changes were made in construction of the application and enabled compatibility with Pages. It is highly recommended to view the [full repository on GitHub](https://github.com/Ephraim-G/react_spa4) in conjunction with working your way through the article. This article is written top-down in correlation to the lines of code in each file of the repository. Additionally an [article glossary](https://github.com/Ephraim-G/react_spa4#knowledge-base-article-glossary) is available to improve the reading experience  You can also view the [single-page application](https://federalist-01aa8660-8aca-452d-a270-5e58ffa18645.sites.pages.cloud.gov/site/ephraim-g/react_spa4/)!

## .vscode/build/node_modules/public/src

These folders are all created initially in the repository when you `create-react-app`. For the purpose of this example the src and public folders were cleared out and files were implemented from scratch. Additionally when you run `npm build` all the optimized Javascript will be placed into the “`build`” folder.

## Src
### Contact.js/Home.js/Stuff.js 

Each of the class  components were created in their own Javascript files respectively by declaring `class <class name> extends Component`. In React class components typically extend the `Component` class to inherit functionality and methods for creating and managing component state. The method `render()` is then defined as a subclass. `render` is the only method which must be defined in a `class component`. Everything that is incorporated in the `render` method is what users will see when they navigate to our single-page application. Class components require a `render()` method and in this case it returns HTML which will be shown on the page in our web application. Each component is then exported as a default value to be called in other parts of the application.

## Index.css
This file contains all the CSS rules and styling that apply to all the components and elements. This is imported into the `index.js` file to apply globally styling rules throughout the whole application. 

## Index.js

### Importing functions/components

The `createRoot` function is imported via the `react-dom/client` module to create a root which will enable us to display React components inside a browser DOM node. We import the React library and CSS. We then import 4 different functions from `react-router-dom` which are essentially for enabling dynamic routing on the page itself. This is accomplished by creating a DOM History API to manage the history stack of the application. We are essentially manipulating the browser's history to navigate between different states of our application without reloading the page which makes this a Single-Page application.
The `createRoutesFromElements` and `Route` components are then imported, which are exclusive to React Router v6, in which we declare the route to our components as the path plus the layout.  We set `home` `stuff` `contact` as child routes which are nested within the top level route which contains the path variable and element property. `<Route index element={<Layout />}>` is an index route which is an index of the site relative to the path variable in the line above it. The `path` property defines the URL pattern that, when matched, will render the associated `element` and the `element` property applies the layout component to be rendered for any routes nested inside it. The path is set to the environment variable  `REACT_APP_PUBLIC_URL` which is stored in the `.env` file. (The environment variable in react is prepended with `REACT_APP_` in order to be recognized by Create-React-App.) We also leave the value as an empty string because the build script will set the Base URL for us. Without this structure Pages will not be able to render or route to our different layout components and will result in 404s. 
We imported `RouterProvider` to serve as the mechanism/component for rendering the app itself. We declare this outside of the React tree and set the `router` to the route tree that we previously defined. This is then passed into the `RouterProvider` component. 
We also imported our 4 components individually from their respective root paths. In our last block of code we call the `createRoot` function and select the DOM element with the ID “root”. `render` is a method called to render everything that is in the DOM. We wrapped our router in `Strict Mode` which runs our app basically twice to ensure that any potential issues in the app are brought to our attention in an extremely obvious way. There may be instances where no errors appear in the console or lints errors so this acts as an extra more thorough safeguard. It is not required but can be useful in certain situations.

### Layout.js
We start off by importing the React module and some different classes from the `react/react-router-dom` library. We again assign the value of our public URL environment variable to the path variable. In `class Layout extends Component` here `class` is used to define a new class in javascript which is named `Layout` and `extends Component` specifies that the `Layout` class is extending the `Component` class. We have our parent and child routes set within the scope of the `router`.  For users to be able to access our page and the different components all the `NavLink` need to point to the path that was defined in the `index.js` file along with the specified component. In the JSX there are some html tags to define the structure of the UI. We also pass the string as a `className` property to apply styling and CSS changes. `Outlet` is an component used to render the child routes/paths which are nested in our application as part of the React Router configuration. When a user navigates to any path then the content of the matching root/child routes/path will be displayed within `Outlet` as it indicates where the content of nested routes/paths should be displayed. It will always contain the header above it as such. 

```
           <div>
                <h1>Simple SPA</h1>
                <ul className="header">
                    {/* All nav links need to go to {path} */}
                    <li><NavLink to={path}>Home</NavLink></li>
                    <li><NavLink to={path + "stuff"}>Stuff</NavLink></li>
                    <li><NavLink to={path + "contact"}>Contact</NavLink></li>
                </ul>
                <div className="content">
```
Lastly `export default Layout` is used to export the `Layout` component as the default export of the `Layout.js` file. Now when another module imports `Layout` (as in the `index.js` file) without specifying a particular named import, it will receive the `Layout` component as the default export. 

## .env

Environments variables here are embedded at build time and never read at runtime hence Pages being a static site generator/hosting platform. These are created by our shell script in `build.sh`. 

## Build.sh

This is an #!/bin/bash shell script that will create 3 environment variables into the ``.env`` file. To take `echo “Public_URL=$BASEURL” >> .env` as an example this prints out the key=value pair specified (setting the public URL as the base URL we get from Pages) and then use the redirection operator `>>` to store the output in the `.env` file. 3 separate scripts are run at build time each storing their outputs (env vars)  in `.env`.
