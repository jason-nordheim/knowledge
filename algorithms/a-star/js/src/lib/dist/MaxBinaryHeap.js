export default class MaxBinaryHeap {
    constructor() {
        this._values = new Array();
    }
    swap(indexA, indexB) {
        let temp = this._values[indexA];
        this._values[indexA] = this._values[indexB];
        this._values[indexB] = temp;
        return this._values;
    }
    bubbleUp() {
        let index = this._values.length - 1;
        while (index > 0) {
            let parentIndex = Math.floor((index - 1) / 2);
            if (this._values[parentIndex] < this._values[index]) {
                this.swap(index, parentIndex);
                index = parentIndex;
            }
            else {
                break;
            }
        }
        return 0;
    }
    insert(value) {
        this._values.push(value);
        this.bubbleUp();
        return this._values;
    }
}
