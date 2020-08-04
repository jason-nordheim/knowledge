// https://jestjs.io/
const pizzas = require('../data.json') 



/** Snapshot testing (the json data file) */
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

// ---------------------
// mocking 
// ---------------------
test('Mock implementation of a basic function', () => {
    const mock = jest.fn(() => 'I am a mock function')
    // console.log(mock) // => Will show all the functions of the mock object 
    expect(mock('Calling my mock function!')).toBe('I am a mock function')
    expect(mock).toHaveBeenCalledWith("Calling my mock function!")
})

test('mock return value of a function one time', () => {
    const mock = jest.fn()

    mock.mockReturnValueOnce('Hello')
        .mockReturnValueOnce('there!')

    mock()
    mock() 

    expect(mock).toHaveBeenCalledTimes(2)

    mock('Hello', 'there', 'Steve')
    expect(mock).toHaveBeenCalledWith('Hello', 'there', 'Steve')

    mock('Steve')
    expect(mock).toHaveBeenLastCalledWith('Steve')
})

test('mock implementation of a function', () => {
    const mock = jest.fn().mockImplementation(() => 'United Kingdom')
    expect(mock('Location')).toBe('United Kingdom')
    expect(mock).toHaveBeenCalledWith('Location')
})


// "spying"
// spy on the functions of a particular module / method 
test('spying using original implementation', () => {
    const pizza = {
        name: n => `Pizza name: ${n}`, 
    }

    const spy = jest.spyOn(pizza, 'name')
    expect(pizza.name('Cheese')).toBe('Pizza name: Cheese')
    expect(spy).toHaveBeenCalledWith('Cheese')
})

test('spying using mock implementation', () => {
    const pizza = {
        name: n => `Pizza name: ${n}`, 
    }

    const spy = jest.spyOn(pizza, 'name')
    spy.mockImplementation(n => 'Crazy pizza!')


    expect(pizza.name('Cheese')).toBe('Crazy pizza!')
    expect(spy).toHaveBeenCalledWith('Cheese')

    /** restores original implementation */
    spy.mockRestore()
    expect(pizza.name('Cheese')).toBe('Pizza name: Cheese')
})




