// Problem: Climbing Stairs
//
// You are climbing a staircase. It takes `n` steps to reach the top.
//
// Each time you can either climb `1` or `2` steps. In how many distinct ways can you climb to the top?

// Time complexity: O(n)
// We iterate through n steps to fill the DP array.
//
// Space complexity: O(n)
// We use an array of size n+1 to store the results of subproblems.
function climbStairs(n: number): number {
  if (n === 1) return 1;

  const dp: number[] = new Array(n + 1);
  dp[0] = 1;
  dp[1] = 1;

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
}

// Test cases
// Example 1:
// Input: n = 2
// Output: 2
// Explanation: There are two ways to climb to the top.
// 1. 1 step + 1 step
// 2. 2 steps
console.log(`Input: n = 2`);
console.log(`Output: ${climbStairs(2)}`); // Expected: 2

// Example 2:
// Input: n = 3
// Output: 3
// Explanation: There are three ways to climb to the top.
// 1. 1 step + 1 step + 1 step
// 2. 1 step + 2 steps
// 3. 2 steps + 1 step
console.log(`Input: n = 3`);
console.log(`Output: ${climbStairs(3)}`); // Expected: 3

// Example 3:
// Input: n = 1
// Output: 1
console.log(`Input: n = 1`);
console.log(`Output: ${climbStairs(1)}`); // Expected: 1
