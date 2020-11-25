

// part 1 
// const delay = seconds => new Promise((resolves, rejects) => {
//   setTimeout(resolves, seconds * 1000)
// })

// delay(1) 
//   .then(() => console.log('1 second'))


// part 2 
// // modified delay function 
// const delay = seconds => new Promise((resolves, rejects) => {
//   throw new Error('Whoops')

//   setTimeout(()=> {
//     resolves('Success!')
//   })
// })

// delay(1) 
//   .then((message) => console.log(message))
//   .catch((error) =>  {
//     if(error.message === 'Whoops') {
//       console.log('A problem occured but its handled!')
//     }
//   })
// // chaining operations with promises 
const delay = seconds => new Promise((resolves, rejects) => {

  /* rejects */
  if (seconds > 5) {
    rejects(new Error(`${seconds} is too long!`))
  }

  setTimeout(()=> {
    resolves(`the ${seconds} wait is over!`)
  })
})

delay(1)
  .then((message) => console.log(message))

delay(6) 
  .then((message) => console.log(message))
  .catch((error) =>  {
      console.log(`error occurred: ${error.message}`)
  })