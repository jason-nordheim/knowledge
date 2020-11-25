# Don't get stuck in _Callback Hell_

While JavaScript is a very flexible language that is easy to get started with, reviewing patterns, anti-patterns, and the methods of execution that occur when executing a statement in JavaScript is something most developers build over time. Here we will discuss asynchronous operations in JavaScript starting with the original method using callback, and transitioning to the newer syntax offered in ES6+ known as "promises"

## Node.js is Asynchronous 

In JavaScript (and most other programming languages), the developer has the ability to dictate when each block of code is executed. There are two primary categories or methods in which code is executed on a computer. 
1. Synchronously
2. Asynchronously

Synchronous execution the default and is typically simpler. 

In synchronous code execution, JavaScript/Node.js will execute each statement (e.g. line) of code in order - starting from the top of the `.js` file, and proceeding line-by-line until reaching the end of the document. Synchronous execution is also referred to as "blocking" code since, each line of code _cannot begin its' execution until the preceding operation has executed to completion. 

Conversely, asynchronous execution, refers to a operations that involve a developer's taking control of the execution of a block of code, and dictating exactly when it starts and stops. Additionally, asynchronous operations are "non-blocking", so an asynchronous statement will not (by default) prevent the next statement from starting its execution. 

### Direct Style & Continuation Passing Style 

Every function written in JavaScript that _directly returns the result of the function_ is referred to as a **direct style** function. Direct style functions execute the block of code inside directly on the existing thread - in other words "synchronously". 

Example of a **direct style** function: 
```js
// direct style 
function hideString(str) {
  return str.replace(/[a-zA-Z]/g, 'ⓧ'); 
}
// lets see the output 
console.log(hideString('hello world'))
```
Output 
```
ⓧⓧⓧⓧⓧ ⓧⓧⓧⓧⓧ
```
In the above function, we provide a string as a parameter, and return a new string with every letter (lower and uppercase) replaced by an 'ⓧ' (synchronously). If we added additional `console.log` statements, each one would run to completion before the next one would start executing. 

#### Foundations of Callbacks

An alternative method of returning values from functions in JavaScript is referred to as **continuation passing style** or CPS. In CPS, a function passes its return value to another function instead of directly returning the functions result. 

The same function, using CPS: 
```js
// Continuation passing style 
function hideString(str, cb) {
	cb(str.replace(/[a-zA-Z]/g, 'ⓧ')); 
}
// lets see the output 
hideString('hello world', (str) => console.log(str))
```
Output
```
ⓧⓧⓧⓧⓧ ⓧⓧⓧⓧⓧ
```
> Feel free to run this yourself, you should notice the results are the same 

Instead of passing the result back, the CPS version of the `hideString` function passes the result to a second function which it received as a parameter. Many people may mistake this as using the _callback pattern_, but they would be incorrect. 

### Callback Pattern 

The **callback pattern** is one of the most commonly software patterns implemented in JavaScript and is very similar to Continuation passing style (CPS) reviewed above. For a function to truly implement the _callback pattern_, it uses CPS, but also executes in an asynchronous fashion. 

> Strictly defined, a **callback** is _a block of instructions wrapped in a function to be called when an asynchronous call has completed_. With callbacks, we can defer the execution of a block of code until a specified point. 

#### CPS + Async = The Callback Pattern

We can alter the CPS version of the `hideString(str, callback)` function by using `process.nextTick(func)` which will defer execution of the provided function until the next cycle through JavaScript event loop (which is how JavaScript determines the order of code execution). 

```js
function hideString(str, done) {
  // this tells the JavaScript interpreter to run the code 
  // inside on the next loop through JavaScripts event loop 
  // i.e. it makes it asynchronous 
	process.nextTick(() => {
		done(str.replace(/[a-zA-Z]/g, 'ⓧ')); 
	})
}

console.log('starting....') // synchronous operation 
hideString('hello world', (newStr) => console.log(newStr)) // asynchronous operation 
console.log('done!') // synchronous operation 
```
With this adjustment, the CPS function now executes asynchronously and is an accurate representation of the _callback pattern_. If you imagine the output would be...
```
starting....
ⓧⓧⓧⓧⓧ ⓧⓧⓧⓧⓧ
done!
```
... then you would be incorrect. 

