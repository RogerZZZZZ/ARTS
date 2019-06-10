/*
 * @lc app=leetcode id=455 lang=javascript
 *
 * [455] Assign Cookies
 */
/**
 * @version 1 25.76%
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
// var findContentChildren = function(g, s) {
//   let count = 0
//   g = g.sort((a, b) => a - b)
//   s = s.sort((a, b) => a - b)
//   for (let i = 0; i < s.length; i++) {
//     if (g[0] <= s[i]) {
//       count++;
//       g.shift()
//     }
//   }
//   return count
// };


/**
 * @version 1 82.32%
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
var findContentChildren = function(g, s) {
  let count = 0
  let idx = 0
  g = g.sort((a, b) => a - b)
  s = s.sort((a, b) => a - b)
  for (let i = 0; i < s.length; i++) {
    if (g[idx] <= s[i]) {
      count++
      idx++
    }
  }
  return count
};
