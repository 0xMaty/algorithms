// Problem: Binary Tree Right Side View
//
// Given the root of a binary tree, imagine you are standing on the right side of it.
// Return the values of the nodes you can see ordered from top to bottom.

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

// Time complexity: O(n)
// We visit each node in the tree exactly once.
//
// Space complexity: O(w) where w is the maximum width of the tree.
// In the worst case (a complete binary tree), the last level can contain up to n/2 nodes,
// so the space complexity can be considered O(n).
function rightSideView(root: TreeNode | null): number[] {
  if (root === null) return [];
  const queue: TreeNode[] = [];
  queue.push(root);
  const result: number[] = [];
  while (queue.length > 0) {
    const levelSize = queue.length;
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      if (node!.left !== null) {
        queue.push(node!.left);
      }
      if (node!.right !== null) {
        queue.push(node!.right);
      }
      if (i === levelSize - 1) {
        result.push(node!.val);
      }
    }
  }
  return result;
}

function main() {
  // Example 1: root = [1, 2, 3, null, 5, null, 4]
  const root1 = new TreeNode(
    1,
    new TreeNode(2, null, new TreeNode(5)),
    new TreeNode(3, null, new TreeNode(4))
  );
  const result1 = rightSideView(root1);
  console.log("Input: root = [1, 2, 3, null, 5, null, 4]");
  console.log(`Output: [${result1}]`); // Expected output: [1, 3, 4]

  // Example 2: root = [1, null, 3]
  const root2 = new TreeNode(1, null, new TreeNode(3));
  const result2 = rightSideView(root2);
  console.log("Input: root = [1, null, 3]");
  console.log(`Output: [${result2}]`); // Expected output: [1, 3]

  // Example 3: root = []
  const root3 = null;
  const result3 = rightSideView(root3);
  console.log("Input: root = []");
  console.log(`Output: [${result3}]`); // Expected output: []
}

main();
