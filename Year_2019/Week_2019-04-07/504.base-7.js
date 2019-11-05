/*
 * @lc app=leetcode id=504 lang=javascript
 *
 * [504] Base 7
 */

// @lc code=start
/**
 * @version 71%
 * @param {number} num
 * @return {string}
 */
var convertToBase7 = function(num) {
  if (num === 0) return num.toString()
  const flag = num >= 0
  let str = ''
  num = Math.abs(num)
  while(num !== 0) {
    str += num % 7
    num = parseInt(num / 7)
  }

  str += flag ? '' : '-'
  return str.split('').reverse().join('')
};

console.log(convertToBase7(0))
