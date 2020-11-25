const delay = (seconds, callback) => {
  setTimeout(callback, seconds * 1000)
}

delay(1, () => {
  console.log('the delay has ended')
})

console.log('first tick')