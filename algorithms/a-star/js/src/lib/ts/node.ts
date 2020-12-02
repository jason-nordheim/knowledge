import Grid from "./grid";

export class Node {
    private _pos: NodePosition; 
    private _grid: Grid
    private _root: HTMLElement; 
    private _color:number[] = null; 

    public readonly color:number[]; 
    public neighbors = new Array<Node>(); 
    
    constructor(grid:Grid,x:number, y:number) {
        this._grid = grid
        this._root = document.createElement('div')
        this._root.classList.add('node')
        this._grid.root.appendChild(this._root) 
        this._pos = new NodePosition(x, y); 
        this.changeType(NodeType.start)
    }

    readonly isClosed = this._color ? this._color === getNodeColor(NodeType.closed) ? 1: -1 : 0 
    readonly isOpen = this._color ? this._color === getNodeColor(NodeType.open)  ? 1: -1: 0
    readonly isBarrier = this._color ? this._color === getNodeColor(NodeType.barrier) ? 1: -1: 0  
    readonly isPath = this._color ? this._color === getNodeColor(NodeType.path) ? 1: -1: 0  
    readonly isStart = this._color ? this._color === getNodeColor(NodeType.start) ? 1: -1: 0  
    readonly isEnd = this._color ? this._color === getNodeColor(NodeType.end) ? 1: -1: 0  

    public changeType(newNodeType:NodeType){
        if (this._color) {
            this._root.classList.remove(String(this._color)); 
        }
        
        this._color = getNodeColor(newNodeType); 
        this._root.classList.add(String(this._color))
    }






    /**
     * gets the current position in the grid 
     */
    public getPosition(){
        return this._pos; 
    }
}

export class NodePosition {
    x: number;
    y: number;
    constructor(x:number, y:number) {       
        this.x = x; 
        this.y = y;  
    }
    
}

export class NodeColor {
    r: number; 
    g: number; 
    b: number; 

    static closed = new NodeColor(255, 0, 0) // red 
    static open = new NodeColor(0,255,0) // green 
    static barrier = new NodeColor(0,0,0) // black 
    static start = new NodeColor(255, 165, 0) // orange 
    static end = new NodeColor(64,224,208) // turqouise 
    static path = new NodeColor(64, 224, 208)
    static border = new NodeColor(128, 128,128)

    constructor(red:number, green:number, blue:number) {
        if(red > 255 || red < 0) throw new Error('Invalid Red Value'); 
        if(green > 255 || green < 0) throw new Error('Invalid Green Value'); 
        if(blue > 255 || blue < 0) throw new Error('Invalid Blue Value'); 
        this.r = red; 
        this.b = blue;
        this.g = green; 
    }
}

export const colors = {
    red: [255,0,0 ], 
    green: [0, 255,0], 
    blue: [0,255,0], 
    yellow: [255,255,0], 
    white: [255,255,255], 
    black: [0,0,0], 
    purple: [128, 0, 128], 
    orange: [255, 165, 0],
    grey: [128,128,128], 
    turquoise: [64, 224, 208]
}

export enum NodeType {
    closed, 
    open,  
    start,  
    end,
    barrier, 
    path, 
}

export function getNodeColor(type:NodeType){
    switch (type) {
        case NodeType.start:
            return colors.orange
        case NodeType.end:
            return colors.turquoise
        case NodeType.open:
            return colors.green 
        case NodeType.closed:
            return colors.red 
        case NodeType.barrier:
            return colors.black
        case NodeType.path:
            return colors.purple
        default:
            throw new Error('Invalid Node Type')
    }
}

