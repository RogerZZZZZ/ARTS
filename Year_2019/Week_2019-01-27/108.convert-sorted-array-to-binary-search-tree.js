/*
 * @lc app=leetcode id=108 lang=javascript
 *
 * [108] Convert Sorted Array to Binary Search Tree
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @version 1 97.9%
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function(nums) {
    if (nums === null) return null

    return createTree(new TreeNode(null), nums, 0, nums.length - 1)
};

const createTree = (node, nums, start, end) => {
  if (start > end) return null
  node = new TreeNode(0)
  const mid = Math.floor((start + end) / 2)
  node.val = nums[mid]
  node.left = createTree(node.left, nums, start, mid - 1)
  node.right = createTree(node.right, nums, mid + 1, end)
  return node
}

