# How JavaScript took over 

## The web gets accessible 

In the 1990s, the first user-friendly, graphical web-browser ("[Mosaic](https://en.wikipedia.org/wiki/Mosaic_(web_browser)")) was released by developer [Marc Andreessen](https://en.wikipedia.org/wiki/Marc_Andreessen) from the [National Center for Supercomputing Applications](http://www.ncsa.illinois.edu/) at the University of Illinois. ("[Mosaic](https://en.wikipedia.org/wiki/Mosaic_(web_browser)")) was then replaced with the Mosiac Navigator, which later became the Netscape Navigator. 

These "navigators" - which we now refer to as web "browsers" - made the web accessible to every one; not just those who knew how to use a command-line. 

## Java and the Web

Sun Microsystems, bought by released [Java] in 1995. Java borrowed syntax from C/C++ languages, but had a key a difference: Java was a compiled langauge that could be run on any operating system as long as the Java Virtual Machine was installed on the system. This embraced the ideea of of "WORA" or "write once, run anwhere". By re-designing the code base to be run through a virtual machine, Developers could develop a single code base, speeding development and reducing bugs. 

Java "applets" were introduced to build on this idea, but in the context of the internet. A Java applet was simply a Java application embedded in an HTML web page. While simple, this enabled Java developers to not only deploy desktop applications, but also web applications using the same robust, high-level programming language they were used to. Now Java applications could be delivered to any operating system over the internet and be run on most computers, as long as the Java virtual machine was installed on the client system. 

Undeniably useful; Applets had a critical flaw - Java applets were in-effect isolated from the DOM (Document Object Model). This seperation meant that Java applets could not "see" (be aware of) or mutate (modify) the DOM. Java applets, just like all other Java code had to be compiled through a virtual machine before it could be run on the client system, and the Virtual machine couldn't parse the DOM, just the Java applet - in-effect isolating the applet from the web page. 

## Netscape and JavaScript 

To make more dynamic applications that didn't have the limitations imposed by the compilation process and virtual machine required to run Java applets, [Netscape](https://en.wikipedia.org/wiki/Netscape) contracted [Brendan Eich](https://en.wikipedia.org/wiki/Brendan_Eich) to build a brand-new "scripting" language that would enable developers to add interactivity and functionality to HTML documents, animate HTML content, perform conditional validations, and lay the foundation for a more dynamic and more comprehensive (i.e. "more desktop like") browser experience. 

Netscape required Eich create this new "scripting" langauge with a couple of requirements: 
1. Eich's new langaugeneeded to combine great amounts of functionality into minimal and simple code
2. The langauge should use a syntax that was familiar and approachable to existing developers by resembling Java

To make the langauge, do a lot with little work; Eich sought to employ [functional programming](https://tinyurl.com/y4d5mfkp) schemes that made it quick, and simple to write procedures that would could process and/or generate data, as well as respond to input with very few lines of code. 

While it can be debated which programming paradigm is "best", Eich sought to combine the the the ability to encapsulate functionality and data within the OOP structure of "objects" and "classes", but remove the rigid structure and more elaborate setup common with traditionally OOP langauges like Java. 

With a these requirements in mind, Eich created a new programming language calld "Mocha". Mocha was an interpreted and weakly typed functional programming langauge designed specifically for the web. Despite many name changes, Mocha (aka "JavaScript") was the foundation for the ECMAScript or JavaScript we know today. It required no compilation, no virtual machine, and could interact with the DOM natively. This new programming language was the first viable alternative to Java applets for web applications. 

## Competition & Browser Wars 

As Netscape's development continued to gain traction and market share and revenue for web applications became significant, many other players stepped in to try to grab their share of the web application market. In 1996, software giant Microsoft reverse-engineered JavaScript to run its "navigator" or web-browser; [Internet Explorer](https://en.wikipedia.org/wiki/Internet_Explorer). 

Determined to dominate the market, Microsoft not only supported JavaScript in Internet Explorer, but also bundled the browser with it's Windows 95 operating system. End-user's on the Windows Operating System now had a browser pre-installed and ready-to-go when the booted up their computer for the first time. No installation or configuration neccessary.

Microsoft's strategy proved to be successfull, but Microsoft didn't just want to compete in this new market, Microsoft hoped to dominate it. In an effort to accomplish this goal, Microsoft developed a web-language of its own CSS or "cascading stylesheets". With CSS, developers could make their web pages not only interactive, but also beautiful. 

It wasn't long before Internet Explorer became the default browser used by most people. Microsoft's strategy had worked. Netscape responded by launching anti-trust lawsuits against against Microsoft, and [even defacing the "e" logo statue outside Microsoft's office](https://medium.com/@ddprrt/tales-from-the-browser-wars-mozilla-stomps-internet-explorer-799035887cb1). Despite Netscape's effort's agains the software giant, by 1999 - Internet Explorer controlled 99% of the market. 

## Ending the war 

Netscape was fighting a losing battle, and rapidly losing market share. While the company may not survive, their mission to advance web development remained vital to the company's leaders. 

In an effort to ensure the web remained open and accessible for everyone, Netscape took their technology open-source, handing over ownership to non-for-profit Mozilla. Under Mozilla, "Mocha" which had became "LiveScript" then JavaScript, was standardized as "ECMAScript" by the ECMA International standards organization in 1997. 

Continuing on its' mission to keep the web open and accessible; Mozilla developed and released it's own open-source web-browser - "Firefox". As competitors continued to enter the market introducing their own browsers (Opera, Safari, FireFox, etc.), Internet explorer slowly started to lose its domination of the market. Despite competitors, Internet Explorer continued to be the dominant browser with market share only falling to 50% by 2010. 

## OOP or Functional? 

Starting with a functional approach Mocha/LiveScript/ECMAScript/JavaScript centered around the idea of a executing procedures on a "scheme". This scheme we now call the DOM or Document Object Model. This functional approach made simple applications a breeze to develop, but was fundamentally different from the OOP langauges that had been common in application development. 

Eich sought to enable OOP design principles in JavaScript through an idea of "prototypes" and "prototypal inheritance". With the addition of prototypes and prototypal inheritance, JavaScript employed principles from both functional and OOP programming programming paradigms. 

As with most changes of signifigance, controversal and largely unpopular at first, because it was different. No programming language before had combined OOP and functional programming paradigms like JavaScript did, and no language had been designed exclusively to be executed in a browser. 

Some developers resented the lack of structure with JavaScript, primarily as JavaScript code could be written using OOP principles, or Functional principles. While flexible, this meant that the format and structure of JavaScript applications varried dramatically. Additionally, the weak-type system, varying browser support, and interpreted nature of JavaScript sometimes resulted in web applications that could look different on different browser's and were often buggier then their strongly-typed counterparts.   

Despite the controversy, demand and use of web applications continued to rise and JavaScript became the primary programming language for web development. With a large developer base, and open-sourcing, the langauge was quickly interated and improved upon with the third version of ECMAScript (which had started as "LiveScript", and had been "Mocha" before that) was released in 1999 further increasing the performance and feature-set offered. 

## Bluring the desktop and web experience 

In 2005 a ES4 (ECMAScript version 4) arrived with a headline feature: **AJAX**. AJAX or "Asynchronous JavaScript and XML" enabled asynchronous execution of functions/procedures. With asynchronous code execution, web applications could remain responsive to input even while executing expensive (i.e. "demanding") operations. 

JavaScript continued to evolve rapidly as projects, libraries, and frameworks made it faster and easier than ever to quickly build web applications. Libraries like [jQuery](https://jquery.com/) were built on top of JavaScript, and reduced development time with useful helper functions for common operations, while simultaneously abstracting these operations so that the end-result was the same regardless of the client's browser of choice. 

In 2009, ES5 (ECMAScript 5) was releasted, followed by ES6 in 2015. With each version came increased browser support, increased performance, as well as additional features that was easier to execute common functions and more readable/intuitive code. With the release of ES6 (officially published as "ES2015") new syntax and more controlled scoping largely closed the gap in feature-set offered by JavaScript in comparison to traditional langauges. 

## JavaScript today 

Allowing development of web applications that utilize OOP or functional programming principles - JavaScript remains the primary avenue for creating web applications. JavaScript remains a flexible, modern, and powerful programming langauge for a wide variety of applications, and is the most popular programming langauge used by developers today.  


# References 

- [Course Report](https://www.coursereport.com/blog/history-of-javascript)
- [Tutorials Point - AJAX](https://www.tutorialspoint.com/ajax/what_is_ajax.htm)
- [Tutorials Point - Java](https://www.tutorialspoint.com/java/java_overview.htm)
- [Britannica - Netscape](https://www.britannica.com/topic/Netscape-Communications-Corp)
- [Mozilla Browser History](https://www.mozilla.org/en-US/firefox/browsers/browser-history/)
- [Medium - Browser Wars](https://medium.com/@ddprrt/tales-from-the-browser-wars-mozilla-stomps-internet-explorer-799035887cb1)