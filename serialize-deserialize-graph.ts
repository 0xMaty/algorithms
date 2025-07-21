// Problem: Serialize and Deserialize Graph
//
// Design an algorithm to serialize and deserialize a graph. The graph is undirected, and each node
// contains a numerical value and a list of its neighbors.
//
// Serialization is the process of converting a data structure or object into a sequence of bits
// so that it can be stored in a file or memory buffer, or transmitted across a network connection
// link to be reconstructed later in the same or another computer environment.
//
// The serialization format will be a list of numbers:
// [<number of nodes>, <node 1 data>, <number of neighbors for node 1>, <neighbor 1 index>, ..., <node 2 data>, ...]
//
// Deserialization is the process of reversing the serialization to reconstruct the graph.

// Complexity Analysis:
// Let V be the number of vertices (nodes) and E be the number of edges in the graph.
//
// `serialize` function:
// Time Complexity: O(V + E)
// - The BFS traversal to discover all nodes takes O(V + E).
// - The subsequent loop to build the serialized array also iterates through each node and its neighbors, taking O(V + E).
// Space Complexity: O(V + E)
// - The `queue`, `visited` set, and `nodeToIndex` map use O(V) auxiliary space.
// - The output `serialized` array requires O(V + E) space.
//
// `deserialize` function:
// Time Complexity: O(V + E)
// - The first loop to create nodes takes O(V).
// - The second loop to connect neighbors iterates through each node and its neighbor indices, taking O(V + E).
// Space Complexity: O(V + E)
// - The function reconstructs the entire graph, which requires O(V + E) space for the nodes and their adjacency lists.

class GraphNode {
  data: number;
  neighbors: GraphNode[];

  constructor(data: number, neighbors: GraphNode[]) {
    this.data = data;
    this.neighbors = neighbors;
  }
}

function serialize(startNode: GraphNode | null): number[] {
  if (startNode === null) return [];
  const nodes: GraphNode[] = [];
  const queue: GraphNode[] = [startNode];
  const visited: Set<GraphNode> = new Set<GraphNode>([startNode]);
  const nodeToIndex: Map<GraphNode, number> = new Map();

  while (queue.length > 0) {
    const currentNode = queue.shift()!;
    const nodeIndex = nodes.length;
    nodes.push(currentNode);
    nodeToIndex.set(currentNode, nodeIndex);

    for (const neighbor of currentNode.neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }

  }

  const serialized: number[] = [nodes.length];
  for (const node of nodes) {
    serialized.push(node.data);
    serialized.push(node.neighbors.length);
    for (const neighbor of node.neighbors) {
      serialized.push(nodeToIndex.get(neighbor)!);
    }
  }

  return serialized;
}

function deserialize(serialized: number[]): GraphNode | null {
  if (serialized.length === 0) return null;

  const numNodes = serialized[0];
  const nodes: GraphNode[] = [];
  let currentIndex = 1;

  for (let i = 0; i < numNodes; i++) {
    const nodeData = serialized[currentIndex];
    nodes.push(new GraphNode(nodeData, []));
    const numNeighbors = serialized[currentIndex + 1];
    currentIndex += 2 + numNeighbors;
  }

  currentIndex = 1;
  for (let i = 0; i < numNodes; i++) {
    const neighborsCount = serialized[currentIndex + 1];
    const neighborIndices = serialized.slice(currentIndex + 2, currentIndex + 2 + neighborsCount);
    for (const neighborIndex of neighborIndices) {
      nodes[i].neighbors.push(nodes[neighborIndex]);
    }
    currentIndex += 2 + neighborsCount;
  }

  return nodes.length > 0 ? nodes[0] : null;
}

console.log('--- Test Cases ---');

// Test Case 1: Basic 3-node graph
console.log('\nTest Case 1: Basic 3-node graph');
const node1 = new GraphNode(1, []);
const node2 = new GraphNode(2, []);
const node3 = new GraphNode(3, []);
node1.neighbors.push(node2, node3);
node2.neighbors.push(node1, node3);
node3.neighbors.push(node1, node2);
const serialized1 = serialize(node1);
const deserialized1 = deserialize(serialized1);
console.log('Serialized:', serialized1); // Expected: [3, 1, 2, 1, 2, 2, 1, 0, 2, 0, 1]
console.log('Deserialized graph root data:', deserialized1?.data); // Expected: 1
console.log('Root neighbors count:', deserialized1?.neighbors.length); // Expected: 2

// Test Case 2: Single node graph
console.log('\nTest Case 2: Single node graph');
const singleNode = new GraphNode(10, []);
const serialized2 = serialize(singleNode);
const deserialized2 = deserialize(serialized2);
console.log('Serialized:', serialized2); // Expected: [1, 10, 0]
console.log('Deserialized graph root data:', deserialized2?.data); // Expected: 10
console.log('Root neighbors count:', deserialized2?.neighbors.length); // Expected: 0

// Test Case 3: Null graph
console.log('\nTest Case 3: Null graph');
const serialized3 = serialize(null);
const deserialized3 = deserialize(serialized3);
console.log('Serialized:', serialized3); // Expected: []
console.log('Deserialized graph:', deserialized3); // Expected: null

// Test Case 4: A more complex graph
console.log('\nTest Case 4: More complex graph');
const n1 = new GraphNode(1, []);
const n2 = new GraphNode(2, []);
const n3 = new GraphNode(3, []);
const n4 = new GraphNode(4, []);
n1.neighbors.push(n2, n4);
n2.neighbors.push(n1, n3);
n3.neighbors.push(n2, n4);
n4.neighbors.push(n1, n3);
const serialized4 = serialize(n1);
const deserialized4 = deserialize(serialized4);
console.log('Serialized:', serialized4);
console.log('Deserialized graph root data:', deserialized4?.data); // Expected: 1
console.log('Root neighbors count:', deserialized4?.neighbors.length); // Expected: 2