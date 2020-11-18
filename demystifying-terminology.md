# Demystifying terminology for Code Newbies

Getting started as a developer can sometimes be overwhelming. There is a multitude of terms, concepts, and acronyms vital to becoming proficient as a software developer. The goal with this post, is to define the fundamental terms, concepts, and acronyms necessary to read and understand technical blogs and documentation, so that `#codenewbies` can "hit the ground running". 

## The Fundamentals 

### Programming, Syntax, Statements, & Expressions

In the context of Computer Science, the term "coding" is often used synonymously with "programming". Loosely defined, "programming" is the process in which instructions and information are strictly defined in a format that can be understood by a computer. Programming or coding is used to create a **package** or **program**. 

The information and instruction are sequenced into small units of work commonly called "statements" or "expressions". The term "statement" is often used interchangeably with the term "expression" because they have very similar meanings, however it should be noted that they are non synonymous.

The format of code is defined by a strict set of rules called "syntax". Syntax describes the way in which Syntax is not universal. Most programming languages require different These detailed instructions must adhere to strict rules known as "syntax". **Syntax** is the rules and format unique to the programming language used. Syntax defines the characters and 

The process "programming" (i.e. "coding") results in a plain text file called a "program". Most developers and software engineers today create programs written in "high-level" languages**. Most programming languages abstract a the actual steps a computer takes, and cannot be run directly by a computer. The plain text file is then translated through a process known as **compilation**, to create an **executable**. **Executables** are files that have been translated from plain text into **machine code**, which is the 

A **program** is the result of "programming". It is a text-file composed of sequenced units of work referred to as "statements" and "expressions". Statements and expressions both represent single piece of information or a single unit of work (e.g. "instruction"/"operation"). A program bundles  statements and expressions (in order) necessary to accomplish a particular outcome into a text file. Statements and expressions both define a single instruction to be executed by a computer. The difference between a statement and an expression lies in the way they are evaluated ("processed"). A statement define an action or step, while an expression is a statement that evaluates (i.e. "results") in a value (e.g. `true`, `false`, `10`, `49.59`, 'B', "Sarah" ...). 

### Variables, Types, Modifiers & Callable Units 

#### Variables & Types 

Variables are _named_ containers that _hold information_. All variables have _names_ to allow re-use the same piece of information in multiple places and are essential to programming. 

Uses of variables 
* Store static (unchanging) information (e.g. placing the same piece of text (title, model number, etc.) in multiple places)
* Keep track of changing information (e.g. selecting a shoe size from the footlocker website)  
* Perform calculations calculate (e.g. a dozen is always `12` of something)

Variables are divided into two broad categories: 
* 'value types' (e.g. "primitive types") 
* 'reference types'. 

The difference between _value type_ variables and _reference type_ variables is in the way the computer stores the information contained within the variable. 

Value-type (or "primitive" variables) are stored allocated space in memory on the stack. Distinct spaces in the memory (more specifically the _stack_), are reserved, then the value is places at that specific place in memory. When value-types are copied into other value-type variables, the computer repeats the process; creating a new space in memory, and then copying the value from the first location to the second. If any changes were to happen to the original variable, or the copied version - only the modified (e.g. "mutated") variable is affected.  The copy's value would remain the same. 

Reference-types variables do not directly store their values in the stack. Instead, reference-type variables place result in two memory allocations. First memory is allocated in a location known as the "heap". The computer than copies the specific location in the heap that holds the value of the new variable, and places a "pointer" or reference in the "stack", that "references" or "points to" the memory address within the heap where the corresponding value is stored. Because the variable stored in the stack is just a pointer, referencing the actual value location, copying a reference type variable copies the pointer (or memory address) of the value, and could result in multiple variables referencing the same value. 

* Includes: Classes, Objects, Arrays, Indexes, Interfaces  

##### Differentiating between the two main types 

Variables are stored differently because of the way memory allocation works. Allocating memory to the "stack" can _only_ be allocated at compile time. Once the application is running, the amount of memory allocated to the stack is fixed. This is perfect for value-type variables because they have known memory requirements. 

* The Stack = static memory allocation 
    * fastest memory location. 
    * memory allocated at compile time
    * directly stores _value type_ variables 
    * stores pointer(s) or references to the value of _reference type_ variables  

Memory in the "heap" is more dynamic. Memory allocation can be defined at runtime, enabling a variable amount of space to hold reference type, and allowing reclamation of memory when it is no longer needed. 

The Heap = dynamic memory allocation 
    * memory allocated at run-time 
    * slower than variables placed in the stack 
    * stores the value associated with a _reference type_


