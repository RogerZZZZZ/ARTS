/**
 * version 1 accept 100%
 * @param {number} n
 * @return {number}
 */
var arrangeCoins = function(n) {
    if (n <= 0) return 0
    let t = Math.sqrt(2 * n)
    let t1 = t - 1
    for (let i = Math.floor(t1); i < t; i++) {
        let tmp = (1 + i) * i / 2
        let tmp1 = (2 + i) * (i + 1) / 2
        if (n === tmp || (tmp < n && tmp1 > n)) return i
    }  
};

console.log(arrangeCoins(15))