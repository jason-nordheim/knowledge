# Getting Started with C++ 

C++ is an extension of the older programming language C and was the inspiration for the syntax associated with Java. 

Despite similarities in the syntax between C++ and Java, Java is a higher-level computer language (_closer to machine code_).

## Compiled 

C++ is a compiled language that _looks_ very similar to Java. However C++ code is compiled twice (2). 

First the code is passed to a _preprocessor_ and then to _compiler_ to create the compiled program. When C++ files are processed by the prep

## Data Types 

Data Types in C/C++ can be broken down into three categories: 

1. **Primary** (e.g. "primitive" data types ) data types are the predefined data types that can be used directly to declare variables. 
    * integer (`int`)
    * character (`char`)  
    * boolean 
    * floating point 
    * double floating point 
    * void 
    * wide character 
2. **Derived** data types are "derived" from the primitive data types 
    * function 
    * array 
    * pointer 
    * reference 
3. **Abstract** or **User defined** data types are defined by the user =. 
    * class 
    * structure 
    * union 
    * enum 
    * Typedef 


### Primary & Primitive Data in C/C++ 

**Integers** (keyword: `int`) typically requires **4 bytes** of memory space and can hold values from -2147483648 to 2147483647.

**Characters** (keyword: `char`) store letter/glyph values and typically require **1 byte** of memory, with values ranging from -128 to 127 or 0 to 255 (unsigned). 

**Boolean** (keyword: `bool`) stores _true_/_false_ values, also known as logical operators or booleans. 

**Floating Points** (keyword: `float`) is used for storing _single precision_ decimal (e.g. "floating") values and typically require **4 bytes** of memory. 

**Double Floating Points** (keyword: `double`) is used for storing double precision decimal (e.g. "float") values and typically require 8 bytes of memory. 

**Void** data types represent a _valueless_ entity, and is used to represent functions that do _not_ return a value. 

**Wide Characters** (keyword: `wchar_t`) represents a letter or glyph like a character (`char`) datatype, but can store a wider range of values and requires **2-4 bytes**. 

#### Modifiers 

Datatype modifiers are used in conjunction with the primary or primitive data types to modify the length of data that can be held. 

There are four (4) datatype modifiers in C++: 
1. Signed 
2. Unsigned 
3. Short 
4. Long 

Data-types that can be modified by the **signed** & **unsigned** modifiers includes _Integers, Characters, and Longs_ 

Data-types that can be modified by the **long** modifier includes _Integers and Doubles_ 

Data-types that can be modified by the **short** modifier **only includes** integers. 

> **Signed vs. Unsigned**: _signed_ numbers contain a  a _sign bit_ which designates if the value of the number is negative or positive. C++ also supports _unsigned_ values in each of these. _Unsigned_ versions of `long`, `int`, `short`, and `char` are always treated as representing positive (e.g greater than 0) numbers. Since _unsigned_ integers and _signed_ integers consume the same amoutn of memory and the _unsigned_ integers do **not** store negative values, the maximum positive value associated with each _unsigned_ number is twice that of its _signed_ counterpart. 

These modifiers can be chained or combined together in the following ways: 

| datatype | size (bytes) | value range | 
|:--- |:--- |:--- | 
| short int | `2` | `-32,768` - `32,767` | 
| unsigned short int | `2` | `0` - `65,535` | 
| unsigned int | `4` | `0` - `4,294,967,295` | 
| int | `4` | `-2,147,483,648` - `2,147,483,647` | 
| long int | `8` | `-2,147,483,648` - `2,147,483,647` | 
| unsigned long int | `8` | `0` - `4,294,967,295` | 
| long long int | `8` | `-(2^63)` - `(2^63)-1` |
| unsigned long long int | `8` | `0` - `18,446,744,073,709,551,615` | 
| signed char | `1` | `-128` - `127` | 
| unsigned char | `1` | `0` - `255` | 
| float | `4` | | 
| double | `8` | | 
| long double | `12` |  | 
| Wchar_t | `2` or `4` | 1 wide character | 

> In case you were wondering: `(2^63)` = `9,223,372,036,854,775,808`

You can see this for yourself by running the following: 

```cpp
// C++ program to sizes of data types
#include<iostream>
using namespace std;
 
int main()
{
    cout << "Size of char : " << sizeof(char) 
      << " byte" << endl;
    cout << "Size of int : " << sizeof(int)
      << " bytes" << endl;
    cout << "Size of short int : " << sizeof(short int) 
      << " bytes" << endl;
    cout << "Size of long int : " << sizeof(long int) 
       << " bytes" << endl;
    cout << "Size of signed long int : " << sizeof(signed long int)
       << " bytes" << endl;
    cout << "Size of unsigned long int : " << sizeof(unsigned long int) 
       << " bytes" << endl;
    cout << "Size of float : " << sizeof(float) 
       << " bytes" <<endl;
    cout << "Size of double : " << sizeof(double) 
       << " bytes" << endl;
    cout << "Size of wchar_t : " << sizeof(wchar_t) 
       << " bytes" <<endl;
     
    return 0;
}
``` 

