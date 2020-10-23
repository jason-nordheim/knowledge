# How JavaScript took over 

## The web gets accessible 

In the 1990s, the first user-friendly, graphical web-browser ("[Mosaic](https://en.wikipedia.org/wiki/Mosaic_(web_browser)") was released by developer [Marc Andreessen](https://en.wikipedia.org/wiki/Marc_Andreessen) from the [National Center for Supercomputing Applications](http://www.ncsa.illinois.edu/) at the University of Illinois. Mosaic was then replaced with the Mosiac Navigator, which later became the Netscape Navigator. 
These "navigators" - which we now call "browsers" - made the web accessible to every one; not just those who knew how to use a command-line. 

## Java and the Web

Sun Microsystems, bought by released [Java] in 1995. Java borrowed syntax from C/C++ languages, but was centered around the idea of WORA; "write once, run anwhere". To accomplish this goal, Sun Microsystems created Java which unlike C/C++ was a compliled langauge that had to be run through a virtual machine. The advantage, an application coudl be developed in a single code-base, but support a variety of operating systems. 

Java "applets" were released enabling Java programs to be delivered through a browser, and could run as long as the Java Virtual Machine was installed on the system. Now Java applications could be delivered to any operating system over the internet and be run on most computers. 

Applets had a critical flaw that couldn't be overlooked. Since Java code had to be compiled and run through a virtual machine, it was in-effect isolated from the web page it was embedded within. Java applicatins were could not interact with the HTML. 

## Netscape and JavaScript 

In order to enable developers to make more dynamic applications that didn't have the limitations imposed by the virtual machine required to run Java code. Netscape contracted Brendan Eich to build a brand-new "scripting" language that would enable developers to add interactivity and functionality to HTML documents, animate HTML content, perform conditional validations, and lay the foundation for a new web experience: web applications. 

Netscape required that this new "scripting" langauge that needed to combine great amounts of functionality into minimal and simple code, and that it needed to resemble Java to be familiar and approachable to developers. 
To make the langauge, do a lot with little work; Eich sought to employ functional programming schemes that made it easy to create procedures that would work on and generate data, as well as generate other procedures. 

While it can be debated which programming paradigm is "best", Eich sought to combine the the the ability to encapsulate functionality and data within the OOP structure of "objects" and "classes", but remove the rigid structure and setup associated with Java. Rapidly, Eich created what was called "Mocha" which fufilled the requirements set forth by Netscape and begining the transition to scripted web applications and the fall of Java applets. 

## Competition & Browser Wars 

Not to be outdone, software giant Microsoft reverse-engineered JavaScript and added support to  [Internet Explorer](https://en.wikipedia.org/wiki/Internet_Explorer) in 1996. Determined to dominate the market, Microsoft bundled Internet Explorer with it's Windows 95 operating system, further cementing itself as a major competitor in the web application space and declaring war on Netscape. Pre-installed on the most popular operating system Microsoft quickly built its user base, and adding a new technology; CSS or "cascading stylesheets" adding visual pizazz to web pages. 

Internet Explorer quickly grew in market share and became the default browser. Netscape fought hard and launched anti-trust lawsuits against against Microsoft, and [even defacing the "e" logo statue outside Microsoft's office](https://medium.com/@ddprrt/tales-from-the-browser-wars-mozilla-stomps-internet-explorer-799035887cb1). Fighting a losing battle, Internet Explorer controlled 99% of the market by 1999. 

## Ending the war 

Eventually Netscape realized they were fighting a losing battle, and made their code base open-source and tasked its maintenance with non-for-profit Mozilla. In the interest of protecting users and keeping the web open "Mocha" which had became "LiveScript" then JavaScript, was standardized as "ECMAScript" by the Ecma International standards organization in 1997. Additionally non-for-profit, Mozilla created the Firefox browser as an open-source option. Competitors continued to enter the market reducing Microsoft's market share, but Internet Explorer still had 50% of the market by 2010. 

## OOP or Functional? 

Starting with a functional approach Mocha/LiveScript/ECMAScript/JavaScript enabled developers to quickly add interactivty to previosly static web content, and centered around the idea of a executing procedures on a "scheme". Eich built upon the langauges simple and functional approach through "prototypes" and "prototypal inheritance". Now JavaScript had principles of both OOP and functional programming. Employing both functional and OOP programming styles was controversal and largely unpopular at first, because it was different. 

No programming language before had combined OOP and functional programming paradigms like JavaScript did. Despite the controversy, demand and use of web applications continued to rise the use of Java applets continued to declined. By 1999, the third version of ECMAScript (ES3) had been released. 

## Bluring the desktop and web experience 

In 2005 a ES4 arrived with a headline feature: AJAX. AJAX or "Asynchronous JavaScript and XML" enabled asynchronous execution of functions/procedures and resulted in more responsive and interactive web applications that _felt_ very similar to desktop applications. 

Open-source, JavaScript continued rapidly releasing new versions, each increasing the functionality and capability of JavaScript applications due to its ability to be learned quickly, and build applications rapidly with high-performance. Other projects/libraries like [jQuery](https://jquery.com/) were built on top enabled developers to build web applications more easily by abstracting inconsistent behavior between browsers so that web developers could focus more on building good apps and worry less about figuring out how to support differnt browsers. 

ES5 (ECMAScript 5) was releasted in 2009 adding on more features, followed by ES6 in 2015 which was officially published as "ES2015". Since ES6's release in 2015, ES2016 and ES2017 delivered incremental changes and increased browser support, but new frameworks and libraries written in JavaScript continued to emmerge and enabling developers to create increasing comprehensive and capable applications. 

## JavaScript today 

Allowing development of web applications that utilize OOP or functional programming principles - JavaScript remains a valid option. JavaScript enables developers to create applications that embrace OOP principles, functional principles, or even a combination of the two. Due to the flexibility, familiar syntax, capability and performance, JavaScript has grown to become the most popular programming langauge. 


# References 

- [Course Report](https://www.coursereport.com/blog/history-of-javascript)
- [Tutorials Point - AJAX](https://www.tutorialspoint.com/ajax/what_is_ajax.htm)
- [Tutorials Point - Java](https://www.tutorialspoint.com/java/java_overview.htm)
- [Britannica - Netscape](https://www.britannica.com/topic/Netscape-Communications-Corp)
- [Mozilla Browser History](https://www.mozilla.org/en-US/firefox/browsers/browser-history/)
- [Medium - Browser Wars](https://medium.com/@ddprrt/tales-from-the-browser-wars-mozilla-stomps-internet-explorer-799035887cb1)