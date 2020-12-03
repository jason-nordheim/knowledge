import Grid from "./grid";

export class Node {
  private _position: NodePosition = null;
  private _grid: Grid = null;
  private _color: string = null;

  public html: HTMLElement = null;
  public neighbors = new Array<Node>();

  constructor(grid: Grid, x: number, y: number) {
    this._grid = grid;

    this.html = document.createElement("div");
    this.html.classList.add("node");
    this.html.addEventListener("drag", (e) => e.preventDefault());
    this.html.addEventListener("contextmenu", (e) => e.preventDefault());
    this.html.addEventListener("mousedown", (event) =>
      this.onMouseDown(event, grid)
    );
    this.html.addEventListener('mouseup', e => this.onMouseUp(e, grid))
    this.html.addEventListener("mouseover", (e) => this.onMouseOver(e, grid));
    this._position = new NodePosition(x, y);
    this.changeType(NodeType.default);
  }

  public isDefault = () =>
    this._color === String(getNodeColor(NodeType.default));
  public isClosed = () => this._color === String(getNodeColor(NodeType.closed));
  public isOpen = () => this._color === String(getNodeColor(NodeType.open));
  public isBarrier = () =>
    this._color === String(getNodeColor(NodeType.barrier));
  public isPath = () => this._color === String(getNodeColor(NodeType.path));
  public isStart = () => this._color === String(getNodeColor(NodeType.start));
  public isEnd = () => this._color === String(getNodeColor(NodeType.end));

  public getPosition = () => this._position;

  public changeType(newNodeType: NodeType) {
    if (this._color) this.html.classList.remove(this._color);
    this._color = String(getNodeColor(newNodeType));
    this.html.classList.add(this._color);
  }



  private onMouseOver(e: Event, grid: Grid) {
    if (grid.start() && grid.end()) {
      grid.mouseOver(e, this._position);
    }
  }
//   private onMouseDown(event: MouseEvent, grid: Grid) {
//     if (this.isDefault() && !grid.start()) {
//       grid.setStart(this._position);
//     } else if (this.isDefault() && !grid.end()) {
//       grid.setEnd(this._position);
//     } else if (this.isDefault() && grid.start && grid.end) {
//       grid.setBarrier(this._position);
//     } else if (this.isBarrier() && grid.start && grid.end) {
//       grid.unsetBarrier(this._position);
//     } else if (this.isEnd()) {
//       grid.unsetEnd();
//     } else if (this.isStart() && grid.start && grid.end) {
//       grid.unsetStart();
//       grid.unsetEnd();
//     }
//   }
// }

  private onMouseDown(event: MouseEvent, grid: Grid) {
    if (this.isDefault() && !grid.start()) {
      grid.setStart(this._position);
    } else if (this.isDefault() && !grid.end()) {
      grid.setEnd(this._position);
    } else if (this.isDefault() && grid.start && grid.end) {
      // TODO 
      grid.selectMode = true; 
      grid.setBarrier(this._position); 
    } else if (grid.start()  && grid.end() && this.isEnd()) {
      grid.unsetEnd();
    } else if (this.isStart() && grid.start && grid.end) {
      grid.unsetStart();
      grid.unsetEnd();
    }
  }
  private onMouseUp(event:MouseEvent, grid:Grid) {
      grid.selectMode = false; 
  }
}


export class NodePosition {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

// export const colors = {
//     red: [255,0,0 ],
//     green: [0, 255,0],
//     blue: [0,255,0],
//     yellow: [255,255,0],
//     white: [255,255,255],
//     black: [0,0,0],
//     purple: [128, 0, 128],
//     orange: [255, 165, 0],
//     grey: [128,128,128],
//     turquoise: [64, 224, 208]
// }

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

export enum NodeType {
  default,
  closed,
  open,
  start,
  end,
  barrier,
  path,
}

export function getNodeColor(type: NodeType) {
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
