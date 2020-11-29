# Big O 

Big O is something software engineers and developers often find hard to understand. This fear can often results in avoidance of the topic. However, most software engineers tend to build up their perception of Big O's difficulty in their head. Big O or "algorithm complexity" is is the accepted and established method in which programmers express the complexity and efficiency of an operation.

## Learning Objectives 

* define algorithms 
* define Big O notation and understand the value of time complexity 
* define and understand all the pertinent terms surrounding time complexity 
    * asymptotic behavior 
    * worst-case analysis 

> The statements below regarding Big O are in terms of time complexity - not space complexity since this is what most people are referring to when discussing Big O.

## Algorithms & Big O  

Algorithms are programmatic operations that performs a computation to calculate a value or values. When discussing algorithms and Big O the goal is to isolate the efficiency of the algorithm (computational operation) from all the other variables that may impact the execution speed of an operation. 

Big O is the standard way in which software engineers (and developers) state the complexity and efficiency of an algorithmic operation **and** compare one algorithm's complexity or efficiency. W

### Profilers vs. Big O 

A category of tools (programs) known as "profilers" exist to measure the execution of sections of code, as well as entire programs and identify bottlenecks. However these tools only serve to identify where a problem _could_ exist. Profilers provide very little information to answer the question of _why_. There is a wide variety of factors that can affect how fast a computer executes an operation including the hardware (CPU speed, RAM amount, RAM speed, Disk speed, Disk space, network speed, etc.). 

The goal to isolate the efficiency and complexity of an algorithm from the hardware and low-level implementation details of the operation. By removing differences in computational power, disk i/o, network speeds, other running processes and all the other variables that may affect the amount of time for an algorithm to execute complete - Big O allows us to quantify the performance difference of two algorithms producing the same result in terms of memory consumptions and execution time. 

### Complexity analysis 

Complexity analysis is a tool for determining how an algorithm responds to increasing inputs. In other words, how the algorithms performance differs between an input containing 1,000 elements vs. the same algorithm with 1,000,000 inputs. As the input doubles, does the execution time also double? By properly understanding complexity analysis, software engineers can accurately predict the relative performance of an operation, regardless of the hardware, network, or concurrent processes. The goal isn't to determine its exact runtime, but rather how the runtime is affected by a greater number of inputs. 

> Complexity analysis is what Big O notation is all about. Big O is a measure of complexity of computational algorithms. 

### Calculating Complexity 

Calculating algorithmic complexity begins by breaking down the operation into individual steps. Individual steps, is not a a reference to a single statement, or block, but rather a single operation that is executed by a the CPU. Some examples of single steps executed by the CPU include: 
* assigning a value to a variable 
* looking up the value of an element in an array
* comparing two values 
* incrementing/decrementing a value 
* a single arithmetic operation (addition, subtraction, multiplication, division) 

> The list above is not exhaustive, the idea here is to break down algorithm into the single steps taken by the CPU. 

### Example - Find Maximum Integer 

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

### Worst-case Scenario

As we inspect these operations and inspect the complexity of the algorithm, it is important to consider the "worst case scenario". In the worst case scenario, we we evaluate the algorithm with an input that would require the greatest number of operations to complete. 

In the case of the `maximum` function,  this has to do with the conditional statement inside the `for` loop. 
```js
if(arr[i] > max) {
    max = arr[i]
}
```
While the lookup of the element at `arr[i]` will occur for every element (input), the second lookup and assignment would only occur if the condition evaluates to `true` (e.g the integer at `arr[i]` is greater than the value associated with the `max` variable). Within the `if` body, are 2 more operations. First, another lookup of the value of the element at `arr[i]` and another to assign that value to `max`. 

In the _worst case scenario_ approach, we take the scenario that would involve the most steps/operations. In this case, that scenario would involve the most operations would be when the `arr`'s elements were sorted from smallest to largest. If the array was sorted in this manner, the operations within the `if` body would occur for each element in the `arr`. We can adjust the mathematical representation of this so that `f(n) = 7 + 4n + 2n` or `f(n) = 7 + 6n`.  

### Asymptotic behavior 

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


### Sorting Algorithms 

Sorting Algorithms are algorithms that sort a collection of items by a specific attribute. These algorithms are prevalent in nearly every modern application. 

Examples of sorting algorithms:
* Sorting files in Finder/Windows explorer (Alphabetically, by size, by file type, etc.) 
* Sorting shopping results (by price, by rating, by sales, etc.)
* Sorting contacts (by first name, by last name, by date of birth, by workplace, etc.)
* Sorting job posting (by post date, by industry, by company, etc.)

