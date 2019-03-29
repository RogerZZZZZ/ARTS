// /**
//  * @version 1 20.47%
//  * @param {number[]} A
//  * @param {number} K
//  * @return {number}
//  */
// var smallestRangeI = function(A, K) {
//     const arr = A.sort((a, b) => a - b)
//     const res = arr[arr.length - 1] - 2 * K - arr[0]
//     return res < 0 ? 0 : res
// };


/**
 * @version 2 100%
 * @param {number[]} A
 * @param {number} K
 * @return {number}
 */
var smallestRangeI = function(A, K) {
  if (A.length < 2) return 0
  const max = Math.max(...A)
  const min = Math.min(...A)
  const res = max - 2 * K - min
  return res < 0 ? 0 : res
};

// Conclusion: sort function is really slow.