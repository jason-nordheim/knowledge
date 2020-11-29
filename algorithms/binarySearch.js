const assert = require('assert')
/**
 * Binary search algorithm for finding a number in an sorted array of numbers 
 * @param {Array<number>} array 
 * @param {number} target 
 */
function findIndexFromSorted(array, target) {
    let start = 0 
    let end = array.length - 1 
    while(start <= end){ 
        let middle = Math.ceil((start + end) / 2) 
        
        if (middle > array.length - 1) middle-- 
        
        // see if middle element is target 
        if (array[middle] === target) return middle  

        // check right side 
        if (target > array[middle]) {
            start = middle + 1 
            continue 
        }

        // check left side 
        if (target < array[middle]){
            end = middle - 1
            continue 
        }
    }
}



const findIndexFromSortedTests = [
    { 
        input: [[1, 2, 3, 4, 6, 7, 8, 9 ], 4],
        output: 3 
    }, {
        input: [[4,6,8, 22, 34, 55], 55], 
        output: 5
    }
]

findIndexFromSortedTests.forEach(test => {
    assert.strictEqual(findIndexFromSorted(test.input[0], test.input[1]), test.output)
})