There are numerous realistic and practical application for sorting algorithms, and like many algorithms, there is multiple ways to tackle the same problem. 

#### Selection Sort 

A "selection sort" algorithm takes an input, and sorts it according to some arbitrary value. Take a number selection sorting algorithm like the one below: 

```js
const selectionSort = (arr) => {
    const inputArr = [...arr]
    const output = []

    while (inputArr.length > 0) { 
        let min = inputArr[0]
        let minIndex = 0
    
        for(let i = 1; i < inputArr.length; i++) {
            if (inputArr[i] < min) {
                min = inputArr[i]
                minIndex = i 
            }
        }

        output.push(inputArr.splice(minIndex, 1))
    }

    return output
}
```


The basic selection sort algorithm above is sorting values from smallest to largest, by copying the input (to avoid modifying by reference) and going iterating through the copied array (`inputArr`), removing the smallest element from the input array and adding it to the output array until every element has been removed. 

In terms of complexity, the algorithm above will execute the outer loop `n` times, and the inner loop will execute `n` time during the first iteration since it `inputArr` will start with `n` items, however each subsequent time will execute `n - i` with `i` representing the number of elements removed. 

**Challenge 🧐 Go ahead and see if you can calculate the complexity (in big O notation and θ notation) yourself**. 

> We'll go over the answer next, so if you're challenging yourself to solve it, stop here and work it out for yourself before continuing.   

#### Reviewing Selection Sort 

Let's go over this with some concrete numbers for illustration: 

Imagine we have an input where `arr = [11, 25, 12, 22, 64]`. 

We will summarize it using the following chart: 
    | loop | `output` | `inputArr` | `min` | input count | output count | 
    |:---|:---|:---|:---|:---|:---| 
    | 0 | `[]` | `[11, 25, 12, 22, 64]` | `11`| 5 | 0


1. the first pass `inputArr`, will determine `11` is the smallest element in the `inputArr` and remove it, placing it in `output`
    | loop | `output` | `inputArr` | `min` | input count | output count | 
    |:---|:---|:---|:---|:---|:---| 
    | 0 | `[]` | `[11, 25, 12, 22, 64]` | `11`| 5 | 0
    
2. The second pass through `inputArr` will determine `12` is the smallest value, and remove it from `inputArr`, placing the value in `output` 
    | loop | `output` | `inputArr` | `min` |
    |:---|:---|:---|:---|:---|:---| 
    | 0 | `[]` | `[11, 25, 12, 22, 64]` | `11`|  
    | 1 | `[11]` | `[25, 12, 22, 64]` | `12`| 
3. The third pass through `inputArr` , will determine `22` is the smallest value, remove it from `inputArr`, placing the value in `output`
    | loop | `output` | `inputArr` | `min` | input count | output count | 
    |:---|:---|:---|:---|:---|:---| 
    | 0 | `[]` | `[11, 25, 12, 22, 64]` | `11`| 
    | 1 | `[11]` | `[25, 12, 22, 64]` | `12`| 
    | 2 | `[11, 12]` | `[25, 22, 64]` | `22`|
4. The fourth pass through `inputArr` , will determine `25` is the smallest value, remove it from `inputArr`, placing the value in `output`
    | loop | `output` | `inputArr` | `min` | input count | output count | 
    |:---|:---|:---|:---|:---|:---|
    | 0 | `[]` | `[11, 25, 12, 22, 64]` | `11`| 
    | 1 | `[11]` | `[25, 12, 22, 64]` | `12`| 
    | 2 | `[11, 12]` | `[25, 22, 64]` | `22`| 
    | 3 | `[11, 12, 22]` | `[25, 64]` | `25`|
5. The fifth pass through `inputArr` , will determine `64` is the smallest value, remove it from `inputArr`, placing the value in `output`
    | loop | `output` | `inputArr` | `min` | input count | output count | 
    |:---|:---|:---|:---|:---|:---|
    | 0 | `[]` | `[11, 25, 12, 22, 64]` | `11`|
    | 1 | `[11]` | `[25, 12, 22, 64]` | `12`|
    | 2 | `[11, 12]` | `[25, 22, 64]` | `22`|
    | 3 | `[11, 12, 22]` | `[25, 64]` | `25`| 
    | 4 | `[11, 12, 22, 25]` | `[64]` | `64`| 
