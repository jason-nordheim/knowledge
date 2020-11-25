# C++ Basics 

## Interacting with applications 

In order for an application to be useful, it must communicate with the user. Most commonly, users interactions occur _graphically_ through graphical user interfaces (GUIs), using a mouse or touch screen. Alternatively, some programs interact with users _textually_ using a keyboard and terminal window. 


## I/O 

I/O is commonly used to stand for "Input and Output". It is 

### Output 

Applications written in C++ (and many other programming languages), will output text ("write") to the terminal by default. In C++ this happens through the **standard output** or `stdout` since this is the simplest way to get applications up an running. The `stout` command can be customized via standard Linux Command Line (CLI) arguments to _redirect_ text output to write to a file instead. 

To redirect `stdout` to a file: 
1. Enter the command (in the case of a C++ application, the C++ compiled C++ file)
2. Append the command with any arguments and/or switch statements. 
3. Append the command, arguments, and switch statements with a use an right arrow (`>`) 
4. Immediately after the arrow (`>`), place the output file/location `>fileName`  

```sh
command args >output.txt 
```

This will redirect the standard output to the specified file 

### Input 

C++ receive inputs via terminal via the **standard input** or `stdin`. Like standard output, standard input retrieves inputs from terminal, but can also be directed to obtain inputs from a file. Similar to `stdout`, `stdin` redirects files using `<fileName`. 

```sh
command args >input.txt 
```

You can redirect input an output by combining the two redirects. 

```sh
command args <input.txt >output.txt 
```

### Basics of the Standard Library 

The standard library for writing text to the console in C++ is the `<cstdio>` library. 

> Note: the term "library" can be used synonymously with "header" or "directive" 

#### Printing and value designators 

To print a string, `<stdio>` provides the `printf(str)` function which stands for "print formatted". Technically the `printf(str)` function can take a variety of parameters, which in the case of `printf(str)`, the string would be referred to as the _format_.  The _format_ can contain _value designators_, each starting with a `%` and arguments. 

When print `printf(str)` is provided a string argument, it parses the string (`str`) for `%`, the next character would specify padding, and then the type of the _value designator_. Once parsed, the _value designator_ is  replaced with the value it represents, formatted as specified by the arguments following the `%`. 

You can include as many _value designators_, as long as there are corresponding arguments passed after the _format_ string. The values will be substitutde in the order they were provided. 

code: 
```cpp
int x = 25;  // integer 
int y = 500.00;  // decimal 
printf("x = %i and y = %d\n", x, y); 
```
output: 
```
x = 25 and y = 500
```

The type of value being represented by the _value designator_ can be specified by adding `i` (for integer values) or `d` (for decimal) among others: 

| type | value designator | 
|:-----|:-----------------| 
| integer | `i` | 
| decimal | `d` | 
| long integer | `li` | 
| double | `lf` |  
| scientific notation | `le` | 


_Value designators_ are designed to make text more **readable**. 

##### Field width & Value Designators 

Most commonly, _value designators_ are used to format output to _field width_. _Field width_ format is similar to a tabular format, each value consumes the same amount of space such that each value is either aligned to the left or to the right.

Formatting with _field width_ is done by placing an integer value _before the type designation_. This will add spaces to the left of the printed value **up to the specified number fo characters** (e.g. "right alignment"). 

> Important: If the value is **larger than the specified number of characters**, it will **not** be shortened**. 

code: 
```cpp 
// positive "field width" example 
printf("%6i%4i\n", 45, 300);
printf("%6i%4i\n", 25000, 2);
printf("%6i%4i\n", 500, 27);
```
output: 
```
    45 300
 25000   2
   500  27
```

To align values to the _left_, a negative _field width_ is specified, and spaces will be added to the right of the value as necessary. 

code: 
```cpp 
// negative "field width" example
printf("%-6i%-4i\n", 45, 300);
printf("%-6i%-4i\n", 25000, 2);
printf("%-6i%-4i\n", 500, 27);
```
output: 
```
45    300 
25000 2   
500   27  
```

> Notice the difference in the alignment of the values between the _negative_ and _positive_ field width examples. 

##### Using an asterisk to specify _field width_

Adding an asterisk (`*`) before the _type_ of the _value designator, specifies that the _field width_ will be provided as a first argument (e.g `n`), while the actual value will be provided as the second argument (e.g `n + 1`). 

code: 
```cpp
printf("Formatting asterisks %*i %*i", 10, 1521, 10, 2121);
```
output:
```
Formatting asterisks       1521       2121
```

##### Formatting doubles and floats 

With the `lf` (which stands for "long float") _value designator_ is used, the number of digits to be shown _after_ the decimal point can be specified along with the number of characters to be printed _before_ the decimal point. 

For example, using a _value designator_ `%10.2lf` specifies that there should be `10` characters displayed before the decimal, and `2` characters after the decimal. 

code: 
```cpp
// printing numbers with decimal values 
// long float (aka double) example
double stddev = 450.346; 
printf("The standard deviation is %10.2lf\n", stddev); 
```
output: 
```
The standard deviation is     450.35
``` 

_Value designators_ are designed to make formatting output much easier by allowing us to specify consistent formatting for printing values. By formatting the printed values the output can have consistent alignment making the output more readable. 

##### Formatting large numbers 

It can be useful to use _scientific notation_ to format very large numbers or very small numbers. Here we use the type designation `le`. The number _before_ the decimal place will still designate the padding (positive or negative) to be placed around the number, will the value after the decimal will specify how many decimal places should be shown in the output.  

code: 
```cpp
double maxInt = pow(2, 64); 
printf("Scientific notation %1.2le\n", maxInt); 
``` 
output:
```
Scientific notation   1.84e+19
```

#### Input with the Standard Library 

The C++ standard library (`<cstdio>`) provides the `scanf` function for reading values. 

The `scanf` function takes in the format string, which describes what is going to be read (input), followed by a list of _memory addresses_. 

It will look something like 


##### Memory Address 