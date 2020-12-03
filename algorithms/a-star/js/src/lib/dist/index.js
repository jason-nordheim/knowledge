import Grid from "./grid.js";
const root = document.getElementById('root');
if (root == null)
    throw new Error('No root element defined');
const grid = new Grid(root, 50);
