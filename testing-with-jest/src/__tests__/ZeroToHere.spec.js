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

// spying 
// "mock implementation"
// "mock restore"
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


// "to Have Last Returned With "
test('pizza returns new york last', () => {
    const pizza1 = pizzas[0]
    const pizza2 = pizzas[1]
    const pizza3 = pizzas[2]
    const pizza = jest.fn(currentPizza => currentPizza.name) 

    pizza(pizza1) // chicago pizza 
    pizza(pizza2) // neopolitan 
    pizza(pizza3) // new york pizza 

    expect(pizza).toHaveLastReturnedWith("New York Pizza")

})

// "to match object"
test('pizza data has new york pizza and matches as an object', () => {
    const newYorkPizza = {
        "id": 3, 
        "name": "New York Pizza", 
        "image": "/images/ny-pizza.jpg", 
        "desc": "New York style pizza has slices that are large and wide with a thin crust this is foldable yet crispy. It is traditionally topped with tomato sauce and mozzarella cheese.", 
        "price": 8
    }
    expect(pizzas[2]).toMatchObject(newYorkPizza)
})

test('expect a promise to resolve', async () => {
    const user = {
        getFullName: jest.fn(() => Promise.resolve('Karl Hadwen'))
    }
    await expect(user.getFullName('Karl Hadwen')).resolves.toBe('Karl Hadwen')
})

test('expect a promise to reject and throw error', async () => {
    const user = {
        getFullName: jest.fn(() => Promise.reject( new Error('Something went terribly wrong')))
    }
    await expect(user.getFullName('Karl Hadwen')).rejects.toThrow('Something went terribly wrong')
})