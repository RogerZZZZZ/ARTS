// /**
//  * version 1 accept 19%
//  * @param {number} num
//  * @return {boolean}
//  */
// var isPowerOfFour = function(num) {
//     if (num === 1) return true
//     if (num < 4) return false
//     let decimal = num.toString(2)

//     let size = decimal.length
//     if (decimal.indexOf('1') === decimal.lastIndexOf('1') && (size - 1) % 2 === 0) return true
//     return false
// };

// /**
//  * version 2 accept 42.9%
//  * @param {number} num
//  * @return {boolean}
//  */
// var isPowerOfFour = function(num) {
//     if (num === 1) return true
//     if (num < 4) return false
//     let decimal = num.toString(2)

//     let size = decimal.length
//     if (decimal.lastIndexOf('1') !== 0 || (size - 1) % 2 !== 0) return false
//     return true
// };

/**
 * version 3 accept 100%
 * @param {number} num
 * @return {boolean}
 */
var isPowerOfFour = function(num) {
    if (num < 0) return false
    let decimal = num.toString(2)

    if (decimal.lastIndexOf('1') !== 0 || decimal.length % 2 !== 1) return false
    return true
};

console.log(isPowerOfFour(1))