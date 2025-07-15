// Problem: Find Peak Element
//
// A peak element is an element that is strictly greater than its neighbors.
//
// Given a 0-indexed integer array `nums`, where `nums[i] != nums[i+1]` for all valid `i`. Find a peak element, and return its index.
//
// You may imagine that `nums[-1] = nums[n] = -∞`. In other words, an element is always considered to be greater than its non-existent neighbors.
//
// You must write an algorithm that runs in `O(log n)` time.

// Time complexity: O(log N)
// The binary search algorithm halves the search space in each iteration, leading to a logarithmic time complexity.
//
// Space complexity: O(1)
// The algorithm uses a constant amount of extra space for variables, regardless of the input array size.
function findPeakElement(nums: number[]): number {
  if (nums.length === 1) return 0;
  let left: number = 0;
  let right: number = nums.length - 1;
  while (left < right) {
    const middle = Math.floor((left + right) / 2);
    if (nums[middle] < nums[middle + 1]) {
      left = middle + 1;
    } else {
      right = middle;
    }
  }
  return left;
};

const nums1 = [1, 2, 3, 1];
const result1 = findPeakElement(nums1);
console.log(`Input: nums = [${nums1}]`);
console.log(`Output: ${result1}`); // Expected: 2

const nums2 = [1, 2, 1, 3, 5, 6, 4];
const result2 = findPeakElement(nums2);
console.log(`Input: nums = [${nums2}]`);
console.log(`Output: ${result2}`); // Expected: 1 or 5

const nums3 = [1];
const result3 = findPeakElement(nums3);
console.log(`Input: nums = [${nums3}]`);
console.log(`Output: ${result3}`); // Expected: 0

const nums4 = [3, 4, 3, 2, 1];
const result4 = findPeakElement(nums4);
console.log(`Input: nums = [${nums4}]`);
console.log(`Output: ${result4}`); // Expected: 1
