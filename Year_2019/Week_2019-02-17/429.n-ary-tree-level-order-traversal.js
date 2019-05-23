/*
 * @lc app=leetcode id=429 lang=javascript
 *
 * [429] N-ary Tree Level Order Traversal
 */
/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */
// /**
//  * @versopm 1 38.47%
//  * @param {Node} root
//  * @return {number[][]}
//  */
// var levelOrder = function(root) {
//   let arr1 = []
//   let arr2 = []
//   if (root !== null) {
//     arr1.push(root)
//   }  

//   const res = []
//   while(arr1.length || arr2.length) {
//     const tmp = []
//     if (arr1.length) {
//       while(arr1.length) {
//         const node = arr1.shift()
//         if (node) {
//           arr2 = arr2.concat(node.children)
//           tmp.push(node.val)
//         }
//       }
//     } else {
//       while(arr2.length) {
//         const node = arr2.shift()
//         if (node) {
//           arr1 = arr1.concat(node.children)
//           tmp.push(node.val)
//         }
//       }
//     }
//     res.push(tmp)
//   }
//   return res
// };


/**
 * @versopm 2 98.02%
 * @param {Node} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
  const arr1 = []
  const arr2 = []
  if (root !== null) {
    arr1.push(root)
  }  

  const res = []
  while(arr1.length || arr2.length) {
    const tmp = []
    if (arr1.length) {
      while(arr1.length) {
        const node = arr1.shift()
        arr2.push(...node.children)
        tmp.push(node.val)
      }
    } else {
      while(arr2.length) {
        const node = arr2.shift()
        arr1.push(...node.children)
        tmp.push(node.val)
      }
    }
    res.push(tmp)
  }
  return res
};

// function Node(val, children) {
//   this.val = val
//   this.children = children
// }

// const node6 = new Node(6, [])
// const node5 = new Node(5, [])
// const node4 = new Node(4, [])
// const node3 = new Node(3, [node5, node6])
// const node2 = new Node(2, [])
// const node1 = new Node(1, [node2, node3, node4])

// console.log(levelOrder(node1))


