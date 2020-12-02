import Grid from "./grid";
export declare class Node {
    private _pos;
    private _grid;
    private _root;
    private _color;
    readonly color: number[];
    neighbors: Node[];
    constructor(grid: Grid, x: number, y: number);
    readonly isClosed: number;
    readonly isOpen: number;
    readonly isBarrier: number;
    readonly isPath: number;
    readonly isStart: number;
    readonly isEnd: number;
    changeType(newNodeType: NodeType): void;
    getPosition(): NodePosition;
}
export declare class NodePosition {
    x: number;
    y: number;
    constructor(x: number, y: number);
}
export declare class NodeColor {
    r: number;
    g: number;
    b: number;
    static closed: NodeColor;
    static open: NodeColor;
    static barrier: NodeColor;
    static start: NodeColor;
    static end: NodeColor;
    static path: NodeColor;
    static border: NodeColor;
    constructor(red: number, green: number, blue: number);
}
export declare const colors: {
    red: number[];
    green: number[];
    blue: number[];
    yellow: number[];
    white: number[];
    black: number[];
    purple: number[];
    orange: number[];
    grey: number[];
    turquoise: number[];
};
export declare enum NodeType {
    closed = 0,
    open = 1,
    start = 2,
    end = 3,
    barrier = 4,
    path = 5
}
export declare function getNodeColor(type: NodeType): number[];
