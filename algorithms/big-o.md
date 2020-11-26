# Big O 

Big O is something software engineers and developers often find hard to understand. This fear can often results in avoidance of the topic. However, most software engineers tend to build up their perception of Big O's difficulty in their head. Big O or "algorithm complexity" is is the accepted and established method in which programmers express the complexity and efficiency of an operation.

## Learning Objectives 

* define algorithms 
* define Big O notation and understand the value 
* define and understand all the pertinent terms 
    * asymptotic behavior 
    * worst-case analysis 


## Algorithmic Efficiency & Complexity 

Algorithms are programmatic operations that performs a computation to calculate a value or values. When discussing algorithms and Big O the goal is to isolate the efficiency of the algorithm (computational operation) from all the other variables that may impact the execution speed of an operation. 

Big O is the standard way in which software engineers (and developers) state the complexity and efficiency of an algorithmic operation **and** compare one algorithm's complexity or efficiency. W

## Profilers vs. Big O 

A category of tools (programs) known as "profilers" exist to measure the execution of sections of code, as well as entire programs and identify bottlenecks. However these tools only serve to identify where a problem _could_ exist. Profilers provide very little information to answer the question of _why_. There is a wide variety of factors that can affect how fast a computer executes an operation including the hardware (CPU speed, RAM amount, RAM speed, Disk speed, Disk space, network speed, etc.). 

The goal to isolate the efficiency and complexity of an algorithm from the hardware and low-level implementation details of the operation. By removing differences in computational power, disk i/o, network speeds, other running processes and all the other variables that may affect the amount of time for an algorithm to execute complete - Big O allows us to quantify the performance difference of two algorithms producing the same result in terms of memory consumptions and execution time. 

## Complexity analysis 

Complexity analysis is a tool for determining how an algorithm responds to increasing inputs. In other words, how the algorithms performance differs between an input containing 1,000 elements vs. the same algorithm with 1,000,000 inputs. As the input doubles, does the execution time also double? By properly understanding complexity analysis, software engineers can accurately predict the relative performance of an operation, regardless of the hardware, network, or concurrent processes. The goal isn't to determine its exact runtime, but rather how the runtime is affected by a greater number of inputs. 

> Complexity analysis is what Big O notation is all about. Big O is a measure of complexity of computational algorithms. 

## Calculating Complexity 

Calculating algorithmic complexity begins by breaking down the operation into individual steps. Individual steps, is not a a reference to a single statement, or block, but rather a single operation that is executed by a the CPU. Some examples of single steps executed by the CPU include: 
* assigning a value to a variable 
* looking up the value of an element in an array
* comparing two values 
* incrementing/decrementing a value 
* a single arithmetic operation (addition, subtraction, multiplication, division) 

> The list above is not exhaustive, the idea here is to break down algorithm into the single steps taken by the CPU. 

## Example - Find Maximum Integer 

Take a array of integer values, what would be an algorithm for determining the largest value in the array? 

One potential solution could be to create a variable called `max`, then assign it the value of the first element in the array. Next, we could loop through the array, checking each element to see if it is greater than the `max` variable. In the even that the inspected element is greater than the current value of `max`, the `max` value could be updated to that value. This would continue until reaching the end of the array. Once every element has been inspected, `max` should represent the largest number.

```js
const arr = [45,23,67,32,11,17,94,16,47,42,23] // input 

function maximum(arr) {
    let max = arr[0]
    for(let i = 1; i < arr.length; i++){
        if(arr[i] > max) {
            max = arr[i]
        }
    }
    return max 
}
```

> in the above function, we are assuming that the input will _always_ be an array of integers, and that it will have at least 1 integer. 

Breaking down the `maximum` function above might look something like: 
1. create `max` variable 
2. look up value of item at index `0` in `arr` (`45` in the example above)
3. assign the value returned as a result of the lookup to `max` variable (e.g. `max = 45`)
4. create loop 
5. create `i` variable (e.g. `let i`)
6. assign `i` a value of `1` (e.g. `i = 1`)
7. retrieve the value at position `1` in `arr` (e.g. `arr[1]` → `23`)
8. compare the value of the element retrieved to `max` (e.g. `arr[i] > max`)
9. since `arr[1]` is `23` in the example above, the loop concludes and restarts 

This process would continue eventually finding `94` as the greatest value, and assigning its value to `max`. The process would inspect every element in the array (`arr`), and return whatever value was in `max` at the end of the loop. 

Now, as we review the steps outlined above, it is important to evaluate the steps that would occur regardless of the number of elements in the array (assuming at least one), and the steps that are executed directly as a result of the inputs size increasing. 

Operations regardless of input size: 
* create `max` variable 
* assign `max` equal to `arr[0]`
* creating the loop 
* creating the `i` variable 
* assigning the `i` variable a value of `1` 
* look up value at index `1` in `arr` (`arr[1]`)
* returning `max` 

Operations dependent on input size
* retrieving the value of each item in the array (`arr`)
* comparing the value of `arr[i]` to `max` 
* assigning `max` a value 
* incrementing `i` 

So based on this information, we know that there are 4 operations that will vary depending on the size of the input, and 7 operations that must execute regardless of the number of elements in the input. As such, we can assign a mathematical equation to state how the algorithms execution time will grow according to the input: 
* 7 operations regardless 
* 4 variable operations 

