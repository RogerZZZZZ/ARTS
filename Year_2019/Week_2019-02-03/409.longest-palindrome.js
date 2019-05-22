/*
 * @lc app=leetcode id=409 lang=javascript
 *
 * [409] Longest Palindrome
 */
/**
 * @version 1 100%
 * @param {string} s
 * @return {number}
 */
var longestPalindrome = function(s) {
  const duplicateMap = new Set()
  let count = 0
  for(let i = 0; i < s.length; i++) {
    const tmp = s[i]
    if (duplicateMap.has(tmp)) {
      count += 2
      duplicateMap.delete(tmp)
    } else {
      duplicateMap.add(tmp)
    }
  }
  return count < s.length ? count + 1 : count
};

