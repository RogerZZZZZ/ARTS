/*
 * @lc app=leetcode id=58 lang=javascript
 *
 * [58] Length of Last Word
 *
 * https://leetcode.com/problems/length-of-last-word/description/
 *
 * algorithms
 * Easy (32.18%)
 * Total Accepted:    254.6K
 * Total Submissions: 790.6K
 * Testcase Example:  '"Hello World"'
 *
 * Given a string s consists of upper/lower-case alphabets and empty space
 * characters ' ', return the length of last word in the string.
 * 
 * If the last word does not exist, return 0.
 * 
 * Note: A word is defined as a character sequence consists of non-space
 * characters only.
 * 
 * Example:
 * 
 * Input: "Hello World"
 * Output: 5
 * 
 * 
 */
// /**
//  * @version  31.22%
//  * @param {string} s
//  * @return {number}
//  */
// var lengthOfLastWord = function(s) {
//   const arr = s.trim().split(' ')
//   return arr[arr.length - 1].length
// };

/**
 * @version  54.3%
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function(s) {
  const arr = s.trim().split(' ')
  return arr[arr.length - 1].length
};

