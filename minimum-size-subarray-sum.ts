// Problem: Minimum Size Subarray Sum
//
// Given an array of positive integers `nums` and a positive integer `target`, return the minimal length
// of a contiguous subarray whose sum is greater than or equal to `target`. If there is no such subarray,
// return `0` instead.

// Time complexity: O(n)
// Both the `left` and `right` pointers traverse the array at most once.
//
// Space complexity: O(1)
// We only use a constant amount of extra space for variables.
function minSubArrayLen(target: number, nums: number[]): number {
  let left: number = 0;
  let right: number = 0;
  let currentSum: number = 0;
  let minLength: number = Infinity;
  while (right < nums.length) {
    currentSum += nums[right];
    while (currentSum >= target) {
      const length = right - left + 1;
      if (minLength > length) {
        minLength = length;
      }
      currentSum -= nums[left];
      left++;
    }
    right++;
  }
  return minLength === Infinity ? 0 : minLength;
}

const target1 = 7;
const nums1 = [2, 3, 1, 2, 4, 3];
const result1 = minSubArrayLen(target1, nums1);
console.log(`Input: target = ${target1}, nums = [${nums1}]`);
console.log(`Output: ${result1}`); // Expected output: 2

const target2 = 4;
const nums2 = [1, 4, 4];
const result2 = minSubArrayLen(target2, nums2);
console.log(`Input: target = ${target2}, nums = [${nums2}]`);
console.log(`Output: ${result2}`); // Expected output: 1

const target3 = 11;
const nums3 = [1, 1, 1, 1, 1, 1, 1, 1];
const result3 = minSubArrayLen(target3, nums3);
console.log(`Input: target = ${target3}, nums = [${nums3}]`);
console.log(`Output: ${result3}`); // Expected output: 0
