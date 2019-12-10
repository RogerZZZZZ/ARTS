/*
 * @lc app=leetcode id=532 lang=javascript
 *
 * [532] K-diff Pairs in an Array
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findPairs = function(nums, k) {
  let count = 0
  const set = new Set(nums)

  var findDuplicates = (nums) => {
    let result = [];
    nums.forEach((num, index) => {
      if (nums.indexOf(num, index + 1) > -1
        && result.indexOf(num) === -1) {
        result.push(num);
      }
    })
    return result.length;
  }

  if (k < 0) return 0

  if (k === 0) return findDuplicates(nums)

  set.forEach(val => {
    if (set.has(val + k)) {
      count++
    }
  })

  return count
};
// @lc code=end