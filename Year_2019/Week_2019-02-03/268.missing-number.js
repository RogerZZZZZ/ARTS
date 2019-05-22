/*
 * @lc app=leetcode id=268 lang=javascript
 *
 * [268] Missing Number
 */
/**
 * @version1 98.38%
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function(nums) {
  if (!nums || nums.length <= 0) return null
  
  let max = nums[0]
  let count = nums[0]
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > max) {
      max = nums[i]
    }
    count += nums[i]
  }

  const miss = (max * (max + 1)) / 2 - count
  return miss === 0 && (max === nums.length - 1)
    ? max + 1 : miss 
};

