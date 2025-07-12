// Problem: Search in Rotated Sorted Array
//
// There is an integer array `nums` sorted in ascending order (with distinct values).
//
// Prior to being passed to your function, `nums` is **rotated** at an unknown pivot index `k`
// (`0 <= k < nums.length`) such that the resulting array is `[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]` (0-indexed).
// For example, `[0,1,2,4,5,6,7]` might be rotated at pivot index `3` and become `[4,5,6,7,0,1,2]`.
//
// Given the array `nums` after the rotation and an integer `target`, return the index of `target` if it is in `nums`, or `-1` if it is not in `nums`.
//
// You must write an algorithm with `O(log n)` runtime complexity.

// Time complexity: O(log n)
// The search space is halved in each iteration.
//
// Space complexity: O(1)
// We use a constant amount of extra space for variables.
function search(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    const middle = Math.floor((left + right) / 2);

    if (nums[middle] === target) {
      return middle;
    }

    if (nums[left] <= nums[middle]) {
      if (target >= nums[left] && target < nums[middle]) {
        right = middle - 1;
      } else {
        left = middle + 1;
      }
    } else {
      if (target > nums[middle] && target <= nums[right]) {
        left = middle + 1;
      } else {
        right = middle - 1;
      }
    }
  }
  return -1;
}

// Test cases
// Example 1:
// Input: nums = [4,5,6,7,0,1,2], target = 0
// Output: 4
const nums1 = [4, 5, 6, 7, 0, 1, 2];
const target1 = 0;
console.log(`Input: nums = [${nums1}], target = ${target1}`);
console.log(`Output: ${search(nums1, target1)}`); // Expected: 4

// Example 2:
// Input: nums = [4,5,6,7,0,1,2], target = 3
// Output: -1
const nums2 = [4, 5, 6, 7, 0, 1, 2];
const target2 = 3;
console.log(`Input: nums = [${nums2}], target = ${target2}`);
console.log(`Output: ${search(nums2, target2)}`); // Expected: -1

// Example 3:
// Input: nums = [1], target = 0
// Output: -1
const nums3 = [1];
const target3 = 0;
console.log(`Input: nums = [${nums3}], target = ${target3}`);
console.log(`Output: ${search(nums3, target3)}`); // Expected: -1

// Example 4:
// Input: nums = [1,3], target = 3
// Output: 1
const nums4 = [1, 3];
const target4 = 3;
console.log(`Input: nums = [${nums4}], target = ${target4}`);
console.log(`Output: ${search(nums4, target4)}`); // Expected: 1
