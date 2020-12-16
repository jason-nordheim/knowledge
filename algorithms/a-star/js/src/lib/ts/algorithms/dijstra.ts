
class Grid {
    
    /**
     * The nodes contained within the grid 
     */
    private _nodes: Array<GridNode> = new Array<GridNode>(); 
    public get nodes(){
        return this._nodes; 
    }

    /**
     * The starting node 
     */
    private _start: GridNode; 
    public get start(){
        return this._start; 
    }
    public set start(sNode: GridNode){
        this._start = sNode; 
    }

    /**
     * The ending node 
     */
    private _end: GridNode; 
    public get end(){
        return this._end; 
    }
    public set end(sNode: GridNode){
        this._end = sNode; 
    }

    private getNodeWithShortestPath(){
        if(this._nodes.length === 0) throw new Error('No nodes on grid')

        let node = this._nodes[0]
        for(let i = 0; i < this._nodes.length; i++){
            
        }
    }

    private findNeighbors(node:GridNode){
        const neighbors = new Array<GridNode>(); 
        if(node.position.x - 1 )
    }

}

enum GridNodeType {
    default, 
    barrier, 
    open, 
    closed, 
    path 
}

class GridNode {

    /**
     * Position of a node on a grid 
     */
    private _position:Position = null 
    public get position(){
        return this._position
    }
    public set position(pos:Position){
        this._position = pos
    }

    /**
     * The manhattan distance from current node 
     * back to the starting node 
     */
    private _distanceFromStart: number = Infinity
    public get distanceFromStart() {
        return this._distanceFromStart
    }
    public set distanceFromStart(dist:number){
        this._distanceFromStart = dist
    }


    /**
     * The node from from which the path came from
     */
    private _pathFrom: GridNode = null; 
    public get pathFrom(){
        return this._pathFrom; 
    }
    public set pathFrom(node:GridNode){
        this._pathFrom = node; 
    }

    private _type: GridNodeType
    public get type(){
        return this._type; 
    }
    public set type(){
        return this._type; 
    }

}

class Position {
    x:number; 
    y:number; 
    constructor(x:number, y:number){
        this.x = x 
        this.y = y 
    }
}


export default function dijstra() {

}