/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
// let count = 0
// var numDistinct = function(s, t) {
//   count = 0

//   findPaths(t, s)
//   return count
// };

// const findPaths = (s, t) => {
//   if (s.length === 1 && t.indexOf(s) > -1) {
//     count += findAllPos(s, t).length
//     return
//   }
//   const char = s[0]
//   const arr = findAllPos(char, t)
//   if (arr.length === 0) {
//     return
//   }

//   arr.forEach((item) => {
//     findPaths(s.slice(1, s.length), t.slice(item + 1, t.length))
//   })
// }

/**
 * 超时
 * @param {*} char 
 * @param {*} str 
 */
// const findAllPos = (char, str) => {
//   const pos = []
//   let start = 0
//   const len = str.length
//   let posItem = str.slice(start, len).indexOf(char)
//   while(posItem > -1) {
//     pos.push(posItem)
//     start = posItem + 1
//     posItem = str.indexOf(char, start)
//   }
//   return pos
// }

// const findAllPos = (char, str) => {
//   const pos = []
//   for (let i = 0; i < str.length; i++) {
//     if (str[i] === char) pos.push(i)
//   }
//   return pos
// }

/**
 * dp
 * @param {} s 
 * @param {*} t 
 */
var numDistinct = function(s, t) {
    
  let dp = Array(t.length+1).fill(0);
  
  dp[0] = 1;
  for (let i = 0; i < s.length; i++) {
      //Iterate t string (from end to start so we don't process data that we've just entered)
      for (let j = dp.length-1; j >= 0; j--) {
        //Char match  
          if (s[i] === t[j]) {
              //Add this char count to next position
              dp[j+1] += dp[j]
          }
      }
  }
  
  return dp[t.length];
};

// console.log('position', findAllPos('C', 'CCC'))

console.log('---->', numDistinct('rabbbit', 'rabbit'))
// console.log('---->', numDistinct('ABCDEAB', 'A'))
// console.log('---->', numDistinct('ABCDEAB', 'AB'))
// console.log('---->', numDistinct('CCC', 'C'))