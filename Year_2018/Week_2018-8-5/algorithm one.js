// /**
//  * @version 1 time spent 8000ms
//  * @param {number[]} nums
//  * @return {number}
//  */
// var arrayNesting = function(nums) {
//     if (nums.length === 1) return 1
//     let max = 1;
//     for (let i = 0; i < nums.length; i++) {
//         let tmp = findNextNumber(nums[i], nums[i], nums, 1)
//         if (max < tmp) max = tmp 
//     }
//     return max
// };

// const findNextNumber = (target, index, arr, maxNumber) => {
//     if (target === arr[index]) {
//         return maxNumber
//     } else {
//         return findNextNumber(target, arr[index], arr, maxNumber + 1)
//     }
// }

/**
 * @version 2 time spent 88ms
 * @param {number[]} nums
 * @return {number}
 */
var arrayNesting = function(nums) {
    let cache = {}
    let max = 0
    for (let i = 0; i < nums.length; i++) {
        let count = {count: 0}; //可以同步更新每一个index位置上的值
        let cur = nums[i]
        while(cache[cur] === undefined) {
            cache[cur] = count
            count.count ++;
            cur = nums[cur]
        }
        if (max < cache[cur].count) max = cache[cur].count
    }
    return max
};


console.log(arrayNesting([5,4,0,3,1,6,2]))