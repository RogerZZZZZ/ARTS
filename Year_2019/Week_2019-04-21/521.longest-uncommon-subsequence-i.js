/*
 * @lc app=leetcode id=521 lang=javascript
 *
 * [521] Longest Uncommon Subsequence I 
 */

// @lc code=start
/**
 * @param {string} a
 * @param {string} b
 * @return {number}
 */
var findLUSlength = function(a, b) {
  if (a === b) return -1
  const aLen = a.length
  const bLen = b.length
  return aLen > bLen ? aLen : bLen
};
// @lc code=end

