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

JavaScript code executes asynchronous code "deterministically", which simply means that the order of execution **can be determined**. The order in which JavaScript executes both synchronous and asynchronous operations is defined as the JavaScript "Event Loop". 

## The Event Loop

 

