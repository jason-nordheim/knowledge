export default class MaxBinaryHeap<T>{
    private _values: Array<T>; 

    constructor(){
        this._values = new Array<T>(); 
    }
    //helper method that swaps the values and two indexes of an array
    public swap(indexA:number, indexB:number){
        let temp = this._values[indexA];
        this._values[indexA] = this._values[indexB];
        this._values[indexB] = temp;
        return this._values;
    }
    //helper methods that bubbles up values from end
    private bubbleUp(){
        //get index of inserted element
        let index = this._values.length - 1
        //loop while index is not 0 or element no longer needs to bubble
        while(index > 0){
            //get parent index via formula
            let parentIndex = Math.floor((index - 1)/2);
            //if values is greater than parent, swap the two
            if(this._values[parentIndex] < this._values[index]){
                //swap with helper method
                this.swap(index, parentIndex);
                //change current index to parent index
                index = parentIndex;
            } else{
                break;
            }
        }
        return 0;
    }
    // method that pushes new value onto the end and calls the bubble helper
    public insert(value){
        this._values.push(value)
        this.bubbleUp();
        return this._values
    }
    
}