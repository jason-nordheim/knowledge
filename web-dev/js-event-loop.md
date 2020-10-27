# Demystifying the Event Loop 

JavaScript is unlike most other programming languages for a whole series of reasons. As a weakly-typed, interpreted langauge that supports development of applications leveraging both OOP and Functional programming paradigms; JavaScript is like the Wild West of programming. While there are rules and best practices, few of them are "required" or "enforced". As a result, JavaScript applications can vary dramatially 

## Why talk about the Event Loop

Despite being the [most popular programming langauge](https://insights.stackoverflow.com/survey/2020#most-popular-technologies), many (if not most) JavaScript developers have little or no understandings of how JavaScript works under the hood. While a deep understanding of how JavaScript works "under the hood" is unneccessary for most developers, a deeper understanding of JavaScript (ES6) can result in higher-performing web applications, written more concisely, and that execute more reliably. 

For developers with a good understanding of JavaScript's core features and functionality; a good next step is learning about the "event loop" - particularly with applications that execute asynchronous code. Understanding the event loop can help avoid annoying bugs, and result in cleaner, more concise, and more efficient web applications. 

### Defining the Event Loop 

The event loop is broadly; the order in which JavaScript code executes. 

### Synchronous vs. Asynchronous code execution 

The signifigance of the event loop is largely demonstrated via something called "Race Conditions". 

Simply put, a race condition is a condition in which the execution of statements within a program depend on the sequence/timing of the program's processes or thread. In synchronous code, "race conditions" do not exist, each statement is executed in order from the top-down on the "main" thread. 

The "main" thread is called that for the simple fact that this is where most of the applications logic is defined and executed. The "main" thread is the one that handles most of the applications operations and logic. It is where event handlers are defined and where the DOM is manipulated. 

Asynchronous code is different. Asynchronous operations are **not** executed on the "main" thread. 

With asynchronous operatoins, one or more tasks are offloaded or executed by another processor, or on another thread. This enables developers to move demanding functions/operations from the "main" thread to be processed by another thread and enables the "main" thread to execute its operations quickly. If all code was executed synchronously, then demanding or resource-intensive processes would have to be executed on the main application thread and the application would remain frozen (unresponsive) until those operations completed.

In JavaScript; asynchronous code is executed **after** synchronous code. As the main thread encounter's an asychronous operation, it skips it while it completes all of the defined synchronous operations. Once the synchronous operations have completed, any synchronous operations that were skipped will be offloaded to a seperate thread or processor. 

The key idea here is to keep the procedures/functions executed on the main thread fast, so that can finish execution quickly and remain responsive to input from the user. 

Common examples of asyncrhonous opeations: 
* Network requests (HTTP requests)
* Encoding/Decoding 
* Monitoring Input Devices 

One common asychronous task in web applications is making HTTP requests. An HTTP request can execute rapidly or it could take quite some time depending on a multitude of factors. If HTTP requests were executed synchronously, the application's main thread would be tied up processing those tasks, and would be unresponsive to inputs or events, and unable to interact with the DOM the HTTP response is resolved. 

However by offloading this work as an asynchronous operations, the "main" thread can execute quickly and keep the program/application responsive. 

### Promises 

In JavaScript (ES6), the eventual value returned as a result of an asychrnous operation is handled with "promises". A promise is simply an abstraction that represents an _eventual value_. 

When "fufilled" or completed, the resulting value is returned to the the "main" thread in the form as a "promise" or _eventual value_. JavaScript enables developers to define logic for what should be done with the value returned by the promise (at its completion), to the main thread using `.then()` or `async`/`await` syntax. 

### Race Conditions 

This is rather simple when there is just one (1) asychronous operation, but in modern web applications, there could be many asychronous operations being executed at the same time. With multiple asychronous operations, a concept called "Race Conditions" becomes relevant. 

A race condition is a situation in which a program or application depends on the timing of asychronous operations, such that resolution of asychronous operations impacts application functionality or stability. 

Essentially, if asychronous operation "a" and asychronous operation "b" are both offloaded by the main thead to different threads, the main thread has no garuntee when the operation will finish or what the returned value will be. More importantly, the completion of operation "a" before the completion of operation "b" (or vice-versa) may alter how the application behaves, and may have undesireable results (e.g. "bugs"). 

### Determining execution order  

Only the "main" thread can interact with the DOM, and since asynchronous processes are not running on the "main" thread, asynchronous operations cannot modify the DOM. Instead, the asychrnous operations must return an eventual value ("promise") to the main thread. Once the "promise" has been fufilled and returned to the "main" thread, the returned value can be used by the "main" thread. 

JavaScript code executes asynchronous code "deterministically", which simply means that the order of execution **can be determined**. The order in which JavaScript executes both synchronous and asynchronous operations is determined by precedence in the JavaScript "Event Loop". 

### Understanding through example

As with most things, understanding the Event Loop is based illustrated with a familiar example. 

A common (built-in) function in JavaScript applications is `setTimeout(callback, ms)`. It takes two parameters; a callback, and a duration to wait before executing the callback in milliseconds. It executes by pausing execution on its thread for the specified time (in milliseconds), then executing the callback function provided. 

While `setTimeout(callback, ms)` is an asynchronous function, what would happen if it executes synchronously? 

Synchronously: `setTimeout(callback, ms)`, when invoked will execute the following steps: 
1. Wait `ms` (blocking execution of any other operations on that thread) 
2. Invoke provided `callback` funciton. 

Asynchronously: `setTimeout(callback, ms)`, when invokved will execute the folling steps: 
1. On a sperate thread (in parallel):
  1. Wait `ms` (via a seperate thread) 
  2. Invoke `callback` function 

There is still a problem here: The callback function likely will be modifying the DOM. As previosly discussed, interacting with the DOM is a capability that only the "main" application thread can execute. This is because web applications center around a single DOM. If multiple threads are running in parallel, and both had the ability to mutate the DOM, their instructions could conflict (i.e. a race condition). 

Instead, JavaScript executes the `setTimeout(callback, ms)` function using by offloading the waiting to a seperate thread running concurrently (in parallel) which will wait the specified `ms` (milliseconds). When the wait period has finished, that task that had halted execution to wait the specified time parses the function and determines that since the instructions specified in the `callback` function interact with the DOM, it queues a "task" on the "main" application thread to invoke the callback. 

## The Event Loop

The "Event Loop" is the determined order of execution of operations within a browser. 

Operations or tasks (i.e. methods/functions) are added to the "Event Loop" in a queue or a FIFO data structure. At the start of each cycle through the event loop, the queue is pulled onto the "main" application thread, and cleared. If no tasks are in the queue, the Event loop circles around and checks again. 

With each iteration of the Event loop, the tasks/operations in the event loop are removed from the queue and executing them in the order they were added (synchronously). 

When an asynchronous task is recieved, (e.g. user-input, events, processing data, making an API call, etc.), the "main" thread requests another thread from the CPU, and offloads the instructions for that operation to the new thread, this thread will be executed to completion in parallel with the "main" application thread. Once completed, the thread will be reclaimed be the CPU to be used for other operations. 

While processing the queue of tasks in an iteration of the loop, any asynchronous operations (e.g. user-input, processing data, network requests) running in parallel (at the same time) a will execute to completion as long as they do not need to manipulate the DOM. Tasks/operations that involve the DOM, are placed into the queue to be executed at the next iteration through the event loop. 

> Without any empty queue, the "main" thread will execute imperceptably fast. Furthermore, even with multiple tasks in the event queue, the event loop completes so rapidly that multiple operations may appear to occur at the same time. 

Before starting a new iteration of through the event loop the browser **can** go through the render phase. 

### Rendering and the event loop 

The render phase of the event loop, is when the Broswer processes and evaluates the DOM elements on the page, construct the DOM tree, evaluate, apply styling to the DOM elements, and ends by rendering the result as pixels on the screen. This is commonly called "painting the screen", and because it involves accesssing the DOM, the rendering phase is a synchronous operation that needs to run to completion before the next iteration of the event loop. 

Browser's do not have to execute the render phase at each iteration of the event loop. Instead browsers do this intelligently. There is no need to enter the rendering phase again if there are no changes to display to the end-user. So as the event loop is executed, if the DOM has not changed from the start of the event loop, to the completion, there is no need to waste CPU cycles re-rendering and re-painting the web page. 

#### Asynchronous Operations, Rendering and Performance 

Asynchronous operations have the potential to be reduce application effeciency by forcing re-rendering faster than the monitor displaying the rendered information can be displayed. If the operations being processed by the event loop are processed so rapidly with each iteration through the event loop such that the event loop has multiple iterations with multiple changes to the DOM within a second, there is likely wasted CPU cycles, where the browser is re-rendering the page faster than the monitor can display the changes.

Imagine the `callback` of `setTimeout(callback, ms)` moves a DOM element 1 pixel to the right every milisecond. Assuming those changes to the DOM were processed instantly (they wouldn't be), this would mean mutating the DOM 1,000 times in a second, and assuming the operation can complete instantly, this would cause the browser to go through the event loop again, subsequently processing any changes to the DOM, re-processing CSS, and re-painting the screen faster than those changes can be displayed to the user. 

#### Request Animation Frame

To optimize application performance, JavaScript provides `requestAnimationFrame(callback)`, which executes the provided callback function at the beggining of the render phase - **after** all tasks from the Event Loop's queue have run to completion and **before** the rendering phase. 

With asynchronous functions that could add tasks to the event loop queue such that each tasks is added to different iterations through the event loop, but faster than the associated changes to the DOM could be displayed to the user. In scenarios like these, `requestAnimationFrame(callback)` can optimize browser performance by executing all these tasks in batch at the begining of the rendering phase. Eliminating wasted CPU cycles calculating changes to the DOM that cannot be displayed. 

### Summarizing the Rendering phase 

The rendering phase begins by proccessing any callback functions added between animations via the `requestAnimationFrame(callback)` function, then evaluating the styles (CSS), then processing the DOM tree and applying the processed styles, and ends with rendering the pixels to the screen (e.g. "painting the screen"). 

Rendering Phase: 
1. `requestAnimationFrame`
2. Style parsing and evaluation 
3. layout parsing and evaluation 
4. Painting the screen. 

### Microtasks 



By offloading demanding and/or time-consuming operations on seperate threads, we enable the "main" application thread to execute quickly. With quick execution, new tasks added to the event loop queue can be retrieved and processed. 









At the completion of all the tasks in a single iteration of the event loop, the Browser (e.g. Firefox, Chrome, Safari, etc.), **can** enter the render phase, where it processes the CSS rules, applies them to each element in the DOM, and renders the result as pixels. 



> Lets be clear; this is by design. By only accessing and/or mutating the DOM from the main application thread, we avoid race conditions that could cause undesirable behavior or even break the application completely. 



This also does not mean that the browser will go through the render phase. The Browser controls this process entirely; and works to optimize this. If nothing has changed, there would be no point in re-rendering the page. 

### Implications 








Synchronous functions must execute each step in the specified order. First, the `setTimeout(callback, ms)` method will pause execution on the calling thread for the specified number of milliseconds. During the halted execution, that thread would be unable to process any operations. Synchronously executed from the "main" thread of the application, the application would be rendered unresponsive. When the specified duration is reached, the callback function is executed, and the application can once again respond to user-input. 

Instead, `setTimeout(callback, ms)` executes in parallel (asynchronously). First, the "main" thread queues the function to run on another thread, retaining a reference to the function invocation. While the other thread is being processed in parallel, the "main" application thread is free to continue responding to input, or processing additional instructions uninhibited. Once the promise is resolved the "main" thread yeilds to the callback provided as a parameter to the `setTimeout(callback, ms)` function. 