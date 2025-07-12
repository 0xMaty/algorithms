// Problem: Binary Tree Level Order Traversal
//
// Given the `root` of a binary tree, return the *level order traversal* of its nodes' values.
// (i.e., from left to right, level by level).

// Definition for a binary tree node.
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

// Time complexity: O(N)
// Each node is visited and processed exactly once.
//
// Space complexity: O(W) where W is the maximum width of the tree.
// In the worst case (a complete binary tree), W can be N/2, so it's O(N).
function levelOrder(root: TreeNode | null): number[][] {
  if (root === null) return [];
  const queue: TreeNode[] = [root];
  const results: number[][] = [];
  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevelValues: number[] = [];
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      currentLevelValues.push(node!.val);
      if (node!.left) {
        queue.push(node!.left);
      }
      if (node!.right) {
        queue.push(node!.right);
      }
    }
    results.push(currentLevelValues);
  }
  return results;
}

// Test cases
// Example 1:
// Input: root = [3,9,20,null,null,15,7]
// Output: [[3],[9,20],[15,7]]
const root1 = new TreeNode(3, new TreeNode(9), new TreeNode(20, new TreeNode(15), new TreeNode(7)));
console.log(`Input: root = [3,9,20,null,null,15,7]`);
console.log(`Output: ${JSON.stringify(levelOrder(root1))}`); // Expected: [[3],[9,20],[15,7]]

// Example 2:
// Input: root = [1]
// Output: [[1]]
const root2 = new TreeNode(1);
console.log(`Input: root = [1]`);
console.log(`Output: ${JSON.stringify(levelOrder(root2))}`); // Expected: [[1]]

// Example 3:
// Input: root = []
// Output: []
const root3 = null;
console.log(`Input: root = []`);
console.log(`Output: ${JSON.stringify(levelOrder(root3))}`); // Expected: []
