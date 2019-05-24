/*
 * @lc app=leetcode id=437 lang=javascript
 *
 * [437] Path Sum III
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number}
 */
var pathSum = function(root, sum, presums = { '0': 1 }, prev = 0) {
  if (!root) return 0;
  let curr = prev + root.val;
  presums[curr] = (presums[curr] || 0) + 1;
  let res = (presums[curr - sum] || 0) - !sum;
  res += pathSum(root.left, sum, presums, curr) + pathSum(root.right, sum, presums, curr);
  presums[curr]--;
  return res;
};