The actual output of this function is:
```
starting....
done!
ⓧⓧⓧⓧⓧ ⓧⓧⓧⓧⓧ
```
This is because with `process.nextTick(func)` we are marking the code block inside the provided function (`func`) as asynchronous, the JavaScript interpreter doesn't wait for that code block to execute _before_ begining the next line or operation. 

Using `process.nextTick()` to make a callback asynchronous and implement the _callback pattern_ is something very few developer will ever see or implement. However, the `setTimeout` function globally available in JavaScript is very prevalent. 

#### SetTimeout 

The `setTimeout` function takes two (2) arguments: 
1. a callback function 
2. a number 

The first (1) parameter (the callback function) represents the operation that should be executed following next and the second parameter represent the number of milliseconds before that callback function should be invoked. 


Using `setTimeout()` 
```js
// defers execution of the callback 
// for  the specified amount of time in seconds 
function delay (seconds, callback) {
  setTimeout(callback, seconds * 1000)
}

console.log('starting...') 
delay(2, () => {
  console.log('two seconds later...')
})
console.log('all done!')
```
Run the above code and you should see the following output: 
```
starting...
all done!
two seconds later...
```

> Notice, that the the block of code provided as the second argument (as the callback function) executes after `two seconds later...` executes after `all done!`. The key idea here is that the _callback function is not executed until it is supposed to be executed_ (e.g. the callback functions execution was deferred to be executed at a later time).  

### Sequential Callback Execution 

When a callbacks are nested inside one or more callback, each callbacks execution is delayed until the parent function has completed its execution. When done repeatedly, we call this _sequential callback execution_, because each callback is delayed by the parent function finishes executing. 

Sequential callback execution 
```js
function delay (seconds, callback) {
  setTimeout(callback, seconds + 1000)
}

console.log('🏁 starting 🏁...') 
console.log('starting delays')
delay(2, () => {
  console.log('two seconds ⏱')
  delay(1, () => {
    console.log('three seconds ⏱')
    delay(1, () => {
      console.log('four seconds ⏱')
    })
  })
})
console.log('Done! ✅')
```
Output: 
``` 
🏁 starting 🏁...
starting delays
Done! ✅
two seconds ⏱
three seconds ⏱
four seconds ⏱
```
> Notice that the JavaScript interpreter continues executing the remaining synchronous code, while the asynchronous operations are executed at a specified interval ("a delay") as dictated by the first value provided to the `delay` function.

#### The Pyramid of Doom

Before ES6, developers that had to perform a sequence of operations asynchronously typically used _the callback pattern_ and nested each of the operations as a callback nested inside another callback. Even with the simple example above, this often lead to code that was difficult to read and debug. It was such a common problem that it is now known as a specific **anti-pattern** named **"callback hell"** or **"the pyramid of doom"**. 

