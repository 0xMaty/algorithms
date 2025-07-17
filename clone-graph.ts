// Problem: Clone Graph
//
// Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph.
//
// Each node in the graph contains a value (`val`) and a list of its neighbors (`neighbors`).
//
// Example:
// Input: adjList = [[2,4],[1,3],[2,4],[1,3]]
// Output: [[2,4],[1,3],[2,4],[1,3]]

// Definition for a Node.
class GraphNode {
  val: number
  neighbors: GraphNode[]
  constructor(val?: number, neighbors?: GraphNode[]) {
    this.val = (val === undefined ? 0 : val)
    this.neighbors = (neighbors === undefined ? [] : neighbors)
  }
}

// Time complexity: O(V + E)
// Where V is the number of vertices (nodes) and E is the number of edges in the graph.
// Each node is enqueued and dequeued once, and each edge is processed a constant number of times.
//
// Space complexity: O(V)
// The `visited` map stores a reference to each cloned node, and the `queue` can hold up to V nodes in the worst case.
function cloneGraph(node: GraphNode | null): GraphNode | null {
  if (node === null) return null;
  const queue: GraphNode[] = [node];
  const visited: Map<GraphNode, GraphNode> = new Map();
  visited.set(node, new GraphNode(node.val));
  while (queue.length > 0) {
    const originalNode = queue.shift();
    const currentClone = visited.get(originalNode!);
    for (let i = 0; i < originalNode!.neighbors.length; i++) {
      const neighbor = originalNode!.neighbors[i];
      if (!visited.has(neighbor)) {
        const neighborClone = new GraphNode(neighbor.val);
        visited.set(neighbor, neighborClone);
        queue.push(neighbor);
      }
      const neighborClone = visited.get(neighbor);
      currentClone!.neighbors.push(neighborClone!);
    }
  }
  return visited.get(node) ?? null;
}


// --- Test Case ---
// Creating the graph from the example: adjList = [[2,4],[1,3],[2,4],[1,3]]
const node1 = new GraphNode(1);
const node2 = new GraphNode(2);
const node3 = new GraphNode(3);
const node4 = new GraphNode(4);

node1.neighbors = [node2, node4];
node2.neighbors = [node1, node3];
node3.neighbors = [node2, node4];
node4.neighbors = [node1, node3];

console.log("Original graph (node 1 neighbors):");
node1.neighbors.forEach(neighbor => console.log(neighbor.val)); // Expected: 2, 4

const clonedNode1 = cloneGraph(node1);

console.log("\nCloned graph (cloned node 1 neighbors):");
if (clonedNode1) {
  clonedNode1.neighbors.forEach(neighbor => console.log(neighbor.val)); // Expected: 2, 4
  // A true deep copy means the nodes themselves are different objects
  console.log("\nAre original node1 and cloned node1 the same object?", node1 === clonedNode1); // Expected: false
} else {
  console.log("Clone function returned null.");
}
