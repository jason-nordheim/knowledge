# Debounce for better React applications 

While debounce is a more broad development methodology and can be applied in a variety of scenarios - for now lets focuses on implementation of the debounce pattern in [React](https://reactjs.org/). 

# What is Debounce? 

Debounce, put simply; is a way of delaying some pience of code, until a specified time to avoid unneccessary CPU cycles and increase code performance. 

## Why does it matter? 

One of the most expensive operations with any application is a database request or API call as it involves reaching over the internet to another endpoint (e.g. server, typically via a HTTP request), which is recieved by the endpont (server), processed, then responded to (via an HTTP response). The application then has to parse the HTTP response and assuming the request/response was executed without errors, process the returned information and then render a result. 

In short, these requests can take time to execute and greatly slow down an application resulting in degraded application performance, all while remaining critical to most applications core functionality. 

Any application that needs to retrieve, modify, delete, or add data to a 1st party or 3rd party API (in React) will often execute an "effect" to retrieve the data via a hook appropriately named: `useEffect`. This effect will execute anytime its dependent data (defined in the array of dependencies), changes. Most react developers will store the information returned in another hook provided by the React API: "state" (`useState`), similar to the example below: 

```js
/* src => ./ContactCard.js */

/* imports */
import React, { useState, useEffect } from 'react' 

/** 
 * Data driven React component that recieves a userId as a prop 
 * @param props - props containing a `userId` property (destructured)
 */
export default const ContactCard = ({ userId }) => {
  const [contacts, setContacts] = useState([]) // state

  /* anytime the `userId` provided via props to the function changes, 
   * make a new call to the API to retrieve the user ID and save it 
   * in local state */
   fetch(`https://my.app/contacts/${userId}`)
      .then(res => res.json())
      .then(data => setContacts(data.contacts))
  }, [userId])


/* return JSX to render the user details if the user has been retrieved */
  return contacts ? contacts.map(user => {
      return (
        <section className="user-details">
          <h1>{user.name}</h1>
          <h3>{user.title}</h3>
          <p>Phone: {user.phone}</p>
          <p>Email: {user.email}</p>
        </section>
      )
    })
  ) : <p>No contacts</p> 
}
```

In the simple example above, it is unlikely that implementing debounce would have much impact on performance, but in a real-world application, there are times that the dependency (or dependencies) that trigger the `useEffect()` hook to execute occur rapidly - this could result in a scenario where the dependencies are changing so rapidly that the effect does not have time to finish before being re-executed.

This results in multiple executions of one of the most expensive operations in application development. It also could result in a render that displays the results of the previous (or one of the previous) network requests instead of the desired information. 

This is where debounce becomes useful. With debounce we can delay the execution of the network request so that the request is not re-executed until the dependencies that would trigger re-execution are finalized. 

## How to add debounce? 

The simpliest way to handle debouncing in this scenario is to leverage the JavaScript `setTimeout` function, which allows us to wrap an effect, so that the code is executed only after a delay. Any attempts to execute the effect before the the delay specified as a parameter to the `setTimeout` function will not have executed yet. Effectively placing a buffer to wait and make sure the data is done changing, before executing the expensive operation 

Refactored with `setTimeout`, the same `fetch` request could be: 

```js
useEffect(() => {
  const timeout = setTimeout(() => {
    /* executing our expensive operation */
     fetch(`https://my.app/contacts/${userId}`)
      .then(res => res.json())
      .then(data => setContacts(data.contacts))
    }, [userId])
  }, 250) /* <= the amount of delay before executing the expensive operation */
  return () => clearTimeout(timeout)
```

The end result: No matter how many times the `userId` changes and calls a re-execution of the effect (retrieving and rendering the related contacts), the actual expensive operation associated with the effect will only occur once. 

## Making it re-usable 

Since making requests to APIs via the `useEffect` hook is a common practice in React applications, it may make sense create a custom hook to handle that action by stacking a the `useEffect` with the `useCallback` hooks: 

```js
/* src => `./useDebounceEffect.js` */

/* import the hooks from the react API */
import { useEffect, useCallback } from 'react' 

const defaultDelay = 250 // default delay in miliseconds 

/**
 * Hook to re-use debounce functionality  
 * @param effect - function to be executed 
 * @param dependencies - inputs that would require the effect to be re-run 
 * @param delay - the amount of time we should wait to make sure our dependencies are done changing 
 */
export default const useDebounceEffect(effect, dependencies, delay = defaultDelay) => {
  const callback = useCallback(effect, dependencies)

  useEffect(() => {
    const timeout = setTimeout(callback, delay)
    return () => clearTimeout(timeout)
  }, [callback, delay])
}
```

With the new `useDebounceEffect`, effects can be implemented almost exactly like they would with the standard React `useEffect` hook; providing a function that should be executed whenever a dependency changes that would require the effect to be executed again, but with a delay that says wait 250 milliseconds before executing the effect to make sure that the dependency or dependencies are finalized. 

The `ContactList` created early could then implement the `useDebounceEffect` hook to minimize expensive operations and retrieving and re-rendering a user's contacts, resulting in increased application performance. 

```js
/* src => ./ContactCard.js */

/* imports */
import React, { useState } from 'react' 
import useDebounceEffect from './useDebounceEffect' 


/** 
 * Data driven React component that recieves a userId as a prop 
 * @param props - props containing a `userId` property (destructured)
 */
export default const ContactList = ({ userId }) => {
  const [contacts, setContacts] = useState([]) // state

  /* execute the same fetch request, but only do so after 
   * 500 miliseconds - essentially wait 500 miliseconds for the 
   * dependencies to be finalized */
  useDebounceEffect(() => {
   fetch(`https://my.app/contacts/${userId}`)
      .then(res => res.json())
      .then(data => setContacts(data.contacts))
  }, [userId], 500)


  /* return JSX to render the user details if the user has been retrieved */
  return contacts ? contacts.map(user => {
      return (
        <section className="user-details">
          <h1>{user.name}</h1>
          <h3>{user.title}</h3>
          <p>Phone: {user.phone}</p>
          <p>Email: {user.email}</p>
        </section>
      )
    })
  ) : <p>No contacts</p>
}
```

With the `useDebounceEffect` custom hook outlined in the `ContactCard` component above - the `fetch` request to retrieve the user details for the `userId` provided in the props to the component, will only be re-executed when the `userId` has not changed for `500` miliseconds. Since the custom hook was defined to have a default delay of `250` milliseconds, that argument could have been left out and the effect would still only execute as in the event that the dependencies (e.g. `userId`) have not changed for at least 250 seconds. 

## Wrap-up 

Debounce (in the context of React) allows specification of a delay period that allows the dependencies of the effect (and that cause the effect to re-execute) to stop changing. In applications where the dependency or dependencies of an effect frequently change, using debounce can reduce the number of expensive operations, resulting in a more performant/response React application. 

