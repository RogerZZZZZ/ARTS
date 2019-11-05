/*
 * @lc app=leetcode id=501 lang=javascript
 *
 * [501] Find Mode in Binary Search Tree
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var findMode = function(root) {
  let curVal;
  let curCount = 0, maxCount = 0, modeCount = 0;
  let modes = [];
  
  function handle(val){
    if(val !== curVal){
      curVal = val;
      curCount = 0;
    }
    curCount++;
    if(curCount > maxCount){
      maxCount = curCount;
      modeCount = 1;
    }else if(curCount === maxCount){
      modes[modeCount] = curVal;
      modeCount++;
    }
  }
  
  function inorder(root){
    if(root){
      inorder(root.left);
      handle(root.val);
      inorder(root.right);
    }
  }
  
  //FirstPass
  inorder(root);
  //SecondPass
  modes = new Array(modeCount);
  curCount = 0, modeCount = 0
  inorder(root);
  return modes;
};

function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

const root = new TreeNode(1)
const left1 = new TreeNode(1)
const right1 = new TreeNode(2)

root.left = left1
root.right = right1

console.log(findMode(root))

