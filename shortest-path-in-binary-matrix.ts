/*
Problem: Shortest Path in Binary Matrix

Given an n x n binary matrix grid, return the length of the shortest clear path in the matrix. If there is no clear path, return -1.

A clear path is a path from the top-left cell (0, 0) to the bottom-right cell (n - 1, n - 1) such that:

*   All visited cells are 0.
*   All adjacent cells are connected in 8 directions (up, down, left, right, and the four diagonals).

The length of a clear path is the number of cells visited in this path.
*/

type QueueElement = {
  row: number;
  col: number;
  distance: number;
}

/**
 * Time Complexity: O(N^2) where N is the dimension of the square grid.
 *   In the worst case, the BFS visits every cell in the N x N grid.
 *   Each cell is processed once, and for each cell, we iterate through its 8 neighbors (constant time).
 * Space Complexity: O(N^2) where N is the dimension of the square grid.
 *   The `visited` set can store up to N*N entries in the worst case.
 *   The `queue` can store up to O(N) elements in the worst case (e.g., a full layer of cells).
 *   The dominant factor is O(N^2) from the `visited` set.
 */
function shortestPathBinaryMatrix(grid: number[][]): number {
  const lastCellIndex = grid.length - 1;
  if (grid[0][0] === 1) return -1;
  if (grid[lastCellIndex][lastCellIndex] === 1) return -1;
  const queue: QueueElement[] = [{ row: 0, col: 0, distance: 1 }];
  const visited: Set<string> = new Set();
  visited.add("0,0");
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1]
  ];
  while (queue.length > 0) {
    const element = queue.shift();
    if (element!.row === lastCellIndex && element!.col === lastCellIndex) {
      return element!.distance;
    }
    for (let i = 0; i < directions.length; i++) {
      const direction = directions[i];
      const nextRow = element!.row + direction[0];
      const nextColumn = element!.col + direction[1];
      if (nextRow < 0 || nextRow > lastCellIndex) continue;
      if (nextColumn < 0 || nextColumn > lastCellIndex) continue;
      if (grid[nextRow][nextColumn] === 1) continue;
      if (visited.has(`${nextRow},${nextColumn}`)) continue;
      visited.add(`${nextRow},${nextColumn}`);
      queue.push({ row: nextRow, col: nextColumn, distance: element!.distance + 1 });
    }
  }
  return -1;
}

// Test Cases

// Test Case 1: Basic 2x2 grid
const grid1 = [[0, 1], [1, 0]];
console.log(`Input: grid = ${JSON.stringify(grid1)}`);
console.log(`Output: ${shortestPathBinaryMatrix(grid1)}`); // Expected: 2

// Test Case 2: 3x3 grid with a path
const grid2 = [[0, 0, 0], [1, 1, 0], [1, 1, 0]];
console.log(`Input: grid = ${JSON.stringify(grid2)}`);
console.log(`Output: ${shortestPathBinaryMatrix(grid2)}`); // Expected: 4

// Test Case 3: No path (start blocked)
const grid3 = [[1, 0, 0], [1, 1, 0], [1, 1, 0]];
console.log(`Input: grid = ${JSON.stringify(grid3)}`);
console.log(`Output: ${shortestPathBinaryMatrix(grid3)}`); // Expected: -1

// Test Case 4: No path (end blocked)
const grid4 = [[0, 0, 0], [0, 0, 0], [0, 0, 1]];
console.log(`Input: grid = ${JSON.stringify(grid4)}`);
console.log(`Output: ${shortestPathBinaryMatrix(grid4)}`); // Expected: -1

// Test Case 5: No path (middle blocked)
const grid5 = [[0, 0, 0], [0, 1, 0], [0, 0, 0]];
console.log(`Input: grid = ${JSON.stringify(grid5)}`);
console.log(`Output: ${shortestPathBinaryMatrix(grid5)}`); // Expected: 4 (0,0->0,1->0,2->1,2->2,2 or 0,0->1,0->2,0->2,1->2,2)

// Test Case 6: Single cell grid (path exists)
const grid6 = [[0]];
console.log(`Input: grid = ${JSON.stringify(grid6)}`);
console.log(`Output: ${shortestPathBinaryMatrix(grid6)}`); // Expected: 1

// Test Case 7: Single cell grid (path blocked)
const grid7 = [[1]];
console.log(`Input: grid = ${JSON.stringify(grid7)}`);
console.log(`Output: ${shortestPathBinaryMatrix(grid7)}`); // Expected: -1

// Test Case 8: Larger grid with a path
const grid8 = [
  [0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0],
  [0, 1, 0, 0, 0],
  [0, 1, 1, 1, 0],
  [0, 0, 0, 0, 0]
];
console.log(`Input: grid = ${JSON.stringify(grid8)}`);
console.log(`Output: ${shortestPathBinaryMatrix(grid8)}`); // Expected: 8
