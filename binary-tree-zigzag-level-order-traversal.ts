// Problem: Binary Tree Zigzag Level Order Traversal
//
// Given the root of a binary tree, return the zigzag level order traversal of its nodes' values.
// (i.e., from left to right, then right to left for the next level, and alternate back and forth).

// Definition for a binary tree node.
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
  }
}

// Time complexity: O(n)
// We visit every node in the tree exactly once.
//
// Space complexity: O(w) or O(n)
// The space complexity is determined by the maximum number of nodes stored in the queue at any given time.
// This corresponds to the maximum width (w) of the tree. In the worst-case scenario (a complete or full binary tree),
// the last level can contain up to n/2 nodes, making the space complexity O(n).

function zigzagLevelOrder(root: TreeNode | null): number[][] {
  if (root === null) return [];
  let currentLevel: number = 0;
  let zigzag: number[][] = [];
  let queue: TreeNode[] = [root];

  while (queue.length > 0) {
    const levelSize: number = queue.length;
    const tmp: number[] = [];
    for (let i = 0; i < levelSize; i++) {
      const currentNode: TreeNode = queue.shift()!;
      tmp.push(currentNode.val);
      if (currentNode.left !== null) {
        queue.push(currentNode.left);
      }
      if (currentNode.right !== null) {
        queue.push(currentNode.right);
      }
    }
    if (currentLevel % 2 !== 0) {
      tmp.reverse();
    }
    zigzag.push(tmp);
    currentLevel++;
  }

  return zigzag;
}

// Example Usage:
// Input tree:
//      3
//     / \
//    9  20
//      /  \
//     15   7
const root = new TreeNode(3,
  new TreeNode(9),
  new TreeNode(20, new TreeNode(15), new TreeNode(7))
);

const result = zigzagLevelOrder(root);
console.log(`Input: root = [3,9,20,null,null,15,7]`);
console.log(`Output: ${JSON.stringify(result)}`); // Expected output: [[3],[20,9],[15,7]]

const root2 = new TreeNode(1);
const result2 = zigzagLevelOrder(root2);
console.log(`Input: root = [1]`);
console.log(`Output: ${JSON.stringify(result2)}`); // Expected output: [[1]]

const root3 = null;
const result3 = zigzagLevelOrder(root3);
console.log(`Input: root = []`);
console.log(`Output: ${JSON.stringify(result3)}`); // Expected output: []
