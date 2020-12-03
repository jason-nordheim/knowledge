export class Node {
    constructor(grid, x, y) {
        this._position = null;
        this._grid = null;
        this._color = null;
        this.html = null;
        this.neighbors = new Array();
        this.isDefault = () => this._color === String(getNodeColor(NodeType.default));
        this.isClosed = () => this._color === String(getNodeColor(NodeType.closed));
        this.isOpen = () => this._color === String(getNodeColor(NodeType.open));
        this.isBarrier = () => this._color === String(getNodeColor(NodeType.barrier));
        this.isPath = () => this._color === String(getNodeColor(NodeType.path));
        this.isStart = () => this._color === String(getNodeColor(NodeType.start));
        this.isEnd = () => this._color === String(getNodeColor(NodeType.end));
        this.getPosition = () => this._position;
        this._grid = grid;
        this.html = document.createElement("div");
        this.html.classList.add("node");
        this.html.addEventListener("drag", (e) => e.preventDefault());
        this.html.addEventListener("contextmenu", (e) => e.preventDefault());
        this.html.addEventListener("mousedown", (event) => this.onMouseDown(event, grid));
        this.html.addEventListener('mouseup', e => this.onMouseUp(e, grid));
        this.html.addEventListener("mouseover", (e) => this.onMouseOver(e, grid));
        this._position = new NodePosition(x, y);
        this.changeType(NodeType.default);
    }
    changeType(newNodeType) {
        if (this._color)
            this.html.classList.remove(this._color);
        this._color = String(getNodeColor(newNodeType));
        this.html.classList.add(this._color);
    }
    onMouseOver(e, grid) {
        if (grid.start() && grid.end()) {
            grid.mouseOver(e, this._position);
        }
    }
    onMouseDown(event, grid) {
        if (this.isDefault() && !grid.start()) {
            grid.setStart(this._position);
        }
        else if (this.isDefault() && !grid.end()) {
            grid.setEnd(this._position);
        }
        else if (this.isDefault() && grid.start && grid.end) {
            grid.selectMode = true;
            grid.setBarrier(this._position);
        }
        else if (grid.start() && grid.end() && this.isEnd()) {
            grid.unsetEnd();
        }
        else if (this.isStart() && grid.start && grid.end) {
            grid.unsetStart();
            grid.unsetEnd();
        }
    }
    onMouseUp(event, grid) {
        grid.selectMode = false;
    }
    static hDistance(n1, n2) {
        const pos1 = n1.getPosition();
        const pos2 = n2.getPosition();
        return Math.abs(pos1.x - pos2.x) + Math.abs(pos1.y - pos2.y);
    }
}
export class NodePosition {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
export const colors = {
    red: "red",
    green: "green",
    blue: "blue",
    yellow: "yellow",
    white: "white",
    black: "black",
    purple: "purple",
    orange: "orange",
    grey: "gray",
    turquoise: "turquoise",
};
export var NodeType;
(function (NodeType) {
    NodeType[NodeType["default"] = 0] = "default";
    NodeType[NodeType["closed"] = 1] = "closed";
    NodeType[NodeType["open"] = 2] = "open";
    NodeType[NodeType["start"] = 3] = "start";
    NodeType[NodeType["end"] = 4] = "end";
    NodeType[NodeType["barrier"] = 5] = "barrier";
    NodeType[NodeType["path"] = 6] = "path";
})(NodeType || (NodeType = {}));
export function getNodeColor(type) {
    switch (type) {
        case NodeType.default:
            return colors.white;
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
            throw new Error("Invalid Node Type");
    }
}
