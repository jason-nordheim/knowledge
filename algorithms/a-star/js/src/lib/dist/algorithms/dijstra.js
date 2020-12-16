class Grid {
    constructor() {
        this._nodes = new Array();
    }
    get nodes() {
        return this._nodes;
    }
    get start() {
        return this._start;
    }
    set start(sNode) {
        this._start = sNode;
    }
    get end() {
        return this._end;
    }
    set end(sNode) {
        this._end = sNode;
    }
    getNodeWithShortestPath() {
        if (this._nodes.length === 0)
            throw new Error('No nodes on grid');
        let node = this._nodes[0];
        for (let i = 0; i < this._nodes.length; i++) {
        }
    }
    findNeighbors(node) {
        const neighbors = new Array();
        if (node.position.x - 1)
            ;
    }
}
var GridNodeType;
(function (GridNodeType) {
    GridNodeType[GridNodeType["default"] = 0] = "default";
    GridNodeType[GridNodeType["barrier"] = 1] = "barrier";
    GridNodeType[GridNodeType["open"] = 2] = "open";
    GridNodeType[GridNodeType["closed"] = 3] = "closed";
    GridNodeType[GridNodeType["path"] = 4] = "path";
})(GridNodeType || (GridNodeType = {}));
class GridNode {
    constructor() {
        this._position = null;
        this._distanceFromStart = Infinity;
        this._pathFrom = null;
    }
    get position() {
        return this._position;
    }
    set position(pos) {
        this._position = pos;
    }
    get distanceFromStart() {
        return this._distanceFromStart;
    }
    set distanceFromStart(dist) {
        this._distanceFromStart = dist;
    }
    get pathFrom() {
        return this._pathFrom;
    }
    set pathFrom(node) {
        this._pathFrom = node;
    }
    get type() {
        return this._type;
    }
    set type() {
        return this._type;
    }
}
class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
export default function dijstra() {
}
