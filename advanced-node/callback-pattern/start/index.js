
//  callback pattern  - start 
/**
 * Replaces every letter (lower and uppercase) with an upper case 'X' 
 * @param {string} str 
 */
function hideString(str) {
  return str.replace(/[a-zA-Z]/g, 'X'); 
}

var hidden =hideString("Hello World")
console.log(hidden)
console.log('end')
