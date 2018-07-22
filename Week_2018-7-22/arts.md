#Week 2018-7-22
## Algorithm
`Question`:Given a positive integer num, write a function which returns True if num is a perfect square else False.
Note: Do not use any built-in library function such as sqrt.
```
Input: 16
Returns: True
```

`Solution`: (Use binary search)

```javascript
/**
 * @param {number} num
 * @return {boolean}
 */
var isPerfectSquare = function(num) {
    if (num < 0) return false
    if (num === 1) return true
    let left = 0,
        right = Math.floor(num/2)
    
    while(left <= right) {
        let mid = Math.floor((left + right) / 2)
        let count = mid * mid
        if (count === num) {
            return true
        } else if (count < num) {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }
    return false
    
};
```

`Question`:Given an array consisting of n integers, find the contiguous subarray of given length k that has the maximum average value. And you need to output the maximum average value.
```
// Example
Input: [1,12,-5,-6,50,3], k = 4
Output: 12.75
Explanation: Maximum average is (12-5-6+50)/4 = 51/4 = 12.75
```

`Solution`:
```javascript
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findMaxAverage = function(nums, k) {
    for (let i = 1; i < nums.length; i++) {
        nums[i] = nums[i] + nums[i-1]
    }
    
    let max = nums[k - 1]
    for (let i = 1; i < nums.length-k+1; i++) {
        max = Math.max(nums[k+i-1] - nums[i - 1], max)
    }
    return max/k
};
```

## Review

## Tips

## Share