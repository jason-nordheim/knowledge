/**
 * Static Rendering 
 */
var app_01 = new Vue({ 
    el: '#app_01', /* the sets up the connection to the root element of the application */
    data: {
        message: 'Hello Vue!' /* an property defined in the `root` of data will be immediately accessible between double {{}}curly braces in a HTML document */ 
    }
}
)

/*
 * Dynamic Rendering and basic directives  
 */
var app_02 = new Vue({
    el: '#app_02', 
    data: {
        message: `This page was loaded at ${new Date().toLocaleString()}` 
    }
})

/**
 * Basic Looping 
 */
var app_03 = new Vue({
    el: '#app_03', 
    data: {
            todos: [
                { text: 'Learn Java' },
                { text: 'Learn Kotlin' },
                { text: 'Deploy android application to the google store' }
            ], 
        }
    })

    
var app_04 = new Vue({
    el: '#app_04', 
    data: {
            todos: [
                { text: 'Learn Java', checked: false, },
                { text: 'Learn Kotlin', checked: true, },
                { text: 'Deploy android application to the google store', checked: false }
            ], 
        }
    })

/**
 * Conditional Rendering 
 */
var app_05 = new Vue({
    el: '#app_05', 
    data: {
            seen: true,  // being used by view in elemet associated with `v-if="seen"` 
            unseen: false // being used by view in element associated with `v-if="unseen"` 
        }
    })