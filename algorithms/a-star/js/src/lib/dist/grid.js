import { Node, NodeType } from './node.js';
export default class Grid {
    constructor(root, rows) {
        this._nodes = new Array();
        this._root = null;
        this._start = null;
        this._end = null;
        this.selectMode = false;
        this.start = () => this._start;
        this.end = () => this._end;
        this._rows = rows;
        this._root = root;
        this._root.classList.add('grid');
        for (let i = 0; i < this._rows; i++) {
            this._nodes.push(new Array());
            for (let j = 0; j < this._rows; j++) {
                const node = new Node(this, i, j);
                this._root.appendChild(node.html);
                this._nodes[i].push(node);
            }
        }
        ;
    }
    mouseOver(e, pos) {
        const node = this._nodes[pos.x][pos.y];
        if (this.selectMode && node.isDefault()) {
            node.changeType(NodeType.barrier);
        }
        else if (this.selectMode && node.isBarrier()) {
            node.changeType(NodeType.default);
        }
    }
    setBarrier(pos) {
        this._nodes[pos.x][pos.y].changeType(NodeType.barrier);
    }
    unsetBarrier(pos) {
        this._nodes[pos.x][pos.y].changeType(NodeType.default);
    }
    setStart(position) {
        this._start = position;
        this._nodes[this._start.x][this._start.y].changeType(NodeType.start);
        console.log(this._start);
    }
    unsetStart() {
        this._nodes[this._start.x][this._start.y].changeType(NodeType.default);
        this._start = null;
    }
    setEnd(position) {
        this._end = position;
        this._nodes[this._end.x][this._end.y].changeType(NodeType.end);
        console.log(this._end);
    }
    unsetEnd() {
        this._nodes[this._end.x][this._end.y].changeType(NodeType.default);
        this._end = null;
    }
}
