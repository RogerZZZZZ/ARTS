/**
 * @version 1 83.82%
 * // Definition for a QuadTree node.
 * function Node(val,isLeaf,topLeft,topRight,bottomLeft,bottomRight) {
 *    this.val = val;
 *    this.isLeaf = isLeaf;
 *    this.topLeft = topLeft;
 *    this.topRight = topRight;
 *    this.bottomLeft = bottomLeft;
 *    this.bottomRight = bottomRight;
 * };
 */
/**
 * @param {number[][]} grid
 * @return {Node}
 */
var construct = function(grid) {
  const size = grid.length;
  if (size === 0) {
      return null;
  }
  
  const sum = Array.from({length: size}).map(() => ([]));
  
  for (let row = 0; row < size; row ++) {
      for (let col = 0; col < size; col ++) {
          const left = col > 0 ? sum[row][col - 1] : 0;
          const top = row > 0 ? sum[row - 1][col] : 0;
          const shared = row > 0 && col > 0 ? sum[row - 1][col - 1]: 0;
          sum[row][col] = grid[row][col] + left + top - shared;
      }
  }
  
  
  function getArea(row, col) {
      if (row < 0 || col < 0) {
          return 0;
      }
      return sum[row][col];
  }
  
  
  function getTree(row, col, length) {
      if (length === 1) {
          return new Node(grid[row][col] === 1, true, null, null, null, null);
      }
      const area = length * length;
      
      const computedArea = sum[row + length - 1][col + length - 1] - getArea(row - 1, col + length -1) - getArea(row + length- 1, col - 1) + getArea(row - 1, col - 1);
      if (computedArea === 0) {
          return new Node(false, true, null, null, null, null);
      }
      if (area === computedArea) {            
          return new Node(true, true, null, null, null, null);
      }
      
      const halfLength = length / 2;
      return new Node('*', false, getTree(row, col, halfLength), getTree(row, col + halfLength, halfLength), getTree(row + halfLength, col, halfLength), getTree(row + halfLength, col + halfLength, halfLength));
  }
  
  return getTree(0, 0, size);
};