6. The sixth pass through `inputArr` , will determine that there are no more elements within `inputArr`, and exit the loop. 
    | loop | `output` | `inputArr` | `min` | input count | output count | 
    |:---|:---|:---|:---|:---|:---|
    | 0 | `[]` | `[11, 25, 12, 22, 64]` | `11`|
    | 1 | `[11]` | `[25, 12, 22, 64]` | `12`| 
    | 2 | `[11, 12]` | `[25, 22, 64]` | `22`|
    | 3 | `[11, 12, 22]` | `[25, 64]` | `25`| 
    | 4 | `[11, 12, 22, 25]` | `[64]` | `64`| 
    | 5 | `[11, 12, 22, 25, 64]` | `[]` | |
7. The `output` will be returned with the elements sorted from smallest to largest `[11, 12, 22, 25, 64]`

#### What's happening here

We have a `while` loop that states we continue looping until every element from `inputArr` has been removed. As we loop over those elements, we remove the smallest element (`11`) and place it in the `output` array. Then we start over with `n - 1` items now in `inputArr`. On the second pass, we determine `12` is the smallest element in `inputArr` (since `11` has been removed), and once again shift the element from `inputArr` to `output`. The process will continue shifting the smallest element from `inputArr` to `output` with each iteration. 

> The number of elements in the inner loop decreases with each loop 

| loop | `output` | `inputArr` | `min` | `inputArr.length` | `output.length` | 
|:---|:---|:---|:---|:---|:---|
| 0 | `[]` | `[11, 25, 12, 22, 64]` | `11`| 5 | 0 | 
| 1 | `[11]` | `[25, 12, 22, 64]` | `12`| 4 | 1 | 
| 2 | `[11, 12]` | `[25, 22, 64]` | `22`| 3 | 2 |
| 3 | `[11, 12, 22]` | `[25, 64]` | `25`| 2 | 3 | 
| 4 | `[11, 12, 22, 25]` | `[64]` | `64`| 1 | 4 | 
| 5 | `[11, 12, 22, 25, 64]` | `[]` | | 0 | 5 | 

In Summary: 
* There are two (2) loops 
    * The outer-most loop executes `n` times 
    * the inner loop executes `n` times 

Given the above information, in the _worse case scenario_ both loops are executed `5` times for an input with `5` elements. In terms of a mathematical function, we could represent this as `f(n) = n * n` or `f(n) = n²`.  Since the there is no scenario in which this algorithm will execute faster than `f(n) = n²` we can also say that this equation is `θ(n²)` ("theta of n squared"). 

> Cheers 🥂 to you if you got that 👍

The sorting algorithm outlined above is a **highly inefficient** method of sorting. 

> 🧠 If you are up for a challenge, see if you can think of a more efficient algorithm for sorting numbers 🧠 


### Asymptotic behavior and Big O 

Asymptotic behavior essentially drops all the decorative constants from the mathematical function representing the execution steps of the algorithm. 

Given this behavior we can conclude: 
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

Once we have an algorithm in terms of theta or big O - we have the algorithms _time complexity_ or _complexity_. The `θ(1)`, `θ(n)`, and `θ(n²)` all occur so commonly that we have names for algorithms that execute at this level of complexity.
* `θ(1)` is referred to as a "constant time" algorithm since the execution time is constant regardless of the size of the input 
* `θ(n)` is referred to as a "linear time" algorithm since execution time grows in direct proportion to the input (`n`)
* `θ(n²)` is referred to as quadratic time since the execution time grows in a quadratic fashion as the input increases. 

> Remember the key idea here - we are trying to indicate how an algorithm scales as the input to the algorithm increases. Algorithms with a larger θ will execute more slowly than algorithms with a smaller θ

### Asymptotic Complexity & Bounds 

It is important to note that there is a difference between `O(n)` (pronounced "Oh of n") and `θ(n)` (pronounced "theta of n"). 
* Algorithms expressed in terms of `θ` ("theta") are expressed in terms of "tight bounds". With tightly bound complexity, an algorithm will consistently execute at the rate expressed by the function of theta. 
* Algorithms with complexities expressed in `O` are defining the _upper bounds_ or _worse case scenario_ for execution steps. 

The difference here is between `O` and `θ` really comes down to how much variability there is in the equation. One example to illustrate the difference could be a the `Array.find` function, which goes through an array, and return the first element that matches the provided logical comparison. 

```js
const array1 = [5, 12, 8, 130, 44];
const found = array1.find(element => element > 10);

console.log(found); 
// expected output: 12
```

With the find algorithm, as soon as an element matches the condition a value is returned. So in the worst case scenario, we would need to loop through the entire collection of elements to find an element that matches the provided condition. This means suggests a linear complexity, or `O(n)`. However, since there are scenarios where the equation would require fewer steps to execute, stating that the equation is `θ(n)` would be inaccurate. 

