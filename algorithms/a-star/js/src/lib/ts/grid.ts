import { Node, NodePosition, NodeType } from './node'

export default class Grid {
    private _nodes = new Array<Node[]>(); 
    private _rows: number; 
    private _root: HTMLElement = null; 
    private _start: NodePosition = null; 
    private _end: NodePosition = null; 
    private _running: boolean = false; 

    public selectMode = false; 

    constructor(root:HTMLElement, rows:number){ 
        this._rows = rows; 

        this._root = root; 
        this._root.classList.add('grid')

        // make grid 
        for(let i = 0; i < this._rows; i++){
            this._nodes.push(new Array<Node>())
            for(let j = 0; j < this._rows; j++){
                const node = new Node(this, i, j); 
                this._root.appendChild(node.html)
                this._nodes[i].push(node) 
            }
        }; 
    }

    setRunning(){
        this._running = true; 
    }


    mouseOver(e:Event, pos:NodePosition) {
        if (this._running) return 
        const node = this._nodes[pos.x][pos.y]
       if (this.selectMode && node.isDefault()) {
           node.changeType(NodeType.barrier)
       } else if (this.selectMode && node.isBarrier()){
           node.changeType(NodeType.default)
       }
    }

    setBarrier(pos:NodePosition){
        if (this._running) return    
        this._nodes[pos.x][pos.y].changeType(NodeType.barrier)
    }
    unsetBarrier(pos:NodePosition){
        if (this._running) return 
        this._nodes[pos.x][pos.y].changeType(NodeType.default)
    }



    start = () => this._start
    setStart(position:NodePosition){
        if (this._running) return 
        this._start = position; 
        this._nodes[this._start.x][this._start.y].changeType(NodeType.start)
    }
    unsetStart(){
        if (this._running) return 
        this._nodes[this._start.x][this._start.y].changeType(NodeType.default)
        this._start = null
    } 



    end = () => this._end; 
    setEnd(position:NodePosition){
        if (this._running) return 
        this._end = position; 
        this._nodes[this._end.x][this._end.y].changeType(NodeType.end)
    }
    unsetEnd(){
        if (this._running) return 
        this._nodes[this._end.x][this._end.y].changeType(NodeType.default)
        this._end = null
    } 


}