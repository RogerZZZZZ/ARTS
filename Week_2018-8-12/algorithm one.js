/**
 * @verison one 80ms 98%
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function(s, p) {
    const _slength = s.length
    const _plength = p.length
    let count = new Array(26)
    let window = new Array(26)
    let startIndex = 'a'.charCodeAt()
    for (let i = 0; i < 26; i++) {
        count[i] = 0
        window[i] = 0
    }

    for (let i = 0; i < _plength; i++) {
        let char = p.charAt(i).charCodeAt();
        ++count[char - startIndex]
    }

    let res = []
    for (let i = 0; i <= _slength; i++) {
        if (i >= _plength) {
            let match = true
            for(let j = 0; j < count.length; ++j){
                if(window[j] !== count[j]){
                    match = false
                    break
                }
            }
            if(match){
                res.push(i - _plength);
            }
            let o = s.charAt(i - _plength).charCodeAt()
            --window[o - startIndex]
        }
        if (i != _slength) {
            let char = s.charAt(i).charCodeAt()
            ++window[char - startIndex]
        }
    }
    return res
};

// sliding window
console.log(findAnagrams('bcabcacb', 'abc'))
