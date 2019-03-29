// /**
//  * @version 1 23.45%
//  * @param {number[][]} grid
//  * @return {number}
//  */
// var islandPerimeter = function(grid) {
//   let count = 0
//   let overlap = 0
//   for (let i = 0; i < grid.length; i++) {
//     for (let j = 0; j < grid[0].length; j++) {
//       if (grid[i][j] === 1) {
//         count++
//         if(i+1 >= 0 && i+1 < grid.length && grid[i+1][j] === 1) overlap++
//         if(j+1 >= 0 && j+1 < grid[i].length && grid[i][j+1] === 1) overlap++
//       }
//     }
//   }

//   return 4*count - 2*overlap
// };

/**
 * @version 2 98.62%
 * @param {number[][]} grid
 * @return {number}
 */
var islandPerimeter = function(grid) {
  let count = 0
  let overlap = 0
  const size = grid.length
  const height = grid[0].length
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < height; j++) {
      if (grid[i][j] === 1) {
        count++
        if(i+1 < size && grid[i+1][j] === 1) overlap++
        if(j+1 < height && grid[i][j+1] === 1) overlap++
      }
    }
  }

  return 4*count - 2*overlap
};