##### Primitive Types 

* Common **value types** variables include: 
    * text
        * **character** (aka "char") is a single unicode character (e.g. `a`, `Z`, `!`, etc.), and are most commonly defined between single quotes (e.g. `'a'`, `'Z'`, `'!'`, etc.)
        * **strings** are a sequences of characters commonly defined between double-quotes (e.g. `"Jason"`, `"Cocoa"`, `"soccer"`, `"The quick brown fox jumped over the lazy sheep dog"` etc.)
    * numbers 
        * **integer**, **short**, **long** are all ways of representing whole numbers and are typically expressed _without_ any wrapping characters (e.g. `1`, `2`, `34325` etc.).
        * **doubles**, **floats** , and **decimals** all representations of number that have decimal values, and are expressed _without_ any wrapping characters (e.g. `3.14159`, `10.0`, `34`, etc.)
    * booleans
        * **boolean** values represent as "true" or "false" (e.g. similar to yes/no)
    * bytes
        * **bytes** can represent a variety of values depending on the language, but by definition are _always_ a whole number (integer) that is between -128 and 127 (inclusively). 


_Some_ caveats to the rules above:
* Letters
    * **strings** and **characters** 
        * Some programming languages use the _same syntax_ for defining characters and strings. 
        * Some programming languages define strings as reference type variables and characters as value-types ("primitive") 
* Numbers 
    * Some programming languages do not require the to explicitly define the specific type of number. In these instances all of the sub-types pertaining to numbers are defined using the same syntax. 
    * Whole Numbers: **integers**, **shorts** and **longs** 
        * Integers, shorts and longs are all whole numbers, but are differentiated by the range of values. Typically shorts have the smallest range (whole numbers between -32,768 & 32,767), followed by integers or "ints" (whole numbers between -2,147,483,648 & 2,147,483,647) and longs have the largest range (between -9.223372e+18 & 9.223372e+18)
        * Some programming languages _do not_ require the developer (e.g. software engineer) to differentiate between integers, shorts and longs. In these languages the term "integer" is used to define any/all whole numbers.  
    * Non-whole Numbers: **doubles**, **floats** and **decimals** 
        * Doubles, floats, and decimals all represent numbers that have a decimal value, but are differentiated by their precision. Typically, floats (also called "single precision" numbers) are the least precision storing 7 digits after the decimal place, doubles ("double precision") offer 15-16 characters after the decimal place and decimals offer up to 29 digits after the decimal place. 
        * Some programming languages do not require the developer (e.g. Software engineer) to differentiate between the various types of non-integer values.

Fundamentally, variables are separated into categories based upon the amount of memory they consume. 

##### Value-type Modifiers 

> Modifiers are a relatively advance concept and not something new programmers _need_ to understand, but hopefully a brief explanation will help those that need or want to use modifiers.  

Modifiers is a feature that is sparsely used in modern programming languages. We use modifiers to reduce memory consumption (and increase efficiency) by allocating smaller amounts of memory to number variables. Modifiers can double the range of a particular number variable by specifying which variables will _always be positive_. 

Typically modifiers are optional, and number variables are presumed to be "unsigned" (or can be negative or positive) when no modifier is specified. When a number variable will _never_ need to hold a negative number, we can apply the "unsigned" modifier. **Modifiers can be added to any type of number variable** 

* Signed - specifies a number variable can be positive _or_ negative 
* Unsigned - specifies a number variable will _always_ be positive 
 
#### Callable Units 

The term "callable units" is an umbrella term describing the grouping of a specific sequence of statements and expressions that _can_ be "called" or executed repeatedly. In software, callable units allow developers to repeat a sequence of instructions one or more times in exactly the same way each time. 

Callable units are broken down into sub-categories known as "procedures", "methods", "functions", "routines" and "subroutines". Every type of callable unit (procedures, methods, function, routines and subroutines) offers the ability to repeated execute the same sequence of instruction, but have have varying characteristics and features. 

> It is important to note that not all programming languages make use of all types of callable units. Additionally, the definition of each can vary slightly between languages. Definitions stated here are designed to provide a high-level understanding that applies in the scenarios new developers are likely to encounter, but could vary depending on the specific programming language or framework being used. 















### Compilation  


  
Differentiating between the two has limited value, but if you're reading this, you're probably curious. 
  
  * **Statement** - A single unit of work in a program 
  
  * Expression
  
  * 
  
  * 

* **Block** 
  
  * A _scoped_ combination of _statements/expressions__ that represent the instructions necessary to accomplish a task. 


