// /**
//  * @version 1 8.82%
//  * @param {number[]} candies
//  * @return {number}
//  */
// var distributeCandies = function(candies) {
//   let count = 0
//   let cal = candies.reduce((res, el) => {
//     if (res[el] !== undefined) {
//       res[el]++
//     } else {
//       res[el] = 1
//     }
//     return res
//   }, {})


//   let single = 0
//   let left = 0
//   for(let key in cal) {
//     if (cal[key] > 1) {
//       count++
//       left += cal[key] - 2
//     } else {
//       single++
//     }
//   }
//   const other = left >= single ? single : left + Math.ceil((single-left)/2)
//   return count + other
// };


/**
 * @version 2 51.96%
 * @param {number[]} candies
 * @return {number}
 */
var distributeCandies = function(candies) {
  const half = candies.length/2
  const sister = new Set()
  for (let i = 0; i < candies.length; i++) {
    sister.add(candies[i])
  }
  return sister.size > half ? half : sister.size
};

console.log(distributeCandies([1,1,2,2,3,3]))
console.log(distributeCandies([1000,1,1,1]))
console.log(distributeCandies([0,0,14,0,10,0,0,0]))
console.log(distributeCandies([1,1,2,3]))