> Anti-patterns are recurring (common) software design patterns that generate decidedly negative consequences. [More information on Anti-patterns](https://sourcemaking.com/antipatterns) 

### Promises 

In 2015, ES6 offered new ways of executing asynchronous operations in JavaScript, with new syntax. Supporting the `async`/`await` syntax mirrored the way many other programming languages handled asynchronous operations, but under the hood, ES6 was doing it differently. ES6 was using a new object called a `Promise` which directly address the anti-patterns of "callback hell" and the "pyramid of doom" when developers had a need to execute a series of asynchronous operations in sequence. 

> A **promise** is an object that can be used to represent the eventual value of a completed asynchronous operation. 

#### The Promise Object 

The `Promise` object has a constructor that takes a function as the only parameter. This parameter is a function that accepts two more functions as parameters. 
1. a _resolves_ function  
2. a _rejects_ function 

The _resolves_ function represents what should happen (the next operation) upon successful completion of the provided operation, while the _rejects_ function represents what should happen if the operations fails.  

#### Resolving Promises 

Refactoring the `delay` function earlier to use promises: 
```js 
const delay = seconds => new Promise((resolves, rejects) => {
  setTimeout(resolves, seconds * 1000)
})
```

Unlike the _callback pattern_, promises do **not take a callback** parameter to handle the next operation. Instead, when a promise executes successfully, the resulting value of the asynchronous operation is passed to `.then()` function. 

In order to see what is happening, let's modify to the _callback_ version of `delay(seconds, callback)` to use promises. 
```js
// wrap the operation in a promise 
const delay = seconds => new Promise((resolves, rejects) => {
  setTimeout(resolves, seconds * 1000)
})

console.log('🏁 starting 🏁 ') 
delay(1).then(() => console.log('1 second')) // promise syntax 
console.log('Done! ✅')
```
Output:
```
🏁 starting 🏁 
Done! ✅
1 second
```
The promise version of the `delay(seconds)` functions does exactly the same thing. Unlike the callback version however, the new `delay` function takes a single argument. With promises, the next operation is defined in a `.then(func)` block.

Just like how the _callback pattern_ passes the return value of the asyncrhonous operation to another function. Promises pass the return value of the asynchronous operation to the function the `.then()` block to use the value. 

#### Promises & Sequential Operations

Recall the anti-pattern "the Pyramid of doom" or "callback hell" discussed earlier. While _sequential callback execution_ should be avoided, there are situations where it is necessary to define a series of operations that should be performed _asynchronously_ and _sequentially_. 

With **promise chains**, we have a way of executing a series of operations both _sequentially_ **and** _asynchronously_. 

> **Chained Promises** are instances of promises in which `promise.then()`, `promise.catch()` and `promise.finally()` are used together to associate further actions to be completed upon successful resolution. (Note: _chained promises do not **need** to include all three promise methods_)

In order to illustrate this, we need to provide a parameter to modify the `delay` function above to pass an argument to the `resolve` function. 

So if we modify the `delay(seconds)` function to pass `"all done"` as a parameter to the `resolves` function, we can chain a sequential operation to execute _after_ the first promise is fulfilled. 

```js
// modified delay function 
const delay = seconds => new Promise((resolves, rejects) => {
  setTimeout(() => {
    resolves('All done 🧞‍♂️'), seconds * 1000 
  })
})

// chaining operations with promises 
delay(1)
  .then((result) => console.log(result))
  .then(() => console.log('JK, now I\'m done 🤷‍♂️'))
```
Output: 
```
All done 🧞‍♂️
JK, now I'm done 🤷‍♂️
```
This can be "chained" executing each operations as when the previous operation completes: 
```js
delay(1)
  .then((result) => console.log(result))
  .then(() => console.log('now I am really done'))
  .then(() => console.log('lol, not really'))
  .then(() => console.log('now I am REALLY done'))
```
Output: 
```
all done
now I am really done
lol, not really
now I am REALLY done
```
We can return _any value_ from a `.then()` statement, and that value will be passed to the next statement as a parameter to the provided function. 

```js
// new delay function 
const delay = seconds => new Promise((resolves, rejects) => {
  setTimeout(() => resolves('Ever wonder '), seconds * 1000)
})

// chaining operations with promises 
delay(1)
  .then((phrase) => phrase + 'what the ')
  .then((phrase) => phrase + 'square root')
  .then((phrase) => { 
    const four = 4 
    console.log(phrase + ` of ${ four } is?`)
    return Math.sqrt(4)
  })
  .then((result) => console.log(`FYI - it's ${result}`))
```
Output: 
```
Ever wonder what the square root of 4 is?
FYI - it's 2
```
#### Handling Rejection 

Every example outlined above has involves successful completion of the provided operation - in other words the promises all have resolved successfully. While this is typically the desired outcome it is important to consider what happens when the operation fails. 

When a promise fails, it is referred to as "_rejected"_. 

> A promise can be _"rejected"_ either due to an error, or programmatically using the `promise.reject()` function. 

_"Rejected"_ promises trigger the invocation of the _rejects_ function, which was provided as the second parameter of the provided as in the promises constructor (e.g. `new Promise((resolves, rejects) => {...}))`). If the operation fails due to an error, the _rejects_ function will be invoked and passed the error. 

We can simulate this by throwing an error
```js
const delay = seconds = new Promise((resolves, rejects) => {
  throw new Error('Whoops')
  setTimeout(()=> {
    resolves('Success!')
  })
})

delay(1) 
  .then((message) => console.log(message))
