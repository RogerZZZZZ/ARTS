/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

/**
 * @param {TreeNode} root
 * @return {number}
 */
let len = 0
var longestUnivaluePath = function(root) {
    if (root === null) return 0
    len = 0
    getLen(root, root.val)
    return len
};

const getLen = (node, val) => {
    if (node === null) return 0
    const left = getLen(node.left, node.val)
    const right = getLen(node.right, node.val)

    len = Math.max(left, left + right)
    if (val == node.val)  return Math.max(left, right) + 1;
    return 0;
}

let root = new TreeNode(0)
let node1 = new TreeNode(1)
let node2 = new TreeNode(2)
let node3 = new TreeNode(3)
let node4 = new TreeNode(4)
let node5 = new TreeNode(5)
let node6 = new TreeNode(6)
let node7 = new TreeNode(7)

root.left = node1
// node1.left = node3
// node3.right = node4
// node4.left = node5

// root.right = node2
// node2.left = node6
// node2.right = node7

console.log(longestUnivaluePath(root))