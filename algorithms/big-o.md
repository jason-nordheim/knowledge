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

As we inspect these operations, we generally take an approach called "worst case scenario" in which we evaluate the algorithm with an input that would require the greatest number of operations to complete. 

## References 

* Dionysis Zindros 
    * [A Gentle Introduction to Algorithm Complexity Analysis](http://discrete.gr/complexity/)



