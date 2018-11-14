/**
 * @param {number} num
 * @return {number}
 */
var findComplement = function(num) {
  return (Math.pow(2, num.toString(2).length) - 1) ^ num;
};