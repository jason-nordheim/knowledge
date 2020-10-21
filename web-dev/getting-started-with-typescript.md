# Lets talk TypeScript 

Ever wonder what the buzz surrounding TypeScript is all about? Keep reading and come on a deep dive on TypeScript addressing the fundamental questions surrounding TypeScript: 
* What is TypeScript? 
* What features/benefits does TypeScript offer
* What are the fundamentals a JavaScript developer needs to get started with TypeScript? 

> It is assumed that readers of this post understand basic JavaScript and have some experience creating JavaScript applications. 

## What is TypeScript 

As with anything, a good place to start is with defining "TypeScript". 

[TypeScript](https://www.typescriptlang.org/) is: 
* a super-set of JavaScript 
* open-source 
* statically typed langauge 
* strongly typed language 

## What's the appeal? 

More apprehensive developers may ask: "Why would I want to learn TypeScript?" and "How would TypeScript improve code?". To answer this as concisely as possible: TypeScript doesn't offer any functionality that isn't offered by JavaScript, TypeScript simply adds [strong-typing](https://stackoverflow.com/questions/2690544/what-is-the-difference-between-a-strongly-typed-language-and-a-statically-typed) on top of JavaScript. 

Personally, I began learning programming in the strongly typed langauges like C# and Java. Transitioning to a weakly typed langauge like JavaScript was uncomfortable. JavaScript meant that the rules of strongly-typed programming langauges were no longer true. The idea that I could declare a variable with a value of `23` and later change it to the string `"Sally"`, and that was "ok" seemed like bad behavior, like breaking the rules. 

This is where TypeScript comes in; it adds strong typing (and the associated benefits/drawbacks) to the langauge of the web. 

### Strongly and Weakly typed languages 

Weakly typed langauges (like JavaScript) often made me feel like I was doing something bad - "breaking the rules", because when I learned how to write my first piece of code, I was also taught the various data types, and that these types **must** be declared, or the code will not compile. End of story.

Enter JavaScript - which will infer and coerce variable to the desired type whenever possible. With weakly typed langauges like JavaScript a variable's type is mutable (can be changed). A variable could start out holding a string value, and later hold a number, or an object or a boolean, etc. 

Essentially the fundamental rules embedded in someone working with Java and C# were thrown out the window. 

With a strongly typed langauge, variable must be declared with a type. This type would define a contract that the variable assigned to the type would be required to follow. This type would be declared when the variable was created and could not be changed (immutable type) once declared.   

With strong-typing; variables, functions, and objects have strictly defined rules that could not be broken. Any piece of code that fails to adhere to the rules defined by the type or interface defined would throw an error, and fail to compile. 

These contracts mean that the developer writing the code, or building features implementing third-party code (that is strongly-typed) cannot write code that doesn't follow the defined contract. A variable initally defined as a number must always be a number. 

It also means that functions in strongly-typed langauges like TypeScript have contracts for both the input (parameters) as well as the output (the return value), and that if the code was attempted to be used in a way that violates the terms of the contract an error is thrown and the code will fail to compile. 

Personally, I loved the tooling that strongly-typed langauges offered in modern IDEs: 
* intelligent code completion of methods/function, variables, fields, classes, interfaces, modules, properties/attributes, and more.
* in-line access access to third-party library documentation

## Weighing Pros and Cons

While I personally love the structure that comes with strongly typed languages, I would feel remis if I didn't mention the benefits of weakly-typed languages. The main benefit; flexibility. 

With weakly typed langauges, a function can return one data-type in one case and a totally different value-type in another case. No overloading, interfaces, or generics required - it just works. 

The JavaScript compilier doesn't care about the type of values provided to a function, class or method. Additionally, the type of the return value of the function is also irrelevant to the JavaScript compiler. 

In JavaScript, a function that takes two arguments/parameters and adds them together can return different data types, and the code will compile without issue. This could be fine, but it could also result in "bugs" that are difficult to find and de-bug as there is no garuntee to the type or structure of the data going into, or returning from a function. 

```js
// function to add 2 variables together 
function add(x, y) {
  return x + y 
}

/* by changing the data-type of parameters provided to the 
 * function, we also can change the data-type returned by the function */
add(2,3) // => 5 (number)
add('2', '3') // => '23' (string)
```

In the example above, the function `add(x,y)` takes in two parameters (`x` and `y`) and returns `x + y`. Used as intended this would return the sum of the two numbers provided. However, if we alter those one or both of those variables to have a data-type of `string`, the function will return a string where the parameters have been concatenated.

There are scenarios where it may be desireable to have different data-types returned by a function, depending on the parameters provided to the function. In this way, we do not need interfaces or generics to implement abstract functionality, we can simply ignore the data-type.

This can make JavaScript code more concise. Avoiding type/generic definitions, interfaces, and casting. It could be argued that weakly-typed langauges like JavaScript enables developers to be more expressive, and more flexible code (polymorphism, mixins, etc.). 

However, since the compilier has no defined rules on the data-types of variables, the parameters provided to a function or the return value of a function, the compilier cannot identify unexpected behavior (because we haven't defined what the expected behavior is). 

As a result, working in weakly-typed langauges means that unexpected behavior may not appear until an application is published and unexpected inputs are provided that break the functionality of the application. 

> Thing about it: would you rather be alerted to problems as you develop by a compilier or after deployment, when the application is being used be real customers? 

Strongly typed langauges also enable (somewhat) self-documenting code; allowing IDEs to automatically display information about the names, types, and return values of functions/methods/procedures and provide this inline (within the code editor) as the code is typed, and even auto-completing code in some scenarios. 

In short, weakly-typed langauges benefit from: 
* more concise code 
* more flexible code 
* more expressive code 

While, strongly-typed langauges benefit from: 
* Implicit documentation 
* Fewer errors at runtime via strong typing 
* Increased performance through optimization (sometimes)

### A Metaphor 

In my head, weakly-typed languages seem to me like a highway that has no speed limit and no rules. There are no rules about the speed at which you travel, the mode of transportation, safety regulations, etc. 

If used as intended a highway like this has the potential to function fine, maybe even better in specific situations. As with weakly-typed langauges, we are trading structure and rigid rules for flexibility. 

If such a highway (a metaphor for a weakly-typed variable or function) existed, I can easily imagine people driving faster, on both sides and in both directions, failing to signal or use seatbelts, and countless other things that would appual a rule-abiding citizen. 


## Enter TypeScript 

[TypeScript](https://www.typescriptlang.org/) was created developed by Microsoft in 2012 and it seeks to add the structure and rules of strongly-typed langauges to "the langauge of the web" (JavaScript) without requiring changing the experience for end-users. 

## TypeScript Fundamentals 

As a superset of JavaScript, all JavaScript **is valid** TypeScript. In other words; any valid JavaScript code is also valid in TypeScript; however it doesn't recieve the benefits (or drawbacks) of strong typing unless the JavaScript is annotated with types. This is significant for a couple reasons: 

* Progressive Adoption - Since TypeScript is a superset of JavaScript, strong-typing can be added incrementally, without requiring re-writes of entire applications since the TypeScript is compiled to JavaScript anyway. 
* Future Proofing & Compatability - Since TypeScript cannot run in its default state and must transpiled into JavaScript in order to be run - developers using TypeScript do not need to be concerned with browser support as TypeScript code can be transpiled into various versions of JavaScript with release dates as far back as 1999 (which the TypeScript compilier does by default). 

### Installation 

TypeScript can be installed via [NPM](https://www.npmjs.com/get-npm) using the command `npm install -g typescript` which will install the TypeScript compilier globally. Once installed, we can see what version of typescript we have by running `tsc --version`. 

### Setup and Configuration 

There are numerous options that can configure the way the TypeScript compilier transpilies TypeScript code into JavaScript code. These options can be executed manually at the time of compilation (as command line arguments) or can be picked up automatically with a JSON configuration; `tsconfig.json` placed in the project's root directory, and will automatically be picked up by the TypeScript compilier. 

There are numerous options here, but most are just that: "options", meaning that you do not **need** to provide them. However, there are some common one's that I'd like to bring to discuss: 

1. `"target"` - allows configuration of the target version of JavaScript. Defaults to `"es3"`. Can be configured to the latest version of JavaScript by specifying `"esnext"` instead: 

```json
// tsconfig.json 
{
  "compilerOptions": {
    "target": "esnext" 
  }
}
```

2. `"watch"` - allows automatic re-compiliing of TypeScript to JavaScript as changes are saved to a TypeScript file, removing the need to run the `tsc` command to recompile TypeScript code to JavaScript. Disabled by default. 

```json 
// tsconfig.json 
{
  "compilerOptions": {
    "target": "esnext", 
    "watch": true
  }
}
```

3. `"lib"` - enables included type declarations for common technologies/features found in modern web applications like the DOM without any compiliation errors along with access to integrated documentation within most IDE's. 

```json 
// specify native support for common DOM elements that exist as 
// global variables & classes like `document`, `window`, `URL`, etc. in modern version of JavaScript 
{
  "compilerOptions": {
    "target": "esnext", 
    "watch": true, 
    "lib": ["dom", "es2017"]
  }
}
```

Whether run manually, or automatically using the "watch" function configured in a `tsconfig` file: TypeScript code placed in `.ts` files, will be converted into its configured version JavaScript code (ES3 by default) with the same file names, but with the `.js` extension. 

### Declaring variable types 

In TypeScript, we define and assign types to variables. Once assigned the type cannot be changed. 

#### Implicit vs. Explicit Type Declarations 

Type declarations can be declared/implented in two ways; _explicitly_ or _implicitly_. 

To _implicitly_ declare a the data type of a variable, we can define the value of the variable at the time of declaration, which allows the compilier to infer the data type of the variable and enforce its type. 

```ts
/* implicit declaration */ 
let age = 23

/* attempting to assign a string to a variable implicitly declared 
 * as a number is not allowed and will create a compile-time error */ 
age = "twenty-three" // [ts] Type "twenty-three" is not assignable to type 'number' 
```

> Note: In JavaScript, this would be allowed and could create a bug that likely would be difficult to find - but due to the strong typing of TypeScript - the code will fail to compile. Since TypeScript is a superset of JavaScript, we can "opt out" of the strong typing inherent to TypeScript by declaring the type of `any` which will indicate to the compilier that it should not validate changes to the value of that variable. 

If we don't have a value to assign to the variable at declaration, we can _explicitely_ declare the variable type by annotating the variable declaration with its type. Without a type annotation TypeScript variables will be declared as `any` meaning that they are not type-checked.

```ts
/* No Type Anotation */
let age; // will be inferred as `any` data type and will not be type-checked by the compiler 
age = 23 // => valid 
age = 'suzie' // => valid 

/* Explicity Type declaration */
let lucky:boolean; // indicates that only booleans (true/false) values can be assigned to the `lucky` variable 
lucky = 'suzie' // => type error 
lucky = true //=> valid 
```

> Best Practice: If you have a value to assign at the time of the variable declaration, do not explicitly declare its type as it would be redundant. 


### Moving beyond "primitive" data-types 

In JavaScript (and TypeScript) there are six (6) primitive data types: 
1. `undefined` 
2. `boolean`
3. `number`
4. `string`
5. `bigint`
6. `symbol` 

More complex pieces of information are representing with what is referred to as "Structural Types". This includes; arrays, maps, sets, dates, and any other "object" where it is necessary to encapsulate more than one primitive data-type, or that need to structure data in a specific manner. 

#### Custom Types 

With TypeScript, custom "types" can be declared using the keyword: `type` followed by the name of the type (in Pascal case) and setting it equal to (`=`) the type definition. This sets up a contract that can define the format of a variable, the format of parameters to a function as well as the format of a function's return value. 

Once declared, a custom type is implemented exactly like a primitive type. 

```ts
/* declare custom type of "Font" which will be required to always be a string value */
type Font = string 

/* declare variable to have a type of "Font" */
let myFont:Font 

// valid 
myFont = "bold" 
myFont = "Italic"

// invalid 
myFont = 400 
```

#### Union Types 

TypeScript goes beyond primitive and custom types by providing "union types". With union types, not only is the structure and type of data enforced, but the actual value is limited to the value(s) outlined within the union type declaration.  

```ts 
/* be defining the `Style` type as a union type, 
 * the TypeScript compilier will ensure that any 
 * variables assigned as that union type will only 
 * have values matching the prescribed values */
type Style = 'italic' | 'bold' | 'regular' 

// Explicitely declare strong type
let font:Style; 

// valid 
font = 'italic' 

//invalid 
font = 'helvetica' 
```

### Interfaces 

Another to define the structure in TypeScript is through **interfaces**. Interfaces specify the shape of an object or class without strictly requiring the value be of a specific type. In this way, TypeScript provides abstraction and flexibility. 

As long as a variable, parameter or return value aheres to the rules established in the interface definition - the variable, parameter and/or return value can be of any type.


```ts
/* declare a custom `type` of person, which is represented 
 * as an object with a 'first' property which is a string, 
 * and a `last` property that is also a string */
type Person = {
  first: string 
  last: string 
}

/* explicitely define variable type */
let winner: Person; 

// valid 
winner = { first: "Usain", last: "Bolt" }

// invalid 
winner = "Usain Bolt" 
winner = { first: "Usain", last: "Bolt", country: "Jamaica" }
```

In this case, a variable implementing the interface `Person` ensures that the variable `winner` must be an object with a property for `first` that is has a type `string` and property named `last` which is also of type string. 

All variables implementing the `Person` interface must adhere to these rules. They **cannot** have any additional  properties (like `country`), would throw an error and that assining any assignment to the variable `winner` cannot deviate from the rules defined by the interface. Any violation of those rules would throw an error. 

#### Making more flexible interfaces 

In some situations, the rigid definition of types and interfaces can restrict functionality. One such scenario is in the event where there is a collection of items that all have `first` and `last` properties that are both strings, but could have additional properties beyond that as long as the `first` and `last` properties exist. 

This restriction can be circumvented wiht a little creativity by adding a little bit to the the type definition: 

So if the goal was to have enable the scenario where we have a collection of objects that have `first` and `last`  properties that are `string`s, we can specify that an additional property named as a `string` will have an associated type of `any`, enabling greater flexibility through polymorphism. 

> This is just like a dictionary 

```ts
/* adding an addtional key value pair to be stored with any name and any value */
type Person = {
  first: string 
  last: string 
  [key: string]: any 
}

/* explicitely define variable type */
let winner: Person; 

// valid 
winner = { first: "Usain", last: "Bolt" }
winner = { first: "Usain", last: "Bolt", country: "Jamaica" }
winner = { first: "Usain", last: "Bolt", fast: true }

// invalid 
winner = "Usain Bolt" 
```

### Types and Functions 

In addition to defining types and interfaces for variables, TypeScript enables (and encourages) defining types for functions in terms of both parameters and return values. 

Function parameters are defined using the same syntax as type/interface declarations, and the return value of a function is placed after the closing parenthesis of the input parameters and before the function body using the a colon (`:`):

```ts
/*Function to raise x to a power of y WITHOUT type declarations */
function pow(x, y) {
  return Math.pow(x,y) 
}

/*Function to raise x to a power of y WITH type declarations */
function pow(x:number, y:number):number {
  return Math.pow(x, y) 
}
```

Function that do **not** return a anything, (like event listeners, side-effects, etc.) should be defined as having a return type of `void`. 

```ts 
/* Example of a functiont that does not return any value */
function handleClick(event:React.MouseEvent):void {
  // ... execute event handler 
}

```

By defining the parameters and return values of functions, the TypeScript compilier can:
* validate parameters to functions are of the correct type 
* validate the return value of a function


### Strongly typed data structures

Arrays declared in TypeScript _without_ a type annotation work exactly as they would in JavaScript - in other word's it doesn't matter the data type of the each element within the array; the first element in the array could be a `string`, the second could be a `number` and the third a `boolean`.... And that would be totally valid. 

```ts 
/* declaring an array without a type will essentially "opt out" of 
 * the safe-gaurds provided by TypeScript */ 
const arr = [] 

/* So we can add elements to the array of any type */
arr.push(1) 
arr.push('Susan')
arr.push(false)
```

While this makes working with arrays very flexible; as a developer writing a function in TypeScript using arrays without a type annotation means that we have no way of insuring that every element in the array is of the same type. 

By declaring the array as strongly typed, the we can be sure at compile time that every element we add to that array aheres to the type declaration. In the event that a call is made to add an element to the strongly typed array that does not adhere to the type definition will result in an error being thrown. And best of all; this will be thrown at compile time. 

Adding typing is the same as it is with variables. First declare the name of the array variable, then a colon (`:`) followed by the `type` or `interface` and terminated with opening and closing brackets (`[]`) to indicate that it is an array where every element in the array adheres to the `type` or `interface` defined.   

```ts 
/* strongly typed array of numbers */
const arr: number[] = []`
```

With strongly typed arrays, IDE's like visual studio will be able to auto-complete property calls to elements in the array (assuming they are not a primitive data type). This can be useful when working with complex or irregular objects as well as increasing performance through optimization (in some cases). 

```ts
/* declare an interface */
interface Person = {
  first: string 
  last: string 
  age: number
}

/* every element within the array must adhere to 
 * the rules defined in the interface or type annotated, 
 * in this case: the person interface */
const people:Person[]; 

people.push({ first: 'Barack', last: 'Obama', age: 59}) // valid 
people.push({ first: 'Steve', last: 'Jobs' }) // throws an error 
```

#### Tuples 

TypeScript builds on this strong typing of arrays by enabling definition of a "tuple", which (in TypeScript) is a strongly typed, fixed length array. 

```ts 
/* declare a tuple that has 3 elements, 
 * the first being a number, 
 * the second being a string
 * and the thirds being a boolean */
type Contestant = [number, string, boolean ]
```

To create a tuple of this type we annotate the variable with the type `:Contestant`: 

```ts 
/* Custom Type */
type Contestant = [number, string, boolean ]

/* Create Tuple from Type */
const competitors: Contestant = [24, 'Tony Robbins', false] 
```

> Note: with the `type` definition above, we cannot initialize a variable of type `Contestant` to an empty array (`[]`), rather it must be declared with elements matching the types/interfaces declared by the tuple's `type`


### Generics 

In order to implement functionality where behavior has been abstracted so that the logic implemented can be repeated with different varaible types, TypeScript offers "generics". 

This abstraction of behavior with generics is pervasive in Framework's like [Angular](https://angular.io/). Generics is also common in a variety of Software Engineering design principles and patterns like the ["observer" pattern](https://sourcemaking.com/design_patterns/observer). In the observer pattern; a one-to-many relationship is defined between an object and all it's "obsevers" such that anytime the "subject" or the object being observed changes, every "observer" is updated automatically. 

To declare a generic in TypeScript we using angle brackets (`<>`) enclosed with an alias (often "T": `<T>`) representing an abstraction of the object that is being added the "generic" logic or functionality defined by in the generic type definition.  

In TypeScript this might look something like: 

```ts 
/* declare generic type of "Observable" 
 * with the variable `T` representing 
 * any object that where "Observable" 
 * functionality is needed */
class Observable<T> {
  /* define that any observable will have a public property 
   * named `value` */
  constructor(public value: T) {}
}

/* explicitly declare an observable number */
let importantNumber: Observable<number>; 

/* explicitly declare an observable person */
type Person = { first: string, last: string }
let importantPerson: Observable<Person>;  

/* implicitly declare an observable number */
let secondPassed = new Observable(23) 
```

With generics, logic and functionality can be created without knowing the type of data (primitive or structured) that will implement the abstracted ("generic") logic. 

## And that's the basics 

Hopefully by this point you've got a basic idea of what TypeScript is, what benefits and drawbacks TypeScript offers when compared to JavaScript and the basics of defining, implementing and using strongly typed variables, interfaces, arrays, and the abstraction of typing using Generics. 

