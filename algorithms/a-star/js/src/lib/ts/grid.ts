import { Node } from './node'

export default class Grid {
    public root: HTMLElement; 
    private _nodes = new Array<Node[]>(); 
    private _rows: number; 


    constructor(root:HTMLElement, rows:number){ 
        this.root = root; 
        this.root.classList.add('grid')
        this._rows = rows; 

        // make grid 
        for(let i = 0; i < this._rows; i++){
            this._nodes.push(new Array<Node>())
            for(let j = 0; j < this._rows; j++){
                const node = new Node(this, i, j); 
                this._nodes[i].push(node) 
            }
        }; 
    }
}