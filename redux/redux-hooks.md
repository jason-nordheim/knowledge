# Redux Hooks 

React Redux now offers a set of hook APIs as an alternative to the existing `connect()` Higher Order Component. These APIs allow you to subscribe to the Redux store and dispatch actions, without having to wrap your components in `connect()`.

As with `connect()`, you should start by wrapping your entire application in a `<Provider>` component to make the store available throughout the component tree:

```js
const store = createStore(rootReducer)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

From there, you may import any of the listed React Redux hooks APIs and use them within your function components.

## useSelector 
Allows you to extract data from the Redux store state, using a selector function.
```js
const result: any = useSelector(selector: Function, equalityFn?: Function)
```
> Note: The selector function should be pure since it is potentially executed multiple times and at arbitrary points in time.

The selector will be called with the entire Redux store state as its only argument. The selector will be run whenever the function component renders (unless its reference hasn't changed since a previous render of the component so that a cached result can be returned by the hook without re-running the selector). `useSelector()` will also subscribe to the Redux store, and run your selector whenever an action is dispatched.

Some rules: 
* The selector may return **any value** as a result, not just an object. The return value of the selector will be used as the return value of the useSelector() hook.
* When an action is dispatched, `useSelector()` will do a reference comparison of the previous selector result value and the current result value. If they are different, the component will be forced to re-render. If they are the same, the component will not re-render.
* Extra care must be taken when using memoizing selectors (see examples below for more details).
* `useSelector()` uses strict `===` reference equality checks by default, not shallow equality (see the following section for more details).

### Equality Comparison's and Updates 
