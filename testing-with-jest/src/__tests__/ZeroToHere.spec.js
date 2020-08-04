const pizzas = require('../data.json') 

/**
 * Snapshot testing (the json data file)
 */
test('The pizza data to be correct', () => {
     /** will fail if the data.json file has changed from the snapshot */ 
     expect(pizzas).toMatchSnapshot()
    
     /* 1 should always be equal to 1 */ 
    expect(1).toEqual(1)

    /* we expect all the pizza names to match the follwoing array */
    expect(pizzas.map( pizza => pizza.name)).toEqual([
        "Chicago Pizza",
        "Neopolitan Pizza", 
        "New York Pizza", 
        "Sicilian Pizza" 
    ])
})

for (let i = 0; i < pizzas.length; i++) {
    test(`pizza[${i}] should have properties (id, name, image, desc, price)`, () => {
        expect(pizzas[i]).toHaveProperty('id')
        expect(pizzas[i]).toHaveProperty('name')
        expect(pizzas[i]).toHaveProperty('image')
        expect(pizzas[i]).toHaveProperty('desc')
        expect(pizzas[i]).toHaveProperty('price')
    })    
}