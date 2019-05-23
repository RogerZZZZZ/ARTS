/*
 * @lc app=leetcode id=415 lang=javascript
 *
 * [415] Add Strings
 */
/**
 * @version 1 69.88%
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function(num1, num2) {
  let target = ''
  let flag = 0
  num1 = num1.split('')
  num2 = num2.split('')
  while(num1.length && num2.length) {
    const tmp1 = num1.pop()
    const tmp2 = num2.pop()
    let count = parseInt(tmp1) + parseInt(tmp2) + flag
    if (count >= 10) {
      flag = 1
      target += (count.toString())[1]
    } else {
      flag = 0
      target += count
    }
  }

  while(num1.length) {
    let count = parseInt(num1.pop()) + flag
    if (count >= 10) {
      flag = 1
      target += (count.toString())[1]
    } else {
      flag = 0
      target += count
    }
  }

  while(num2.length) {
    let count = parseInt(num2.pop()) + flag
    if (count >= 10) {
      flag = 1
      target += (count.toString())[1]
    } else {
      flag = 0
      target += count
    }
  }

  if (flag) target += '1'

  return target.split('').reverse().join('')
};


