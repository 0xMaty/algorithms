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
// space complexity - O(h) (worst: O(n), best: O(log n))
function isValidBinarySearchTree(node: TreeNode | null, min: number, max: number): boolean {
  if (node === null) {
    return true;
  }

  if (node.val <= min || node.val >= max) {
    return false;
  }

  return isValidBinarySearchTree(node.left, min, node.val) && isValidBinarySearchTree(node.right, node.val, max);
}

function main() {

  // construct tree
  const leftNodeB = new TreeNode(6, null, null);
  const rightNodeB = new TreeNode(8, null, null);
  const leftNodeA = new TreeNode(1, null, null);
  const rightNodeA = new TreeNode(7, leftNodeB, rightNodeB);
  const rootNode = new TreeNode(5, leftNodeA, rightNodeA);

  // validate
  const isValidBST = isValidBinarySearchTree(rootNode, -Infinity, Infinity);
  console.debug(`is valid binary search tree: ${isValidBST}`);

}

main();