So `θ` tells us that an algorithm will execute tightly bounded (consistently), while `O` indicates that the "upper bounds" of the algorithm (the worst case scenario) is represented by the function `O`. 

We can also denote the "lower bound" or the best-case scenario using `Ω` (pronounced "omega"). In `Ω` we are expressing input to an algorithm that requires the least number of execution steps. 

In Summary: 
* `O` indicates the upper bounds of an algorithms asymptotic complexity 
    * worst-case scenario
    * number of execution steps given an input requiring the maximum potential execution steps 
* `θ` indicates a tightly bound (consistent) algorithm asymptotic complexity 
    * actual execution time 
    * same number of steps executed for any input  
* `Ω` indicates the lower bounds of an algorithms asymptotic complexity 
    * best-case scenario 
    * number of execution steps given an input requiring the least potential execution steps 

This can be broken down further between `O` vs. `o` and `Ω` vs `ꞷ` or "big O vs little O" and "big omega vs little omega": 

| Notation | Pronunciation  | Bound | Numeric Operator | Meaning | 
|:---------|:---------------|:------|:-----------------|:--------| 
| `O`      | "big O"        | tight-upper | `<`        | maximum possible number of execution steps (tightly bound) |
| `o`      | "little O"     | upper | `≤`              | highest possible number of execution steps  | 
| `θ`      | "theta"        | tight | `=`              | exact number of execution steps (tightly bound) | 
| `Ω`      | "big omega"    | lower | `≥`              | least number of execution steps | 
| `ꞷ`      | "little omega" | tight-lower | `>`        | least number of execution steps (tightly bound) |  

Tight refers to how accurate the mathematical function representing the asymptotic complexity is for a given algorithm. 

## Recursion 

Recursion refers to the process in which a function calls itself to determine the end result. Recursion occurs very commonly, you'll find recursive functions in: 

* calculating the number of `.jpeg` files in a folder 
    * every folder inside the root folder must also run the same function 
* calculating the size of a folder 
    * every folder inside the folder must also be calculated 
* factorials 
    * to find the factorial of `5`, you first find the factorials of `1`, `2`, `3` and `4`

... and many more. 

### Recursive Complexity 

One of the simplest examples of a recursive algorithm is factorials. A factorial is a defined as the product of every integer between a number and 0. So determining the factorials of `1` through `5` would look like: 

| Input | Math Equation          |
|:------|:-----------------------| 
| `1`   | `f(1) = 1`             |
| `2`   | `f(2) = 2 * 1`         | 
| `3`   | `f(3) = 3 * 2 * 1`     | 
| `4`   | `f(4) = 4 * 3 * 2 * 1` | 

Functionally, we would calculate a factorial using recursion. 

```js
function factorial(number) {
    if (number = 1) return 1 
    return number * factorial(number - 1)
}
```

> Given the above function, can you determine the asymptotic complexity? 

The `factorial(number)` function above does not have any loops. Previously algorithms without any loops had a constant runtime, however with the `factorial(number)` function, this is not the case. As you can imagine the greater the input value, the greater the number of execution steps, and the simple recursive function above would have a _linear complexity_ or complexity of `θ(n)`. 

This begs the question: _Do recursive functions always have linear complexities?_ 

Another recursive function referred to as "binary search" is slightly more complicated. In binary search algorithms, the function receives a collection of _sorted_ values. Since the input to the function is sorted, some optimizations can be made to more quickly find the desired value. 

Imagine the function: 

```js
function findIndexFromSorted(array, target) {
    let start = 0 
    let end = array.length - 1 
    while(start <= end){ 
        let middle = Math.ceil((start + end) / 2) 
        
        // make sure we always have a valid middle value 
        if (middle > array.length - 1) middle-- 
        
        // see if middle element is target 
        if (array[middle] === target) return middle  

        // check right side 
        if (target > array[middle]) {
            start = middle + 1 
            continue 
        }

        // check left side 
        if (target < array[middle]){
            end = middle - 1
            continue 
        }
    }
}
```

Here we begin by checking the value at the middle of the `array` to see if it is the `target`. If it is, the function has found the `target` and should return the index. If not, we see if the value of the middle of the `array` is less than or greater than the `target`. Then we change our search parameters (`start` and `end`) to inspect the right-side (higher numbers) or left-side (lower number) of `array`. With each iteration through the `while` loop, `n` or the number elements (relevant input) shrinks. 


