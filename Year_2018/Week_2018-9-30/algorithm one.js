/**
 * @version 1 100%
 * @param {number[][]} grid
 * @return {number}
 */
var projectionArea = function(grid) {
  let [ countX, countY, countZ ] = [0, 0, 0]
  let tmpCountXArr = []

  for (let i = 0; i < grid.length; i++) {
    const tmp = grid[i]
    let tmpMaxY = 0
    for (let j = 0; j < tmp.length; j++) {
      const inTmp = tmp[j]
      if (tmpMaxY < inTmp) tmpMaxY = inTmp
      if (inTmp > 0) countZ += 1

      tmpCountXArr[j] = Math.max(tmpCountXArr[j] || 0, inTmp)
    }
    countY += tmpMaxY
  }
  countX = tmpCountXArr.reduce((count, el) => count += el, 0)
  return countX + countY + countZ
};

console.log(projectionArea([[2,2,2],[2,1,2],[2,2,2]]))