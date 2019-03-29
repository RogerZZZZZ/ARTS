// /**
//  * @version 1 5.61%
//  * @param {number[][]} A
//  * @return {number[][]}
//  */
// var transpose = function(A) {
//     return A.reduce((acc, val) => (val.forEach((v, i) => acc[i].push(v)), acc), 
//     Array.from({
//       length: Math.max(...A.map(x => x.length))
//     }).map(x => []))
// };

/**
 * @version 2 100%
 * @param {number[][]} A
 * @return {number[][]}
 */
var transpose = function(A) {
  const inLen = A[0].length
  let res = []
  for (let i = 0; i < inLen; i++) res[i] = []

  for (let i = 0; i < A.length; i++) {
    const tmp = A[i]
    for (let j = 0; j < tmp.length; j++) {
      res[j][i] = tmp[j]
    }
  }
  return res
};

// most elegant not mean the most efficient