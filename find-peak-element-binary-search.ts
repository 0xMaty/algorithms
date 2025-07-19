// Problem: Find Peak Element (Binary Search)
//
// A peak element is an element that is strictly greater than its neighbors.
// Given a 0-indexed integer array `nums`, find a peak element, and return its index.
// If the array contains multiple peaks, return the index to **any** of the peaks.
//
// You may imagine that `nums[-1] = nums[n] = -∞`. In other words, an element is always considered greater than its imaginary neighbors outside the array.
//
// You must write an algorithm that runs in O(log n) time.

// Time complexity: O(log n)
// The search space is halved in each iteration.
//
// Space complexity: O(1)
// Only a few constant-space variables are used.
//
function findPeakElement(nums: number[]): number {
  if (nums.length === 0) return -1;
  let left: number = 0;
  let right: number = nums.length - 1;
  while (left < right) {
    const mid = Math.floor(left + (right - left) / 2);
    if (nums[mid] < nums[mid + 1]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return left;
}

// Example Usage:
const nums1 = [1, 2, 3, 1];
const result1 = findPeakElement(nums1);
console.log(`Input: nums = [${nums1}]`);
console.log(`Output: ${result1}`); // Expected output: 2

const nums2 = [1, 2, 1, 3, 5, 6, 4];
const result2 = findPeakElement(nums2);
console.log(`Input: nums = [${nums2}]`);
console.log(`Output: ${result2}`); // Expected output: 5 (or 1)

const nums3 = [1];
const result3 = findPeakElement(nums3);
console.log(`Input: nums = [${nums3}]`);
console.log(`Output: ${result3}`); // Expected output: 0

const nums4 = [3, 4, 3, 2, 1];
const result4 = findPeakElement(nums4);
console.log(`Input: nums = [${nums4}]`);
console.log(`Output: ${result4}`); // Expected output: 1
