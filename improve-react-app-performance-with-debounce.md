# Debounce for better React applications 

While debounce is a more broad software development pattern, this article will focus on debounce implemented in [React](https://reactjs.org/). 

## What is Debounce? 

Debounce is a way of _delaying some piece of code, until a specified time_ to avoid unnecessary CPU cycles and increase software performance. 

## Why does it matter? 

In the purest sense, Debounce allows us to increase application performance by limit the frequency of specific operations. Even more specifically, operations that require significant resources (CPU, Memory, Disk) to execute. This may _matter_ in the sense that these "expensive operations", can slow application load times, cause freezes and delays in the user-interface, and require greater more of the network than is ultimately necessary. 

One of the most common reason's people implement the debounce pattern is for network requests. 

### Understanding through example 

Debounce makes the most sense in context. 

Imagine we have a simple movie search application: 

```js
import React, { useState } from "react";
import Axios from "axios";
import "./App.css";

/**
 * Root Application Component
 */
export default function App() {
  // store/update search text & api request results in state
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  /**
   * Event handler for clicking search
   * @param {event} e
   */
  const handleSearch = async (e) => {
    e.preventDefault(); // no refresh
    try {
      const searchResults = await searchAny(search);
      await setResults(searchResults.Search);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="app">
      <header>React Movies</header>
      <main>
        <Search value={search} setValue={setSearch} onSearch={handleSearch} />
        <Movies searchResults={results} />
      </main>
    </div>
  );
}

/**
 * Movie Card component
 * @param {{movie}} props with movie object containing movie data
 */
function MovieCard({ movie }) {
  return (
    <div className="movieCard">
      <h4>{movie.Title}</h4>
      <img alt={movie.Title} src={movie.Poster || "#"} />
    </div>
  );
}

/**
 * Container to hold all the movies
 * @param {searchResults} param0
 */
function Movies({ searchResults }) {
  return (
    <div className="movies">
      {searchResults !== undefined && searchResults !== []
        ? searchResults.map((m) => <MovieCard key={m.imdbID} movie={m} />)
        : null}
    </div>
  );
}


/**
 * Search bar
 * @param {{string, function, function}} props
 */
function Search({ value, setValue, onSearch }) {
  return (
    <div className="search">
      <input
        type="text"
        placeholder="Movie name..."
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
      />
      <button onClick={onSearch}>Search</button>
    </div>
  );
}

```
In this example, the application sends an HTTP request containing the search string (title of the movie) to the [OMDb API](http://www.omdbapi.com/). The API responds with a list of movies in JSON. 

## Not Debounce 

It's important to note, the React application here **only** executes the HTTP request (i.e. "searches for movies") when the "Search" button within the `<Search />` component is clicked. 

That's fine, but that's not how most people use modern web applications. We are used to web-apps responding immediately as we enter text with our search results (e.g. [google](www.google.com)). 

So what happens if we refactor the code to work in that fashion? 

Well the most straight-forward approach would be to listen to the `onChange` event for the `<Search />` component, and re-execute the search every-time the text changes! 

That means that if you were to search "Terminator", the `onChange` event would get called for each character in the string. Assuming it was typed with no typos, this would create at least 9 `get` HTTP requests: 

1. "t"
2. "te" 
3. "ter"
4. "term"
5. "termi"
6. "termina" 
7. "terminat" 
8. "terminato"
9. "terminator" 

### Expensive Operations 

HTTP request are referred to as "expensive" operations because they involve creating a request, encoding the request, transmitting the request over the web, an API receiving the request, then the process repeats in reverse as the request is processed by the API and returned to the source (our React application). 

To make things worse, as these requests are received by our react application, the data is processed and mapped on `<MovieCard>` components which includes an image of the movie, which also has to get retrieved via another HTTP request, and when all that is complete, the `<MovieCard>` is rendered on the screen.  

### Alternatives & Implications 

Alternatively, we could keep execution of the search as it was originally, only initiating the `get` request, when the `<Search />` component's click event is triggered. Problem solved? 

Sure, for this simple example - however what happens when you add filtering:

Every movie returned in the result has a `Poster`,`Title`,`Type`,`Year`, and `imdbID` that we could filter the results on. For simplicity, let's just focus on filtering by year. 

We can add a `<YearFilter />` component that will take in the search results as a prop, and then we can use a `.reduce()` function to get all the years of the movies being rendered. 

```js
  // get all the different years
  const years = searchResults.reduce((acc, movie) => {
    if(!acc.includes(movie.Year)) {
      acc = [...acc, movie.Year] 
    }
    return acc 
  },[]);
```

Now we just need to create a select, and map all the different years to `<option>` elements within that select.


```js
// map the different years to
const options = years.map((year) => {
  return <option>{year}</option>;
});
```

Combine this and we should have a `<YearFilter>` component that displays the years of the movies returned by the search. 

It might look something like: 

```js
// imports 
import React from 'react' 

/**
 * Component for filtering the movies 
 * @param {{searchResults}} props 
 */
export const YearFilter = ({ searchResults }) =>  {

  // no filter if 
  if(searchResults && searchResults.length < 1) return null

  // get all the different years
  const years = searchResults.reduce((acc, movie) => {
    if(!acc.includes(movie.Year)) {
      acc = [...acc, movie.Year] 
    }
    return acc 
  },[]);


  // map the different years to
  const options = years.map((year) => {
    return <option>{year}</option>;
  });

  // return JSX 
  return (
    <div className="yearFilter">
      <label>Year</label>
      <select>{options}</select>
    </div>
    )  
}

export default YearFilter
```

Next we would monitor for the `<select>`'s `onChange` event, and filter out all the displayed movies to only those that match the result. 

I hope at this point you're getting the idea. If we change this simple application to re-query the API every time the search term changed, and every-time the filter changed, not only would we have a lot of network requests, but our React application is now burdened by parsing the data returned and rendering it as JSX. 

## Adding Debounce 

With Debounce, we can basically tell React to only re-execute the query after a certain amount of time has elapsed using the native JavaScript `setTimeout()` function. Not only will this reduce the number of network requests required, but it will reduce all the computations that happen when each of those network requests completes and the React application works to process and analyze the returned data. 

To make this _as simple as possible_, I am going to abstract this behavior away from the example earlier. 

So let's take our function that creates the `get` request from the [OMDb API](http://www.omdbapi.com/) and wrap it in a `useEffect()` hook so that request is made whenever the search term changes: 

```js
useEffect(() => {
  // using Axios for simplicity 
  Axios.get(baseUrl, { params: {
    apiKey: 'YOUR-API-KEY', s: searchTitle
  } }).then(response => setResults(response.Search))
}, [searchTitle])
```

Now lets add `setTimeout()` so that the effect can only execute after the timeout has finished: 

```js 
useEffect(() => {
  // capture the timeout 
  const timeout = setTimeout(() => {
    Axios.get(baseUrl, { params: {
      apiKey: 'YOUR-API-KEY', 
      s: searchTitle 
      } }).then(response => setResults(response.Search))
  }, 400) // timeout of 250 milliseconds 

  // clear the timeout 
  return () => clearTimeout(timeout)
}, [searchTitle])
``` 

By wrapping our "expensive operation" in a `setTimeout()` function we ensure that the "effect" we are executing in our React application _cannot_ execute more frequently than in intervals of `400` milliseconds.  

> The time is an arbitrary number, adjust as needed 

## Next steps 

This is a pattern that we may want to implement in multiple places in our React application (e.g. anywhere HTTP requests could execute rapidly and often). 

We can do this by abstracting the behavior further in a custom hook. 

```js
// useDebounce.js 

import { useEffect, useCallback } from 'react' 

export const useDebounce(effect, dependencies, delay) => {
  // store the provided effect in a `useCallback` hook to avoid 
  // having the callback function execute on each render 
  const callback = useCallback(effect, dependencies)

  // wrap our callback function in a `setTimeout` function 
  // and clear the tim out when completed 
  useEffect(() => {
    const timeout = setTimeout(callback, delay)
    return () => clearTimeout(timeout)
  }, 
  // re-execute  the effect if the delay or callback changes
  [callback, delay]
  )  
}

export default useDebounce 
```

Now anywhere we have an "expensive operation" that risks degrading performance, we simply _warp_ the function (e.g. "effect") in the custom `useDebounce()` hook: 

```js
useDebounce(() => {
  // effect 
  Axios.get(baseUrl, { params: {
      apiKey: 'YOUR-API-KEY', 
      s: searchTitle 
      } }).then(response => setResults(response.Search))
}, [searchTitle], 400)  // [dependencies, delay]
```

That's it! 


## Conclusion 

Implementing debounce in react applications can help avoid unnecessary operations and increase performance. By increasing performance, our React application becomes faster, more responsive to user-input, and provides an improved user-experience. 

This pattern can even be abstracted to a custom hook so that the pattern is easy to implement throughout your application, but will be _most_ impactful to "expensive operations" or "effects" that are frequently or rapidly re-executed (and it is not necessary to re-execute).  

What do you think? Does Debounce make sense to you? Will you use it? 


operations with any application is a database request or API call as it involves reaching over the internet to another endpoint (e.g. server, typically via a HTTP request), which is recievesieved by the end-pont (server), processed, then responded to (via an HTTP response). The application then has to parse the HTTP response and assuming the request/response was executed without errors, process the returned information and then render a result. 

In short, these requests can take time to execute and greatly slow down an application resulting in degraded application performance, all while remaining critical to most applications core functionality. 

Any application that needs to retrieve, modify, delete, or add data to a 1st party or 3rd party API (in React) will often execute an "effect" to retrieve the data via a hook appropriately named: `useEffect`. This effect will execute anytime its dependent data (defined in the array of dependencies), changes. Most react developers will store the information returned in another hook provided by the React API: "state" (`useState`), similar to the example below: 

```js
/* src => ./ContactCard.js */

/* imports */
import React, { useState, useEffect } from 'react' 

/** 
 * Data driven React component that relieves a userId as a prop 
 * @param props - props containing a `userId` property (restructured)
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

The simplest way to handle debouncing in this scenario is to leverage the JavaScript `setTimeout` function, which allows us to wrap an effect, so that the code is executed only after a delay. Any attempts to execute the effect before the the delay specified as a parameter to the `setTimeout` function will not have executed yet. Effectively placing a buffer to wait and make sure the data is done changing, before executing the expensive operation 

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

