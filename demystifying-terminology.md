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

Value-types store simple pieces of information, while reference-types group related information into a single container (variable). The categories improve improve the efficiency of programs, by changing the way in which the computer stores and retrieves the information (values) inside variables. 

Abstractly, Value-type ("primitive") variables are stored directly in memory, however since reference types store related pieces of information together and usually require greater storage space (memory), computers will store the information contained within reference-types using _pointers_, which hold the actual memory address (location in memory) of the value (information) contained within the reference-type variable.

##### Value types 

* Common **value types**
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
