# What is Big 🅾? 

Big O is fundamental in the world of computer science, yet many developers and engineers often struggle to understand it. 

Most people know its important, and its commonly something software engineers to ruminate upon, exaggerating the complexity and difficulties in understanding and using Big O. 
This fear can often results in avoidance of the topic. 

Let's stop fearing it, and start getting excited about it. Big O can be a helpful tool to help developers and software engineers to improve the quality and efficiency of code. 

## Learning Objectives 

* provide an introduction into Big O notation 
* define "algorithms" in the context of Big O 
* define time complexity/efficiency 
    * asymptotic behavior 
    * worst-case analysis 
* explain how to calculate time complexity 
    * step-by-step breakdown 
    * code examples 
* define the fundamental types of asymptotic complexity 
* Differentiate between O, o, θ, Ω and ⍵

_Here we will focus Big O are in terms of time complexity since this is what most people are referring to when discussing Big O._ 

# Algorithms → Big 🅾

**Algorithms** are programmatic operations that performs a computation to calculate a value or values. 

![algorithm](https://media.geeksforgeeks.org/wp-content/cdn-uploads/20191016135223/What-is-Algorithm_-1024x631.jpg)

**Big O** is the standard notation computer scientists use to define, discuss, compare and quantify the performance of algorithms using mathematical terms. 
* define how the algorithm responds to an increasing number of input values (quantify how algorithm scales) 
* mathematically compare the efficiency of different algorithms 



## Complexity Analysis & Time Complexity 

**Complexity analysis** is a tool for determining how an algorithm responds to increasing inputs. It can be defined in terms of both _spacial efficiency_ as well as _time complexity_.
* **time complexity** refers to the efficiency of an algorithm in respect to the amount of time an algorithm requires to execute completely as its input increases.  
* **spacial complexity** refers to the efficiency of an algorithm in respect to the amount of memory (RAM) it consumes as the input increases.

> Note: this article, we will be focusing on _time complexity_

The speed at which a computer can execute (complete) and algorithm is impacted by a wide variety of factors: 
* Hardware 
    * CPU Clock Speed 
    * CPU Cores (dual-core, quad-core, etc.)
    * Cooling Ability (ability to dispense head from critical components under load)
    * RAM read/write speed
    * Hard-drive read/write speed 
    * Available disc 
* Network 
    * Network speed (up/down)
    * Concurrent Network Operations 
* Software
    * Operating System (Mac, Windows, Linux) 
    * Concurrent applications 
    * Security & monitoring software 

There are numerous factors that would impact execution speed of computer programs beyond what is listed here. Due to these wide variations, when we calculate an algorithms **time complexity** we simplify the calculation to only include the _specific instructions executed as a direct result of an algorithm_, ignoring all the factors that are outside the scope of the algorithm.

## Calculating Time Complexity 

Calculating an algorithm's time complexity begins by breaking down the operation into individual steps. 

### What's a step? 

In the context of big O and algorithmic complexity, a step is **not**:
* a function 
* a line of code 
* a statement in code 
* a block of code 

In the context of big O and algorithmic complexity, a step is **a single unit of work executed by the central processing unit (CPU)**.

This includes operations like: 
* assigning a value to a variable 
* looking up the value of an element in an array
* comparing two values 
* incrementing/decrementing a value 
* a single arithmetic operation (addition, subtraction, multiplication, division) 

and many more. The goal is to break down an algorithm into the smallest unit of work that a computer can perform in a single step. 

### Finding the largest value in a collection  

One of the best ways to illustrate individual steps executed by the CPU is with an example. 

Take the `maximum` function below: 
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
The function `maxiumum` defined above is an example of an algorithm. It is a strictly defined process for finding the largest value in a collection of numbers. 

The `maximum` function involves the following steps 
1. create `max` variable (allocate memory)  
2. look up value of item at index `0` in `arr` (e.g. `arr[0]`)
3. assign the value returned as to `max` variable (e.g. `max = arr[0]`)
4. create `i` variable (e.g. `let i`)
5. assign `i` a value of `1` (e.g. `let i = 1`)
6. define loop termination condition (e.g. `i < arr.length`)
7. define loop increment (`i++`)
8. retrieve the value at position `1` in `arr` (e.g. `arr[1]` → `23`)
9. compare the value of the element retrieved to `max` (e.g. `arr[i] > max`)
10. since `arr[1]` is `23` in the example above, the loop concludes and restarts 
11. increment `i` (e.g. `i++`)
12. lookup value at `arr[2]` (since `i = 2`) 
13. compare `arr[2]` with `max`
14. since `arr[2] = 67` and `max = 45`, `arr[i] > max` evaluates to `true` (e.g `67 > 45`)
15. enter `if` block 
16. re-assign `max = arr[i]` (e.g. `max = 67`)
17. increment `i` (e.g. `i++`)

... and continuing the loop block until the loops terminating condition (`i <arr.length`) is reached.  

Now since we are focused on time-complexity, we need to differentiate between setup steps, and the steps that are impacted by the size of the input. In other words, define which steps would increase as the input to the algorithm increases, from the steps that would execute regardless of the size of the input. 

So given the `maximum` algorithm: 
* Independent Steps (required regardless of input size) 
    * create `max` variable 
    * assign `max` to the first value of the input (`arr[0]`) 
    * creating loop statement 
        * the `i` variable 
        * assigning the `i` variable a value of `1` 
    * returning the `max` value 
* Dependent Operations (execute a variable number of times depending on input size)
    * Number of times we have to increment `i` 
    * Number of times we have to lookup a value from the input `arr[i]` 
    * comparing the value of `arr[i]` to `max` 
    * assigning `max` a value 

> Remember: we are time complexity is quantifying how an algorithm responds to an increasing input 

Given the above, we can state objectively that the `maximum` function has
* 4 independent operations
* 4 dependent operations 

Or as a mathematical function where `n` represents the size of the input: `f(n) = 4n + 4`
* `4` referring to the operations that are **not** affected by `n` 
* `4n` referring to the operations affected by `n` 

### Worst-case Scenario

After distinguishing the individual steps of an algorithm, we need to determine how those execution steps are affected by different types of input. 

We start evaluating input types with what is called the **worst-case scenario**. In terms of time-complexity, the **worst case scenario** refers to an input that would require the most operations to complete. 

In the example of the `maximum` function, the **worst-case scenario** would be the scenario in which the input array was sorted smallest to largest, which would require every iteration through the `for` loop to evaluate the `if (arr[i] > max) ` as `true`, and thus executing an additional steps defined inside the `if` block. 

```js
if ( arr[i] > max ) {
    max = arr[i]
}
```

So using the 4 independent steps, 4 dependent steps, and 2 conditional steps, we can alter the previous formula to add the conditionally dependent steps outlined as part of the worst-case scenario: `f(n) = 4n + 4 + 2n` or simplified as `f(n) = 6n + 4`

### Asymptotic behavior 

In complexity analysis, we are primarily concerned with how the function (`f(n)`) behaves as the input (`n`) grows. 

So the next step in calculating the time-complexity is to eliminate (ignore) all the independent variables (the steps that occur regardless of the input size) from the equation. 

In the case of the mathematical function defined earlier (`f(n) = 6n + 4`), `4` is constant regardless of the input size, however the `6n` grows directly as the size of the input grows larger. We refer to these independent operations as `4` "initialization constants". 

####  Initialization Constants 

**Initialization constants** are the steps of an algorithm that will execute regardless of the size of the input. Including "behind the scene" initialization operations like the virtual machine required for Java.  

When we remove our initialization constants, our mathematical function for `maximum` is stated simply as `f(n) = 6n` 

> We remove initialization constants because these steps are not affected by the input size, or the input values. Instead they are a direct result of the syntax and rules of a high-level programming language. Initialization constant can vary quite dramatically from one language to another, and do not help to clarify how an algorithm responds to increasing input sizes (time complexity). 

Asymptotic behavior refers to an algorithms time complexity with intialization constants removed.  

### Common Types of Asymptotic Behavior 

Given this behavior we can conclude: 
* A algorithm that does not require any looping will have a complexity of `f(n) = 1` since the number of instructions is constant regardless of the size of the input
* A algorithm with a single loop, which loops from `1` to `n` will have a complexity of `f(n) = n` since it will perform the instructions inside the loop a constant number of times. 
* An algorithm with a nested loop (a loop inside another loop) will have a complexity of `f(n) = n²` since the execution time will increases by a factor of `n` as the size of the input (`n`) increases in size. 

Now to take everything that we've discussed an put it in the computer science language of Big O is pretty simple. Essentially we've already done it.
* `f(1)` 
    * represents algorithms with a constant number of instructions 
    * alternatively, you could say _the size of the input does **not** affect the execution time of the algorithm_ 
    * mathematically, we would represent this as  `f(n) = 1` 
    * is referred to as a "constant time" 
    * execution time is constant regardless of the size of the input 
* `f(n)`
    * represents an algorithm that's execution time grows in direct proportion to the size of the input 
    * alternatively, _the size of the input directly affects the algorithms execution time_
    * mathematically, we would represent this as `f(n) = n`
    * is referred to as a "linear time" 
    * execution time grows in direct proportion to the input (`n`)
* `f(n²)`
    * represents an algorithm that executes proportionally at a rate of n squared compared to the input siz 
    * mathematically, we would represent this as `f(n) = n²` 
    * is referred to as quadratic time 
    * execution time grows in a quadratic fashion as the input increases. 

... and this would continue as the exponents representing the function grows.

> Remember the key idea here - we are trying to indicate how an algorithm scales as the input to the algorithm increases. Algorithms with a larger θ will execute more slowly than algorithms with a smaller θ

### Asymptotic Complexity & Bounds 

It is important to understand that `O(n)` (pronounced "Oh of n") and `θ(n)` (pronounced "theta of n") do not have the same meaning. 
* Algorithms expressed in terms of `θ` ("theta") are expressed in terms of "tight bounds". 
* With tightly bound complexity, an algorithm will consistently execute at the rate expressed by the function of theta. 
* Algorithms with complexities expressed in `O` are defining the _upper bounds_ or _worse case scenario_ for execution steps. 

The difference here is between `O` and `θ` really comes down to how much variability there is in the equation. 

Take `Array.find(x => condition)` function: 

```js
const input = [5, 12, 8, 130, 44];
const found = input.find(element => element > 10);

console.log(found); // 12
```
The `.find` method iterates through every element in the array, and return the first element that matches the provided logical comparison. 

Under the hood, the `.find` function is performing the following:

```js
function find(collection, condition){
    for(let i = 0; i < collection.length; i++){
        const item = collection[i]
        if(condition(item)) {
            return item 
        } 
    }
    return null; 
}
```
In summary `.find`: 
1. loops through a collection
2. With each iteration passing each element as a parameter to the function provided (`condition`) 
3. Depending on the return value of `condition(item)` 
    * `true` indicates a match has been found and the value is returned
    * `false` indicates a non-match, and the loop continues 
4. If no match has been found by the end of the loop through the collection, then a `null` value is returned 

Assuming `Array.find` works like the function defined above: 
* If the first element in the collection matches the provided condition to the `Array.find` algorithm could complete with only a single iteration. This possibility indicates an algorithm that's **worst-case scenario** involves looping through the entire collection. 
    * This would be a linear-time-complexity or `f(n) = n` 
    * Since this is the _upper bound_, we could also express it as `o(n)`

There are 3 primary types of bounds in asymptotic functions: 
* `O(n)` denotes the mathematical function in the worst case scenario 
    * pronounced "big O of n" 
    * referred to as _upper bound_
    * Worst-case scenario 
        * Most execution steps 
        * Longest execution time 
    * Greatest time-complexity
    * Least efficient  
* `θ(n)`  denotes the mathematical function of the exact time-complexity of a an asymptotic function given any input. 
    * pronounced "theta of n" 
    * referred to as _tightly-bound_
    * Exact 
    * exact execution steps 
    * consistent response to increasing input size 
    * consistent efficiency regardless of input values 
    * consistent complexity regardless of input values
* `Ω(n)` denotes the mathematical function provided the best case scenario (fastest execution)
    * pronounced "omega of n" 
    * referred to as _lower bound_
    * Best-case 
    * Least execution steps 
    * Best-case scenario 
        * Lest execution steps 
        * Fastest execution time 
    * Least time-complexity 
    * Most efficient 

This can be broken down further between `O` vs. `o` and `Ω` vs `ꞷ` or "big O vs little O" and "big omega vs little omega": 

| Notation | Pronunciation  | Bound | Numeric Operator | Meaning | 
|:---------|:---------------|:------|:-----------------|:--------| 
| `O`      | "big O"        | tight-upper | `<`        | maximum possible number of execution steps (tightly bound) |
| `o`      | "little O"     | upper | `≤`              | highest possible number of execution steps  | 
| `θ`      | "theta"        | tight | `=`              | exact number of execution steps (tightly bound) | 
| `Ω`      | "big omega"    | lower | `≥`              | least number of execution steps | 
| `ꞷ`      | "little omega" | tight-lower | `>`        | least number of execution steps (tightly bound) |  

Tight refers to how accurate the mathematical function representing the asymptotic complexity is for a given algorithm. 

## Learn by example 

The best way to learn is to do it, so join me in taking apart a sorting algorithm and examining its asymptotic time-complexity. 

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
function selectionSort(arr){
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

The basic sorting function (`selectionSort`) defined above sorts values from smallest to largest by: 
1.  copying the input (to avoid modifying by reference) 
2.  iterating through the copied array (`inputArr`) and removing the smallest element (`min`) from the input array amd adding it to the `output` array. 
3. repeating step 2 until the `inputArr` has no elements left

> **Challenge** Go ahead and see if you can calculate the complexity (in big O notation and θ notation) yourself. 

##### Calculating Selection Sort Time Complexity 

Recall, we mathematically determine complexity by: 
1. determining the individual steps executed by the CPU 
    1. create `inputArr`
    2. copy `arr` into `inputArr` 
    3. create `output`
    4. initialize `output = []` 
    5. create loop
        1. create `i` 
        2. assign `i = 1`
        3. lookup `inputArr[i]` 
        4. compare `inputArr[i] < min`
        5. optionally, assign `min = inputArr[i]`
        6. optionally, assign `minIndex = i` 
        7. increment `i` 
        8. check condition (`i < inputArr.length`)
        9. repeat loop while `i < inputArr.length` 
    8. remove `min` element from `inputArr` 
    9. add it to minimum value to `output` array 
    10. check `inputArr.length > 0`
    11. optionally, loop 
3. determine which steps are dependent steps
    * dependent 
        * lookup `inputArr[i]` 
        * inside loop:
            * compare `inputArr[i] < min`
            * optionally, assign `min = inputArr[i]`
            * optionally, assign `minIndex = i` 
            * increment `i` 
            * repeat loop while `i < inputArr.length` 
        * remove `min` element from `inputArr` 
        * add it to minimum value to `output` array 
        * check `inputArr.length > 0`
        * optionally, loop 
    * independent 
        * create `inputArr`
        * copy `arr` into `inputArr` 
        * create `output`
        * initialize `output = []`
        * create loop
            * create `i` 
            * assign `i = 1`
4. determine the worst-case scenario 
    * the execution of both loops (`for` and `while`) are both directly impacted by the size of the input, and unaffected (in terms of execution time) by the values of the input. 
5. remove initialization constants 

#### Walking through the Selection Sort

The `while` loop that states we continue looping until every element from `inputArr` has been removed. Then with each iteration through the `while` loop, a nested `for` loop through the same collection of elements is executed to find the smallest value. 

1. the first pass `inputArr`, will determine `11` is the smallest element in the `inputArr` and remove it, placing it in `output`
2. The second pass through `inputArr` will determine `12` is the smallest value, and remove it from `inputArr`, placing the value in `output` 
3. The third pass through `inputArr` , will determine `22` is the smallest value, remove it from `inputArr`, placing the value in `output`
4. The fourth pass through `inputArr` , will determine `25` is the smallest value, remove it from `inputArr`, placing the value in `output`
5. The fifth pass through `inputArr` , will determine `64` is the smallest value, remove it from `inputArr`, placing the value in `output`
6. The sixth pass through `inputArr` , will determine that there are no more elements within `inputArr`, and exit the loop. 
7. The `output` will be returned with the elements sorted from smallest to largest `[11, 12, 22, 25, 64]`

Overall we can summarize the behavior of an input `[11, 25, 12, 22, 65]` with the following table: 

| loop | `output` | `inputArr` | `min` | `inputArr.length` | `output.length` | 
|:---|:---|:---|:---|:---|:---|
| 0 | `[]` | `[11, 25, 12, 22, 64]` | `11`| 5 | 0 | 
| 1 | `[11]` | `[25, 12, 22, 64]` | `12`| 4 | 1 | 
| 2 | `[11, 12]` | `[25, 22, 64]` | `22`| 3 | 2 |
| 3 | `[11, 12, 22]` | `[25, 64]` | `25`| 2 | 3 | 
| 4 | `[11, 12, 22, 25]` | `[64]` | `64`| 1 | 4 | 
| 5 | `[11, 12, 22, 25, 64]` | `[]` | | 0 | 5 | 

* Overall the `selectionSort` function
    * Is comprised of two (2) loops 
    * The outer-most loop executes `n` times 
    * the inner loop executes `n` times 

In the _worse case scenario_ both loops are executed `5` times for an input with `5` elements. In terms of a mathematical function, we could represent this as `f(n) = n * n` or `f(n) = n²`.  

Since the there is no scenario in which this algorithm will execute faster than `f(n) = n²` 

Cheers 🥂 to you if you got that 👍

> The sorting algorithm outlined above is a **highly inefficient** method of sorting 🧠 If you are up for a challenge, see if you can think of a more efficient algorithm for sorting numbers 🧠 

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

![Big O chart](https://danielmiessler.com/images/big-o-chart-tutorial-bazar-aymptotic-notations-1.png.webp)


## All Together  

In short, here are the general rules regarding Big O and calculating algorithmic complexity 

1. Algorithms that execute faster with a larger input, will often execute faster will smaller inputs as well. 
2. Many simple algorithms can be analyzed by counting the loops
    * An algorithm with a single loop, will generally have a _linear_ complexity. 
    * Every nested loop will increase the complexity beyond `f(n) = n` by a factor of n
        * a single loop will have a complexity of `f(n) = n` 
        * a nested loop with will have a complexity of `f(n) = n²` 
        * a nested loop nested inside another nested loop (3 loops) will have a complexity of `f(n) = n³` 
3. Given an algorithm with a series of loops (not nested loops), the slowest loop (e.g. the loop with the most computational steps) will determine the asymptotic behavior of the algorithm.
    * Two nested loops followed by a single loop is asymptotically the same as the nested loops since the nested loops will have a greater impact on execution time as the input grows. 
4. While all the symbols `O`, `o`, `Ω`, `ω` and `Θ` are useful at times, O is the one used more commonly, as it's easier to determine than Θ and more practically useful than `Ω`.
    * It is easier to determine `O` complexity than `θ` complexity or `Ω` complexity 
    * `O` complexity provides the best insight into performance, since it assumes the worst-case scenario 
5. Logarithmic complexity generally occurs in recursive function, and represents an algorithm that gets more efficient as the input increases. 

## References 

* Dionysis Zindros 
    * [A Gentle Introduction to Algorithm Complexity Analysis](http://discrete.gr/complexity/)
* Big O Cheat Sheet: 
    * [Know Thy Complexities!](https://www.bigocheatsheet.com/)




# Extra

### Profilers vs. Big O 

**Profilers** are a category of tools that precisely measure the execution time of a algorithm, function or program in order to identify bottlenecks. This information is useful and can help identify where developers should spend time optimizing algorithms to execute more efficiently, however 

However these tools only serve to identify where a problem _could_ exist. Profilers provide very little information to answer the question of _why_. There is a wide variety of factors that can affect how fast a computer executes an operation including the hardware (CPU speed, RAM amount, RAM speed, Disk speed, Disk space, network speed, etc.). 

The goal to isolate the efficiency and complexity of an algorithm from the hardware and low-level implementation details of the operation. By removing differences in computational power, disk i/o, network speeds, other running processes and all the other variables that may affect the amount of time for an algorithm to execute complete - Big O allows us to quantify the performance difference of two algorithms producing the same result in terms of memory consumptions and execution time. 


---
Given this information, it is reasonable to assume that different programming languages would have different implications in terms of the number of actual steps executed for a given algorithm, so after removing our initialization constants, we remove our multiplier from our mathematical formula, resulting in a much simpler mathematical function: `f(n) = n`. This process of dropping all factors (multipliers) and removing initialization constants, and defining the algorithms behavior in terms of the largest growing term is referred to as "asymptotic behavior". 
