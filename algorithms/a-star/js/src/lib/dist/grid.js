import { Node } from './node.js';
export default class Grid {
    constructor(root, rows) {
        this._nodes = new Array();
        this.root = root;
        this.root.classList.add('grid');
        this._rows = rows;
        for (let i = 0; i < this._rows; i++) {
            this._nodes.push(new Array());
            for (let j = 0; j < this._rows; j++) {
                const node = new Node(this, i, j);
                this._nodes[i].push(node);
            }
        }
        ;
    }
}
