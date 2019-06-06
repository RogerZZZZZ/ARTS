/*
 * @lc app=leetcode id=453 lang=javascript
 *
 * [453] Minimum Moves to Equal Array Elements
 */
/**
 * @version 1 96.13%
 * @param {number[]} nums
 * @return {number}
 */
var minMoves = function(nums) {
  let min = nums[0]
  let sum = nums[0]

  for (let i = 1; i < nums.length; i++) {
    min = min < nums[i] ? min : nums[i]
    sum += nums[i]
  }

  return sum - min * nums.length
};

