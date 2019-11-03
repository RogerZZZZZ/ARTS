/*
 * @lc app=leetcode id=447 lang=javascript
 *
 * [447] Number of Boomerangs 86%
 */

// @lc code=start
/**
 * @param {number[][]} points
 * @return {number}
 */
var numberOfBoomerangs = function(points) {
  let count = 0
  for (let i = 0; i < points.length; i++) {
    const distanceMap = new Map()
    for (let j = 0; j < points.length; j++) {
      if (i !== j) {
        const distance = getDistance(points[i], points[j])
        distanceMap.set(distance, (distanceMap.get(distance) || 0) + 1)
      }
    }

    for (let item of distanceMap.values()) {
      count += item * (item - 1)
    }
  }
  return count
};

const getDistance = (pointA, pointB) => {
  return Math.pow(pointA[0] - pointB[0], 2) + Math.pow(pointA[1] - pointB[1], 2)
}

console.log(numberOfBoomerangs([[0,0],[1,0],[2,0]]))
// @lc code=end

