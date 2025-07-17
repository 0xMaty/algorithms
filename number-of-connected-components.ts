// Problem: Number of Connected Components in an Undirected Graph
//
// You are given `n` nodes labeled from `0` to `n - 1` and a list of undirected `edges` (each edge is a pair of nodes).
// Write a function to find the number of connected components in the graph.
//
// Example 1:
// Input: n = 5, edges = [[0, 1], [1, 2], [3, 4]]
// Output: 2
// Explanation: There are two connected components: [0, 1, 2] and [3, 4].
//
// Example 2:
// Input: n = 5, edges = [[0, 1], [1, 2], [2, 3], [3, 4]]
// Output: 1
// Explanation: All nodes are connected in one component.

// Time complexity: O(V + E)
// Where V is the number of vertices (nodes) and E is the number of edges.
// Building the adjacency list takes O(V + E) time. The DFS traversal visits each vertex and edge at most once, also taking O(V + E) time.
//
// Space complexity: O(V + E)
// The adjacency list takes O(V + E) space. The `visited` array takes O(V) space. The recursion call stack for DFS can go up to O(V) in the worst case.
function countComponents(n: number, edges: number[][]): number {

  const adjacencyList: number[][] = Array(n).fill(null).map(() => []);
  for (let i = 0; i < edges.length; i++) {
    const edge = edges[i];
    adjacencyList[edge[0]].push(edge[1]);
    adjacencyList[edge[1]].push(edge[0]);
  }

  let components: number = 0;
  const visited: boolean[] = Array(n).fill(false);

  function dfs(node: number, visited: boolean[], adjacencyList: number[][]) {
    visited[node] = true;
    const neighbors = adjacencyList[node];
    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i];
      if (!visited[neighbor]) {
        dfs(neighbor, visited, adjacencyList);
      }
    }
  }

  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      components++;
      dfs(i, visited, adjacencyList);
    }
  }

  return components;
}

// --- Test Cases ---
console.log("Test Case 1:");
const n1 = 5;
const edges1 = [[0, 1], [1, 2], [3, 4]];
const result1 = countComponents(n1, edges1);
console.log(`Input: n = ${n1}, edges = ${JSON.stringify(edges1)}`);
console.log(`Output: ${result1}`); // Expected output: 2

console.log("\nTest Case 2:");
const n2 = 5;
const edges2 = [[0, 1], [1, 2], [2, 3], [3, 4]];
const result2 = countComponents(n2, edges2);
console.log(`Input: n = ${n2}, edges = ${JSON.stringify(edges2)}`);
console.log(`Output: ${result2}`); // Expected output: 1
