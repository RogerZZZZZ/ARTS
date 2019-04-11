/*
 * @lc app=leetcode id=69 lang=javascript
 *
 * [69] Sqrt(x)
 *
 * https://leetcode.com/problems/sqrtx/description/
 *
 * algorithms
 * Easy (30.86%)
 * Total Accepted:    345.8K
 * Total Submissions: 1.1M
 * Testcase Example:  '4'
 *
 * Implement int sqrt(int x).
 * 
 * Compute and return the square root of x, where x is guaranteed to be a
 * non-negative integer.
 * 
 * Since the return type is an integer, the decimal digits are truncated and
 * only the integer part of the result is returned.
 * 
 * Example 1:
 * 
 * 
 * Input: 4
 * Output: 2
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: 8
 * Output: 2
 * Explanation: The square root of 8 is 2.82842..., and since 
 * the decimal part is truncated, 2 is returned.
 * 
 * 
 */
/**
 * @version 1 97.41% 52.68% memory
 * @param {number} x
 * @return {number}
 */
var mySqrt = function(x) {
  if (x === 1) return x
  let left = 0
  let right = x
  let mid = Math.floor((left + right) / 2)
  let count = mid * mid
  while(left < right) {
    mid = Math.floor((left + right) / 2)
    let nextNum = mid + 1
    count = mid * mid
    let count2 = nextNum * nextNum
    if (count < x && count2 > x) {
      return mid
    } else if (count > x) {
      right = mid
    } else if (count === x){
      return mid
    } else {
      left = mid
    }
  }
  return mid
};


console.log(mySqrt(16))

