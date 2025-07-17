// Problem: Word Search
//
// Given an `m x n` `board` of characters and a string `word`, return `true` if `word` exists in the grid.
//
// The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.
//
// Example 1:
// Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
// Output: true
//
// Example 2:
// Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"
// Output: true
//
// Example 3:
// Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"
// Output: false

// Time complexity: O(M * N * 4^L)
// Where M is the number of rows, N is the number of columns, and L is the length of the word.
// In the worst case, we might start a DFS from each of the M*N cells.
// Each DFS call can branch up to 4 directions, and the maximum depth of the recursion is L.
//
// Space complexity: O(M * N + L)
// O(M * N) for the `visited` 2D array.
// O(L) for the recursion call stack depth, where L is the length of the word.
function exist(board: string[][], word: string): boolean {
  if (board.length === 0) return false;
  if (word.length === 0) return false;
  const m = board.length;
  const n = board[0].length;
  const directions = [
    [-1, 0],
    [0, -1],
    [1, 0],
    [0, 1]
  ];
  const visited: boolean[][] = Array(m).fill(null).map(() => Array(n).fill(false));

  function dfs(row: number, col: number, wordIndex: number): boolean {
    if (row < 0 || row >= m) return false;
    if (col < 0 || col >= n) return false;
    if (visited[row][col] === true) return false;
    if (board[row][col] !== word[wordIndex]) return false;
    if (wordIndex === word.length - 1) return true;
    visited[row][col] = true;
    for (let i = 0; i < directions.length; i++) {
      const direction = directions[i];
      const result = dfs(row + direction[0], col + direction[1], wordIndex + 1);
      if (result === true) {
        return true;
      }
    }
    visited[row][col] = false;
    return false;
  }

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {

      if (board[row][col] === word[0]) {
        const result = dfs(row, col, 0);
        if (result === true) {
          return true;
        }
      }

    }
  }

  return false;
}

// --- Test Cases ---
const board1 = [
  ["A", "B", "C", "E"],
  ["S", "F", "C", "S"],
  ["A", "D", "E", "E"]
];
const word1 = "ABCCED";
console.log(`Input board: ${JSON.stringify(board1)}, word: "${word1}"`);
console.log(`Output: ${exist(board1, word1)}`); // Expected: true

const board2 = [
  ["A", "B", "C", "E"],
  ["S", "F", "C", "S"],
  ["A", "D", "E", "E"]
];
const word2 = "SEE";
console.log(`Input board: ${JSON.stringify(board2)}, word: "${word2}"`);
console.log(`Output: ${exist(board2, word2)}`); // Expected: true

const board3 = [
  ["A", "B", "C", "E"],
  ["S", "F", "C", "S"],
  ["A", "D", "E", "E"]
];
const word3 = "ABCB";
console.log(`Input board: ${JSON.stringify(board3)}, word: "${word3}"`);
console.log(`Output: ${exist(board3, word3)}`); // Expected: false
