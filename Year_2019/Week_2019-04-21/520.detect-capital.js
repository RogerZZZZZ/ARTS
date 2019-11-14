/*
 * @lc app=leetcode id=520 lang=javascript
 *
 * [520] Detect Capital
 */

// @lc code=start
/**
 * @version 17.79%
 * @param {string} word
 * @return {boolean}
 */
var detectCapitalUse = function(word) {
  if (!word) return false

  if (word[0] !== word[0].toLowerCase()) {
    const tmp = word.slice(1, word.length)
    return word === word.toUpperCase()
      || tmp === tmp.toLowerCase()
  }
  return word === word.toUpperCase()
     || word === word.toLowerCase()
};
// @lc code=end