```
Output: 
```
(node:17085) UnhandledPromiseRejectionWarning: Error: Whoops
    at /Users/jnordheim/dev/repos/knowledge/advanced-node/promises/end/index.js:15:9
    at new Promise (<anonymous>)
    at delay (/Users/jnordheim/dev/repos/knowledge/advanced-node/promises/end/index.js:14:26)
    at Object.<anonymous> (/Users/jnordheim/dev/repos/knowledge/advanced-node/promises/end/index.js:22:1)
    at Module._compile (internal/modules/cjs/loader.js:1185:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1205:10)
    at Module.load (internal/modules/cjs/loader.js:1034:32)
    at Function.Module._load (internal/modules/cjs/loader.js:923:14)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:71:12)
    at internal/main/run_main_module.js:17:47
(Use `node --trace-warnings ...` to show where the warning was created)
(node:17085) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 2)
(node:17085) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise
```


Unhandled errors will crash the program inside a promise, just like they would outside a promise. Promises provided a method of way of dealing with rejection. Defining what to do if in the event of a promise failing or "being rejected" is known and _"handling rejection"_. 

To _"handle promise rejection"_ the`.catch()` method is chained to the `.then()` method. 

```js
const delay = seconds => new Promise((resolves, rejects) => {
  throw new Error('Whoops')

  setTimeout(()=> {
    resolves('Success!')
  })
})

delay(1) 
  .then((message) => console.log(message))
  .catch((error) => console.log(error.message)) // catch 
```
Output: 
```
Whoops
```
> This is similar to `try`/`catch` blocks.  

Handling promise rejection can be done using a single `catch()` block or using multiple `catch()` blocks to handle different types of failure. 

```js
const delay = seconds => new Promise((resolves, rejects) => {
  throw new Error('Whoops')

  setTimeout(()=> {
    resolves('Success!')
  })
})

delay(1) 
  .then((message) => console.log(message))
  .catch((error) =>  {
    if(error.message === 'Whoops') {
      console.log('A problem occurred but its handled! 🙌')
    }
  })
```
Output: 
```
A problem occurred but its handled! 🙌
```

Promises can also be rejected for any reason using the _rejects_ method. 

So if we wanted to _reject_ any `delay` function passed a value greater than `5`, we could leverage the _rejects_ method to do so. 
```js
const delay = seconds => new Promise((resolves, rejects) => {

  /* rejects */
  if (seconds > 5) {
    rejects(new Error(`${seconds} is too long 👎`))
  }

  setTimeout(()=> {
    resolves(`The ${seconds} seconds wait is over! 🎉`)
  })
})

delay(1)
  .then((message) => console.log(message))

delay(6) 
  .then((message) => console.log(message))
  .catch((error) =>  {
      console.log(`Error occurred: ${error.message}`)
  })
```
Output: 
```
Error occurred: 6 is too long 👎
The 1 seconds wait is over! 🎉
```

> Notice that the promise is immediately rejected, _before_ the first promise finishes its _delay_. 

#### The Promise Lifecycle 

So Let's review: 

The `Promise` object has three (3) states: 
1. pending - this is the initial state 
2. fulfilled - represents successful completion of the provided operation
3. rejected - representing a failure in executing the provided operation.

> We can use a promises' state to programmatically determine the status of an asynchronous operation. 

When a promise is created (e.g."instantiated"), the `new Promise((rejects, resolves) => { ... })` the promise has a state called "pending". The "pending" state represents an operation that has not yet resulted in a value. When the `resolve(promise)` method is invoked, the promise will begin executing the provided operation (i.e. "function"). 

If the operation provided to the promise completes successfully, the _resolves_ function is invoked and passed the _result_ or return value from the provided operation. When the _resolves_ function is invoked, the promise is "fulfilled" and the value returned by the asynchronous operation inside the promise is passed as a parameter to the `promise.then(returnVal)` to be used now that they asynchronous operations has completed successfully. 

However, if the operation fails to execute to completion, either as a result of an `error` or due to an invocation of the _rejects_ function - the promise enters its _rejected_ state. When the _rejects_ function, it is passed a "reason" (e.g. "error") for why the promise is failing to run to completion. Which can than be handled using the `.catch()` method.   

> Some developers use the term "settled" to represent either any promise that is not pending - e.g. the promise is either _resolved_, or _rejected_.

#### Callbacks to Promises 

Before ES6 (2015), developers that needed to execute _sequential asynchronous operations_ used the a form of the _callback pattern_ known as "error first callbacks" to handle error in executing these types of operations. 

So what is an "error first callback"? 

By convention, _error first callbacks_ functions were passed two (2) parameters instead of one (1). The first (1) parameter would receive the error (if one occured), while the second (2) parameter gave access to the output of successful return value of the _sequential asynchronous operation_ 
 
```js
const errorFirstDelay = (seconds, callback) => {
  if (seconds > 5) {
    callback(new Error(`${seconds} is too long ☠️`)) // = rejects(...)
  } else {
    setTimeout(()=> {
      callback(null ,`The ${seconds} second wait is over 🎉`)
    })
  }
}

