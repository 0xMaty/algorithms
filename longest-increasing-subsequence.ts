// Problem: Longest Increasing Subsequence
//
// Given an integer array `nums`, return *the length of the longest strictly increasing subsequence*.
//
// A **subsequence** is a sequence that can be derived from an array by deleting some or no elements without changing the order of the remaining elements. For example, `[3,6,2,7]` is a subsequence of the array `[0,3,1,6,2,2,7]`.

// Time complexity: O(N^2)
// The nested loops iterate through approximately N^2 pairs of elements.
//
// Space complexity: O(N)
// The `dp` array stores N elements.
function lengthOfLIS(nums: number[]): number {
  if (nums.length === 0) return 0;
  const dp: number[] = Array(nums.length).fill(1);
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }
  return Math.max(...dp);
};

const nums1 = [10, 9, 2, 5, 3, 7, 101, 18];
const result1 = lengthOfLIS(nums1);
console.log(`Input: nums = [${nums1}]`);
console.log(`Output: ${result1}`); // Expected: 4

const nums2 = [0, 1, 0, 3, 2, 3];
const result2 = lengthOfLIS(nums2);
console.log(`Input: nums = [${nums2}]`);
console.log(`Output: ${result2}`); // Expected: 4

const nums3 = [7, 7, 7, 7, 7, 7, 7];
const result3 = lengthOfLIS(nums3);
console.log(`Input: nums = [${nums3}]`);
console.log(`Output: ${result3}`); // Expected: 1
