/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 * @result 87.8%
 */
var isSubsequence = function(s, t) {
  let idx = 0
  for (let i = 0; i < s.length; i++) {
    const char = s[i]
    const index = t.slice(idx, t.length).indexOf(char)
    if (index !== -1) {
      idx = index + idx + 1
    } else {
      return false
    }
  }
  return true    
};

console.log(isSubsequence("aaaaaa",
"bbaaaa"))