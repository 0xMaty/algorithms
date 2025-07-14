// Problem: Combination Sum
//
// Given an array of distinct integers `candidates` and a target integer `target`,
// return a list of all unique combinations of `candidates` where the chosen numbers sum to `target`.
// You may return the combinations in any order.
//
// The same number may be chosen from `candidates` an unlimited number of times.
// Two combinations are unique if the frequency of at least one of the chosen numbers is different.

// Time complexity: O(N^(T/M + 1)) where N is the number of candidates, T is the target, and M is the minimum candidate value.
// In the worst case, we might explore a very large number of paths in the recursion tree.
//
// Space complexity: O(T/M) for the recursion stack depth and current combination storage.
function combinationSum(candidates: number[], target: number): number[][] {
  const results: number[][] = [];

  function backtrack(currentCombination: number[], currentSum: number, startIndex: number) {
    if (currentSum > target) {
      return;
    }
    if (currentSum === target) {
      results.push([...currentCombination]);
      return;
    }
    for (let i = startIndex; i < candidates.length; i++) {
      currentSum += candidates[i];
      currentCombination.push(candidates[i]);

      backtrack(currentCombination, currentSum, i);

      currentSum -= candidates[i];
      currentCombination.pop();
    }
  }

  backtrack([], 0, 0);
  return results;
}

function main() {
  // Example 1:
  const candidates1 = [2, 3, 6, 7];
  const target1 = 7;
  const result1 = combinationSum(candidates1, target1);
  console.log(`Input: candidates = [${candidates1}], target = ${target1}`);
  console.log(`Output: [${result1.map(arr => `[${arr}]`).join(', ')}]`); // Expected: [[2,2,3],[7]]

  // Example 2:
  const candidates2 = [2, 3, 5];
  const target2 = 8;
  const result2 = combinationSum(candidates2, target2);
  console.log(`Input: candidates = [${candidates2}], target = ${target2}`);
  console.log(`Output: [${result2.map(arr => `[${arr}]`).join(', ')}]`); // Expected: [[2,2,2,2],[2,3,3],[3,5]]

  // Example 3:
  const candidates3 = [2];
  const target3 = 1;
  const result3 = combinationSum(candidates3, target3);
  console.log(`Input: candidates = [${candidates3}], target = ${target3}`);
  console.log(`Output: [${result3.map(arr => `[${arr}]`).join(', ')}]`); // Expected: []
}

main();
