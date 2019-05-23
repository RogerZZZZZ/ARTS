/*
 * @lc app=leetcode id=412 lang=javascript
 *
 * [412] Fizz Buzz
 */
/**
 * @version 1 96.98%
 * @param {number} n
 * @return {string[]}
 */
var fizzBuzz = function(n) {
  if (n <= 0) return []

  const arr = []
  for (let i = 1; i <= n; i++) {
    let tmp = ''
    if (i % 3 === 0) {
      tmp = 'Fizz'
    }
    if (i % 5 === 0) {
      tmp += 'Buzz'
    }
    arr.push(tmp === '' ? i.toString() : tmp)
  }
  return arr
};

