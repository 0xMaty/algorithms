/**
 * Problem: Unique Paths
 * 
 * There is a robot on an m x n grid. The robot is initially located at the top-left corner (grid[0][0]). The robot tries to move to the bottom-right corner (grid[m - 1][n - 1]).
 * 
 * The robot can only move either down or right at any point in time.
 * 
 * Given the two integers m and n, return the number of possible unique paths that the robot can take to reach the bottom-right corner.
 * 
 * Link: https://leetcode.com/problems/unique-paths/
 */

// Time Complexity: O(m * n)
// We iterate through each cell of the m x n DP table exactly once.
//
// Space Complexity: O(m * n)
// We use an m x n DP table to store the results of subproblems.
const uniquePaths = (m: number, n: number): number => {
  const grid: number[][] = Array(m).fill(0).map(() => Array(n).fill(0));

  for (let row = 0; row < m; row++) {
    grid[row][0] = 1;
  }

  for (let col = 0; col < n; col++) {
    grid[0][col] = 1;
  }

  for (let row = 1; row < m; row++) {
    for (let col = 1; col < n; col++) {
      grid[row][col] = grid[row - 1][col] + grid[row][col - 1];
    }
  }
  return grid[m - 1][n - 1];
};

// Test cases
const m1 = 3, n1 = 7;
const result1 = uniquePaths(m1, n1);
console.log(`Input: m = ${m1}, n = ${n1}`);
console.log(`Output: ${result1}`); // Expected output: 28
console.log('---');

const m2 = 3, n2 = 2;
const result2 = uniquePaths(m2, n2);
console.log(`Input: m = ${m2}, n = ${n2}`);
console.log(`Output: ${result2}`); // Expected output: 3
console.log('---');

const m3 = 1, n3 = 1;
const result3 = uniquePaths(m3, n3);
console.log(`Input: m = ${m3}, n = ${n3}`);
console.log(`Output: ${result3}`); // Expected output: 1
console.log('---');

const m4 = 2, n4 = 2;
const result4 = uniquePaths(m4, n4);
console.log(`Input: m = ${m4}, n = ${n4}`);
console.log(`Output: ${result4}`); // Expected output: 2
console.log('---');
