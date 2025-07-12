// Problem: Number of Islands
//
// Given an `m x n` 2D binary grid `grid` which represents a map of `'1'`s (land) and `'0'`s (water),
// return the number of islands.
//
// An **island** is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.
// You may assume all four edges of the grid are all surrounded by water.

// Time complexity: O(m * n)
// Each cell in the grid is visited at most once.
//
// Space complexity: O(m * n)
// In the worst case, the recursion stack depth can be up to m * n (e.g., for a grid full of land).
function numIslands(grid: string[][]): number {

  let islandsCount: number = 0;

  function dfs(grid: string[][], row: number, col: number): void {
    if (row < 0 || row >= grid.length) return;
    if (col < 0 || col >= grid[row].length) return;
    if (grid[row][col] === "0") return;
    grid[row][col] = "0";
    dfs(grid, row - 1, col); // up
    dfs(grid, row, col + 1); // right
    dfs(grid, row + 1, col); // down
    dfs(grid, row, col - 1); // left
  }

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === "1") {
        islandsCount += 1;
        dfs(grid, row, col);
      }
    }
  }

  return islandsCount;
}

// Test cases
// Example 1:
// Input: grid = [
//   ["1","1","1","1","0"],
//   ["1","1","0","1","0"],
//   ["1","1","0","0","0"],
//   ["0","0","0","0","0"]
// ]
// Output: 1
const grid1 = [
  ["1", "1", "1", "1", "0"],
  ["1", "1", "0", "1", "0"],
  ["1", "1", "0", "0", "0"],
  ["0", "0", "0", "0", "0"]
];
console.log(`Input: grid = ${JSON.stringify(grid1)}`);
console.log(`Output: ${numIslands(grid1)}`); // Expected: 1

// Example 2:
// Input: grid = [
//   ["1","1","0","0","0"],
//   ["1","1","0","0","0"],
//   ["0","0","1","0","0"],
//   ["0","0","0","1","1"]
// ]
// Output: 3
const grid2 = [
  ["1", "1", "0", "0", "0"],
  ["1", "1", "0", "0", "0"],
  ["0", "0", "1", "0", "0"],
  ["0", "0", "0", "1", "1"]
];
console.log(`Input: grid = ${JSON.stringify(grid2)}`);
console.log(`Output: ${numIslands(grid2)}`); // Expected: 3

// Example 3:
// Input: grid = [
//   ["0","0","0","0","0"],
//   ["0","0","0","0","0"],
//   ["0","0","0","0","0"],
//   ["0","0","0","0","0"]
// ]
// Output: 0
const grid3 = [
  ["0", "0", "0", "0", "0"],
  ["0", "0", "0", "0", "0"],
  ["0", "0", "0", "0", "0"],
  ["0", "0", "0", "0", "0"]
];
console.log(`Input: grid = ${JSON.stringify(grid3)}`);
console.log(`Output: ${numIslands(grid3)}`); // Expected: 0
