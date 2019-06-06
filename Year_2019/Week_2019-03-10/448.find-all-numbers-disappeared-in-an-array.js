/*
 * @lc app=leetcode id=448 lang=javascript
 *
 * [448] Find All Numbers Disappeared in an Array
 */
/**
 * @version 1 62%
 * @param {number[]} nums
 * @return {number[]}
 */
var findDisappearedNumbers = function(nums) {
  var s = {};
  for (let i =1; i< nums.length+1; i++) {
      s[i] = 1;
  }
  
  nums.forEach(n=> {
      delete s[n];
  })
  
 return Object.keys(s)
};