So with each iteration through the recursive algorithm, the number of elements inspected shrinks by a factor of 2. Or as a mathematical function:  `f(n) = n / (2 ^ i)` / `f(n) = n / 2ⁱ` where `i` represents the iteration.


Let's represent the iteration with `i`:

| Iteration | Number of relevant elements | `i` function | 
|:----------|:----------------------------|:-------------|
| 1         |  `n`                        | `i = n / 2`  |      
| 2         |  `n / 2`                    | `i = n / 2²` |
| 3         |  `n / 4`                    | `i = n / 2³` |
| 4         |  `n / 8`                    | `i = n / 2⁴` |
| 5         |  `n / 16`                   | `i = n / 2⁵` | 

But what is the value of `i` for a given input `n`?

| `n` | `i`          | `n` function         | `n` value | 
|:-------------------|----------------------|:----------| 
| 1   | `i = n / 2¹` | `f(1) = 1/2¹ = 1/2`  | `0.5`     |
| 2   | `i = n / 2²` | `f(2) = 2/2² = 2/4`  | `0.25`    |
| 3   | `i = n / 2³` | `f(3) = 3/2³ = 3/8`  | `0.375`   |
| 4   | `i = n / 2⁴` | `f(4) = 4/2⁴ = 4/16` | `0.25`    |
| 5   | `i = n / 2⁵` | `f(5) = 5/2⁵ = 5/32` | `0.15625` | 
| 6   | `i = n / 2⁶` | `f(6) = 6/64 = 3/32` | `0.09375` | 

That's may seem kinda messy, but given this information we can solve for `n` using  `1 = n/2ⁱ`. Multiply both side of the equation by `2`, we get `2ⁱ = n` or `n = 2ⁱ`. Recall back to algebra, how do you define a variable in terms of the exponent it was raised to? 

> Answer: Logarithms 

### Logarithms and Complexity 

A logarithm answers the question "How many of this number do we multiply to get that number?" 
* the base of the logarithm refers to the number being raised to an exponent 
* the number in parenthesis specifies the desired value of the base raised to that number 

For Example: 
|Sentence | Logarithm | 
|:--------|:----| 
| What exponent does `2` need to be raised to, in order to get the value of `8`? | `log₂(8)` | 
| What exponent does `2` need to be raised to, in order to get the value of `256`? | `log₂(256)` | 

Using logarithms, we could define the binary search algorithm above as: `f(n) = n / 2 * log₂(n)`

This introduces the last type of asymptotic complexity, logarithmic complexity. In Logarithmic asymptotic algorithms which the algorithms, as the input `n` increases, the efficiency of the algorithm increases. 

We can summarize these various algorithms with a chart to demonstrate how the algorithm responds to increasing inputs: 

![Big O chart](https://www.google.com/url?sa=i&url=https%3A%2F%2Fdanielmiessler.com%2Fstudy%2Fbig-o-notation%2F&psig=AOvVaw0LGbhsjuZ4Nc_i4j8-rsUa&ust=1606772321008000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKCk98XbqO0CFQAAAAAdAAAAABAV)


## All Together  

In short, here are the general rules regarding Big O and calculating algorithmic complexity 

1. Many simple algorithms can be analyzed by counting the loops
    * An algorithm with a single loop, will generally have a _linear_ complexity. 
    * Every nested loop will increase the complexity beyond `f(n) = n` by a factor of n
        * a single loop will have a complexity of `f(n) = n` 
        * a nested loop with will have a complexity of `f(n) = n²` 
        * a nested loop nested inside another nested loop (3 loops) will have a complexity of `f(n) = n³` 
2. Given an algorithm with a series of loops (not nested loops), the slowest loop (e.g. the loop with the most computational steps) will determine the asymptotic behavior of the algorithm.
    * Two nested loops followed by a single loop is asymptotically the same as the nested loops since the nested loops will have a greater impact on execution time as the input grows. 
3. While all the symbols `O`, `o`, `Ω`, `ω` and `Θ` are useful at times, O is the one used more commonly, as it's easier to determine than Θ and more practically useful than `Ω`.
    * It is easier to determine `O` complexity than `θ` complexity or `Ω` complexity 
    * `O` complexity provides the best insight into performance, since it assumes the worst-case scenario 
4. Logarithmic complexity generally occurs in recursive function, and represents an algorithm that gets more efficient as the input increases. 

## References 

* Dionysis Zindros 
    * [A Gentle Introduction to Algorithm Complexity Analysis](http://discrete.gr/complexity/)
* Big O Cheat Sheet: 
    * [Know Thy Complexities!](https://www.bigocheatsheet.com/)


