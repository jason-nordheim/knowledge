# Rails 

There are lots of things that people think of when they think of Rails, (or more accurately; "Ruby on Rails"), but I think most commonly Rails is dubbed to be "magic". An appropriate term considering everything that Rails "takes care of for you", assuming you're aligned with the ideas and constructs adopted in Rails. 

## A breif history 

Rails was created by **David Heinemeier Hansen** in 2004 as part of an open source project. Hansen adopts a very _opinionated_ styling of programming. This is why Rails emphasizes the concept of "convention over configuration", which enables developers to get an application "up and running" quickly, _as long as you follow what Hansen's ideas on programming best practices 

> The core premise of rails remains in many ways as controversial today as it was when it premiered. That by formalizing conventions, eliminating valueless choices, and offering a full-stack framework that provides great defaults for anyone who wants to create a complete application, we can mkae great strides of productivity... - David Heinemeir Hansen 

## Up and running 

In your desired project directory run: 

```sh
rails new YOUR-APP-NAME
```

This generates a lot of stuff, including making your first commit! If done correctly your project structure should looks something like this: 

```
YOUR-APP-NAME
- app
- bin
- config
- db
- lib 
- log 
```