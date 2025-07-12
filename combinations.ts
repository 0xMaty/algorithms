// Problem: Combinations
//
// Given two integers `n` and `k`, return all possible combinations of `k` numbers chosen from the range `[1, n]`.
// You may return the answer in any order.

// Time complexity: O(C(n, k) * k)
// C(n, k) is the number of combinations (n choose k). The 'k' factor comes from copying each combination.
//
// Space complexity: O(C(n, k) * k)
// This accounts for the space needed to store all combinations, each of length 'k', plus the recursion stack depth (O(k)).
function combine(n: number, k: number): number[][] {

  const currentCombination: number[] = [];
  const allCombinations: number[][] = [];

  function backtrack(startNumber: number) {
    if (currentCombination.length === k) {
      allCombinations.push([...currentCombination]);
      return;
    }
    for (let i = startNumber; i <= n; i++) {
      currentCombination.push(i);
      backtrack(i + 1);
      currentCombination.pop();
    }
  }

  backtrack(1);

  return allCombinations;
}

// Test cases
// Example 1:
// Input: n = 4, k = 2
// Output: [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]
console.log(`Input: n = 4, k = 2`);
console.log(`Output: ${JSON.stringify(combine(4, 2))}`);
// Expected: [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]] (order of inner arrays and elements within them may vary)

// Example 2:
// Input: n = 1, k = 1
// Output: [[1]]
console.log(`Input: n = 1, k = 1`);
console.log(`Output: ${JSON.stringify(combine(1, 1))}`);
// Expected: [[1]]
