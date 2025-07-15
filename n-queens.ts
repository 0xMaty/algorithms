// Problem: N-Queens
//
// The n-queens puzzle is the problem of placing `n` queens on an `n x n` chessboard such that no two queens attack each other.
//
// Given an integer `n`, return *all distinct solutions to the n-queens puzzle*. You may return the answer in any order.
//
// Each solution contains a distinct board configuration of the n-queens' placement, where `'Q'` and `'.'` both indicate a queen and an empty space, respectively.

// Time complexity: O(N!)
// In the worst case, the algorithm explores a search space proportional to N! due to trying all permutations. However, pruning (validity checks) significantly reduces the actual number of explored states.
//
// Space complexity: O(N + S * N^2)
// The auxiliary space (recursion stack and helper arrays) is O(N). The space for storing all solutions (S) is S * O(N^2), where S is the number of solutions. This is typically considered output space.
function solveNQueens(n: number): string[][] {
  const allSolutions: string[][] = [];
  const queensPlacement: number[] = Array(n).fill(-1);
  const cols: boolean[] = Array(n).fill(false);
  const diag1: boolean[] = Array(2 * n - 1).fill(false);
  const diag2: boolean[] = Array(2 * n - 1).fill(false);

  function backtrack(row: number) {
    if (row === n) {
      const solution = queensPlacement.map(placement => convertPlacements(n, placement));
      allSolutions.push(solution);
      return;
    }

    for (let col = 0; col < n; col++) {
      if (cols[col] === true) continue;
      if (diag1[row - col + n - 1] === true) continue;
      if (diag2[row + col] === true) continue;
      queensPlacement[row] = col;
      cols[col] = true;
      diag1[row - col + n - 1] = true;
      diag2[row + col] = true;
      backtrack(row + 1);
      queensPlacement[row] = -1;
      cols[col] = false;
      diag1[row - col + n - 1] = false;
      diag2[row + col] = false;
    }
  }

  backtrack(0);

  return allSolutions;
};

function convertPlacements(n: number, placement: number): string {
  const row: string[] = [];
  for (let i = 0; i < n; i++) {
    row.push(i === placement ? "Q" : ".");
  }
  return row.join("");
}

const n1 = 4;
const result1 = solveNQueens(n1);
console.log(`Input: n = ${n1}`);
console.log(`Output: ${JSON.stringify(result1)}`); // Expected: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]

const n2 = 1;
const result2 = solveNQueens(n2);
console.log(`Input: n = ${n2}`);
console.log(`Output: ${JSON.stringify(result2)}`); // Expected: [["Q"]]
