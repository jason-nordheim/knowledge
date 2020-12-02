import Grid from "./grid.js";


const root = document.getElementById('root')

/* must have a root element */
if (root == null) throw new Error('No root element defined')


const grid = new Grid(root, 50); 
