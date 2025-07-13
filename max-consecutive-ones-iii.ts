/**
 * Problem: Max Consecutive Ones III
 * 
 * Given a binary array `nums` and an integer `k`, return the maximum number of consecutive 1's in the array if you can flip at most `k` 0's.
 * 
 * Link: https://leetcode.com/problems/max-consecutive-ones-iii/
 */

// Time Complexity: O(n)
// Each element is visited at most twice (once by the right pointer, once by the left).
//
// Space Complexity: O(1)
// We only use a few variables to store pointers and counts.
const longestOnes = (nums: number[], k: number): number => {
  let left: number = 0;
  let right: number = 0;
  let maxLength: number = 0;
  let zeroCount: number = 0;
  while (right < nums.length) {
    if (nums[right] === 0) {
      zeroCount++;
    }
    while (zeroCount > k) {
      if (nums[left] === 0) {
        zeroCount--;
      }
      left++;
    }
    maxLength = Math.max(maxLength, right - left + 1);
    right++;
  }
  return maxLength;
};

// Test cases
const nums1 = [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0];
const k1 = 2;
const result1 = longestOnes(nums1, k1);
console.log(`Input: nums = [${nums1}], k = ${k1}`);
console.log(`Output: ${result1}`); // Expected output: 6
console.log('---');

const nums2 = [0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1];
const k2 = 3;
const result2 = longestOnes(nums2, k2);
console.log(`Input: nums = [${nums2}], k = ${k2}`);
console.log(`Output: ${result2}`); // Expected output: 10
console.log('---');
