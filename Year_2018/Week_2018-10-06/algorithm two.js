/**
 * @version 1 100%
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var middleNode = function(head) {
  if (head === null || head.next === null) return head
  const arr = []
  arr.push(head)
  while(head.next) {
    head = head.next
    arr.push(head)
  }
  return arr[Math.ceil((arr.length - 1)/2)]
};

function ListNode(val) {
  this.val = val
  this.next = null;
}

const A = new ListNode(1)
const B = new ListNode(2)
const C = new ListNode(3)
const D = new ListNode(4)
const E = new ListNode(5)

A.next = B
B.next = C
C.next = D
D.next = E

console.log(middleNode(A))