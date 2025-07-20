// Problem: Snakes and Ladders
//
// You are given an n x n integer board where the cells are labeled from 1 to n * n in a Boustrophedon style.
// You start at square 1 and want to reach square n * n.
// In one move, you can move from square x to any square with a label from x + 1 to min(x + 6, n * n).
// If you land on a square with a snake or a ladder, you must immediately move to the destination square.
//
// Return the minimum number of moves to reach the final square. If it's impossible, return -1.

// Time complexity: O(n^2)
// We visit each square on the n x n board at most once. For each square, we do a constant amount of work (simulating 6 dice rolls).
//
// Space complexity: O(n^2)
// The space is dominated by the queue and the visited set, both of which can store up to n^2 squares in the worst case.
function snakesAndLadders(board: number[][]): number {
  const n = board.length;
  const queue: Item[] = [{ square: 1, moves: 0 }];
  const visited: Set<number> = new Set();
  visited.add(1);

  function getCoordinates(square: number): [number, number] {
    const rowFromBottom = Math.floor((square - 1) / n);
    const row = n - 1 - rowFromBottom;
    let col = (square - 1) % n;
    if (rowFromBottom % 2 !== 0) { // Boustrophedon adjustment
      col = n - 1 - col;
    }
    return [row, col];
  }

  while (queue.length > 0) {
    const currentItem = queue.shift()!;
    for (let diceRoll = 1; diceRoll <= 6; diceRoll++) {
      let nextSquare: number = currentItem.square + diceRoll;
      if (nextSquare > n * n) continue;
      const [nextRow, nextCol] = getCoordinates(nextSquare);
      const boardValue = board[nextRow][nextCol];
      if (boardValue !== -1) {
        nextSquare = boardValue;
      }

      if (nextSquare === n * n) {
        return currentItem.moves + 1;
      }

      if (!visited.has(nextSquare)) {
        visited.add(nextSquare);
        queue.push({ square: nextSquare, moves: currentItem.moves + 1 })
      }
    }
  }

  return -1;
}

type Item = {
  square: number;
  moves: number;
}

// Example 1:
const board1 = [
  [-1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1],
  [-1, 35, -1, -1, 13, -1],
  [-1, -1, -1, -1, -1, -1],
  [-1, 15, -1, -1, -1, -1],
];
const result1 = snakesAndLadders(board1);
console.log("Input:");
console.log(board1);
console.log(`Output: ${result1}`); // Expected output: 4

// Example 2:
const board2 = [
  [-1, -1],
  [-1, 3],
];
const result2 = snakesAndLadders(board2);
console.log("Input:");
console.log(board2);
console.log(`Output: ${result2}`); // Expected output: 1
