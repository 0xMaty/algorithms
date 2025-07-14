// Problem: Path Sum
//
// Given the root of a binary tree and an integer `targetSum`, return `true` if the tree has a
// root-to-leaf path such that adding up all the values along the path equals `targetSum`.
//
// A leaf is a node with no children.

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
// We visit each node in the tree exactly once in the worst case.
//
// Space complexity: O(h) where h is the height of the tree.
// In the worst case (a skewed tree), the recursion depth can be n, so O(n).
// In the best case (a balanced tree), it's O(log n).
function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
  if (root === null) {
    return false;
  }

  const newTargetSum = targetSum - root.val;

  if (root.left === null && root.right === null) {
    return newTargetSum === 0;
  }

  return hasPathSum(root.left, newTargetSum) || hasPathSum(root.right, newTargetSum);
}

function main() {
  // Example 1: root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22
  const root1 = new TreeNode(5,
    new TreeNode(4,
      new TreeNode(11,
        new TreeNode(7),
        new TreeNode(2)
      )
    ),
    new TreeNode(8,
      new TreeNode(13),
      new TreeNode(4, null, new TreeNode(1))
    )
  );
  const result1 = hasPathSum(root1, 22);
  console.log("Input: root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22");
  console.log(`Output: ${result1}`); // Expected output: true

  // Example 2: root = [1,2,3], targetSum = 5
  const root2 = new TreeNode(1, new TreeNode(2), new TreeNode(3));
  const result2 = hasPathSum(root2, 5);
  console.log("Input: root = [1,2,3], targetSum = 5");
  console.log(`Output: ${result2}`); // Expected output: false

  // Example 3: root = [], targetSum = 0
  const root3 = null;
  const result3 = hasPathSum(root3, 0);
  console.log("Input: root = [], targetSum = 0");
  console.log(`Output: ${result3}`); // Expected output: false
}

main();
