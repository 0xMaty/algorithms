// Problem: House Robber
//
// You are a professional robber planning to rob houses along a street.
// Each house has a certain amount of money stashed. All houses are arranged in a circle.
// Adjacent houses have security systems connected, and it will automatically contact the police if two adjacent houses are broken into on the same night.
//
// Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.

// Time complexity: O(N)
// The solution involves two calls to robLinear, each iterating through a subset of the N houses. Slice operations also take O(N).
//
// Space complexity: O(N)
// The space is primarily used by the slice operations which create new arrays, and the DP array within robLinear (which can be optimized to O(1)).
function rob(nums: number[]): number {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];

  // Helper function for linear house robber problem
  function robLinear(arr: number[]): number {
    if (arr.length === 0) return 0;
    if (arr.length === 1) return arr[0];

    let dp: number[] = new Array(arr.length);
    dp[0] = arr[0];
    dp[1] = Math.max(arr[0], arr[1]);

    for (let i = 2; i < arr.length; i++) {
      dp[i] = Math.max(dp[i - 1], dp[i - 2] + arr[i]);
    }
    return dp[arr.length - 1];
  }

  // Case 1: Exclude the last house (rob from index 0 to nums.length - 2)
  const robExcludingLast = robLinear(nums.slice(0, nums.length - 1));

  // Case 2: Exclude the first house (rob from index 1 to nums.length - 1)
  const robExcludingFirst = robLinear(nums.slice(1, nums.length));

  return Math.max(robExcludingLast, robExcludingFirst);
}

// Example 1:
const nums1 = [2, 3, 2];
const result1 = rob(nums1);
console.log(`Input: nums = [${nums1}]`);
console.log(`Output: ${result1}`); // Expected output: 3

// Example 2:
const nums2 = [1, 2, 3, 1];
const result2 = rob(nums2);
console.log(`Input: nums = [${nums2}]`);
console.log(`Output: ${result2}`); // Expected output: 4

// Example 3:
const nums3 = [0];
const result3 = rob(nums3);
console.log(`Input: nums = [${nums3}]`);
console.log(`Output: ${result3}`); // Expected output: 0

// Example 4:
const nums4 = [1, 2, 3];
const result4 = rob(nums4);
console.log(`Input: nums = [${nums4}]`);
console.log(`Output: ${result4}`); // Expected output: 3
