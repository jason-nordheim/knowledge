import { NodePosition } from './node';
export default class Grid {
    private _nodes;
    private _rows;
    private _root;
    private _start;
    private _end;
    selectMode: boolean;
    constructor(root: HTMLElement, rows: number);
    mouseOver(e: Event, pos: NodePosition): void;
    setBarrier(pos: NodePosition): void;
    unsetBarrier(pos: NodePosition): void;
    start: () => NodePosition;
    setStart(position: NodePosition): void;
    unsetStart(): void;
    end: () => NodePosition;
    setEnd(position: NodePosition): void;
    unsetEnd(): void;
}
