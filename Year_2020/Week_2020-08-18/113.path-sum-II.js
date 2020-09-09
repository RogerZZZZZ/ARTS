/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}

/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number[][]}
 * @version 38.58%
 */

let result = []
var pathSum = function(root, sum) {
  result = []
  if (root) {
    findPath(root, [root.val], root.val, sum)
  }
  return result
};

const findPath = function(node, arr, count, sum) {
  if (!node.left && !node.right && count === sum) {
    result.push(arr)
    return
  }

  const left = node.left
  const right = node.right

  if (left) {
    findPath(left, [...arr].concat(left.val), count + left.val , sum)
  }

  if (right) {
    findPath(right, [...arr].concat(right.val), count + right.val, sum)
  }
}

const floor3Node1 = new TreeNode(7, null, null)
const floor3Node2 = new TreeNode(2, null, null)
const floor3Node3 = new TreeNode(5, null, null)
const floor3Node4 = new TreeNode(1, null, null)

const floor2Node1 = new TreeNode(11, floor3Node1, floor3Node2)
const floor2Node2 = new TreeNode(13, null, null)
const floor2Node3 = new TreeNode(4, floor3Node3, floor3Node4)

const floor1Node1 = new TreeNode(4, floor2Node1, null)
const floor1Node2 = new TreeNode(8, floor2Node2, floor2Node3)

const root = new TreeNode(5, floor1Node1, floor1Node2)

console.log('----val', pathSum(root, 22))