const errorFirstHandler = (error, message) => {
  if(error) {
    console.log(`Error occurred: ${ error.message }`)
  } else {
    console.log(message)
  }
}
``` 
By structuring callbacks as _error first_ callbacks, developers check the first parameter to the callback handler function (the error object) to see if it is `null`. If the first parameter in the error first callback handler is `null` than the operation was successful. Alternatively, if the first parameter of the error first callback handler has a value, an error occurred - and because that error was passed as a parameter, it can be inspected and handled programmatically. 

Using the same example, that might look like:
```js
const errorFirstDelay = (seconds, callback) => {
  if (seconds > 5) {
    callback(new Error(`${seconds} is too long ☠️`)) // = rejects(...)
  } else {
    setTimeout(()=> {
      callback(null ,`The ${seconds} second wait is over 🎉`)
    })
  }
}

const errorFirstHandler = (error, message) => {
  if(error) {
    console.log(`Error occurred: ${ error.message }`)
  } else {
    console.log(message)
  }
}

errorFirstDelay(1, errorFirstHandler) 
errorFirstDelay(6, errorFirstHandler)
```
Output: 
```
Error occurred: 6 is too long ☠️
The 1 second wait is over 🎉
```

Notice the output is same as 

```js
const delay = seconds => new Promise((resolves, rejects) => {
  if (seconds > 5) {
    rejects(new Error(`${seconds} is too long 👎`))
  }
  setTimeout(()=> {
    resolves(`The ${seconds} seconds wait is over! 🎉`)
  })
})

delay(1)
  .then((message) => console.log(message))

delay(6) 
  .then((message) => console.log(message))
  .catch((error) =>  {
      console.log(`Error occurred: ${error.message}`)
  })
```
Since most developers prefer using the more readable Promise-based syntax to execute asynchronous operations, Node.js created a utility function called `promisify` specifically to convert _error first callback_ function to use Promise objects and the `.then()`/`.catch()` syntax. 

Using `promisify` we can convert the _error first callback_ function above to use the more modern and more readable promise-based syntax. 

```js
// import `promisify()` function 
const { promisify } = require('util') 

// error first function example 
const errorFirstDelay = (seconds, callback) => {
  if (seconds > 5) {
    // notice there is no second argument
    callback(new Error(`${seconds} is too long ☠️`))  
  } else {
    setTimeout(()=> {
       // notice the return value is the second argument provided to the callback 
      callback(null ,`The ${seconds} second wait is over 🎉`)
    })
  }
}

// convert to promise 
const promiseDelay = promisify(errorFirstDelay) 

// use converted promise 
promiseDelay(1)
  .then((message) => console.log(message))

promiseDelay(6) 
  .then((message) => console.log(message))
  .catch((error) =>  {
      console.log(`Error occurred: ${error.message}`)
``` 
> Important: `promisify` will _unless_ the callback is an **error first callback**. 

When (and only when) you are working with a library of code library implements the _callback pattern_ **with** _error first callbacks_, then `promisify()` can be a used to convert the callbacks to promises and avoid "the pyramid of doom" that occurs with sequential asynchronous operations when implemented using nested callback functions. 

### Review and Wrap-up 

The `promisify()` function is provided through Node.js and it's `util` module (e.g `const { promisify } = require('util')`) so this will only work in Node.js based applications. 






was the established pattern for accomplishing just that. As these operations become more complex and the _anti-pattern_ of the "pyramid of doom" or "callback hell" arose, Promises offered a more readable syntax for accomplishing the same sort of operations.
