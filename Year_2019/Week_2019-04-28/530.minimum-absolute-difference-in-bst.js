/*
 * @lc app=leetcode id=530 lang=javascript
 *
 * [530] Minimum Absolute Difference in BST
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @version 1 26.33%
 * @param {TreeNode} root
 * @return {number}
 */

var getMinimumDifference = function(root) {
  const arr = []
  count(root, arr)

  const res = arr.sort((a, b) => a - b)
  let min = Number.MAX_VALUE
  for (let i = 1; i < res.length; i++) {
    const diff = Math.abs(res[i] - res[i - 1])
    min = min < diff ? min : diff
  }
  return min
};

var count = function(root, arr) {
  if (root) {
    arr.push(root.val)
    count(root.left, arr)
    count(root.right, arr)
  }
}
// @lc code=end
function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

const node1 = new TreeNode(1)
const node2 = new TreeNode(5)
const node3 = new TreeNode(3)

node1.left = null
node1.right = node2
node2.left = node3

console.log(getMinimumDifference(node1))


/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var getMinimumDifference = function(root) {
  let minDiff = Infinity;
  let traverse = (node) => {
      if(!node) return;
      const leftRange = traverse(node.left);
      const rightRange = traverse(node.right);
      
      if(leftRange) {
          minDiff = Math.min(minDiff, Math.abs(leftRange.max - node.val));
      }
      if(rightRange) {
          minDiff = Math.min(minDiff, Math.abs(rightRange.min - node.val));
      }
      
      return {
          min: leftRange ? leftRange.min : node.val,
          max: rightRange ? rightRange.max : node.val
      };
  };
  traverse(root);
  return minDiff;
};