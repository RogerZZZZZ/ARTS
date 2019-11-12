/*
 * @lc app=leetcode id=509 lang=javascript
 *
 * [509] Fibonacci Number
 */

// @lc code=start
/**
 * @version 1 97.66%
 * @param {number} N
 * @return {number}
 */
const cache = new Map()
var fib = function(N) {
  if (N === 0 || N === 1) return N
  if (cache.get(N)) {
    return cache.get(N)
  } else {
    const res = fib(N - 1) + fib(N - 2)
    cache.set(N, res)
    return res
  }
};