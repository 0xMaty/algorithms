// Problem: Binary Search
//
// Given an array of integers `nums` which is sorted in ascending order, and an integer `target`,
// write a function to search for `target` in `nums`. If `target` exists, then return its index.
// Otherwise, return `-1`.
//
// You must write an algorithm with O(log n) runtime complexity.

// Time complexity: O(log n)
// With each iteration, we divide the search space in half.
//
// Space complexity: O(1)
// We only use a constant amount of extra space for variables.
function binarySearch(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    const middle = Math.floor((left + right) / 2);
    if (target === nums[middle]) {
      return middle;
    } else if (target > nums[middle]) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }
  }
  return -1;
}

function main() {
  const nums1 = [-1, 0, 3, 5, 9, 12];
  const target1 = 9;
  const result1 = binarySearch(nums1, target1);
  console.log(`Input: nums = [${nums1}], target = ${target1}`);
  console.log(`Output: ${result1}`); // Expected output: 4

  const nums2 = [-1, 0, 3, 5, 9, 12];
  const target2 = 2;
  const result2 = binarySearch(nums2, target2);
  console.log(`Input: nums = [${nums2}], target = ${target2}`);
  console.log(`Output: ${result2}`); // Expected output: -1
}

main();
