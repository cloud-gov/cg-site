---
layout: post
title: "Hosting Single Page Applications on Pages"
date: November 2, 2023
excerpt: 
---


cloud.gov Pages hosts static sites, but this doesn’t mean that developers are limited to only using [“static site generators”](https://jamstack.org/generators/): anything that can be compiled down into HTML can be run on Pages. You can use a single-page application framework like Vue.js, Svelte, Angular, React, etc. and host it seamlessly on the Pages platform. This is achieved via the `npm run pages` command which allows developers to add a custom build script, and we’ll automatically publish everything in the `_site` folder. Details on utilizing a custom build script will be covered later in the article.  

In this example we will be taking a look at a simple single-page application which uses the React library and React Router v6. You can view a repository with a full example here <https://github.com/cloud-gov/pages-example-spa> and see the results in Pages [here](https://federalist-01aa8660-8aca-452d-a270-5e58ffa18645.sites.pages.cloud.gov/preview/cloud-gov/pages-example-spa/content/). There are also more detailed instructions on how to run this locally in the repositories’ README.md. This article serves as a high level overview and will highlight three key features:

* Application routing
* Environment variables
* 404 Pages


## Application Routing

Static site generators like Jekyll and Hugo handle routing by creating an HTML file at each path that can be requested by the user. For single-page applications, we will only render one HTML file: index.html, which loads the JavaScript necessary for running our application and router.

All of the routing is located in the `index.js` file. Here we import all our components, CSS and functions. We create the `<BrowserRouter>` and use the `<RouterProvider>` to provide that router to our application. The parent route registers a `Layout` component which essentially wraps all the other page components thus providing a uniform structure/design for all the components.

```
const router = createBrowserRouter(
  createRoutesFromElements(
    // set route as the path plus layout
    <Route path={path} element={<Layout />}>
      <Route index element={<Home />}/>
      <Route path={path + "Stuff"} element={<Stuff />}/>
      <Route path={path + "contact"} element={<Contact />}/>
      <Route path={path + "/*"} element={<Page404 />}/>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

```



Additionally within the `Layout` component is where we house all the `NavLinks` and `navbar` which are located at the top of the page. The `Outlet` component tells the `react router` where to output the child route page components within the layout. 

```
class Layout extends Component {

    render() {
        return (
            <div>
                <h1>Simple SPA</h1>
                <ul className="header">
                    {/* All nav links need to go to {path} */}
                    <li><NavLink to={path}>Home</NavLink></li>
                    <li><NavLink to={path + "stuff"}>Stuff</NavLink></li>
                    <li><NavLink to={path + "contact"}>Contact</NavLink></li>
                </ul>
                <div className="content">
                    <Outlet />
                </div>
            </div>
        )
    }
}

```

It’s important to remember that none of these routes are creating new HTML files at a given path, they are only rendering in the browser (unless you prerender with [react-snap](https://github.com/stereobooster/react-snap)). We’ll see how to handle situations when the URL doesn’t match the HTML file in a later section.

## Environment variables

Pages provides [certain environment variables](https://cloud.gov/pages/documentation/env-vars-on-pages-builds/) in each build container and you can also add customer variables in your “Site Settings”. In the case of `create-react-app`, the library we’re using in this example, [we need two variables](https://create-react-app.dev/docs/advanced-configuration/):
    - `BUILD_PATH`: this determines the output directory where all the built assets end up after running `react-scripts build`. In our case, Pages requires all assets to be in the `_site` folder. We can set that in the UI like so:
<img src="{{ site.baseurl }}/assets/images/pages/env_var.png"/>

`PUBLIC_URL`: this variable determines how assets are referenced in the final build. We can’t set this one statically in the UI because our root URL will change for preview builds. Instead, we’ll add a small bash script to our custom build command to set the default environment variable `BASEURL` as the value for `PUBLIC_URL` like this:

```
echo "PUBLIC_URL=$BASEURL" >> .env
```
	
  You can see how this is included in the build command in the [repository](https://github.com/cloud-gov/pages-example-spa/blob/main/build.sh#L3C32-L3C32). 





## 404 Pages

In our application code, we created a 404 page as another component to be imported into the `index.js` file to be handled by `react-router`. The Route for the 404 page was set as a wildcard catch-all so that when any path entered is not `/`, `/contact` or `/stuff` the Page404 component will be rendered. 

```
<Route path={path + "/*"} element={<Page404 />}/>
```

If users navigate to a sub-path of your site directly, we need special handling for this type of 404 because the application will not have loaded your index.js file (or associated router). 

It is important to note that:

1. Specifically for any single-page applications hosted on Pages you will need to reach out to an [Pages operator to manually set your custom 404](https://cloud.gov/pages/documentation/customization/#custom-domain-404-page) behavior to point to index.html.

2. This will only work on your production URL, and only when you have a custom domain. For preview links, you’ll need to navigate to the base URL first before moving on to other paths.
