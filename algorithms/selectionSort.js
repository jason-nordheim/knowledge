/**
 * Sorts an array of numbers from smallest to largest 
 * using an inefficient selection sort algorithm θ(n²)
 * @param {Array<number>} arr 
 */
const sortNumbers = (arr) => {
    const inputArr = [...arr]
    const output = []

    while (inputArr.length > 0) { 
        let min = inputArr[0]
        let minIndex = 0
    
        for(let i = 1; i < inputArr.length; i++) {
            if (inputArr[i] < min) {
                min = inputArr[i]
                minIndex = i 
            }
        }

        output.push(inputArr.splice(minIndex, 1))
    }

    return output
}

const assert = require('assert')

/**
 * tests 
 */
const sortNumbersMinToMaxTests = [{
    input: [1, 2, 3, 4, 5, 6], 
    output: [1, 2, 3, 4, 5, 6]
}, {
    input: [25, 10, 81, 32, 5, 18], 
    output: [5, 10, 18, 25, 32, 81]
}, {
    input: [256, 92, 1031, 8, 5, 1032], 
    output: [5, 8, 92, 256, 1031, 1032]
}]


/* run the tests ... */
sortNumbersMinToMaxTests.forEach(test => {
    assert.notStrictEqual(
        sortNumbers(test.input),  // input 
        test.output,              // expected output 
    )
})

console.log('all tests passed')

