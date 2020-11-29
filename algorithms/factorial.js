const assert = require('assert')


/**
 * finds the factorial for the given number recursively 
 * @param {number} number 
 */
function factorial(number) {
    if (number < 1) throw Error('Cannot find factorials for numbers less than 1')
    if (number == 1) return 1 
    return number * factorial(number - 1)
}

factorialTests = [
    { 
        input: 5, 
        output: 120 
    }, {
        input: 3, 
        output: 6
    }, {
        input: 11, 
        output: 39916800
    }
]

factorialTests.forEach(test => {
    assert.strictEqual(factorial(test.input), test.output)
})

console.log('factorial tests passed')