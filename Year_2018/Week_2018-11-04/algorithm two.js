// /**
//  * @version 1 25.12%
//  * @param {number[][]} matrix
//  * @return {boolean}
//  */
// var isToeplitzMatrix = function(matrix) {
//     let height = matrix[0].length
//     let width = matrix.length
//     let res = new Map()

//     for(let i = 0; i < width; i++) {
//       for(let j = 0; j < height; j++) {
//         let = tmp = matrix[i][j]
//         if (!res.has(i - j)) {
//           res.set(i - j, tmp)
//         } else if (res.get(i - j) !== tmp) {
//           return false
//         }
//       }
//     }
//     return true
// };

// /**
//  * @version 2 5.5%.....
//  * @param {number[][]} matrix
//  * @return {boolean}
//  */
// var isToeplitzMatrix = function(matrix) {
//   let height = matrix[0].length
//   let width = matrix.length
//   let res = {}

//   for(let i = 0; i < width; i++) {
//     for(let j = 0; j < height; j++) {
//       let = tmp = matrix[i][j]
//       let index = i - j
//       if (res[index] == undefined) {
//         res[index] = tmp
//       } else if (res[index] !== tmp) {
//         return false
//       }
//     }
//   }
//   return true
// };

// /**
//  * @version 3 42.03
//  * @param {number[][]} matrix
//  * @return {boolean}
//  */
// var isToeplitzMatrix = function(matrix) {
//     let height = matrix[0].length
//     let width = matrix.length

//     for(let i = 0; i < width; i++) {
//       for(let j = 0; j < height; j++) {
//         if (i > 0 && j > 0 && matrix[i-1][j-1] !== matrix[i][j]) return false
//       }
//     }
//     return true
// };


/**
 * @version 4 100
 * @param {number[][]} matrix
 * @return {boolean}
 */
var isToeplitzMatrix = function(matrix) {
  let height = matrix[0].length
  let width = matrix.length

  for(let i = 1; i < width; i++) {
    for(let j = 1; j < height; j++) {
      if (matrix[i-1][j-1] !== matrix[i][j]) return false
    }
  }
  return true
};

console.log(isToeplitzMatrix([[1,2,3,4],[5,1,2,3],[9,5,1,2]]))
console.log(isToeplitzMatrix([[0,33,98],[34,22,33]]))