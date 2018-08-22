/**
 * 68.5%
 * @param {number} num
 * @return {boolean}
 */
var checkPerfectNumber = function(num) {
    if (num < 2) return false
    const mid = Math.ceil(Math.sqrt(num))
  
    let i = 2
    let sum = 1
    while (i < mid) {
        if (num % i === 0) sum += i + num/i
        i++
    }
    return sum === num
};

console.log(checkPerfectNumber(6))