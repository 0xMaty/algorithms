/**
 * Problem: Rotting Oranges
 * 
 * You are given an m x n grid where each cell can have one of three values:
 * - 0 representing an empty cell,
 * - 1 representing a fresh orange, or
 * - 2 representing a rotten orange.
 * 
 * Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.
 * 
 * Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.
 * 
 * Link: https://leetcode.com/problems/rotting-oranges/
 */

type Cell = {
  row: number;
  col: number;
}

// Time Complexity: O(m * n)
// We iterate through the grid once to find initial oranges, and then each cell is enqueued and dequeued at most once.
//
// Space Complexity: O(m * n)
// In the worst case, the queue could hold all the cells in the grid.
const orangesRotting = (grid: number[][]): number => {
  const m = grid.length;
  const n = grid[0].length;
  const queue: Cell[] = [];
  let head: number = 0;
  const directions = [
    [-1, 0], // left
    [0, -1], // up
    [1, 0], // right
    [0, 1] // down
  ];
  let minutes: number = 0;
  let freshOrangesCount: number = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === 1) {
        freshOrangesCount++;
      }
      if (grid[i][j] === 2) {
        const cell: Cell = { row: i, col: j };
        queue.push(cell);
      }
    }
  }

  if (freshOrangesCount === 0) {
    return 0;
  }

  while (head < queue.length) {
    const levelSize = queue.length - head;
    let newOrangesRotten: boolean = false;
    for (let i = 0; i < levelSize; i++) {
      const rottenOrange = queue[head];
      head++;
      for (let j = 0; j < directions.length; j++) {
        const nextRow = rottenOrange.row + directions[j][0];
        const nextCol = rottenOrange.col + directions[j][1];
        if (nextRow < 0 || nextRow >= m) continue;
        if (nextCol < 0 || nextCol >= n) continue;
        if (grid[nextRow][nextCol] !== 1) continue;
        grid[nextRow][nextCol] = 2;
        freshOrangesCount--;
        queue.push({ row: nextRow, col: nextCol });
        newOrangesRotten = true;
      }
    }
    if (newOrangesRotten) {
      minutes++;
    }
  }

  return freshOrangesCount > 0 ? -1 : minutes;
};

// Test cases
const grid1 = [[2, 1, 1], [1, 1, 0], [0, 1, 1]];
const result1 = orangesRotting(grid1);
console.log(`Input: grid = ${JSON.stringify(grid1)}`);
console.log(`Output: ${result1}`); // Expected output: 4
console.log('---');

const grid2 = [[2, 1, 1], [0, 1, 1], [1, 0, 1]];
const result2 = orangesRotting(grid2);
console.log(`Input: grid = ${JSON.stringify(grid2)}`);
console.log(`Output: ${result2}`); // Expected output: -1
console.log('---');

const grid3 = [[0, 2]];
const result3 = orangesRotting(grid3);
console.log(`Input: grid = ${JSON.stringify(grid3)}`);
console.log(`Output: ${result3}`); // Expected output: 0
console.log('---');
