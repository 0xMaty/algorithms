// Problem: Invert Binary Tree
//
// Given the root of a binary tree, invert the tree, and return its root.

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
// space complexity - O(h) (worst case: O(n), best case: O(logn))
function invertBinaryTree(root: TreeNode | null): TreeNode | null {

  if (root === null) {
    return null;
  }

  const invertedLeftSubtree = invertBinaryTree(root.left);
  const invertedRighSubtree = invertBinaryTree(root.right);

  root.left = invertedRighSubtree;
  root.right = invertedLeftSubtree;

  return root;
}

function main() {

  // construct tree
  const leftNodeB = new TreeNode(4, null, null);
  const rightNodeB = new TreeNode(5, null, null);
  const rightNodeA = new TreeNode(3, leftNodeB, rightNodeB);
  const leftNodeA = new TreeNode(2, null, null);
  const rootNode = new TreeNode(1, leftNodeA, rightNodeA);
  console.debug(rootNode);

  // invert tree
  const newRootNode = invertBinaryTree(rootNode);
  console.debug(newRootNode);

}

main();
