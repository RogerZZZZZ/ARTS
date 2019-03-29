/**
 * @param {string} s
 * @return {string}
 */
var reverseVowels = function(s) {
    let index = []
    let vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']
    for (let i = 0; i < s.length; i++) {
        if (vowels.indexOf(s[i]) != -1) index.push(i)
    }

    let size = index.length
    let arr = s.split('')
    for (let i = 0; i < Math.ceil(size/2); i++) {
        let tmp = s[index[i]]
        arr[index[i]] = s[index[size - i - 1]]
        arr[index[size - i - 1]] = tmp
    }
    return arr.join('')
};

reverseVowels('hello')