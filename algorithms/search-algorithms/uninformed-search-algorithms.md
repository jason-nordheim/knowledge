# Uninformed Search Algorithms 

Uninformed search is a class of general-purpose search algorithms which operates in brute force-way. 
* do not have additional information about _state_ or _search space_ (other than how to traverse the tree) 
* also called "blind search".

## Types of Uninformed Search Algorithms 

1. Breadth-first Search
2. Depth-first Search
3. Depth-limited Search
4. Iterative deepening depth-first search
5. Uniform cost search
6. Bidirectional Search

## Breadth-first Search 

Breadth-first search is the most common search strategy for traversing a tree or graph. 
* Abbreviated as BFS 
* name comes from the pattern in which the algorithm traverses the graph 
* also known as it inspects levels of the graph via "breadthwise" search (inspecting all elements at the current level in the tree, before proceeding to the subsequent level) 
* Categorized as
    * general-graph search algorithm
    * uninformed search algorithm / "blind search" 

About BFS: 
* starts at the root node 
* expands all successor nodes at current level (in tree) before processing additional nodes 
* implemented using FIFO queue data structure.

Advantages of BFS: 
* BFS will provide a solution if any solution exists
* If there are more than one solutions for a given problem, then BFS will provide the minimal solution which requires the least number of steps

Disadvantages of BFS: 
* It requires lots of memory since each level of the tree must be saved into memory to expand the next level.
* BFS needs lots of time if the solution is far away from the root node.

### Complexity of BFS 

**Time Complexity**: Time Complexity of BFS algorithm can be obtained by the number of nodes traversed in BFS until the shallowest Node. Where the d= depth of shallowest solution and b is a node at every state.

`T (b) = 1+b2+b3+.......+ bd= O (bd)` 

**Space Complexity**: Space complexity of BFS algorithm is given by the Memory size of frontier which is O(bd).

**Completeness**: BFS is complete, which means if the shallowest goal node is at some finite depth, then BFS will find a solution.

**Optimality**: BFS is optimal if path cost is a non-decreasing function of the depth of the node.

## Depth-first Search 

Depth-first search isa recursive algorithm for traversing a tree or graph data structure.
* Abbreviated as "DFS" 

About DFS: 
* Depth-first search is a _recursive algorithm_ for traversing a tree or graph data structure.
* It is called the "depth-first search" because it starts from the root node and follows each path to its greatest depth node before moving to the next path.

