/**
 * Problem: Permutations
 * 
 * Given an array `nums` of distinct integers, return all the possible permutations. You can return the answer in any order.
 * 
 * Link: https://leetcode.com/problems/permutations/
 */

// Time Complexity: O(N * N!)
// There are N! permutations. For each permutation, we perform N operations (copying to result, adding/removing elements).
//
// Space Complexity: O(N)
// The recursion depth can go up to N. We also use a Set and a temporary array, both up to size N.
const permute = (nums: number[]): number[][] => {
  const permutations: number[][] = [];
  const currentPermutation: number[] = [];
  const usedIndices: Set<number> = new Set();

  function backtrack() {

    if (currentPermutation.length === nums.length) {
      permutations.push([...currentPermutation]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (usedIndices.has(i)) {
        continue;
      }

      currentPermutation.push(nums[i]);
      usedIndices.add(i);

      backtrack();

      currentPermutation.pop();
      usedIndices.delete(i);

    }

  }

  backtrack();

  return permutations;
};

// Test cases
const nums1 = [1, 2, 3];
const result1 = permute(nums1);
console.log(`Input: nums = [${nums1}]`);
console.log(`Output: ${JSON.stringify(result1)}`); // Expected output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]] (order may vary)
console.log('---');

const nums2 = [0, 1];
const result2 = permute(nums2);
console.log(`Input: nums = [${nums2}]`);
console.log(`Output: ${JSON.stringify(result2)}`); // Expected output: [[0,1],[1,0]] (order may vary)
console.log('---');

const nums3 = [1];
const result3 = permute(nums3);
console.log(`Input: nums = [${nums3}]`);
console.log(`Output: ${JSON.stringify(result3)}`); // Expected output: [[1]]
console.log('---');