The output should look something like: 

```
Size of char : 1 byte
Size of int : 4 bytes
Size of short int : 2 bytes
Size of long int : 8 bytes
Size of signed long int : 8 bytes
Size of unsigned long int : 8 bytes
Size of float : 4 bytes
Size of double : 8 bytes
Size of wchar_t : 4 bytes
```

##### Overflow and Numeric Constants 

Since primitive data types have a specified size, they can never be assigned a value in excess of that size. Attempting to assign a value beyond the available range will result in an error known as an "overflow error".  

> **overflow** - the scenario in which a primitive data type is assigned a value beyond the allocated range 

When declaring a number explicitly in C++ applications there are a few things to keep in mind: 
1. commas (`,`) should always be omitted. 
2. integers are assumed (if not explicitly stated) to have an `int` data type, and will be subject to the limitation of the `int` range. 

Numbers explicitly defined (e.g.`253`) in C++ applications are known as **Numeric constants**. The range of values for a _numeric constant_ can be changed from the default integer (`int`) data type to a long using a `L` after the number (e.g. `123456789L`), adding a `U` indicates an unsigned integer (e.g. `123456789U`) and to indicate an unsigned long `UL` is used (e.g. `123456789UL`). 

Numbers with a decimal value include floats (unsigned/signed) and doubles. Any _numeric constant_ declared with a decimal value is stored as a double (8 bytes of memory) by default. 

Larger _Numeric constants_ can be shortened and declared using teh `E` notation, which defines a number in terms of powers of 10 (e.g. `234.5E12` would indicate 234.5 * 10^12 and 234.5E-12 would be 234.5 * 10^-30). 

# Syntax 

### Free form 

C++ is a known as a _free form_ programming language. This is in reference to the way that whitespace is processed by the compiler. 

In most places, an end-of-line is treated like a blank, and blanks tabs, or end of line characters are processed as a single blank. However, this does not apply to _string constants_ (e.g. `"I am a string constant"`), which must be placed entirely on one line. Multiline _string constants_ would use the new line character _string constant_ `\n`. 

Exceptions: 
* _string constants_ 
* single line comments 
* preprocessor directives 

### Comments 

Comments in C++ look just like Java comments: 
* Single line comments are made using `//` 
* Multi-line comments begin with `/*` and terminate with `*/`

#### Variables  

**Variables** hold **one** (1) item of a given type. A variable is comprised of three parts: 
1. _type_ the data-type of the variable (e.g. integer, character, float, double, etc.) 
2. _name_  a defined name of a variable (e.g. `disk`, `amount`, etc.)  
3. _value_ what the variable is holding (e.g. `6`, `"a"`)


Creating a variable is known as "declaring" a variable, or as a "variable declaration statement". A variable **must** be declared with a _type_, a _name_, but the _value_ is optional. 

Once declared, variable cannot change data types, but can be "re-assigned" to a new value. Assigning a new value to a variable will replace the existing value. 

```cpp
// variable declaration 
// declare type, then name, and terminate with semi-colon
int x; 
```

**Variable names must start with a letter**. After the first character (letter), variables names can be comprised of as letters, digits, and underscores. Variable names **cannot contain spaces**. 

**Casing matters** 

C++ is case-sensitive, so variables with the same name and different cases are treated as different variables (e.g. `Size` and `size` are both valid names, but will represent different variables since the `s` character is capitalized in one case, and lowercase in the other). 


Variables of the _same type_ can be declared together, separated by commas: `double width, height, length;`. 

Once a variable has been _declared_, it can be assigned and re-assigned value as often as required as long as it is of the same _type_ and has a value within the range of the declared data _type_. 

Changing a value is done through _assignment statements_ which do not include the type declaration. 

```cpp
// variable assignment 
int x = 0;

// variable re-assignment 
x = 3; // notice: no type declaration 
```
#### Initialized vs. Uninitialized Variables 

**Initialization** is the process in which variables are _declared and **initialized**_. 

**Initialized** variables are _declared_ with a value. 

**Uninitialized** variables are variables _declared_ with a type, but no value. 

```cpp 
// declaring an uninitialized variable 
int x; 
// declaring an initialized variable 
int y = 0; 
```

Variables of the same type can be declared concisely in a single line separated by commas (`,`)

```cpp
// declaring multiple initialized integers 
int w = 0, n = 1;
```

