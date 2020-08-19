/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 * @result 57%
 */
var reverseStr = function(s, k) {
  if (k > s.length)
    return s.split('').reverse().join('');
  for (let i = 0; i < s.length; i += 2 * k) {
    s = s.substring(0, i) + s.substr(i, k).split('').reverse().join('') + s.substring(i + k);
  }
  return s;
};