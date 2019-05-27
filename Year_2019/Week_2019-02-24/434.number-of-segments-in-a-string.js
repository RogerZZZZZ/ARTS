/*
 * @lc app=leetcode id=434 lang=javascript
 *
 * [434] Number of Segments in a String
 */
/**
 * @version 1 100%
 * @param {string} s
 * @return {number}
 */
var countSegments = function(s) {
  s = s.trim()
  if (s === '') return 0
  let count = 0
  s.split(' ').map(item => {
    item = item.trim()
    if (item !== '') count++
  })
  return count
};

