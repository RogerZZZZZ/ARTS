/**
 * @version 1 47.06%
 * @param {number[]} A
 * @return {boolean}
 */
var isMonotonic = function(A) {
  if (A.length <= 2) return true

  let first = A[0]
  let flag

  for (let i = 1; i < A.length; i++) {
    if (A[i] !== first) {
      if (flag === undefined) {
        flag = first - A[i] > 0
        first = A[i]
      } else if (A[i] !== first) {
        if (flag !== (first - A[i] > 0)) return false
        first = A[i]
      }
    }
  }
  return true
};

// console.log(isMonotonic([1,2,4,3]))
// console.log(isMonotonic([6,5,4,4]))
// console.log(isMonotonic([1,2,2,3]))
// console.log(isMonotonic([1,1,0]))
console.log(isMonotonic([1,3,2]))