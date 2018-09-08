/**
 * @version 100%
 * @param {number[][]} A
 * @return {number[][]}
 */
var flipAndInvertImage = function(A) {
  return A.map((list) => {
    const reversed = [];
    
    for (let i = list.length - 1; i > -1; i -= 1) {
      reversed.push(list[i] ^ 1);
    }
    
    return reversed;
  });
};