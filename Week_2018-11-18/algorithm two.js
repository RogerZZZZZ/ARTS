// /**
//  * @version 1 8.15% 96ms
//  * Definition for a binary tree node.
//  * function TreeNode(val) {
//  *     this.val = val;
//  *     this.left = this.right = null;
//  * }
//  */
// var trimBST = function(root, L, R) {
//     return dfs(root);
    
//     function dfs(root) {
//         if(!root) {
//             return null;
//         } else if(root.val > R) {
//             return dfs(root.left);
//         } else if(root.val < L) {
//             return dfs(root.right);
//         } else {
//             root.left = dfs(root.left);
//             root.right = dfs(root.right);
//             return root;
//         }
//     }
// };

/**
 * @version 2 68ms 100%
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
var trimBST = function(root, L, R) {
  return dfs(root);
  
  function dfs(root) {
    if (!root) return null
    if (root.val <= R && root.val >= L) {
      root.left = dfs(root.left);
      root.right = dfs(root.right);
      return root;
    } else if(root.val > R) {
      return dfs(root.left);
    } else if(root.val < L) {
      return dfs(root.right);
    }
  }
};