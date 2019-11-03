/*
 * @lc app=leetcode id=443 lang=javascript
 *
 * [443] String Compression
 */
/**
 * @version 1 91.21% 60ms
 * @param {character[]} chars
 * @return {number}
 */
var compress = function(chars) {
  let cur = 0;
  for(let i = cur; i<chars.length;) {
      let ch = chars[cur];
      let count = 1;
      while(chars[i+1]==ch) {
          count++;
          i++;
      }
      if(count>1) {
          count = "" + count;
          chars.splice(cur+1, i-cur, ...count);
          cur = i = cur + count.length + 1;
      }else {
          cur = ++i;
      }
  }
};