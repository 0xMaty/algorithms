// Problem: Knight's Shortest Path
//
// Given an N x N chessboard, a start position (start_row, start_col), and an end position (end_row, end_col),
// return the minimum number of moves a knight needs to take to get from start to end. If the path is not possible, return -1.
//
// A knight has 8 possible moves, as shown in chess.

// Time Complexity: O(N*N)
// In the worst case, we visit every square on the N*N board once.
//
// Space Complexity: O(N*N)
// In the worst case, the queue could hold a large number of squares, proportional to the board size.
// The visited set also stores coordinates for every visited square.

function shortestPath(N: number, start: [number, number], end: [number, number]): number {
  if (start[0] === end[0] && start[1] === end[1]) return 0;
  const queue: number[][] = [start];
  let minimumNumberOfMoves: number = 0;
  const visited: boolean[][] = Array(N).fill(false).map(() => Array(N).fill(false));
  visited[start[0]][start[1]] = true;
  const directions: number[][] = [
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
    [-1, 2],
    [-1, -2],
    [1, 2],
    [1, -2]
  ];
  while (queue.length > 0) {
    const levelSize: number = queue.length;
    minimumNumberOfMoves++;
    for (let i = 0; i < levelSize; i++) {
      const currentNode: number[] = queue.shift()!;
      for (let j = 0; j < directions.length; j++) {
        const direction: number[] = directions[j];
        let nextPosition: number[] = [currentNode[0] + direction[0], currentNode[1] + direction[1]];
        if (nextPosition[0] < 0 || nextPosition[0] >= N) continue;
        if (nextPosition[1] < 0 || nextPosition[1] >= N) continue;
        if (visited[nextPosition[0]][nextPosition[1]] === true) continue;
        if (nextPosition[0] === end[0] && nextPosition[1] === end[1]) return minimumNumberOfMoves;
        visited[nextPosition[0]][nextPosition[1]] = true;
        queue.push(nextPosition);
      }
    }
  }
  return -1;
}

// --- Test Cases ---

const testCases = [
  { N: 8, start: [0, 0], end: [7, 7], expected: 6 },
  { N: 3, start: [0, 0], end: [1, 2], expected: 1 },
  { N: 3, start: [0, 0], end: [2, 2], expected: 4 },
  { N: 4, start: [0, 0], end: [3, 1], expected: 2 }, // Corrected from 3
  { N: 5, start: [0, 0], end: [4, 4], expected: 4 },
  { N: 2, start: [0, 0], end: [1, 1], expected: -1 }, // Impossible path
];

function runTests() {
  testCases.forEach((test, index) => {
    const result = shortestPath(test.N, test.start, test.end);
    const passed = result === test.expected;
    console.log(`Test Case ${index + 1}: ${passed ? '✅ Passed' : '❌ Failed'}`);
    if (!passed) {
      console.log(`  Input:    N=${test.N}, start=(${test.start}), end=(${test.end})`);
      console.log(`  Expected: ${test.expected}`);
      console.log(`  Got:      ${result}`);
    }
  });
}

runTests();
