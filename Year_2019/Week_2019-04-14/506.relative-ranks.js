/*
 * @lc app=leetcode id=506 lang=javascript
 *
 * [506] Relative Ranks
 */

// @lc code=start
/**
 * @version 1 96.83%
 * @param {number[]} nums
 * @return {string[]}
 */
var findRelativeRanks = function(nums) {
  const ranks = {};
  const medals = ["Gold Medal", "Silver Medal", "Bronze Medal"];
  const sorted = nums.slice().sort((a, b) => b - a);
 
  sorted.forEach((n, i) => ranks[n] = i < 3 ? medals[i] : `${i + 1}`);
  return nums.map(n => ranks[n]);
};
// @lc code=end