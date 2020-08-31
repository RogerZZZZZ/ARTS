/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 * @version 63.32%
 */
var zigzagLevelOrder = function(root) {
  const res = []

  const traverse = (root, dept, flag) => {
    if (!root) {
      return
    }
    if (!res[dept]) {
      res[dept] = []
    }

    if (flag) {
      res[dept].push(root.val)
    } else {
      res[dept].unshift(root.val)
    }

    traverse(root.left, dept + 1, !flag)
    traverse(root.right, dept + 1, !flag)
  }
  
  traverse(root, 0, true)
  return res
};