# Page-Turners

A simple app that consolidates book reviews and ratings for best selling books. This project is a work in progress. I bootstrapped this project with [Create React App](https://github.com/facebookincubator/create-react-app). :)


### Working Demo
[www.page-turners.cc](http://www.page-turners.cc)

### Why?
I'm using this project to get a better feel for
- ES6
- [Redux](http://redux.js.org/) (I came from a React/Flux background)
- [React-Redux](https://github.com/reactjs/react-redux)
- The awesome [Create React App](https://github.com/facebookincubator/create-react-app) tool.
- [Jest](https://facebook.github.io/jest/) testing framework

### React Approach
My approach here was to keep it as simple as possible.  Most of my presentational components are "dumb" components and rely on props that are passed down from components higher in the component tree.  There are a few components that require an internal local state.  When used, the component internal local state is strictly concerned with behavior in the containing component and has no knowledge of other components.  The "smart" components are my container components.  They subscribe to my Redux state via React Redux's `connect()` function.  More on my Redux implementation below.

With a couple of exceptions, I found myself making very limited use of the React's lifecycle methods.  I did make a couple of uses of `componentDidMount()` and `componentWillUnmountMount()` when subscribing and unsubscribing to certain events. One method I typically use to optimize performance is `shouldComponentUpdate()`.  I didn't use it this time because React Redux provides these performance optimizations out of the box.  (`shouldComponentUpdate()` is typically used to prevent unnecessary re-renders.)

#### Code Organization
Most documented React/Redux applications out there share very similar structures.  The few differences I found involved whether to co-locate containers and presentational components and whether to co-locate CSS with their components.  Here are some of the interesting articles I read on this topic:
- [Structuring React Projects](https://survivejs.com/react/advanced-techniques/structuring-react-projects/)
- [How to better organize your React applications](https://medium.com/@alexmngn/how-to-better-organize-your-react-applications-2fd3ea1920f1)

Clearly, there are many factors to consider including size of application, size of team, and even implementation approach.  In my case, I decided to go with what felt right and most efficient as I was jumping back and forth between components.  I colocated my containers and presentational components.  

Where to place CSS is another often-asked question when considering structure.  Traditionally, CSS has always been placed in its own designated folder.  With the advent of [Webpack](https://webpack.js.org/) and its ability to modularize and bundle CSS however, I was able to write CSS on a per component basis.  This made the decision to co-locate my css modules with components a no-brainer.  It also helped that Create-React-App's out of the box App is colocated with its CSS file.  

#### React Router
I'm using `react-router-dom` v4.1.1.  I'm making very little use of it.  I plan to expand it's use once I am able to add some more routes to the app.

### Redux Approach
#### Action Creators
Coming Soon
#### Reducers
Coming Soon
#### Store
Coming Soon
#### Middleware
Coming Soon
### Styling
Coming Soon
