# Diving into TypeScript 

## What is TypeScript 

[TypeScript](https://www.typescriptlang.org/) is: 
* a super-set of JavaScript 
* open-source 
* statically typed langauge 
* strongly typed language 

## What's the appeal? 

As a developer that got started with programming in the [strongly typed langauge](https://stackoverflow.com/questions/2690544/what-is-the-difference-between-a-strongly-typed-language-and-a-statically-typed) of C#, learning the "langauge of the web" (JavaScript), was something relatively uncomfortable for me, primarily due to concept that I could assign any variable to any data type at anytime (without casting); felt uncomfortable and wrong to me. 

### Strongly and Weakly typed languages 

Weakly typed langauges (like JavaScript) felt like the Wild West, like all the rules had been thrown out, and anyone could do whatever they wanted. 

I missed the sense of confidence that a strongly typed langauge offered by simply verifying that variable assignments were valid by checking to see if they assignment to the variable was valid for the variable type declared - providing feedback at compile time rather than at runtime and enabling developers to catch errors before the code was ever run. 

Arguably, strongly typed langauges offered something even more impactful to me as a developer... the tooling  integrated into IDE's like [Visual Studio Code](https://code.visualstudio.com/) or VS Code: 
* intelligent code completion of methods/function, variables, fields, classes, interfaces, modules, properties/attributes, and more.
* in-line access access to third-party library documentation

These two features were instrumental in my workflow with C# and helped me find problems ("bugs") before ever running my code. 

## Weighing Pros and Cons

While I personally love the structure that comes with strongly typed languages, I would feel remis if I didn't mention the benefits of weakly typed languages: flexibility. 

With weakly typed langauges, a function can return one value type in one case and a totally different value type in another instance, no overloading required, no interfaces required - it just works. The compilier doesn't care about the type of values provided to a function, class or method - nor does it care if about the type of the return value. In other words, I could provide an array, or an integer, or a decimal, or a string to a function/class/constructor (in a weakly typed langauge) and the compilier won't care. 

For example I could have a function that takes two arguments/parameters and adds them together; but since the data is "weakly typed" these parameters could be of any data type, and the function could return any data type, or nothing at all - the compilier won't complain either way. 

```js
// function to add 2 variables together 
function add(x, y) {
  return x + y 
}

add(2,3) // => 5 (number)
add('2', '3') // => '23' (string)
```

In the example above, providing each variable as a number results in addition, but providing the same values represented as strings returns a concatenated string comprised of the parameters. 

This generally results in more concise code that avoids interfaces, type declarations, and casting that would be necessary to compile code in a strongly typed langauge. Some would argue it allows the developer to be more expressive and more flexible (polymorphism, mixins, etc.). 

However, since the compilier has less information on the structure (parameters, return value, etc.) of the code, common errors that would be checked and verified with strongly typed langauges are not caught by the compilier in weakly typed langauges until the code is executed. Additionally, strongly typed langauges are (somewhat) self-documenting; allowing editors to pick up on the names, types, and return values of functions/methods/procedures and provide this inline (within the code editor) as the code is being written. 

In short, Weakly typed langauges benefit from: 
* more concise code 
* more flexible code 
* more expressive code 

While, strongly typed langauges benefit from: 
* Implicit documentation 
* Fewer errors at runtime via strong typing 
* Increased performance through optimization (sometimes)

> And **in my opinion** strongly typed langauges make it easier to work with third-party libraries by enabling in-line documentation of TypeScript code. 

## Enter TypeScript 

As if to address my concerns (and those of other developers), [TypeScript](https://www.typescriptlang.org/) was created developed by Microsoft in 2012, primarily to address the IDE tooling described previously, without requiring client-side adoption of new technologies since TypeScript was built as a superset of JavaScript and can be compiled to any version of JavaScript all the way back to ECMAScript 3 (released in 1999) and giving developers the type-checking of strongly typed langauges without the road-blocks of an entirely new programming langauge of the web that would require browsers to be updated to support the new langauge. 

Adoption of TypeScript in the Web Development community has been relatively slow since its release in 2012; but it seems to be spiking now as many popular frameworks adopt and support TypeScript.

So what does a developer need to know to get started in TypeScript? 


## TypeScript Fundamentals 

First, lets be clear: As a superset of JavaScript, all JavaScript is valid TypeScript - which means that adoption of TypeScript can happen incrementally. TypeScript also provides (on top of JavaScript): 

* Future Proofing - Since TypeScript cannot run in its default state, but must transpiled into JavaScript to be executed- developers using TypeScript do not need to be concerned with browser support as TypeScript code can be transpiled into various versions of JavaScript with release dates as far back as 1999 (which the TypeScript compilier does by default). 
* The TypeScript compilier is configurable - enabling developers to configure how TypeScript code is converted into JavaScript and which version of JavaScript TypeScript code should be transpiled to. 

### Installation 

TypeScript can be installed via [NPM](https://www.npmjs.com/get-npm) using the command `npm install -g typescript` which will install the TypeScript compilier globally. Once installed, we can see what version of typescript we have by running `tsc --version`. 

### Configuration 

There are numerous options that can configure the way the TypeScript compilier transpilies JavaScript code. These options can be executed manually at the time of compilation (as command line arguments) or can be picked up automatically with a JSON configuration; `tsconfig.json` placed in the project's root directory, and will automatically be picked up by the TypeScript compilier. 

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

### TypeScript and Strong Typing 

In TypeScript, variable have strong types. In other words; a variable that holds a number, must always hold a number, and a variable that holds a string; must always hold a string value. With TypeScript the data type associated with a variable can be declared either _explicitly_ or _implicitly_. 

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


### Working with Types in TypeScript 

It is very common in modern web applications that a variables that holds a value that is not a ["primitive" data type](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures). 

#### Custom Types 

With TypeScript, custom "types" can be declared using the keyword: `type` followed by the name of the type (in Pascal case) and setting it equal to (`=`) the type definition. 

Once declared, the "custom types" can be assigned as variable types just like primitive data types. 

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

In this way, TypeScript enables more readable code, while still type-checking variable assignments. 

#### Union Types 

TypeScript goes beyond defining basic type definitions by providing "union types". With union types, not only is the primitive data type enforced, but the actual value is limited to the value(s) defined within the union type declaration.  

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

Another to define the structure of an object or class in TypeScript is through **interfaces**. With an interface, rather than specifying the structure or values of a variable, an interface specifies the shape of an object or class. The best way to understand this is through an example: 


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

By declaring the `interface Person = {...}`, the TypeScript compilier can now enforce that every variable declared to be "using" or "implementing" the `:Person` interface must have the exact structure defined in the interface. 

In this case, a variable implementing the interface `Person` must be an object with a property for `first` that is a `string` and property named `last` which is also a string. All variables implementing the `Person` interface **cannot** have any other properties like `country` (regardless of the data type of `country`), would throw an error. Additionally assining a variable implementing the `Person` interface cannot have a different structure like `bestUser = "My aunt Suzie`. Attempting to assing a variable implenting the `Person` interface described above would create a compile-time error as the variable assignment does not match the interface declaration. 

#### Making more flexible interfaces 

In some situations defining the structure of a variable using an interface can be very restrictive as there cannot be any additional properties to any objects/classes implementing the interface that are not included in the interface definition. A little trick for circumventing this limitation is to declare a "string" property that is of type `any`. This results in dictionary-like functionality, defining addtional fields as key/value pairs. 

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

In this way, we can ensure that all variables of that type have certain base attributes, but can have additional attributes as needed and enabling polymorphic operations. 



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

If you have a function that does **not** return a value, (event listeners, side-effects, etc.), you can specify the return type as `void`. 

```ts 
/* Example of a functiont that does not return any value */
function handleClick(event:React.MouseEvent):void {
  // ... execute event handler 
}

```

By defining the parameters and return values of functions, TypeScript can:
* validate parameters to functions are of the correct type 
* validate the return value of a function

And possibly more important for the maintainability of a project; since the parameters and return values are declared; TypeScript code is _almost_ self-documenting when combined with good naming conventions. 


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

