const pizzas = require('../data.json') 

/**
 * Snapshot testing (the json data file)
 */
test('the pizza data is correct', () => {
     // will fail if the data.json file has changed 
    expect(pizzas).toMatchSnapshot()
})