So given an input of `n` the `maximum` function (we'll abbreviate that to `f` here) could be written mathematically as `f(n) = 7 + 4n` 

## Worst-case Scenario

As we inspect these operations and inspect the complexity of the algorithm, it is important to consider the "worst case scenario". In the worst case scenario, we we evaluate the algorithm with an input that would require the greatest number of operations to complete. 

In the case of the `maximum` function,  this has to do with the conditional statement inside the `for` loop. 
```js
if(arr[i] > max) {
    max = arr[i]
}
```
While the lookup of the element at `arr[i]` will occur for every element (input), the second lookup and assignment would only occur if the condition evaluates to `true` (e.g the integer at `arr[i]` is greater than the value associated with the `max` variable). Within the `if` body, are 2 more operations. First, another lookup of the value of the element at `arr[i]` and another to assign that value to `max`. 

In the _worst case scenario_ approach, we take the scenario that would involve the most steps/operations. In this case, that scenario would involve the most operations would be when the `arr`'s elements were sorted from smallest to largest. If the array was sorted in this manner, the operations within the `if` body would occur for each element in the `arr`. We can adjust the mathematical representation of this so that `f(n) = 7 + 4n + 2n` or `f(n) = 7 + 6n`.  

## Asymptotic behavior 

Algorithms that execute faster with a larger input, will often execute faster will smaller inputs as well. In complexity analysis, we only are concerned with how the function (`f`) behaves as the input (`n`) grows - so we tend to ignore the parts of the algorithm that do grow slowly with increased inputs, instead we focus on the parts that grow proportionally to the input. In the case of the mathematical function defined earlier (`f(n) = 7 + 6n`), `7` is constant regardless of the input size, however the `6n` grows directly as the size of the input grows larger. 

We refer to the `7` as an "initialization constant" since the steps involved are setup operations that will occur independent of the operation size. There are other initialization constants when it comes to programming, like initialization of a virtual machine in the case of Java. Since we are not concerned with the things that occur regardless of the input, we typically drop initialization constants from our mathematical function representing the algorithms complexity.  

After removing the initialization constants, we  are left with a mathematical formula of `f(n) = 6n` to represent the complexity of the `maximum` function in relation to the input size. 

Since the steps associated with the multiplier (`6n`) are related to the implementation outlined in JavaScript, this could vary depending on the implementation language or how a complier processes the high-level code into machine code. For example, array lookups in JavaScript, Pascal, and C are all executed differently. In C, `arr[i]` does not check to see if `i` is within the declared array size, while in Pascal it does. 

The statement in Pascal 
```pp
max = arr[i] 
```
Would be equivalent to this statement in C
```c
if ( i >= 0 && i < n ) {
    max = arr[i];
}
``` 

Given this information, it is reasonable to assume that different programming languages would have different implications in terms of the number of actual steps executed for a given algorithm, so after removing our initialization constants, we remove our multiplier from our mathematical formula, resulting in a much simpler mathematical function: `f(n) = n`. This process of dropping all factors (multipliers) and removing initialization constants, and defining the algorithms behavior in terms of the largest growing term is referred to as "asymptotic behavior". 

Mathematically, asymptotic behavior has to do with limiting the function definition to `f(n)` as it trends toward infinity. This results in a few potential shapes for our mathematical function. 

* `f(n) = 3n + 36`, would be described as `f(n) = n` → because the execution will grow directly in relation to the input size. 
* `f(n) = 256`, would be described as `f(n) = 1` → because the execution will be constant regardless of the input size 
* `f(n) = n² + 5n + 3` would be described asymptotically as `f(n) = n²` because `n²` will grow faster than `3n` as the input increases 
* `f(n) = n³ + 231n + 69` would be described as `f(n) = n³` → because `n³` is the fastest growing term. 

## Transitioning to Big O notation 

Asymptotic behavior essentially drops all the decorative constants from the mathematical function representing the execution steps of the algorithm. Given this behavior we can conclude: 
* A algorithm that does not require any looping will have a complexity of `f(n) = 1` since the number of instructions is constant regardless of the size of the input
* A algorithm with a single loop, which loops from `1` to `n` will have a complexity of `f(n) = n` since it will perform the instructions inside the loop a constant number of times. 
* An algorithm with a nested loop (a loop inside another loop) will have a complexity of `f(n) = n²` since the execution time will increases by a factor of `n` as the size of the input (`n`) increases in size. 

Now to take everything that we've discussed an put it in the computer science language of Big O is pretty simple. Essentially we've already done it.
* `θ(1)` 
    * pronounced "O of 1" or "theta of 1" 
    * represents algorithms with a constant number of instructions 
    * alternatively, you could say _the size of the input does **not** affect the execution time of the algorithm_ 
    * mathematically, we would represent this as  `f(n) = 1` 
* `θ(n)`
    * pronounced "O of n" or "theta of n" 
    * represents an algorithm that's execution time grows in direct proportion to the size of the input 
    * alternatively, _the size of the input directly affects the algorithms execution time_
    * mathematically, we would represent this as `f(n) = n`
* `θ(n²)`
    * pronounced "O of n squared" or "theta of n squared" 
    * represents an algorithm that executes proportionally at a rate of n squared compared to the input siz 
    * mathematically, we would represent this as `f(n) = n²` 

... and this would continue as the exponents representing the function grows.

## References 

* Dionysis Zindros 
    * [A Gentle Introduction to Algorithm Complexity Analysis](http://discrete.gr/complexity/)



