export class Node {
    constructor(grid, x, y) {
        this._color = null;
        this.neighbors = new Array();
        this.isClosed = this._color ? this._color === getNodeColor(NodeType.closed) ? 1 : -1 : 0;
        this.isOpen = this._color ? this._color === getNodeColor(NodeType.open) ? 1 : -1 : 0;
        this.isBarrier = this._color ? this._color === getNodeColor(NodeType.barrier) ? 1 : -1 : 0;
        this.isPath = this._color ? this._color === getNodeColor(NodeType.path) ? 1 : -1 : 0;
        this.isStart = this._color ? this._color === getNodeColor(NodeType.start) ? 1 : -1 : 0;
        this.isEnd = this._color ? this._color === getNodeColor(NodeType.end) ? 1 : -1 : 0;
        this._grid = grid;
        this._root = document.createElement('div');
        this._root.classList.add('node');
        this._grid.root.appendChild(this._root);
        this._pos = new NodePosition(x, y);
        this.changeType(NodeType.start);
    }
    changeType(newNodeType) {
        if (this._color) {
            this._root.classList.remove(String(this._color));
        }
        this._color = getNodeColor(newNodeType);
        this._root.classList.add(String(this._color));
    }
    getPosition() {
        return this._pos;
    }
}
export class NodePosition {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
export class NodeColor {
    constructor(red, green, blue) {
        if (red > 255 || red < 0)
            throw new Error('Invalid Red Value');
        if (green > 255 || green < 0)
            throw new Error('Invalid Green Value');
        if (blue > 255 || blue < 0)
            throw new Error('Invalid Blue Value');
        this.r = red;
        this.b = blue;
        this.g = green;
    }
}
NodeColor.closed = new NodeColor(255, 0, 0);
NodeColor.open = new NodeColor(0, 255, 0);
NodeColor.barrier = new NodeColor(0, 0, 0);
NodeColor.start = new NodeColor(255, 165, 0);
NodeColor.end = new NodeColor(64, 224, 208);
NodeColor.path = new NodeColor(64, 224, 208);
NodeColor.border = new NodeColor(128, 128, 128);
export const colors = {
    red: [255, 0, 0],
    green: [0, 255, 0],
    blue: [0, 255, 0],
    yellow: [255, 255, 0],
    white: [255, 255, 255],
    black: [0, 0, 0],
    purple: [128, 0, 128],
    orange: [255, 165, 0],
    grey: [128, 128, 128],
    turquoise: [64, 224, 208]
};
export var NodeType;
(function (NodeType) {
    NodeType[NodeType["closed"] = 0] = "closed";
    NodeType[NodeType["open"] = 1] = "open";
    NodeType[NodeType["start"] = 2] = "start";
    NodeType[NodeType["end"] = 3] = "end";
    NodeType[NodeType["barrier"] = 4] = "barrier";
    NodeType[NodeType["path"] = 5] = "path";
})(NodeType || (NodeType = {}));
export function getNodeColor(type) {
    switch (type) {
        case NodeType.start:
            return colors.orange;
        case NodeType.end:
            return colors.turquoise;
        case NodeType.open:
            return colors.green;
        case NodeType.closed:
            return colors.red;
        case NodeType.barrier:
            return colors.black;
        case NodeType.path:
            return colors.purple;
        default:
            throw new Error('Invalid Node Type');
    }
}
