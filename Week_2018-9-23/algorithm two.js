/**
 * @version 1
 * @param {number[]} A
 * @return {number[]}
 */
var sortArrayByParityII = function(A) {
  const arr = []
  const oddArr = []
  const evenArr = []
  let flag = true

  let tmp;
  do {
    tmp = A.shift()
    if (!tmp) continue
    const tmpFlag = tmp % 2 === 0
    if ((tmpFlag && flag) || (!tmpFlag && !flag)) {
      arr.push(tmp)
      flag = !flag
    } else if (tmpFlag && !flag) {
      evenArr.push(tmp)
      if (oddArr.length) {
        arr.push(oddArr.pop())
        flag = !flag
      }
    } else if (!tmpFlag && flag) {
      oddArr.push(tmp)
      if (evenArr.length) {
        arr.push(evenArr.pop())
        flag = !flag
      }
    }
  } while (tmp)
  return arr.concat(oddArr, evenArr)
};

/**
 * @version 2 47%
 * @param {number[]} A
 * @return {number[]}
 */
var sortArrayByParityII = function(A) {
  const len = A.length
  const res = []
  let x = 0
  let y = 1

  for (let i = 0; i < len; i++) {
    if (A[i] % 2 === 0) {
      res[x] = A[i]
      x += 2
    }
  }

  for (let i = 0; i < len; i++) {
    if (A[i] % 2 !== 0) {
      res[y] = A[i]
      y += 2
    }
  }

  return res
}

console.log(sortArrayByParityII([4,2,5,7]))

console.log(sortArrayByParityII([4,1,3,2]))