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
