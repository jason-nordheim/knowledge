# Redux


## Actions 
Actions send information (i.e. data) from the application to the Redux data store. You send actions using `store.dispatch()`. To be clear, actions are plain JavaScript objects, but must have a property called `type` that defines what type of action is being performed. The `type` property should be defined as a constant. The rest of the "action" object can be defined however the developer needs. 

## Action Creators 
Action Creators are functions that create actions. 