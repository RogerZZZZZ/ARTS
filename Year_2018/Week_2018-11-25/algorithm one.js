// /**
//  * @version 1 52.13%
//  * @param {string[]} words
//  * @param {string} order
//  * @return {boolean}
//  */
// var isAlienSorted = function(words, order) {
//   const size = words.length
//   if (size <= 1) return true

//   const alphabet = {}

//   for (let i = 0; i < order.length; i++) {
//     alphabet[order[i]] = i
//   }

//   let pre = words[0]
//   for (let i = 1; i < size; i++) {
//     const cur = words[i]
//     if (!check(pre, cur, alphabet)) return false
//     pre = cur
//   }
//   return true
// };


// const check = (a, b, alphabet) => {
//   const size1 = a.length, size2 = b.length

//   for (let i = 0; i < Math.min(size1, size2); i++) {
//     const tmp1 = alphabet[a[i]]
//     const tmp2 = alphabet[b[i]]
//     if (tmp1 > tmp2) {
//       return false
//     } else if (tmp2 > tmp1) {
//       return true
//     }
//   }

//   return size2 >= size1
// }

/**
 * @version 2 86.17%
 * @param {string[]} words
 * @param {string} order
 * @return {boolean}
 */
var isAlienSorted = function(words, order) {
  const size = words.length
  if (size <= 1) return true

  const alphabet = {}

  for (let i = 0; i < order.length; i++) {
    alphabet[order[i]] = i
  }

  let pre = getIndex(words[0], alphabet)
  for (let i = 1; i < size; i++) {
    const cur = getIndex(words[i], alphabet)
    if (!check(pre, cur)) return false
    pre = cur
  }
  return true
};

const getIndex = (a, alphabet) => {
  let res = []
  for (let i = 0; i < a.length; i++) {
    res.push(alphabet[a[i]])
  }
  return res
}

const check = (a, b) => {
  const size1 = a.length, size2 = b.length

  for (let i = 0; i < Math.min(size1, size2); i++) {
    const tmp1 = a[i], tmp2 = b[i]
    if (tmp1 > tmp2) {
      return false
    } else if (tmp2 > tmp1) {
      return true
    }
  }

  return size2 >= size1
}

console.log(isAlienSorted(["kuvp","q"], 'ngxlkthsjuoqcpavbfdermiywz'))