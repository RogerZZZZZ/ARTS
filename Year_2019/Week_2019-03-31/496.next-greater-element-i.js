/*
 * @lc app=leetcode id=496 lang=javascript
 *
 * [496] Next Greater Element I
 */
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var nextGreaterElement = function(nums1, nums2) {
  var nextGreat=[];
  var result=[];
  for(var i=0;i<nums2.length; i++){
       var k=i+1; 
       while(nums2[i]>nums2[k] && k<nums2.length){
           k++;
       }
      if(k == nums2.length){
          nextGreat.push(-1);
      }else{
          nextGreat.push(nums2[k]);
      }
  }
  for(var j=0; j<nums1.length; j++){
      result.push(nextGreat[nums2.indexOf(nums1[j])]);
  }
  return result;
};

