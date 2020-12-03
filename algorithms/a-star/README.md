# A* Pathfinding Algorithm 

The A* Pathfinding algorithm is a algorithm for finding the shortest route from one point to another. 

## Learning Objectives 

* define graph terminology
    * graph
    * node 
    * edge 
* define an "informed search algorithm" 
* define a heuristic algorithm 

## Overview and Terminology 
 
A* is part of a category of [algorithms](https://en.wikipedia.org/wiki/Algorithm) known as "search algorithms". More specifically, A* is a special type of search algorithm known as an [_informed search algorithm_](https://bit.ly/2Ji9VSt). Unlike brute-force search algorithms (e.g. "uninformed"), **informed search algorithms** intelligently prioritize the evaluation of nodes using a _heuristic function_. 

**Heuristic functions** is a mathematical function that assigns a cost to traverse a graph from one node to another. 
* Here we will represent our heuristic function as `f(n) = g(n) + h(n)` 
    * `g(n)` is a function to represent the shortest known distance from the start node to node `n` 
    * `h(n)` is a function to represent the shortest known distance from node `n` to the goal node 
    * `f(n)` is the sum of `f(n)` and `g(n)`
* The "f-score" or `f(n)` is how we determine which node to select next.

### Other Terminology  

* Graph -  a collection of related nodes 
* Node - a point in a graph 
    * start node - entry point in the graph 
    * end node - destination node in the graph 
    * neighboring node - a node adjacent to the inspected node. 
* Edge - a pathway from one node to another 
    * weighted edge - denotes a path's weight (usually used to indicate larger/smaller distances)
    * unweighted edge - denotes that all paths between nodes are of the same length 
* Open Set / Priority Queue
    * Keeps track of the next nodes to be inspected 


### Getting Started 

1. Install Required Packages: 
    1. `pygame`→ `pip3 install pygram`



## Referenced 

* [Informed Search Algorithms](https://bit.ly/2Ji9VSt)