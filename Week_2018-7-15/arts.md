
#### Algorithm
`Question`: Given a non-empty string check if it can be constructed by taking a substring of it and appending multiple copies of the substring together. You may assume the given string consists of lowercase English letters only and its length will not exceed 10000.

```
Example:
Input: "abab"

Output: True

Explanation: It's the substring "ab" twice.
```

```
/**
 * @param {string} s
 * @return {boolean}
 */
var repeatedSubstringPattern = function(s) {
    let length = s.length
    if (length < 2) return false
    for (let i = 1; i <= length/2; i++) {
        if (length % i === 0) {
            let j = i
            while(j < length && s[j] === s[j % i]) {
                j++
            }
            if (j === length) return true
        }
    }
    return false
};
```

#### Review
`Topic`: Facebook Cache Strategy

#### Tips

#### Share