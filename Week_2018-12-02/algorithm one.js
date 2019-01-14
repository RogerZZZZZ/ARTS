/**
 * @version 1 37.04%
 * @param {string} S
 * @return {string[]}
 */
var letterCasePermutation = function(S) {
  if (S === undefined) return []
  const arr = []
  
  helper(S, 0, arr)

  return arr
};

const helper = (s, idx, list) => {
  const reg = /^\d+$/
  if (s.length <= idx) {
    list.push(s)
    return
  }

  if (reg.test(s[idx])) {
    helper(s, idx + 1, list)
    return
  }

  const lower = replaceAt(s, idx, s.charAt(idx).toLowerCase())
  helper(lower, idx + 1, list)


  const upper = replaceAt(s, idx, s.charAt(idx).toUpperCase())
  helper(upper, idx + 1, list)
}

const replaceAt = (str, idx, replacement) => {
  return str.substr(0, idx) + replacement + str.substr(idx + replacement.length)
}

console.log(letterCasePermutation('a1'))