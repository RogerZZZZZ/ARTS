/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @version 1 80.17%
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {boolean}
 */
var leafSimilar = function(root1, root2) {
    let val1 = []
    let val2 = []
    tranverseTree(root1, val1)
    tranverseTree(root2, val2)

    return compare(val1, val2)
};

function tranverseTree(root, arr) {
  if (root === null) return
  tranverseTree(root.left, arr)
  tranverseTree(root.right, arr)
  if (root.left === null && root.right === null) arr.push(root.val)
}

function compare(arr1, arr2) {
  if (arr1.length !== arr2.length) return false

  for(let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false
  }
  return true
}