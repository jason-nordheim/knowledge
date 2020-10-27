# Demystifying the Event Loop 

## Pre-requisites 

In order to gain value from this article; you should be familiar with: 
* Familiarity with programming constructs 
  * Understanding of the term "function" 
  * Understanding of the term "object" 
  * Understanding of what it means to "loop" or "iterate" 
  * Understanding of queues and stacks (data-structures) 
    * Familiarity with the terms "enqueue" and "dequeue" 
  * Understanding of "callback functions" 
  * Understanding of a "thread" 
* Intermediate Understanding Web Development 
  * Understanding HTML (purpose/use/structure)
  * Understand what an "event" is in the context of web development 
  * Familiar with the DOM (Document Object Model) 
  * Experience using JavaScript to: 
    * create/remove nodes from the DOM 
    * create/remove "event-listeners"
    * define classes  

## Defining the Event Loop 

The "event loop" is broadly defined as the order in which JavaScript code executes.

<!-- ### JavaScript. Fundamentally different 

JavaScript is unlike most other programming languages for a whole series of reasons. As a weakly-typed, interpreted langauge that supports OOP (object-oriented programming) and Functional programming paradigms; JavaScript is like that friend that replies "sure, whatever you want". 

JavaScript also differs from Ruby, Python and Java because it was designed from its onset to be an interpreted langauge run in a web browser. While programming langauges like Ruby, Python and Java which have a "request-response" model - JavaScript is an "event-driven" langauge. 

Sure JavaScript has some firm rules, and there are best practices, but for the most part JavaScript is designed to enable the developer to write web applications in a way that is familiar to them - to be "simple yet powerful" - and enable developers and software engineers to create web applications quickly and concisely.  In this way, JavaScript enables beginners to start working with the langauge's syntax earlier than older langauges.  

