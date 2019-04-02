/*
 * @lc app=leetcode id=66 lang=javascript
 *
 * [66] Plus One
 *
 * https://leetcode.com/problems/plus-one/description/
 *
 * algorithms
 * Easy (40.81%)
 * Total Accepted:    368.3K
 * Total Submissions: 900.8K
 * Testcase Example:  '[1,2,3]'
 *
 * Given a non-empty array of digits representing a non-negative integer, plus
 * one to the integer.
 * 
 * The digits are stored such that the most significant digit is at the head of
 * the list, and each element in the array contain a single digit.
 * 
 * You may assume the integer does not contain any leading zero, except the
 * number 0 itself.
 * 
 * Example 1:
 * 
 * 
 * Input: [1,2,3]
 * Output: [1,2,4]
 * Explanation: The array represents the integer 123.
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: [4,3,2,1]
 * Output: [4,3,2,2]
 * Explanation: The array represents the integer 4321.
 * 
 */
// /**
//  * @version 1 89.39% 7.9% memory
//  * @param {number[]} digits
//  * @return {number[]}
//  */
// var plusOne = function(digits) {
//   let index = digits.length - 1
//   let flag = true
//   while(flag) {
//     const last = digits[index]
//     if (last + 1 > 9) {
//       digits[index] = 0
//       index--
//       if (index < 0) {
//         digits.unshift(1)
//         flag = false
//       }
//     } else {
//       digits[index] = last + 1
//       flag = false
//     }
//   }
//   return digits
// };

/**
 * @version 1 89.39% 47.9% memory
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
  let index = digits.length - 1
  while(true) {
    const last = digits[index]
    if (last + 1 > 9) {
      digits[index] = 0
      index--
      if (index < 0) {
        digits.unshift(1)
        return digits
      }
    } else {
      digits[index] = last + 1
      return digits
    }
  }
};

