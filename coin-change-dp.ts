// Problem: Coin Change (Dynamic Programming)
//
// You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money.
//
// Return the fewest number of coins that you need to make up that `amount`. If that amount of money cannot be made up by any combination of the coins, return `-1`.
//
// You may assume that you have an infinite number of each kind of coin.

// Time complexity: O(amount * coins.length)
// The outer loop iterates `amount` times, and the inner loop iterates `coins.length` times.
//
// Space complexity: O(amount)
// An array `dp` of size `amount + 1` is used to store intermediate results.
//
function coinChange(coins: number[], amount: number): number {
  const dp: number[] = Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (let j = 0; j < coins.length; j++) {
      const coin = coins[j];
      if (i - coin < 0) continue;
      if (dp[i - coin] === Infinity) continue;
      dp[i] = Math.min(dp[i], 1 + dp[i - coin]);
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}

// Example Usage:
const coins1 = [1, 2, 5];
const amount1 = 11;
const result1 = coinChange(coins1, amount1);
console.log(`Input: coins = [${coins1}], amount = ${amount1}`);
console.log(`Output: ${result1}`); // Expected output: 3

const coins2 = [2];
const amount2 = 3;
const result2 = coinChange(coins2, amount2);
console.log(`Input: coins = [${coins2}], amount = ${amount2}`);
console.log(`Output: ${result2}`); // Expected output: -1

const coins3 = [1];
const amount3 = 0;
const result3 = coinChange(coins3, amount3);
console.log(`Input: coins = [${coins3}], amount = ${amount3}`);
console.log(`Output: ${result3}`); // Expected output: 0

const coins4 = [186, 419, 83, 408];
const amount4 = 6249;
const result4 = coinChange(coins4, amount4);
console.log(`Input: coins = [${coins4}], amount = ${amount4}`);
console.log(`Output: ${result4}`); // Expected output: 20
