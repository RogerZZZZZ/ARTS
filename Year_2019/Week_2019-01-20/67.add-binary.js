/*
 * @lc app=leetcode id=67 lang=javascript
 *
 * [67] Add Binary
 *
 * https://leetcode.com/problems/add-binary/description/
 *
 * algorithms
 * Easy (38.23%)
 * Total Accepted:    286.6K
 * Total Submissions: 746.3K
 * Testcase Example:  '"11"\n"1"'
 *
 * Given two binary strings, return their sum (also a binary string).
 * 
 * The input strings are both non-empty and contains only characters 1 or 0.
 * 
 * Example 1:
 * 
 * 
 * Input: a = "11", b = "1"
 * Output: "100"
 * 
 * Example 2:
 * 
 * 
 * Input: a = "1010", b = "1011"
 * Output: "10101"
 * 
 */
/**
 * @version 1 65.84% 84.61% memory
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function(a, b) {
  const a1 = a.split('')
  const a2 = b.split('')
  const res = []
  let carry = false
  while(a1.length && a2.length) {
    const tmp1 = a1.pop()
    const tmp2 = a2.pop()
    if (tmp1 === '1' && tmp2 === '1') {
      res.unshift(carry ? '1' : '0')
      carry = true
    } else if (tmp1 === '0' && tmp2 === '0') {
      res.unshift(carry ? '1' : '0')
      carry = false
    } else {
      res.unshift(carry ? '0' : '1')
    }
  }
  
  while(a1.length) {
    const tmp = a1.pop()
    if (!carry) {
      res.unshift(tmp)
    } else {
      if (tmp === '0') {
        res.unshift('1')
        carry = false
      } else {
        res.unshift('0')
      }
    }
  }

  while(a2.length) {
    const tmp = a2.pop()
    if (!carry) {
      res.unshift(tmp)
    } else {
      if (tmp === '0') {
        res.unshift('1')
        carry = false
      } else {
        res.unshift('0')
      }
    }
  }

  if (carry) {
    res.unshift('1')
  }

  return res.join('')
};


console.log(addBinary('101', '101'))
