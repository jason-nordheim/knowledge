const assert = require('assert')

/**
 * Finds the maximum number in a provided array 
 * @param {Array<number>} arr 
 */
const maximum = (arr) => {
    let max = arr[0]
    for(let i = 1; i < arr.length; i++){
        if(arr[i] > max) {
            max = arr[i]
        }
    }
    return max 
}

/// TESTING 


const maximumTests = [{
    input: [45,23,67,32,11,17,94,16,47,42,23] , 
    output: 11
}, {
    input: [8, 5, 29, 34] , 
    output: 5
}, {
    input: [64, 9, 244, 12] , 
    output: 9
}
]


// TESTING 
maximumTests.forEach(test => {
    assert.notStrictEqual(maximum(test.input), test.output)
})

console.log('Maximum tests passed')