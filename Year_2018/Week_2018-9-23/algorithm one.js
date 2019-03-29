// /**
//  * @version one 31%
//  * @param {number[]} nums
//  * @return {number}
//  */
// var arrayPairSum = function(nums) {
//   let positive = []
//   let negative = []

//   nums.map(item => {
//     if (item >= 0) {
//       positive.push(item)
//     } else {
//       negative.push(item)
//     }
//   })
//   positive = positive.sort((a, b) => a - b)
//   negative = negative.sort((a, b) => a - b)

//   const arr = negative.concat(positive)
//   let res = 0
//   for (let i = 0; i < arr.length; i += 2) {
//     res += Math.min(arr[i], arr[i + 1])
//   }
//   return res
// };

/**
 * @version two 94.3%
 * @param {number[]} nums
 * @return {number}
 */
var arrayPairSum = function(nums) {
  const arr = nums.sort((a, b) => a - b)
  let res = 0
  for (let i = 0; i < arr.length; i += 2) {
    res += Math.min(arr[i], arr[i + 1])
  }
  return res
};

// /**
//  * @deprecated
//  * @version three 55.5%
//  * @param {number[]} nums
//  * @return {number}
//  */
// var arrayPairSum = function(nums) {
//   const arr = nums.sort((a, b) => a - b)
//   let flag = true
//   return arr.reduce((max, el) => {
//     if (flag) {
//       max += el
//     }
//     flag = !flag
//     return max
//   }, 0)
// };


console.log(arrayPairSum([-470, 66, -4835, -5623]))

console.log(arrayPairSum([6214, -2290, 2833, -7908]))

console.log(arrayPairSum([-1429, -9671, 3622, 581, -2419, -996]))

console.log(arrayPairSum([5436, -5173, 2521, 371, -1578, 1379]))