# Getting CSX 

Before every great solution, there must first be a problem... and one of the biggest problems developers and designers culminates in the user-interface. 

In fact, most developers would likely agree, the UI is the hardest part; there's so many varrying strategies, design patterns, recomendations and best-practices, many of which differ enormously from one-another. 

CSX serves to make using CSS in the `typescript`/`javascript` world. 

> Note: for the remainder of this post, please be aware that when I reference 'CSX', I am referring to the design pattern described in this article, as well as the packages (JavaScript Libraries required for the CSX pattersn to be used )

In order to implement CSX (see note above for greater detail), we must first install the required libraries, but before we get to that, I'd like to breifly touch on why its worth it. 

Through CSX and typescript developers are able to strongly type their code, allowing IDE's (Integrated Development Environments) to offer more assistance to developers and alert them to errors prior to runtime/compile time, and possibly most valuable, strong typing allows us to fully use IDE's to be more efficeint developers, and thus it would make sense that better tools, would result in a better product. This is what CSX (think JavaScript CSS like JSX) attempts to integrate as a small, yet impactful code library. 

So what are the libraries I've alluded to? 

1. `csx`
    * Serves to streamline color management accross an application 
    * Install via (NPM)[https://www.npmjs.com/package/csx] `npm install csx` 
2. `typestyle`
    * Makes CSS type-safe (imperative for using with TypeScript projects)
    * Super small (~6k gz)
    * Install via (NPM)[https://www.npmjs.com/package/typestyle] `npm install typestyle` 
3. 


# TypeStyle or `typestyle`

The whole `typestyle` library centers around a single function: `style()`, which we import from `typestyle` liike so: 

```ts
/** 
 * Import Style Function 
 * ==================================================================
 **/
import { style } from "typestyle"; 

/**
 * Signature: 
 * ==================================================================
 * style(...objects: NestedCSSProperties[]): string
 **/ 
```

The function above allows you to generate a "className" object (JS/TS) that can be used in frameworks to style an element. 

So (as an example) if we wanted to declare something to be the `color` `red`, we would create a "className" object that defines that: 

```ts
/** Import `style` function  */
import {style} from "typestyle";
 
/** Use `style` function to create a "className" */
const className = style({color: 'red'});
```

After that, all we have to do add the "className" object to our JSX element:  

```tsx 
/** Import `style` function  */
import {style} from "typestyle";
 
/** Use `style` function to create a "className" */
const className = style({color: 'red'});

/** Add the className object created to our Component (React) **/
const MyButton = ({ onClick, text }) => <button className={className} onClick={onClick}>{text}</button>
```

In Summary: 

```tsx
/** Import */
import {style} from "typestyle";

/** convert a style object to a CSS className object */
const className = style({color: 'red'});

/** Usage with React */
const MyText = ({text}) => 
  <div className={className}>
    {text}
  </div>;

/** Use the component */
<MyText text="Hello world!"/>
```

> If you look at the CSS of the elements/components recieving the class name, The css rendered in the browser  will look something like `f14svl5e`, this is basically a hash of the style objects passed to style. In the background style has gone ahead and also inserted CSS like `.f14svl5e` { color: red } into the document so using this class name with any framework has the desired effect of styling the element.

# `csx` 


