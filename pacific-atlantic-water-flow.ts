/*
Problem: Pacific Atlantic Water Flow

Given an m x n matrix of non-negative integers representing the height of each unit cell in a continent.

*   The Pacific ocean touches the top and left edges of the matrix.
*   The Atlantic ocean touches the bottom and right edges of the matrix.

Water can only flow from a cell to an adjacent cell (up, down, left, or right) if the adjacent cell has a height equal to or lower than the current cell.

Your task is to find a list of grid coordinates (row, col) where water can flow to both the Pacific and Atlantic oceans.
*/

/**
 * Time Complexity: O(m * n) where m is the number of rows and n is the number of columns in the grid.
 *   Each cell is visited at most a constant number of times across the two DFS traversals.
 *   The final iteration to collect results also takes O(m * n) time.
 * Space Complexity: O(m * n) where m is the number of rows and n is the number of columns in the grid.
 *   Two boolean matrices (`pacificReachable` and `atlanticReachable`) of size m x n are used.
 *   The DFS recursion stack can go up to O(m * n) depth in the worst case.
 */
function pacificAtlantic(heights: number[][]): number[][] {
  const m = heights.length;
  const n = heights[m - 1].length;
  const pacificReachable: boolean[][] = Array(m).fill(false).map(() => Array(n).fill(false));
  const atlanticReachable: boolean[][] = Array(m).fill(false).map(() => Array(n).fill(false));
  const directions: number[][] = [[0, 1], [0, -1], [1, 0], [-1, 0]];

  function dfs(row: number, col: number, heights: number[][], reachable: boolean[][], prevHeight: number): void {
    if (row < 0 || row >= m || col < 0 || col >= n) {
      return;
    }
    if (reachable[row][col]) {
      return;
    }
    if (heights[row][col] < prevHeight) {
      return;
    }
    reachable[row][col] = true;
    for (let i = 0; i < directions.length; i++) {
      const direction = directions[i];
      const newRow = row + direction[0];
      const newCol = col + direction[1];
      dfs(newRow, newCol, heights, reachable, heights[row][col]);
    }
  }

  for (let col = 0; col < n; col++) {
    dfs(0, col, heights, pacificReachable, Number.MIN_SAFE_INTEGER);
  }

  for (let row = 1; row < m; row++) {
    dfs(row, 0, heights, pacificReachable, Number.MIN_SAFE_INTEGER);
  }

  for (let col = 0; col < n; col++) {
    dfs(m - 1, col, heights, atlanticReachable, Number.MIN_SAFE_INTEGER);
  }

  for (let row = 0; row < m - 1; row++) {
    dfs(row, n - 1, heights, atlanticReachable, Number.MIN_SAFE_INTEGER);
  }

  const result: number[][] = [];
  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      if (pacificReachable[row][col] && atlanticReachable[row][col]) {
        result.push([row, col]);
      }
    }
  }

  return result;
}

// Test Cases

// Test Case 1: Example from problem description
const heights1 = [[1, 2, 2, 3, 5], [3, 2, 3, 4, 4], [2, 4, 5, 3, 1], [6, 7, 1, 4, 5], [5, 1, 1, 2, 4]];
console.log(`Input: heights = ${JSON.stringify(heights1)}`);
console.log(`Output: ${JSON.stringify(pacificAtlantic(heights1))}`); // Expected: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]

// Test Case 2: Single cell
const heights2 = [[1]];
console.log(`Input: heights = ${JSON.stringify(heights2)}`);
console.log(`Output: ${JSON.stringify(pacificAtlantic(heights2))}`); // Expected: [[0,0]]

// Test Case 3: All cells can reach both
const heights3 = [[1, 1], [1, 1]];
console.log(`Input: heights = ${JSON.stringify(heights3)}`);
console.log(`Output: ${JSON.stringify(pacificAtlantic(heights3))}`); // Expected: [[0,0],[0,1],[1,0],[1,1]]

// Test Case 4: No cells can reach both
const heights4 = [[10, 10, 10], [10, 1, 10], [10, 10, 10]];
console.log(`Input: heights = ${JSON.stringify(heights4)}`);
console.log(`Output: ${JSON.stringify(pacificAtlantic(heights4))}`); // Expected: []

// Test Case 5: Larger grid with some paths
const heights5 = [
  [1, 2, 3, 4, 5],
  [16, 17, 18, 19, 6],
  [15, 24, 25, 20, 7],
  [14, 23, 22, 21, 8],
  [13, 12, 11, 10, 9]
];
console.log(`Input: heights = ${JSON.stringify(heights5)}`);
console.log(`Output: ${JSON.stringify(pacificAtlantic(heights5))}`); // Expected: [[0,4],[1,4],[2,4],[3,4],[4,4],[4,3],[4,2],[4,1],[4,0],[3,0],[2,0],[1,0],[0,0]]
