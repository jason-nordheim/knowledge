import { Node, NodePosition } from './node';
export default class Grid {
    private _nodes;
    private _rows;
    private _root;
    private _start;
    private _end;
    private _running;
    selectMode: boolean;
    constructor(root: HTMLElement, rows: number);
    isRunning: () => boolean;
    run(): void;
    updateNeighbors(): void;
    getNode(x: number, y: number): Node;
    onContextMenuNode(e: Event, pos: NodePosition): void;
    onMouseOverNode(e: Event, pos: NodePosition): void;
    setBarrier(pos: NodePosition): void;
    unsetBarrier(pos: NodePosition): void;
    start: () => NodePosition;
    setStart(position: NodePosition): void;
    unsetStart(): void;
    end: () => NodePosition;
    setEnd(position: NodePosition): void;
    unsetEnd(): void;
}
