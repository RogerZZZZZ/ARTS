/**
 * @param {string} S
 * @param {number} K
 * @return {string}
 */
var licenseKeyFormatting = function(S, K) {
  let arr = S.split('-')
  let res = []
  for (let i = 0; i < arr.length - 1; i++) {
      let first = arr[i]
      let second = arr[i+1]
      if (first.length + second.length <= K) {
          res.push(first + second)
          arr[i] = first + second
      } else {
          res.push(first)
      }
      console.log(arr)
  }
  return res.join('-')
};

console.log(licenseKeyFormatting('5F3Z-2e-9-w', 4))