/**
 * @version 1 81.43%
 * @param {number} left
 * @param {number} right
 * @return {number[]}
 */
var selfDividingNumbers = function(left, right) {
    const res = []

    for (let i = left; i <= right; i++) {
        if (testFunc(i)) res.push(i)
    }

    return res
};

const testFunc = (num) => {
    let str = num + ''
    for (let j = 0; j < str.length; j++) {
        if (str[j] === '0' || num % parseInt(str[j]) > 0) return false
    }
    return true
}

console.log(selfDividingNumbers(1, 22))