# Efficieny of Algoirthms 
Presentation by: Evan Greer 
* graduated in april 
* dye-prying co-hort 

## Big O Notation 
A mathematical notation to describe the limiting behavior of a function as the argument tends toward a particular value or infinity. 

When analyzing algorithms, Big O favors **worst case scenarios**; in other words, the most time-intensive (or space-intensive) result. This is really only relevant in functions that are "bail out" or return early if a specific scenario occurs. 


### This is defined by 2 metrics: 
1. Time Complexity - the amount of time an algorithm will take to execute as the input trends toward a particular value or infinity. 
2. Space Complexity - describes the amount of space in memory an algorithm will consume during execution as the input  trends toward a particular value or infinity

### Exploring O Notation 

* `O(1)` - ("constant") describes an algorithm that will execute with the same time/space complexity regardsless of the size of the input. 
* `O(n)` - ("linear") describes an algorithm that will grow linearly and proportionally to the size of the input. 
* `O(n^2)` - ("quadratic") describes an algorithm whose complexity (time/space) will grow at a rate of the input squared. 
    * This is most common with algorithms that involve nested iterations over the data set. The deeper the nesting, the greater the exponentional complexity (e.g. `O(n^3)` or `O(n^4)`). 
* `O(2^n)` - denotes an algorithm whose growth doubles with each addition to the input dataset. 
    * On a graph, this would look like an exponential increase. 





