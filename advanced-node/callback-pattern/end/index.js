
//  callback pattern  - end 

// example 1 
// function hideString(str, done) {
//   process.nextTick(() => {
//     done(str.replace(/[a-zA-Z]/g, 'X')); 
//   })
// }

// hideString("Hello World", (hidden) => {
//   console.log(hidden)
// })
// console.log('end')
 

// example 2 

// function delay (seconds, callback) {
//   setTimeout(callback, seconds + 1000)
// }

// console.log('starting...') 
// delay(2, () => {
//   console.log('two seconds later...')
// })
// console.log('all done!')

// example 2 
function delay (seconds, callback) {
  setTimeout(callback, seconds + 1000)
}

console.log('starting delays')
delay(2, () => {
  console.log('two seconds')
  delay(1, () => {
    console.log('three seconds')
    delay(1, () => {
      console.log('four seconds')
    })
  })
})
console.log('all done!')
