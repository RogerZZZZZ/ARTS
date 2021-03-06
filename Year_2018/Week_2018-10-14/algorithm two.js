// /**
//  * @version 1 5.94%
//  * Definition for a binary tree node.
//  * function TreeNode(val) {
//  *     this.val = val;
//  *     this.left = this.right = null;
//  * }
//  */
// /**
//  * @param {TreeNode} root
//  * @param {number} val
//  * @return {TreeNode}
//  */
// var searchBST = function(root, val) {
//     if (root === null) return []
//     const rootVal = root.val
//     if (rootVal === val) return root
//     if (rootVal < val) {
//       return searchBST(root.right, val)
//     } else {
//       return searchBST(root.left, val)
//     }
// };


/**
 * @version 2 98.16%
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
var searchBST = function(root, val) {
  if (root === null) return []
  const rootVal = root.val
  if (rootVal === val) {
    return root
  } else if (rootVal < val) {
    return searchBST(root.right, val)
  } else {
    return searchBST(root.left, val)
  }
};