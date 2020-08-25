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
 * @return {void} Do not return anything, modify root in-place instead.
 */
var flatten = function(root) {
  const resultTree = []
  traverse(root, resultTree)

  const tree = new TreeNode(root.val, null, null)
  createRightTree(tree, resultTree)
  return tree
};

const createRightTree = function(node, data) {
  if (data.length > 0) {
    node.right = new TreeNode(data.shift(), null, null)
    createRightTree(node.right, data)
  }
}

const traverse = function(node, resultTree) {
  if (!node) {
    return
  }

  const left = node.left
  const right = node.right

  if (left) {
    resultTree.push(left.val)
    traverse(left, resultTree)
  }

  if (right) {
    resultTree.push(right.val)
    traverse(right, resultTree)
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

console.log(flatten(root))