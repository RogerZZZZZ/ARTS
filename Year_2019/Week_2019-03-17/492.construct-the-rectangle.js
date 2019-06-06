/*
 * @lc app=leetcode id=492 lang=javascript
 *
 * [492] Construct the Rectangle
 */
/**
 * @version 1 5.26%
 * @param {number} area
 * @return {number[]}
 */
var constructRectangle = function(area) {
  let min = Number.MAX_VALUE;
  let start = area;
  for (let i = 1; i <= area; i++) {
    const another = area / i;
    if (another % 1 === 0) {
      if (i >= another) {
        if (i - another < min) {
          min = i - another;
          start = another;
        }
      }
    }
  }
  return [start + min, start]
};

