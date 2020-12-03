import Grid from "./grid";
export declare class Node {
    private _position;
    private _grid;
    private _color;
    html: HTMLElement;
    neighbors: Node[];
    constructor(grid: Grid, x: number, y: number);
    isDefault: () => boolean;
    isClosed: () => boolean;
    isOpen: () => boolean;
    isBarrier: () => boolean;
    isPath: () => boolean;
    isStart: () => boolean;
    isEnd: () => boolean;
    getPosition: () => NodePosition;
    changeType(newNodeType: NodeType): void;
    private onMouseOver;
    private onMouseDown;
    private onMouseUp;
    static hDistance(n1: Node, n2: Node): number;
}
export declare class NodePosition {
    x: number;
    y: number;
    constructor(x: number, y: number);
}
export declare const colors: {
    red: string;
    green: string;
    blue: string;
    yellow: string;
    white: string;
    black: string;
    purple: string;
    orange: string;
    grey: string;
    turquoise: string;
};
export declare enum NodeType {
    default = 0,
    closed = 1,
    open = 2,
    start = 3,
    end = 4,
    barrier = 5,
    path = 6
}
export declare function getNodeColor(type: NodeType): string;
