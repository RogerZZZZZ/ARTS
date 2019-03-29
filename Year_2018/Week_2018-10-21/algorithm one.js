// /**
//  * @version 1 14.65% 108ms
//  * @param {string} s
//  * @return {string}
//  */
// var reverseWords = function(s) {
//     return s.split(' ').map(el => el.split('').reverse().join('')).join(' ')
// };

/**
 * @version 2 80.78% 84ms
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
  return s.split(' ').reduce((str, el) => str + el.split('').reverse().join('') + ' ', '').trim()
};

console.log(reverseWords("Let's take LeetCode contest"))