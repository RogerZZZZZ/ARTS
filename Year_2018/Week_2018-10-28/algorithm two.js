/**
 * @version 1 62.43%
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function(words) {

  let rows = [1,2,2,1,0,1,1,1,0,1,1,1,2,2,0,0,0,0,1,0,0,2,0,2,0,2]
  let ans = []

  for (let i = 0; i < words.length; i++) {
    let word = words[i].toLocaleLowerCase()
    if (word.length > 0) {
      let flag = rows[index(word[0])]
      let j = 1
      for (; j < word.length; j++) {
        if (rows[index(word[j])] !== flag) break
      }
      if (j === word.length) ans.push(words[i])
    }
  }
  return ans
};

var index = (word) => {
  return word.charCodeAt() - 97
}

console.log(findWords(["Hello","Alaska","Dad","Peace"]))
