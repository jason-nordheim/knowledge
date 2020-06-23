# A Guide To Flexbox 

# Styling the Container 

* `justify-content` - aligns items horizontally (by default) 
    * Accepts the following values: 
        * `flex-start` - (default) aligns items to the left side of the container 
        * `flex-end` - aligns items to the right side of the container 
        * `center` - aligns items to the center of the container 
        * `space-between` - adjust items so they are displayed with equal spacing _between_ them 
        * `space-around` - adjust items so they are displayed wth equal spacing _around_ them 
* `align-content` - defines how multiple lines of items are spaced from each other. 
    * accepts the following values: 
        * `flex-start` - lines are packed toward the top of the container 
        * `flex-end` - lines are packed toward the bottom of the container 
        * `center` - lines are packed at the vertical center of the container 
        * `space-between` - lines are displayed with equal spacing beteen them 
        * `space-around` - lines are displayed with equal spacing around them 
        * `stretch` - lines are stretched to fill the vertical space of the container 
* `align-items` - aligns items vertically (by default)
    * Acceps the following values: 
        * `flex-start` - (default) aligns items to the top of the contianer 
        * `flex-end` - aligns items to the bottom of the container 
        * `center` - aligns to the vertical center 
        * `baseline` - displays items at the baseline of th container 
        * `stretch` - stretches items vertically to fit the container 
* `flex-direction` -  defines the direction items are placed in the container
    * Accepts the following values: 
        * `row` - (default) items are placed in the same direction as text 
        * `row-reverse` - items are placed opposite the text direction 
        * `column` - items are placed top-to-bottom 
        * `column-reverse` - items are placed bottom to top
* `flex-wrap` - defines if the items within the flex-container should wrap to a second row or adjust sizing to fit in a single row. 
    * Accepts the following values: 
        * `no-wrap` - every item will be scaled to fit in a single line 
        * `wrap` - items will wrap to additional lines as needed based on each elements size 
        * `wrap-reverse` - items will wrap around to additional lines, reversing direction with each line
* `flex-flow` - since `flex-wrap` and `flex-direction` are often used together, `flex-flow` allows you to define both properties at the same time (e.g. `flex-flow: row wrap;`)


# Adjusting Items within the container: 

* `align-self` - accepts the same values as `align-items`, but overrides container styling for a specific element 
* `justify-self` - accepts the same values as `justify-items`, but overrides container styling for a specific element 