### Operators, Expressions and Arithmetic 

The basics of working with numbers includes performing arithmetic, evaluating operators and expressions. 

* Numbers can be added together using the _addition operator_ `+` (e.g `x + y`). 
* The difference between two numbers (subtraction) can be found using the _subtraction operator_:`-` (e.g `x - y`). 
* The product of numbers can be calculated using teh _multiplication operator_ `*` (e.g. `x * y`).
* The quotient of a number can be found using the _division operator_ `/` (e.g. `x / y` ). When dividing integer values, the _decimal portion of the number will be discarded_. In other words; getting the quotient of `7/4` would result in `1`, not `1.75`.   
* The **remainder** (aka **modulus**) can be found by applying the _modulus operator_ `%`. This will return the amount remaining when after a quotient is calculated (e.g `14 % 3` will be return `2` since `14` divided by `3` can only go into `14` three times (up to `12`), leaving a _remainder_ of `2`). 

Operators are always executed from _left to right in the order of precedence_, unless precedence is overridden with parenthesis. 

#### Shorthand Operations 

Arithmetic operators is enable changing a value of a variable, but arithmetic operations such as _operator assignment_ (e.g. `n = n + 5` or `x = x + e` ) , _incrementing_ (e.g. `n = n + 1`) and _decrementing_ (e.g. `n = n - 1`) are performed so commonly that C++ has a shorthand to declare these more concisely. 

```cpp
int x = 10 
/* Integers can be incremented by 1 using x++ */
x++; // same as `x = x + 1` => 11

/* Integers can be decremented by 1 using x-- */
x--; // same as `x = x - 1` => 10 
x--; // => 9 

/* Operator assignment can be used to shorten the syntax 
 * for an of the binary operators: +, -, *, etc. */
x += 6; // same as `x = x + 6` => 15 
x *= 2; // same as `x = x * 2` => 30 
x /= 5; // same as `x = x / 5` => 6 
```

### Variable Constants 

A _constant_ is a variable that cannot change. _Constants_ are initialized with the same syntax as regular variables, but are prefixed with the `const` keyword: 

```cpp 
// constant declaration 
const int pi = 3.1415926536; 
```

It is a good practice to use constants whenever there is a need to hold a value that should not, or will not change. 

### Arrays  

Arrays are data structures used to contain a _collection of values_. Each value in an array is referred to as an _element_. Each element or value of an array is referred to by it's _index_. Arrays have "zero based indices" because the first element in an array is at index `0` not index `1` (that would be the second element in the array). 

**Rules of Arrays (in C++):** 
* Arrays must be declared **before** they can be used.  
* Every variable (e.g. "element") in the array must be of the **same type** (data type). 
* Arrays have **fixed sizes** (e.g. the size cannot be changed after it is created) 

```cpp
// declaring an integer array with space for 10 integers
int myArray[10]; 
```

> The _single point of modification_ principle of software design states that "when you make an arbitrary decision while writing software, wherever you can, make it so that you can change that decision by changing one line" 

### Statements 

_Statements_ are _commands_. They tell the computer to do something. Defining, assigning, and re-assigning variables is done through _statements_ and every _statement_ in C++ **must** be terminated with a semi-colon (`;`). 

> Note: Variable declaration, variable assignment/re-assignment, expressions, operations, and arithmetic are all examples of statements. 

Statements are executed from the **top-to-bottom**, and **right-to-left**. In other words, the expression on the right side of the `=` sign is computed, _then_ assigned to the variable on the left side. 

```cpp
// variable declaration  
int x, y; 
// variable assignment 
x = 40;  
y = x + 10; // y = 50 
```

When assigning (or re-assigning variable) to the another value (e.g. `x = y`), the value associated with the variable on the _right side_  is assigned to the variable on the _left side_ based upon it **current value**. If the variable on the _left side_ receives a new value later on, the variable on the right will **not** not change. 

```cpp
int y, x; 
x = 0; 
y = x; 
x = 10; 
/* `y` still `= 0` because `x = 0` when the assignment statement for `y` was executed */ 
```

#### Compound & Nested Statements 

A **compound statement** is a statement that defines more than one operation or command that should be executed together. Compound statements are denoted with curly braces (`{}`) to indicate the statements that need to executed together. An opening curly brace (`{`) defines the start compound statement, and a closing curly brace (`}`) defines the end of a compound statement. 

```cpp
// compound statement declaration & initialization 
{
    x = 2; 
    y = 0; 
}
```

A **nested statement** is a **compound statement** has single statements, **and another compound statement** inside. 

```cpp
// nested compound statement 
{
    int x = 0; 
    {
        int y = 1; 
        int g = 34; 
    }
}
```