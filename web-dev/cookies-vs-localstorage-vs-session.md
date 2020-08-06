# Storing data in a browser 

There are 3 main ways to store data within a browser. 
1. Cookies 
2. Local Storage 
3. Session Storage 


### Similarities: 
- Stored within the browser (Chrome, Opera, FireFox, etc.)
  - data will not be shared between browsers 
- Deletion: 
  - Can be deleted by the user (client-side) at any time 


### Differences: 
- Capacity: 
  - Cookies (up to 4kb)
  - Local Storage (up to 10mb)
  - Session Storage (up to 5mb) 
- Browser Support 
  - Cookies is the only way to store data in browsers that do **not** support HTML 5 
- Accessibility of Information: 
  - Cookies can be accessed from any window/tab (same browser)
  - Local Storage can be accessed from any window/tab (same browser) 
  - Session Storage can be accessed from only the **same tab** 
- Expiration 
  - Cookies expire at a manually set (developer defined) time 
  - Local Storage never expires 
  - Session storage expires when the tab is closed 
- Storage Location
  - Local Storage and Session storage are stored only in the client's browser 
  - Cookies are stored in both the client browser and the web server 
- Send with HTTP requests: 
  - Cookies is the only one that is sent (by default with HTTP request)
    - This means that large cookies are will slow down HTTP requests 



## Browser-based Storage Use & Syntax 

### Local Storage 

If you are familiar with the concept of a dictionaries, then Local Storage should seem pretty comfortable for you. If not, let's review: 

A dictionary (in programming) refers to a data structure that organizes information into _key_ and _value_ pairs. A few things to understand about dictionaries: 
- dictionaries are collections that are **unordered** 
- dictionaries only can have **1 value per key**, any new value for a duplicate key will overwrite the prior value 
- most dictionaries can use any variable type (integer, string) for **either** the key or the value
- items cannot be added to a dictionary without a key 

Below is an example in C# to illustrate the concept: 
```cs
// create a new dictionary 
var dictionary = new Dictionary();    

// create our key, value pair 
var key = 1;                         
var value = "This is the first item in the dictionary"; 

// add new dictionary entry 
dictionary.add(key, value); 
```

