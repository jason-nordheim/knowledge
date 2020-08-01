# Redux

## Intro 

It is is important to begin the dive into Redux with an understanding of what Redux is and the problem that redux attempts to solve. Redux is a **a library for managing and updating application state, using events called "actions"**. 

Redux is most useful for managing things like "global state" or state that is needed throughout an application (or throughout the majority of the application). The patterns and tools provided by Redux make it easier to understand when, where, why, and how the state in your application is being updated, and how your application logic will behave when those changes occur. 

The main benefit: **Redux guides you towards writing code that is predictable and testable, which helps give you confidence that your application will work as expected.** 

Signs that your app may benefit from Redux: 
* You have large amounts of application state that are needed in many places in the app
* The app state is updated frequently over time
* The logic to update that state may be complex

Not **all** apps need or will benefit from Redux. In simpilier applications, Redux can add complexity that is unneccessary to accomplish the primary goal of the application. For more information, please consult the ["Where should I use Redux Guide"](https://redux.js.org/faq/general#when-should-i-use-redux) provided at [redux.js.org](https://redux.js.org/). 

Frameworks like [React](https://reactjs.org/) have native methods of handling state, however problems arise when that state needs to be shared with 5-10 components that could be nested deeply in the application, or a deeply nested component needs to update the application state which is declared in a parent, or parent's parent component's state. Redux works to address that issue, by moving state outside of the component heirarchy and into a centralized location. This way, the component heirarchy or "tree" can access and update state, without needing to resort to "[prop drilling](https://codeburst.io/react-anti-pattern-prop-drilling-54474d5236bd)" or "[lifting state up](https://reactjs.org/docs/lifting-state-up.html)". 



## Key Concepts 

### The Redux Toolkit 

The Redux toolkit provides a packages and functions that the developers of Redux feel are "essential" in building a Redux application. It helps to simplify most Redux tasks, prevent common mistakes and make applications easier to write. 

### Redux State Management 

Most modern applications are built in a "MVC" pattern or "Model, View, Controller"; this is similar to the way that Redux approaches state management. 

Within the Redux Framework: 
* `state` is a term that defines mutable data that serves as the backbone for the application (think "content")
* a `view` is a [declarative](https://ui.dev/imperative-vs-declarative-programming/) description of the UI, given the current `state` of the application. 
* `action`s are events that occur as a result of user-input that trigger updates/changes in `state` 

Another way to think about it: 
* `state` describes the condition of the application at a specific point in time
* the UI ("user-interface" or `view`) is rendered conditionally based upon that `state` 
* when something "happens" (i.e. a user enters some text, clicks a button, etc.), this triggers an `action` that will interact with `state` 
* as the `state` changes, the UI (`view`) changes to reflect the applications current state. 

#### Immutable State 

Mutability refers to an object's ability to change over time. Immutable objects are objects that cannot be changed overtime. In JavaScript, all objects and arrays are mutable by default; meaning that modifications do not result in a _new object_, but rather result in _modification_ of an existing object. [Primitive data types](https://developer.mozilla.org/en-US/docs/Glossary/Primitive) however cannot be "mutated" so any changes to those data-types will result in a new variable being created that replaces the existing variable (and has a new value). 

Redux operates on the idea that state _cannot_ be mutated or is _immutable_. So in order to update/change/modify state, we need to copy the existing state, modify it and replace it. 


### Actions 

Actions represents inputs that change state. 

Actions send information (i.e. data) from the application to the Redux data store (`state`). You send actions using `store.dispatch()`. To be clear, actions are plain JavaScript objects, but must have a property called `type` that defines what type of action is being performed. The `type` property should be defined as a constant. The rest of the "action" object can be defined however the developer needs. 

#### Action Creators 

Action Creators are functions that create actions. They are typically used to avoid having to create an object "by hand" everytime we want to execute an action. Action Creators simply take in the data that is going to be the source of change for the action, and create the action object that we need to dispatch (`dispatch(actionObject)` to a **reducer**. 

### Reducers 

A `reducer` is a function that recieves the current state and an action object, and based on that action object, the `reducer` functiond determines what part (or parts) of the application's state need to be updated/modified/changed.

> Reducer's get their name because their similar to the callback used to in JavaScript arrays: `array.reduce()` 

The Rules: 
* Reducers should **only** calculate the applications new state based on the `state` and `action` objects provided. 
* Reducers should **never** directly mutate state, instead updates made to state should be made made by copying the existing state and making changes to the copy. 
* Reducers should **never** 
    * perform asynchronous logic. 
    * calculate random values 
    * cause "[side effects](https://stackoverflow.com/questions/8129105/javascript-closures-and-side-effects-in-plain-english-separately)" 

Essentially reducers should follow the following formula: 

1. Check to see if this reducer "cares" about the provided action. 
    * If so, make a copy of the state, update the copy with new values, and return it
2. Otherwise, return the existing state (without any modifications)

For example: 
```js
const initialState = { value: 0 }

function counterReducer(state = initialState, action) {
  // Check to see if the reducer cares about this action
  if (action.type === 'counter/increment') {
    // If so, make a copy of `state`
    return {
      ...state,
      // and update the copy with the new value
      value: state.value + 1
    }
  }
  // otherwise return the existing state unchanged
  return state
}
```


### Stores 

The current Redux application lives in an object called `store`. A `store` is created, by passing a `reducer` function, and has a method called `getState()` that returns the state's current value: 

```js
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({ reducer: counterReducer })

console.log(store.getState())
// {value: 0}
```

This `store` has a method called `dispatch`. As discussed in _Actions_ and _Action Creators_ earlier; the `dispatch` function is how we update or change the state (recall, this should be done in an _immutable_ fashion). 

> The only way a `store`'s state should be changed is by calling `dispatch` on the store and passing an `action` object to the `dispatch` function. 

When called, the `dispatch` function passes the action object along with the existing state to the `reducer` function, which will cause the state to be updated (if needed, determined by the `reducer` function). A good analogy of the `dispatch` function would be to think of it like _triggering an event_. We are telling the application something has happened, and we expect the `reducer` function to understand that based on `action` x, it should modify the `state` according to pre-defined logic. 


### Selectors 

"Selectors" are functions that know how to extract specific pieces of information from a store's state. In small applications; selectors may be superfluous, but in larger applications, _selectors_ can help avoid repeating logic as different parts of the app need to read the same data:
```js
const selectCounterValue = state => state.value
const currentValue = selectCounterValue(store.getState())
console.log(currentValue) // => 2
```

### Slices 

A `slice` is a collection of Redux logic and actions for a single feature of an application. Conventionally, these are defined _together_ within a single file. The name comes from splitting up the root Redux state object into multiple "slices" of state.

So for example, a blog might define and setup slices for users, posts, ands comments like so; 

```js
import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '../features/users/usersSlice'
import postsReducer from '../features/posts/postsSlice'
import commentsReducer from '../features/comments/commentsSlice'

export default configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    comments: commentsReducer
  }
})
``` 

In that example, s`tate.users`, `state.posts`, and `state.comments` are each a separate "slice" of the Redux state. Since `usersReducer` is responsible for updating the `state.users` slice, we refer to it as a "slice reducer" function.

Switching gears to the classic "counter" example... There are three manditory attributes required by the `createSlice` function: 

1. a `name` property
2. an `initialState` property 
3. a `reducer` property 

The `name` attribute, which is used as the first part of each `action` type, and the `key` name of each `reducer` function is used as the second part. So, the "counter" name + the "increment" reducer function generated an action type of `{type: "counter/increment"}`. (After all, why write this by hand if the computer can do it for us!)

```js
// 
import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0
  },
  reducers: {
    increment: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    }
  }
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer
// example from: https://redux.js.org/tutorials/essentials/part-2-app-structure
```
The example above demonstrates three `action`s related to the `counter` `slice`...
  1. `{type: "counter/increment"}`
  2. `{type: "counter/decrement"}` 
  3. `{type: "counter/incrementByAmount"}` 

> Since actions are technically just objects with a `type` attribute, which is always a string, there is no technical reason that we can't create those "in-line" every-time, but that would be tedious. By creating a `slice` the Redux toolkit generates `action` type strings, creator functions, and action objects. All you have to do is define a `name` for this slice, write an object that _has some reducer functions in it_, and it **generates the corresponding action code automatically**.

We can invoke those actions by taking the `slice`, and accessing the `actions` property and then invoking the `increment`/`decrement` or `incrementByAmount`. 

```js
console.log(counterSlice.actions.increment()) // {type: "counter/increment"}
```
> `createSlice` uses a library called `Immer` inside. `Immer` uses a special JS tool called a Proxy to wrap the data you provide, and lets you write code that "mutates" that wrapped data. But, `Immer` tracks all the changes you've tried to make, and then uses that list of changes to return a safely immutably updated value, as if you'd written all the immutable update logic by hand.

So instead of...
```js
function handwrittenReducer(state, action) {
  return {
    ...state,
    first: {
      ...state.first,
      second: {
        ...state.first.second,
        [action.someId]: {
          ...state.first.second[action.someId],
          fourth: action.someValue
        }
      }
    }
  }
}
```
We have: 
```js
function reducerWithImmer(state, action) {
  state.first.second[action.someId].fourth = action.someValue
}
```
> You can only write "mutating" logic in Redux Toolkit's createSlice and createReducer because they use Immer inside! If you write mutating logic in reducers without Immer, it will mutate the state and cause bugs!



## Walking through (step-by-step) the Redux flow 

### Initial Setup 
1. Create a Redux store using a "root" reducer function. 
2. The store will call the root reducer once; saving it's return value as the initial state. 
3. When the UI is first rendered, UI components access the current state of the Redux store and use that data to decide what to render (and subscribe to any future store updates to render any changes)

### Updates 

1. A triggering event (user clicking a button, textfield updated, etc.) 
2. App calls the `dispatch` function, passing in an `action` which will update the state in the Redux store. 
3. The `store` will then process the action, create a copy of `state`, make the necessary changes to the copy and return a new `state` that will replace the existing state. 
4. The store then updates all the UI components that subscribed to the information in the store.
5. The UI components retrieve the updated data from the `store` and re-render as needed (if something has changed)

![Sequence Diagram](https://redux.js.org/img/tutorials/essentials/ReduxDataFlowDiagram.gif)


## Template Generation (with React) 

To generate a React application with Redux for state management, you can leverage the standard `create-react-app` command, but add the `--tempalte Redux` switch: 

```sh 
npx create-react-app redux-essentials-example --template redux
```

This will generate a template with the following structure: 

```
- `/src`
  - `index.js` - entry point for the application 
  - `App.js` - top level React component 
  - `/app`
    - `store.js` - creates the redux store instance 
  - `/features` 
    - `/counter`
      - `counter.js` - Redux component that shows the UI for the counter 
      - `counterSlice.js` - the redux logic for the counter feature 
```

### Configuring Redux Store's 

Let's dive a bit deeper... Looking at the `app/store.js`: 
```js
// app/store.js 
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'

export default configureStore({
  reducer: {
    counter: counterReducer
  }
})
```
Here (in `store.js`) we can see that... 
1. We are importing the `configureStore` function from the `@reduxjs/toolkit` 
2. We are then importing the `counterReducer` from `../features/counter/counterSlice`, which is our `reducer` function (the function that recieves `state` and `action` objects, and then determines how to update the state based on the provided `state` and `action`). This is being passed in as an attribute (`reducer`) of a JS object - this tells the `configureStore` function how to manage `state` for the "counter" feature. 
  > It is not uncommon for applications to be composed of a variety of features, and each of those features may require its own reducer function. When `configureStore` is called, we can pass in all of the different `reducer` functions in an object. The key names of that object will define the keys of our final state. 
3. Passing in an object like `{counter: counterReducer}`, that says that we want to have a `state.counter` section of our Redux state object, and that we want the `counterReducer` function to be in charge of deciding if and how to update the `state.counter` section whenever an action is dispatched.
  > Redux allows store setup to be customized with different kinds of plugins ("middleware" and "enhancers"). configureStore automatically adds several middleware to the store setup by default to provide a good developer experience, and also sets up the store so that the Redux DevTools Extension can inspect its contents.


## Asynchronous logic & Thunks 

All of the above practices and instructions above are in reference to _synchronous_ logic; 

  1. `action`s are passed to the `dispatch` function 
  2. the `dispatch` function passes those actions and current state to the related store's `reducer` function 
  3. the `reducer` function evaluates changes to state based on the provided `state` and `action`, and returns the new state to the store. 
  4. the `store` then updates the related state and notifies related components. 

... but modern applications make extensive use of _asynchronous_ logic (fetching data from an API, processing large data sets, etc.). 

In order to execute _asynchronous_ code with Redux, we need to use something called "**thunks**" 

> A `thunk` is a specific kind of Redux function that can contain asynchronous logic. Thunks are written using two functions:
  > 1. An inside thunk function, which gets `dispatch` and `getState` as arguments
  > 2. The outside creator function, which creates and returns the thunk function

Let's review an example: 

```js
// The function below is called a thunk and allows us to perform async logic.
// It can be dispatched like a regular action: `dispatch(incrementAsync(10))`.
// This will call the thunk with the `dispatch` function as the first argument.
// Async code can then be executed and other actions can be dispatched
export const incrementAsync = amount => dispatch => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount))
  }, 1000)
}
// src: https://redux.js.org/tutorials/essentials/part-2-app-structure 
```

This way, we can use the _asynchronous_ logic in the same way we executed _synchronous_ logic: 
```js
store.dispatch(incrementAsync(5))
```
**Important**: Using **thunks** requires that the `redux-thunk` middleware (a type of plugin for Redux) be added to the Redux store when it's created (Redux Toolkit's configureStore function already sets that up for us automatically, so we can go ahead and use **thunks** here). 

When you need to make AJAX calls to fetch data from the server, you can put that call in a **thunk**. Here's an example that's written a bit longer, so you can see how it's defined:

```js
// the outside "thunk creator" function
const fetchUserById = userId => {
  // the inside "thunk function"
  return async (dispatch, getState) => {
    try {
      // make an async call in the thunk
      const user = await userAPI.fetchById(userId)
      // dispatch an action when we get the response back
      dispatch(userLoaded(user))
    } catch (err) {
      // If something went wrong, handle it here
    }
  }
}
```


## Redux Hooks 

### Reading data with `useSelector` 

The `useSelector` hook lets our component extract whatever pieces of data it needs from the Redux store state. Essentially a "selector" function takes `state` as an argument and returns some part of that `state`. 

```js
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCount = state => state.counter.value

// alternatively, we could access state with the `store.getState()` function
const count = selectCount(store.getState())
console.log(count) // =>  0
```

Components **cannot** talk to the Redux store directly (you it isn't possibnle with React to import it into component files) but, `useSelector` takes care of talking to the Redux store behind the scenes for us. When passed a "selector function" - `useSelector` invokes `someSelector(store.getState())` 

So to retrieve the current value: 
```js
const count = useSelector(selectCount)
```
Any time an action has been dispatched and the Redux store has been updated, useSelector will re-run our selector function. If the selector returns a different value than last time, `useSelector` will make sure the related component re-renders with the new value.

### Dispatching actions with `useDispatch` 

Similarly, we know that if we had access to a Redux store, we could `dispatch` "actions" using "action creators", like `store.dispatch(increment())`. Alternatively, since we don't have access to the store itself, we may need some way to have access to just the dispatch method. The `useDispatch` hook does that for us, and gives us the actual dispatch method from the Redux store:

```js
const dispatch = useDispatch()
```
From there, we can dispatch actions when the user does something like clicking on a button:

```js
<button
  className={styles.button}
  aria-label="Increment value"
  onClick={() => dispatch(increment())}
>
  +
</button>
```

## Setup 
 
In order to use the `useDispatch` and `useSelector` hooks, we need to setup the Redux store. Typically this is done at the top-level component of the application. We do this by; 
1. Wrapping our `<App />` component in a `<Provider></Provider>` component. 
2. Importing the `store` (already created with a reducer function) 
3. And passing in the store: `<Provider store={store}>`.

```js
// index.js 
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import store from './app/store'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```
Now, any React components that call `useSelector` or `useDispatch` will be talking to the Redux store we gave to the `<Provider>`.


## Determing if data should go into Redux or local Component state

Some good questions to ask yourself are: 
* Do other parts of the application care about this data?
* Do you need to be able to create further derived data based on this original data?
* Is the same data being used to drive multiple components?
* Is there value to you in being able to restore this state to a given point in time (ie, time travel debugging)?
* Do you want to cache the data (ie, use what's in state if it's already there instead of re-requesting it)?
* Do you want to keep this data consistent while hot-reloading UI components (which may lose their internal state when swapped)?