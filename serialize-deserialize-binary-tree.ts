// Problem: Serialize and Deserialize Binary Tree
//
// Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.
//
// Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.
//
// Example:
//
// You may serialize the following tree:
//
//     1
//    / \
//   2   3
//      / \
//     4   5
//
// as "[1,2,3,null,null,4,5]"

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

/*
 * Encodes a tree to a single string.
 *
 * Time complexity: O(N), where N is the number of nodes in the tree.
 *   - Each node is visited once during DFS traversal.
 *   - Joining the array elements takes O(N) time.
 * Space complexity: O(N), where N is the number of nodes in the tree.
 *   - The 'result' array stores all node values and null markers (approx. 2N+1 elements).
 *   - The recursion stack depth can go up to O(N) in the worst case (skewed tree).
 */
function serialize(root: TreeNode | null): string {
  const result: (string | number)[] = [];

  function dfs(node: TreeNode | null) {
    if (!node) {
      result.push("null"); // Use "null" as the marker for null nodes
      return;
    }
    result.push(node.val);
    dfs(node.left);
    dfs(node.right);
  }

  dfs(root);
  return result.join(",");
}

/*
 * Decodes your encoded data to tree.
 *
 * Time complexity: O(N), where N is the number of nodes in the tree.
 *   - Splitting the string takes O(N) time.
 *   - Each element in the split array is processed once.
 * Space complexity: O(N), where N is the number of nodes in the tree.
 *   - The 'splitted' array stores all values from the serialized string.
 *   - The recursion stack depth can go up to O(N) in the worst case (skewed tree).
 */
function deserialize(data: string): TreeNode | null {
  const splitted = data.split(",");
  let currentIndex = 0;
  function _deserialize(): TreeNode | null {
    const value = splitted[currentIndex];
    currentIndex++;
    if (value === "null") {
      return null;
    } else {
      const parsedValue = parseInt(value);
      return new TreeNode(parsedValue, _deserialize(), _deserialize());
    }
  }
  return _deserialize();
}

// Example Tree:
//     1
//    / \
//   2   3
//      / \
//     4   5
const root = new TreeNode(1, null, null);
root.left = new TreeNode(2, null, null);
root.right = new TreeNode(3, null, null);
root.right.left = new TreeNode(4, null, null);
root.right.right = new TreeNode(5, null, null);
console.log("Tree:", root);

const serialized = serialize(root);
console.log("Serialized tree:", serialized); // Expected: "1,2,null,null,3,4,null,null,5,null,null" (or similar, depending on your null marker)

const deserialized = deserialize(serialized);
// You might want to add a helper function to compare trees for equality here
// For now, we'll just log the root value
console.log("Deserialized tree:", deserialized); // Expected: 1
