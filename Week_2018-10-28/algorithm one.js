// /**
//  * @version 1 96.77%
//  * @param {string} S
//  * @param {character} C
//  * @return {number[]}
//  */
// var shortestToChar = function(S, C) {
//     let size = S.length
//     let res = []

//     let pre = -Number.MAX_VALUE / 2
//     for (let i = 0; i < size; i++) {
//       if (S[i] === C) pre = i
//       res[i] = i - pre
//     }

//     pre = Number.MAX_VALUE / 2
//     for (let i = size - 1; i >= 0; i--) {
//       if (S[i] === C) pre = i
//       res[i] = Math.min(res[i], pre - i)
//     }

//     return res
// };


/**
 * @version 2 96.77%
 * @param {string} S
 * @param {character} C
 * @return {number[]}
 */
var shortestToChar = function(S, C) {
  let size = S.length
  let res = []

  let pre = -10000 / 2
  for (let i = 0; i < size; i++) {
    if (S[i] === C) pre = i
    res[i] = i - pre
  }

  pre = 10000 / 2
  for (let i = size - 1; i >= 0; i--) {
    if (S[i] === C) pre = i
    res[i] = Math.min(res[i], pre - i)
  }

  return res
};

console.log(shortestToChar('loveleetcode', 'e'))