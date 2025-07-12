/*
Problem: Subsets

Given an integer array `nums` of unique elements, return all possible subsets (the power set).

The solution set must not contain duplicate subsets. You may return the solution in any order.
*/

/**
 * Time Complexity: O(n * 2^n) where n is the number of elements in `nums`.
 *   There are 2^n possible subsets. For each subset, we perform a copy operation which takes O(n) time in the worst case (for subsets of length n).
 * Space Complexity: O(n * 2^n) where n is the number of elements in `nums`.
 *   This is primarily due to storing all 2^n subsets in the `allSubsets` array. Each subset can have a maximum length of n.
 *   The recursion stack depth is O(n) in the worst case, which is dominated by the storage of subsets.
 */
function subsets(nums: number[]): number[][] {

  const allSubsets: number[][] = [];
  const currentSubset: number[] = [];

  function backtrack(index: number): void {
    allSubsets.push([...currentSubset]);
    for (let i = index; i < nums.length; i++) {
      currentSubset.push(nums[i]);
      backtrack(i + 1);
      currentSubset.pop();
    }
  }

  backtrack(0);

  return allSubsets;
}

// Test Cases

// Test Case 1: Basic example
const nums1 = [1, 2, 3];
console.log(`Input: nums = ${JSON.stringify(nums1)}`);
console.log(`Output: ${JSON.stringify(subsets(nums1))}`); // Expected: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]] (order may vary)

// Test Case 2: Single element
const nums2 = [0];
console.log(`Input: nums = ${JSON.stringify(nums2)}`);
console.log(`Output: ${JSON.stringify(subsets(nums2))}`); // Expected: [[],[0]]

// Test Case 3: Empty array
const nums3: number[] = [];
console.log(`Input: nums = ${JSON.stringify(nums3)}`);
console.log(`Output: ${JSON.stringify(subsets(nums3))}`); // Expected: [[]]
