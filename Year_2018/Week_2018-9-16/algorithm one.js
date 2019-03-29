/**
 * @version 1 75%
 * @param {number[]} A
 * @return {number}
 */
var peakIndexInMountainArray = function(A) {
    if (A === null || A.length === 1 || A.length === 0) return 0

    let start = 0

    for (var i = 1; i < A.length; i++) {
        if (A[start] > A[i]) return start
        start = i
    }

    return A.length - 1
};

console.log(peakIndexInMountainArray([0,1,0]))