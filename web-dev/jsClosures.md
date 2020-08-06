# Closures 

"Closures"... seems like quiet the the buzz word. So what is a "closure" and why do you need to know it? That's what we will attempt to answer here. 

## Defining a Closure 

A closure is the culmination of a function combined (enclosed) within references to external state (state outside the scope of the function). 

Okay... let's break that down. 
* Closure(s) are defined by the combination of two things: 
    1. a function (with local scope) 
    2. a refence _inside_ that aforementioned function to a state _external_ to that function. 
* You create a closure by: 
    * defining a function within _another_ function and returning that function or passing that function to another caller. 
    * the inner function will be scoped to include the variables of the outer (wrapper) function, even if the outter (wrapper) function has returned. 
