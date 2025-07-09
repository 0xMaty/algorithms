// Problem: Maximum Depth of a Binary Tree
//
// Given the root of a binary tree, return its maximum depth.
//
// The maximum depth is the number of nodes along the longest path from
// the root node down to the farthest leaf node.

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(val: number, left: TreeNode | null, right: TreeNode | null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// time complexity - O(n)
// space complexity - O(h) (where h is the height of the tree) which is O(n) in the worst case
function calculateMaxDepth(root: TreeNode | null): number {
  if (root === null) {
    return 0;
  }
  const leftDepth = calculateMaxDepth(root.left);
  const rightDepth = calculateMaxDepth(root.right);
  if (leftDepth > rightDepth) {
    return leftDepth + 1;
  } else {
    return rightDepth + 1;
  }
}

function main() {

  // construct tree
  const leftNodeC = new TreeNode(10, null, null);
  const leftNodeB = new TreeNode(15, leftNodeC, null);
  const rightNodeB = new TreeNode(7, null, null);
  const leftNodeA = new TreeNode(9, null, null);
  const rightNodeA = new TreeNode(20, leftNodeB, rightNodeB);
  const rootNode = new TreeNode(0, leftNodeA, rightNodeA);

  // calculate max depth
  const maxDepth = calculateMaxDepth(rootNode);
  console.debug(`max depth: ${maxDepth}`);

}

main();
