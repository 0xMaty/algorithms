/**
 * Problem: Surrounded Regions
 * 
 * Given an m x n matrix `board` containing 'X' and 'O', capture all regions that are 4-directionally surrounded by 'X'.
 * 
 * A region is captured by flipping all 'O's into 'X's in that surrounded region.
 * 
 * A region is **surrounded** if it is not connected to the border of the board. Any 'O' that is on the border or connected to an 'O' on the border is *not* surrounded.
 * 
 * Link: https://leetcode.com/problems/surrounded-regions/
 */

// Time Complexity: O(m * n)
// We iterate through the grid multiple times (initial border scan, DFS traversal, final pass). Each cell is visited a constant number of times.
//
// Space Complexity: O(m * n)
// In the worst case, the recursion stack for DFS could go as deep as the number of cells in the grid.
const solve = (board: string[][]): void => {

  const directions = [
    [-1, 0],
    [0, -1],
    [1, 0],
    [0, 1]
  ];

  function dfs(row: number, col: number, board: string[][]) {
    if (row < 0 || row > board.length - 1) return;
    if (col < 0 || col > board[0].length - 1) return;
    if (board[row][col] === "X") return;
    if (board[row][col] === "2") return;
    board[row][col] = "2";
    for (let i = 0; i < directions.length; i++) {
      const direction = directions[i];
      const nextRow = row + direction[0];
      const nextCol = col + direction[1];
      dfs(nextRow, nextCol, board);
    }
  }

  for (let m = 0; m < board.length; m++) {
    dfs(m, 0, board);
    dfs(m, board[0].length - 1, board);
  }

  for (let n = 0; n < board[0].length; n++) {
    dfs(0, n, board);
    dfs(board.length - 1, n, board);
  }

  for (let m = 0; m < board.length; m++) {
    for (let n = 0; n < board[m].length; n++) {
      if (board[m][n] === "2") {
        board[m][n] = "O";
      } else if (board[m][n] === "O") {
        board[m][n] = "X";
      }
    }
  }

};

// Test cases
const board1 = [
  ["X", "X", "X", "X"],
  ["X", "O", "O", "X"],
  ["X", "X", "O", "X"],
  ["X", "O", "X", "X"]
];
solve(board1);
console.log(`Input: ${JSON.stringify([
  ["X", "X", "X", "X"],
  ["X", "O", "O", "X"],
  ["X", "X", "O", "X"],
  ["X", "O", "X", "X"]
])}`);
console.log(`Output: ${JSON.stringify(board1)}`); // Expected output: [["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]
console.log('---\n');

const board2 = [
  ["X"]
];
solve(board2);
console.log(`Input: ${JSON.stringify([["X"]])}`);
console.log(`Output: ${JSON.stringify(board2)}`); // Expected output: [["X"]]
console.log('---\n');

const board3 = [
  ["O", "O", "O"],
  ["O", "O", "O"],
  ["O", "O", "O"]
];
solve(board3);
console.log(`Input: ${JSON.stringify([
  ["O", "O", "O"],
  ["O", "O", "O"],
  ["O", "O", "O"]
])}`);
console.log(`Output: ${JSON.stringify(board3)}`); // Expected output: [["O","O","O"],["O","O","O"],["O","O","O"]]
console.log('---\n');
