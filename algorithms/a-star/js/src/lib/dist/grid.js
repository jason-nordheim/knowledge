import { Node, NodeType } from './node';
export default class Grid {
    constructor(root, rows) {
        this._nodes = new Array();
        this._root = null;
        this._start = null;
        this._end = null;
        this._running = false;
        this.selectMode = false;
        this.isRunning = () => this._running;
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
    run() {
        this._running = true;
        this.updateNeighbors();
    }
    updateNeighbors() {
        for (let x = 0; x < this._rows; x++) {
            for (let y = 0; y < this._rows; y++) {
                const node = this._nodes[x][y];
                const neighbors = new Array();
                if (x + 1 < this._rows - 1) {
                    const downNode = this._nodes[x + 1][y];
                    neighbors.push(downNode);
                }
                if (x - 1 > 0) {
                    const upNode = this._nodes[x - 1][y];
                    neighbors.push(upNode);
                }
                if (y + 1 < this._rows - 1) {
                    const rightNode = this._nodes[x][y + 1];
                    neighbors.push(rightNode);
                }
                if (y - 1 > 0) {
                    const leftNode = this._nodes[x][y - 1];
                    neighbors.push(leftNode);
                }
                node.neighbors = neighbors;
            }
        }
    }
    getNode(x, y) {
        return this._nodes[x][y];
    }
    onContextMenuNode(e, pos) {
        console.log(e);
    }
    onMouseOverNode(e, pos) {
        if (this._running)
            return;
        const node = this._nodes[pos.x][pos.y];
        if (this.selectMode && node.isDefault()) {
            node.changeType(NodeType.barrier);
        }
        else if (this.selectMode && node.isBarrier()) {
            node.changeType(NodeType.default);
        }
    }
    setBarrier(pos) {
        if (this._running)
            return;
        this._nodes[pos.x][pos.y].changeType(NodeType.barrier);
    }
    unsetBarrier(pos) {
        if (this._running)
            return;
        this._nodes[pos.x][pos.y].changeType(NodeType.default);
    }
    setStart(position) {
        if (this._running)
            return;
        this._start = position;
        this._nodes[this._start.x][this._start.y].changeType(NodeType.start);
    }
    unsetStart() {
        if (this._running)
            return;
        this._nodes[this._start.x][this._start.y].changeType(NodeType.default);
        this._start = null;
    }
    setEnd(position) {
        if (this._running)
            return;
        this._end = position;
        this._nodes[this._end.x][this._end.y].changeType(NodeType.end);
    }
    unsetEnd() {
        if (this._running)
            return;
        this._nodes[this._end.x][this._end.y].changeType(NodeType.default);
        this._end = null;
    }
}