This flexibility and low barrier of entry has made JavaScrip the [most popular programming langauge](https://insights.stackoverflow.com/survey/2020#most-popular-technologies), but many JavaScript developers lack a deep understanding of how JavaScript works since you don't **need** to understand what happens under-the-hood to add a little interativity to a static HTML document. -->

### Threading, JavaScript and the Event Loop 

In order to understand the Event loop, it is necessary to be familiar with how JavaScript code is processed and executing synchronously and asynchronously. 

### Processing JavaScript  

As with most high-level programming langauges, JavaScript intelligently allocates both memory (RAM) and processing power (threads) as needed, then intelligent reclaims those resources when they are no longer needed in a process known as "garbage collection".

Applications begin with a single thread. A thread represents the allocation of computational resources to execute a "frame". Every application begins with a single thread called the "main thread".

The main thread is provisioned when the browser has retrieved the a JavaScript file typically retrieved from a link embedded in an HTML document within the `<script>` tag. As the JavaScript interpreter processes each `function`, "frames" are created, "pushed" to top of the call-stack. 

The call-stack is a LIFO (last in, first out) data structure, where elements are "popped" (removed) from the call-stack by recency. Frames added to the call-stack are always placed on top, so that the last frame added is always the first one retrieved - this process is called "pushing", while the processing of taking a frame off the stack is known as "popping". 

Similar to the role of a manager; the main thread is repsonsible for ensuring all the work gets done, but isn't responsible for execution of each taks. 

### The JavaScript Event Loop 

The event loop is the repeated process in which JavaScript code is exectued. When a JavaScript file is processed, each line is feed to the JavaScript interpreter in order from the top down. As `functions` are parsed, they are placed onto the call-stack as a "frame", which represents a single operation. 

When the event loop begins, it "pops" frames from the call-stack, and enqueues them into the "message queue" which is the list of tasks to be executed during that iteration through the event loop. Each one is processed to completion, one at a time, in order until all the tasks have **run to completion**.  

> In more desktop focused langauges, this process would be run on another thread, and could be stopped by the runtime to execute other code. However in JavaScript and in the event loop, once a message is dequeued, it cannot be interupted, and as result if a message takes too long to complete, all other work the application needs to perform, like scrolling, or clicking, cannot be addressed. 
 
When all the messages in the message queue have been dequeued and run to completion, and no more _messages_ remain in the _message queue_. Next the rendering phase of the event loop begins. 

During the rendering phase all visual elements are processed and displayed as pixels. First, the CSS (styles) is processed _to completion_. When that has run to completion, the the HTML (layout) is parsed _to completion_. Then the styles to are applied to the DOM elements, and when that has _run to completion_, the browser can "painting the screen" or rendering those elements as pixels on the display.

Upon completion of the rendering phase, the Event loop re-starts, processing functions places as _frames_ on the call-stack or any messages added while the previous loop was in-progress. New messages can only be added to _message queue_ at the start of the Event Loop.

The rendering phase is _optional_, and can be skipped to improve effeciency. If there task portion of the event loop runs to completion and the DOM is unchanged, the rendering phase will likely be skipped to avoiding wasting resources re-processing the CSS, HTML, and re-rendering that information as pixels on the screen that are unchanged.

The goal is to iterate through the event loop as quicky as possible, so that new tasks/operations can be _popped_ from the call-stack, enqueued into the _message queue_ and _run to completion_ rapidly so as to pick up new messages or frames, and execute those instructions without delay. Once all the messages have been _dequeud_ from the _message queue_, the HTML/CSS is compared to see if changes have been made. If changes were made, the rendering phase begins to reprocess, evaluate, apply and display all the visual components. 

To enable the event loop to execute as quickly as possible, demanding operations should (and typically are) placed on another thread to be run concurrently (in parallel) or synchronously. 

#### Threading, Asynchronous Execution and DOM Manipulation 

JavaScript code can be executed either synchronously and asynchronously. 

Synchronous operations execute frames one at-a-time and in order. A new frame cannot start its execution before the current frame has been processed to completion. Unlike Synchronous operations, asychronous operations exist so that it is not necessary for one frame to complete, before begining execution of the next frame in the queue. 

Executing multiple operation at the same time (asynchronously) requires multiple threads. A single thread can only execute one frame at any given time. When a single application needs multiple things to execute at the same time, the JavaScript runtime allocates additional threads for each concurrent operation in a process known as multithreading. 

Single-threaded applications run all frames on a single thread. With a single thread, frames have to executed in order before executing the next frame and often results in a problem referred to as "blocking" . Blocking occurs when an application is tied up with a frame and becomes unresponsive until the frame has run to completion. 

In JavaScript the main thread pops frames from the call-stack and enqueues them to be executed executed asynchronously by the JavaScript runtime which will manage the child threads.  

#### Avoiding Race Conditions 

**Importantly**, only the main thread can interact with the DOM. 

This is necessary because unlike synchronous operations which are garunteed to happen in order, asynchronous operations are only garunteed to resolve at some point in the future. There is no garuntee that two asynchronous operations started at the same time will finish executing in the same order they were invoked and can lead to a scenario where one asynchronous operation interfers with the execution of another asynchronous operation or a "race condtion". Race condtitions are scenarios in which asynchronous operations will or could interfer with each other with undesireable consequences. 

Since frames popped from the call-stack into the message queue, each operations (frame) is processed in order as long as the frame contains a synchronous operation. Any frames containing operations that should be executed asynchronous are handed off to the JavaScript compilier to be run on another thread. 

Some operations like reading/write data, making HTTP request, and performing encryption/decryption are known as "demanding operations". These operations will require a significant amount of time to completed. Demanding operations are often (and should be) run on seperate threads (asynchronously) so that iterations through the event loop can be completed quickly, and new frames are popped from the call-stack without letting several frames accumulate. 

--------------




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

Microtasks are the most recent addition to the JavaScript event loop - with a simple goal of enabling 


By offloading demanding and/or time-consuming operations on seperate threads, we enable the "main" application thread to execute quickly. With quick execution, new tasks added to the event loop queue can be retrieved and processed. 









At the completion of all the tasks in a single iteration of the event loop, the Browser (e.g. Firefox, Chrome, Safari, etc.), **can** enter the render phase, where it processes the CSS rules, applies them to each element in the DOM, and renders the result as pixels. 



> Lets be clear; this is by design. By only accessing and/or mutating the DOM from the main application thread, we avoid race conditions that could cause undesirable behavior or even break the application completely. 



This also does not mean that the browser will go through the render phase. The Browser controls this process entirely; and works to optimize this. If nothing has changed, there would be no point in re-rendering the page. 

### Implications 












processing/applying styles, processing/applying layout and rendering elements to the screen. The main thread is responsible for executing the event loop. 

During the event loop,  At each iteration through the event loop, the all the tasks from the callstack are dequeued into the Event Loop. 

 All tasks are processed through the event loop. 
As the tasks are processed in the event loop, asynchonously enqued to be handled on a seperate thread, and asynchronous operations are executed on the main thread.  are parsed by the JavaScript interpreter are then either executed by the main thread, or delegated to another thread for execution. This avoids blocking the main thread, and enables it to quickly proceed through the remaining steps in the event loop (more detail to come) and respond to new tasks in the call-stack. 

The key idea here is to keep the procedures/functions executed on the main thread need to be executed quickly or designated as asynchronous to avoid a single task blocking execution of the main thread. 

Common examples of asyncrhonous opeations: 
* Network requests (HTTP requests)
* Encoding/Decoding 
* Monitoring Input Devices 

One common asychronous task in web applications is making HTTP requests. An HTTP request can execute rapidly or it could take quite some time depending on a multitude of factors. If HTTP requests were executed synchronously, the application's main thread would be tied up processing those tasks, and would be unresponsive to inputs or events, and unable to interact with the DOM the HTTP response is resolved. 

However by offloading this work as an asynchronous operations, the "main" thread can execute quickly and keep the program/application responsive. 


Synchronous functions must execute each step in the specified order. First, the `setTimeout(callback, ms)` method will pause execution on the calling thread for the specified number of milliseconds. During the halted execution, that thread would be unable to process any operations. Synchronously executed from the "main" thread of the application, the application would be rendered unresponsive. When the specified duration is reached, the callback function is executed, and the application can once again respond to user-input. 

Instead, `setTimeout(callback, ms)` executes in parallel (asynchronously). First, the "main" thread queues the function to run on another thread, retaining a reference to the function invocation. While the other thread is being processed in parallel, the "main" application thread is free to continue responding to input, or processing additional instructions uninhibited. Once the promise is resolved the "main" thread yeilds to the callback provided as a parameter to the `setTimeout(callback, ms)` function. 




### Promises 

In JavaScript (ES6), the eventual value returned as a result of an asychrnous operation is handled with "promises". A promise is simply an abstraction that represents an _eventual value_. 

When "fufilled" or completed, the resulting value is returned to the the "main" thread in the form as a "promise" or _eventual value_. JavaScript enables developers to define logic for what should be done with the value returned by the promise (at its completion), to the main thread using `.then()` or `async`/`await` syntax. 
