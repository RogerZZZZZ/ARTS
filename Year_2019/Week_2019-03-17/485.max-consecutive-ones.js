/*
 * @lc app=leetcode id=485 lang=javascript
 *
 * [485] Max Consecutive Ones
 */
/**
 * @version1 93.61%
 * @param {number[]} nums
 * @return {number}
 */
var findMaxConsecutiveOnes = function(nums) {
  let count = 0;
  let max = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 1) {
      count = 0
    } else {
      count++
      max = max > count ? max : count;
    }
  }
  return max;
};

