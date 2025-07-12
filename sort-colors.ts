/*
Problem: Sort Colors

Given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue.

We will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively.

You must solve this problem without using the library's sort function.

Example:
Input: nums = [2,0,2,1,1,0]
Output: [0,0,1,1,2,2]
*/

// Time complexity: O(n)
// We iterate through the array with a single pass. Each element is processed at most a constant number of times.
//
// Space complexity: O(1)
// The algorithm sorts the array in-place and uses a fixed amount of extra space for pointers.
function sortColors(nums: number[]): void {
  let left: number = 0;
  let right: number = nums.length - 1;
  let current: number = 0;
  while (current <= right) {
    if (nums[current] === 0) {
      const tmp = nums[current];
      nums[current] = nums[left];
      nums[left] = tmp;
      left++;
      current++;
    } else if (nums[current] === 1) {
      current++;
    } else if (nums[current] === 2) {
      const tmp = nums[current];
      nums[current] = nums[right];
      nums[right] = tmp;
      right--;
    }
  }
}

// Test Case 1
const nums1 = [2, 0, 2, 1, 1, 0];
console.log(`Input: nums = [${nums1}]`);
sortColors(nums1);
console.log(`Output: [${nums1}]`); // Expected output: [0,0,1,1,2,2]

// Test Case 2
const nums2 = [2, 0, 1];
console.log(`Input: nums = [${nums2}]`);
sortColors(nums2);
console.log(`Output: [${nums2}]`); // Expected output: [0,1,2]

// Test Case 3
const nums3 = [0];
console.log(`Input: nums = [${nums3}]`);
sortColors(nums3);
console.log(`Output: [${nums3}]`); // Expected output: [0]

// Test Case 4
const nums4 = [1];
console.log(`Input: nums = [${nums4}]`);
sortColors(nums4);
console.log(`Output: [${nums4}]`); // Expected output: [1]

// Test Case 5
const nums5 = [0, 0, 0];
console.log(`Input: nums = [${nums5}]`);
sortColors(nums5);
console.log(`Output: [${nums5}]`); // Expected output: [0,0,0]

// Test Case 6
const nums6 = [2, 2, 2];
console.log(`Input: nums = [${nums6}]`);
sortColors(nums6);
console.log(`Output: [${nums6}]`); // Expected output: [2,2,2]

// Test Case 7
const nums7 = [1, 1, 1];
console.log(`Input: nums = [${nums7}]`);
sortColors(nums7);
console.log(`Output: [${nums7}]`); // Expected output: [1,1,1]
