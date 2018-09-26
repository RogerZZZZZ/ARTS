/**
 * @version 1 100%
 * @param {number[]} A
 * @return {number}
 */
var flipAndInvertImage = function(A) {
    return A.map(item => {
      item = item.reverse()
      return item.map(it => {
        return 1 - it
      })
    })
};

const data = [[1,1,0,0],[1,0,0,1],[0,1,1,1],[1,0,1,0]]

console.log(flipAndInvertImage(data))