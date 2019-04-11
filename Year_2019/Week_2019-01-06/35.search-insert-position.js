/*
 * @lc app=leetcode id=35 lang=javascript
 *
 * [35] Search Insert Position
 *
 * https://leetcode.com/problems/search-insert-position/description/
 *
 * algorithms
 * Easy (40.55%)
 * Total Accepted:    372.2K
 * Total Submissions: 917.9K
 * Testcase Example:  '[1,3,5,6]\n5'
 *
 * Given a sorted array and a target value, return the index if the target is
 * found. If not, return the index where it would be if it were inserted in
 * order.
 * 
 * You may assume no duplicates in the array.
 * 
 * Example 1:
 * 
 * 
 * Input: [1,3,5,6], 5
 * Output: 2
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: [1,3,5,6], 2
 * Output: 1
 * 
 * 
 * Example 3:
 * 
 * 
 * Input: [1,3,5,6], 7
 * Output: 4
 * 
 * 
 * Example 4:
 * 
 * 
 * Input: [1,3,5,6], 0
 * Output: 0
 * 
 * 
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {
  return search(0, nums.length - 1, nums, target)
};

const search = (left, right, arr, target) => {
  
  if (right > left) {
    const midIndex = Math.floor((left + right) / 2)
    const mid = arr[midIndex]
    if (mid > target) {
      return search(left, midIndex - 1, arr, target)
    } else if (mid < target) {
      return search(midIndex + 1, right, arr, target)
    } else {
      return midIndex
    }
  } else if (left === right && arr[left] === target) {
    return left
  } else {
    return arr[left] > target
      ? left : target < arr[right]
      ? right : right + 1
  }
}

