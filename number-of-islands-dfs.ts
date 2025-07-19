// Problem: Number of Islands (DFS)
//
// Given an m x n 2D binary grid `grid` which represents a map of '1's (land) and '0's (water),
// return the number of islands.
//
// An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.

// Time complexity:
//
// Space complexity:
//
function numIslands(grid: string[][]): number {
  if (grid.length === 0 || grid[0].length === 0) return 0;
  const m: number = grid.length;
  const n: number = grid[0].length;
  let islandsCount: number = 0;
  const directions: number[][] = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1]
  ];

  function sinkIsland(row: number, col: number) {
    if (row < 0 || row >= m) return;
    if (col < 0 || col >= n) return;
    if (grid[row][col] === "0") return;
    grid[row][col] = "0";
    for (let i = 0; i < directions.length; i++) {
      const direction = directions[i];
      sinkIsland(row + direction[0], col + direction[1]);
    }
  }

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      if (grid[row][col] === "1") {
        islandsCount++;
        sinkIsland(row, col);
      }
    }
  }

  return islandsCount;
}

// Example Usage:
const grid1 = [
  ['1', '1', '1', '1', '0'],
  ['1', '1', '0', '1', '0'],
  ['1', '1', '0', '0', '0'],
  ['0', '0', '0', '0', '0'],
];
const result1 = numIslands(JSON.parse(JSON.stringify(grid1))); // Deep copy to prevent mutation
console.log('Input grid:');
console.log(grid1.map(row => row.join(' ')).join('\n'));
console.log(`Output: ${result1}`); // Expected output: 1

const grid2 = [
  ['1', '1', '0', '0', '0'],
  ['1', '1', '0', '0', '0'],
  ['0', '0', '1', '0', '0'],
  ['0', '0', '0', '1', '1'],
];
const result2 = numIslands(JSON.parse(JSON.stringify(grid2))); // Deep copy to prevent mutation
console.log('Input grid:');
console.log(grid2.map(row => row.join(' ')).join('\n'));
console.log(`Output: ${result2}`); // Expected output: 3

