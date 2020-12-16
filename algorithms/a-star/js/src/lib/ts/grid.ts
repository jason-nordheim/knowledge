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



    public isRunning = () => this._running; 
    public run(){
        this._running = true; 
        this.updateNeighbors() 
    }

    public updateNeighbors() {
        // make grid 
        for(let x = 0; x < this._rows; x++){
            for(let y = 0; y < this._rows; y++){
                const node = this._nodes[x][y]
                const neighbors = new Array<Node>() ; 
                // down 
                if(x + 1 < this._rows - 1){
                    const downNode = this._nodes[x+1][y]
                    neighbors.push(downNode)
                }
                // up 
                if(x - 1 > 0){
                    const upNode = this._nodes[x-1][y]
                    neighbors.push(upNode)
                }
                // right 
                if(y + 1 < this._rows - 1){
                    const rightNode = this._nodes[x][y + 1]
                    neighbors.push(rightNode)
                }
                // left 
                if(y - 1 > 0) {
                    const leftNode = this._nodes[x][y - 1]
                    neighbors.push(leftNode)
                }
                node.neighbors = neighbors; 
            }
        }
    }

    public getNode(x: number, y: number) {
        return this._nodes[x][y]
      }

    onContextMenuNode(e:Event, pos:NodePosition){
        console.log(e)
    }

    onMouseOverNode(e:Event, pos:NodePosition) {
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