// /**
//  * @version 1 70.98%
//  * @param {string} A
//  * @param {string} B
//  * @return {string[]}
//  */
// var uncommonFromSentences = function(A, B) {
//   const arr1 = A.split(' ')
//   const arr2 = B.split(' ')
//   return deleteDulication(arr1.concat(arr2))
// };

// function deleteDulication(arr) {
//   let res = []
//   let map = new Map()
//   for (let i = 0; i < arr.length; i++) {
//     if (!map.has(arr[i])) {
//       map.set(arr[i], 1)
//     } else {
//       let count = map.get(arr[i])
//       map.set(arr[i], ++count)
//     }
//   }
//   map.forEach((value, key) => {
//     if (value < 2) res.push(key)
//   })
//   return res
// }

/**
 * @version 2 70.98%
 * @param {string} A
 * @param {string} B
 * @return {string[]}
 */
var uncommonFromSentences = function(A, B) {
  const arr1 = A.split(' ')
  const arr2 = B.split(' ')
  return deleteDulication(arr1.concat(arr2))
};

function deleteDulication(arr) {
  const res = []
  const map = new Map()
  for (let i = 0; i < arr.length; i++) {
    let count = map.get(arr[i]) || 0
    map.set(arr[i], ++count)
  }
  map.forEach((value, key) => {
    if (value < 2) res.push(key)
  })
  return res
}

console.log(uncommonFromSentences("this apple is sweet", "this apple is sour"))
console.log(uncommonFromSentences("s z z z s", "s z ejt"))