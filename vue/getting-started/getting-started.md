# Getting Started with View 

View is a declarative and progresive web framework that is designed from the ground-up to be incrementally adoptable by focusing solely on the view layer. 


## The Basics 
To create a `Vue` instance connecting the Vue JavaScript framework with the HTML document, you must either have the Vue framework installed and referenced in your project, or link to a CDN.  

```html 
<!-- index.html -->
<html>
    <head>
        <link rel="stylesheeet" href="index.css">
        <!-- Import the view framework via CDN -->
        <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    </head>
    <body>
        <!-- we will use this ID to set the root element for Vue.js -->
        <div id="app">
        <!-- We use double curly brace syntax to reference information contained in the 'data' element of the Vue , this is called a "template literal" -->
            {{ message }}
        </div>

        <!-- Link to associated View/Vue -->
        <script src="index.js"></script>
    </body>
</html>
```

```js
// index.js 
var app = new Vue({ 
        el: '#app', /* the sets up the connection to the root element of the application */
        data: {
            message: 'Hello Vue!', /* an property defined in the `root` of data will be immediately accessible between double {{}}curly braces in a HTML document */ 
        }
    }
)
```

Now any change this `data` object within the associated `Vue` changes, the associated data in the HTML template will also be re-rendered. 

If you don't believe me, open up the JavaScript console and change the value of `app.message` and take a look at the HTML page in your browser? (it should be displaying the new value) 

Now that `Vue` is connected to our HTML, we no longer need to interact with it directly, but rather through our instance of `Vue({...})` which is connected directly to our `<div id="app">`


### Directives 

**Directives** in `Vue` are HTML elements that are prefixed with `v-` which indicates that they will have special properties provided by Vue. So if we have something like `v-bind`, we are telling view that we are about to "bind" some piece of data as an attribute to an HTML element, effectively; we can bind JavaScript code to attributes of an HTML elements to add functionality. 

```html
<div id="app">
    <span v-bind:title="message">
        Hover your mouse over this text for a few seconds to see when you loaded the page. 
    </span>
</div>

<script>
var app = new Vue({
    el: '#app', 
    data: {
        message: `This page was loaded at ${new Date().toLocaleString()}` 
    }
})
</script>
```

This would be effectively equivilant to: 

```html 
<div id="app">
    <span title="This page was loaded at CURRENT DATE/TIME">
        Hover your mouse over this text for a few seconds to see when you loaded the page. 
    </span>
</div>
```

... except that native HTML doesn't allow us to dynamically generate text so we would have to do something like this: 

```html
    <div id="app">
        <span>
            Hover your mouse over this text for a few seconds to see when you loaded the page. 
        </span>
    </div>
    <script>
        const span = document.querySelector('#app > span')
        span.setAttribute('title', `This page was loaded at ${new Date().toLocaleString()}`)
    </script>
```

### Redering Collections 

As is common in programming, we often need to iterate ("loop") through data sets and display information from the objects being iterated ("looped") through, view does this by attaching a "for" (`v-for`) to the element to be rendered for each object being iterated over. 

So if we had a collection of todo's, we could display each of them using the `v-for` directive, which will take a string argument that includes an alias which will represent each object as it is iterated through, and the name of the collection within the data set containing the objects to loop through. 

That sounds complicated, but in practice it looks something like this: 

```html
    <!-- 
        Target Root Element 
    -->
    <div id="app"> 
        <ul>
            <!--    
                Element to display each iterated object
                along with an alias ("todo") of what each item will be called from the speciefied collection ("todos")
            -->
            <li v-for="todos in todos">
                {{ todo.text }}
            </li>
        </ul>
    <div>
    <script>
        var app = new Vue({
            el: '#app', 
            data: {
                todos: [
                    { text: 'Learn Java' }
                    { text: 'Learn Kotlin' }
                    { text: 'Deploy android application to the google store' }
                ]
            }
        })
    </script>
```

Or if we wanted to expand on that check list we could add additional properties and loop through them like so: 

```html
<div id="app">
    <span>Leveling up the todo list</span>
    <ul>
        <span v-for="todo in todos">
            <li>{{todo.text}}<input type="checkbox" v-bind:checked="todo.checked" aria-label="todo.text"/> </li>
        </span>
    </ul>
</div>
<script>
var app = new Vue({
    el: '#app', 
    data: {
        todos: [
            { text: 'Learn Java', checked: true }
            { text: 'Learn Kotlin', checked: false, }
            { text: 'Deploy android application to the google store', checked: true }
        ]
    }
})
</script>
```

### Conditional Rendering 

Well that's all fine and dandy, that's very little of what the Vue.js framework enables; one of the more common functionalities of any JavaScript framework (React, Vue, Angular) has to do with reactively displaying different pieces of information depending on various conditions. 

To enact conditions we use the "if" `v-if` directive, and supply that directive with the name of the property we want to perform the "if" evaluation upon. 

That could look something like: 

```html 
<div id="app">
    <!-- 
        `v-if` is checking the 
        "seen" property of `data` within the `Vue` 
        It should evaluate to true or false 
    -->
  <span v-if="seen">Now you see me</span>
  <span v-if="unseen">Now you don't</span>

</div>
<script>
var app3 = new Vue({
  el: '#app',
  data: {
    seen: true,  /* element should render */
    unseen: false,  /* element should not render */
  }
})
</script>
```

### Events 

In order to handle events with view, we utilize the "on" (`v-on`) directive, which attaches event listeners to HTML elements. 


```html
<div id="app">
  <p>{{ message }}</p>
  <!-- 
      Attaching a click event listener to a method called 'reverseMessage'
    -->
  <button v-on:click="reverseMessage">Reverse Message</button>
</div>
<script>
var app5 = new Vue({
  el: '#app-5',
  data: {
    message: 'Hello Vue.js!'
  },
  methods: {
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('')
    }
  }
})
</script>
```

Using `v-on` we can attach any event listeners that we would use outside of a framework simply by specifying what event after the colon (`v-on:click`)

Alright so, that's the basics to get you started. There is so much more to be discovered. Look out for follow-up post soon!

## Acknowlegements 

* Inspired by [Vue JS Guide](https://vuejs.org/v2/guide/)
