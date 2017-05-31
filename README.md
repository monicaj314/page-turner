# Page-Turners

A simple app that consolidates book reviews and ratings for best selling books. This project is a work in progress. I bootstrapped this project with [Create React App](https://github.com/facebookincubator/create-react-app). :)


### Demo
[www.page-turners.cc](http://www.page-turners.cc)

### Why?
I'm using this project to get a better feel for
- ES6
- [Redux](http://redux.js.org/) (I came from a React/Flux background)
- [React-Redux](https://github.com/reactjs/react-redux)
- The awesome [Create React App](https://github.com/facebookincubator/create-react-app) tool.
- [Jest](https://facebook.github.io/jest/) testing framework
- Inline styling vs CSS Modules

## React Approach
My approach here was to keep it as simple as possible.  Most of my presentational components are "dumb" components and rely only on props that are passed down from components higher in the component tree.  There are a few components that require an internal local state.  When used, the component state is strictly concerned with behavior in the containing component and has no knowledge of other components.  The "smart" components are my container components.  They subscribe to my Redux state via React Redux's `connect()` function.  More on my Redux implementation below.

Use of React's lifecycle methods were primarily limited to my container components.  I made a couple of uses of `componentDidMount()` and `componentWillUnmount()` when subscribing and unsubscribing to certain DOM events.  I also used `componentDidMount()` to dispatch AJAX-related Redux actions.  Notice how I didn't use `componentWillMount()` for this.  Turns out, using `componentWillMount()` for AJAX is not too good of an idea.  More on this [here](https://engineering.musefind.com/react-lifecycle-methods-how-and-when-to-use-them-2111a1b692b1).  Finally, I made use of `componentWillReceiveProps()` to intercept incoming props and act on them if necessary.  


One method I typically use to optimize performance is `shouldComponentUpdate()`. Though React-Redux provides some of these optimizations out of the box, I eventually plan to revisit my components and assess them for further potential improvements. (`shouldComponentUpdate()` is typically used to prevent unnecessary re-renders.)

#### Code Organization
Most documented React/Redux applications out there share very similar structures.  The few differences I found involved whether to co-locate containers and presentational components and whether to co-locate CSS with their components.  Here are some of the interesting articles I read on this topic:
- [Structuring React Projects](https://survivejs.com/react/advanced-techniques/structuring-react-projects/)
- [How to better organize your React applications](https://medium.com/@alexmngn/how-to-better-organize-your-react-applications-2fd3ea1920f1)

Clearly, there are many factors to consider including size of application, size of team, and even implementation approach.  In my case, I decided to go with what felt right and most efficient as I was jumping back and forth between components.  I co-located my containers and presentational components.  

Where to place CSS is another often-asked question when considering structure.  Traditionally, CSS has always been placed in its own designated folder.  Nowadays, there's [much debate](https://css-tricks.com/the-debate-around-do-we-even-need-css-anymore/) as to whether we even need separate CSS files (many opting to write their CSS directly in JS). With the advent of bundling tools such as [Webpack](https://webpack.js.org/), developers are able to take advantage of CSS modularizing features that empower them to write CSS on a per component basis. This made the decision to co-locate my css modules with components a no-brainer.  It also helped that Create-React-App's out of the box App is co-located with its CSS file.  

#### React Router
I used the BrowserRouter module in [react-router-dom](https://reacttraining.com/react-router/) v4.1.1.  Each category of best selling books has its own unique URL.  These URLs are resolved by a single React-Router route. React-Router also ensures that browser history is maintained.

## Redux Approach
#### Action Creators
I separated my action creators into two modules.  The separation was domain-specific.  In my case, I had one file for book categories and another file for the books themselves.  Within each module, I used a combination of thunk-returning action creators for asynchronous operations and simple action-returning action creators for synchronous operations. I used the package [redux-thunk](https://github.com/gaearon/redux-thunk) to enable thunk usage with redux.  

#### Reducers
So far, I have only needed to use three reducers.  One to handle the slice of the state having to do with books, one to handle the slice to do with categories, and one used by a root component to determine if the app is still initializing. I combined these reducers via redux's `combineReducers()` function to create a single root reducer.  This root reducer gets passed in to Redux's `createStore()` function (along with various middleware).

#### Middleware
The middleware packages used in this project so far include [redux-thunk](https://github.com/gaearon/redux-thunk) and [redux-logger](https://github.com/evgenyrodionov/redux-logger).  Redux Logger is only used when operating in a dev environment.

## Styling
For me, styling has long been one of the more challenging aspects of front-end development.  It always feels like you're hacking stuff together, doesn't it? Thankfully, CSS3 has made it so much easier to accomplish simple sounding tasks that previously took some considerable effort doing.  `display:flex;` is a life-saver.

#### Approach
Though I originally started writing all my styles as inline styles, I am now transitioning to CSS Modules.  Because of this, you are likely to find a mixture of inline styles and SASS files scattered throughout my codebase. Gross, I know. My original inline style approach was inspired by many of the articles I'd been reading about CSS in JS.  It's an idea that, though it had been discussed now and then throughout the years, it really regained momentum after Facebook's [Christopher Chedeau's talk](https://speakerdeck.com/vjeux/react-css-in-js) at the NationJS conference back in November of 2014.  Additionally, Call-Em-All's [Material UI library](http://www.material-ui.com/#/), which is the library I was considering using, also used inline styles as their primary strategy in styling their components.  Both of these facts persuaded me to go with the inline style approach.

Looking back, I'm convinced that I either made the wrong decision, or at the very least approached my decision incorrectly.  Why? Here are my reasons:
- As outlined by this [great article](https://medium.com/yplan-eng/inline-styles-are-so-2016-f100b79dafe1), inline styles introduce some pretty significant limitations. Without the help of an external CSS in JS package, you can't use things like pseudo classes, pseudo elements, or media queries. Since I did not use an external package to help me with this problem, I was hampered by these limitations.  
- Picking the right package out of the [plethora of available CSS in JS packages](https://github.com/MicheleBertoli/css-in-js) exposes me to the risk that I'm going to pick and learn the wrong thing. Looking back, perhaps I should have picked one anyway.  I think I'll go back and try out [JSS](https://github.com/cssinjs/jss).  It looks promising.
- Inline styles just looked... ugly. I know this is a questionable reason. (remember how we felt about JSX?)
- [Component-localized CSS Modules](https://medium.com/seek-blog/the-end-of-global-css-90d2a4a06284) look so much more attractive!

My caveat here is that some of the CSS in JS packages look pretty awesome too.  I'm still not quite sure which method is superior. Indeed, there is still much debate about this topic in the CSS and Javascript communities. We'll have to see which tool emerges victorious. For the time being, I'm trying out CSS Modules and so far I'm enjoying the experience.  

## Node API

Currently, the book data seen on Page Turners is API data that is fetched from The New York Times, Amazon, Goodreads, and Google Books.  Page Turners aggregates this data and creates its own model of a book. I initially attempted to have the frontend carry the burden of performing this aggregation. After experiencing some of the pain points outlined below, I eventually chose to extract this to a Node process and expose the resulting data through a Node REST API. These were my pain points:

1. The complexity inside my action creators started getting out of hand.
2. It did not seem like I was properly separating my concerns.  The front-end knew an awful lot about non-frontend things.
3. CORS issues with some of the APIs required proxying solutions.
4. I eventually want to build a React Native app for this project.  Having a backend I can reuse will save me time!

#### Redis

I use [Redis](https://redis.io/) to cache my Node process's resulting aggregated data.  Each call to Page Turner's API first checks to see if the requested data is available in cache before attempting to fetch the data from a 3rd party API.  This significantly improves my API's response times.

## Tests

As mentioned previously, I am using [Jest](https://facebook.github.io/jest/) to test my code.  I'm still in the process of adding tests and have so far been able to write tests for every action creator in the app.  Missing is an expansive test suite covering my components.  These will be coming soon.  My experience with Jest so far has been delightful.  I'm looking forward to using Jest's snapshot feature.  
