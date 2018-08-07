// /**
//  * @version 1 1592ms
//  * @param {string} S
//  * @param {number} K
//  * @return {string}
//  */
// var licenseKeyFormatting = function(S, K) {
//     let s = S.split("-").join("").split("");
//     let i = s.length - K;
//     while (i >= 0) {
//         if (i > 0) {
//             s.splice(i, 0, "-");
//         }
//         i -= K;
//     }
//     return s.join("").toUpperCase();
// };

// /**
//  * @version 2 80ms 56.34%
//  * @param {string} S
//  * @param {number} K
//  * @return {string}
//  */
// var licenseKeyFormatting = function(S, K) {
//     const raw = S.replace(/-/g, '').toUpperCase();
//     let length = raw.length, chunks = [];
//     while (length > 0) {
//         chunks.push(raw.substring(length - K, length));
//         length -= K;
//     }
//     return chunks.reverse().join('-');
// };

/**
 * @version 3 72ms 74.65%
 * @param {string} S
 * @param {number} K
 * @return {string}
 */
var licenseKeyFormatting = function(S, K) {
    const raw = S.split('-').join('').toUpperCase(); 
    let length = raw.length, chunks = [];
    while (length > 0) {
        chunks.push(raw.substring(length - K, length));
        length -= K;
    }
    return chunks.reverse().join('-');
};

// conclusion.
// 1. str.splice() is a low efficient function.
// 2. native api is better than regex.
console.log(licenseKeyFormatting('5F3Z-2e-9-w', 4))