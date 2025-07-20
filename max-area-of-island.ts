// Problem: Max Area of Island
//
// You are given an m x n binary matrix grid. An island is a group of 1's (representing land) connected 4-directionally.
// The area of an island is the number of cells with a value 1 in the island.
//
// Return the maximum area of an island in grid. If there is no island, return 0.

// Time complexity: O(R * C)
// We visit every cell in the grid at most once. R is the number of rows, C is the number of columns.
//
// Space complexity: O(R * C)
// In the worst case, the recursion stack can go as deep as the number of cells in the grid for a long, winding island.
function maxAreaOfIsland(grid: number[][]): number {
  if (grid.length === 0) return 0;
  const rows: number = grid.length;
  const cols: number = grid[0].length;
  let maxArea: number = 0;
  const directions: number[][] = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1]
  ];

  function dfs(row: number, col: number): number {
    if (row < 0 || row >= rows) return 0;
    if (col < 0 || col >= cols) return 0;
    if (grid[row][col] === 0) return 0;
    grid[row][col] = 0;
    let currentArea: number = 1;
    for (let i = 0; i < directions.length; i++) {
      const direction = directions[i];
      currentArea += dfs(row + direction[0], col + direction[1]);
    }
    return currentArea;
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] === 1) {
        const area = dfs(row, col);
        maxArea = Math.max(maxArea, area);
      }
    }
  }

  return maxArea;
}

// Example 1:
const grid1 = [
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
  [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
];
const result1 = maxAreaOfIsland(grid1);
console.log("Input:");
console.log(grid1);
console.log(`Output: ${result1}`); // Expected output: 6

// Example 2:
const grid2 = [[0, 0, 0, 0, 0, 0, 0, 0]];
const result2 = maxAreaOfIsland(grid2);
console.log("Input:");
console.log(grid2);
console.log(`Output: ${result2}`); // Expected output: 0
