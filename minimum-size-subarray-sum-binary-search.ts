/**
 * Problem: Minimum Size Subarray Sum (Binary Search Approach)
 * 
 * Given an array of positive integers `nums` and a positive integer `target`, return the minimal length of a subarray whose sum is greater than or equal to `target`. If there is no such subarray, return 0 instead.
 * 
 * Link: https://leetcode.com/problems/minimum-size-subarray-sum/
 */

// Time Complexity: O(N log N)
// The binary search performs O(log N) iterations. In each iteration, the check function takes O(N) time.
//
// Space Complexity: O(1)
// We use a few constant-space variables.

function minSubArrayLen(target: number, nums: number[]): number {

  let left: number = 1;
  let right: number = nums.length;
  let answer: number = 0;

  function check(length: number): boolean {
    if (length === 0) {
      return false;
    }

    let currentWindowSum: number = 0;
    for (let i = 0; i < length; i++) {
      currentWindowSum += nums[i];
    }

    if (currentWindowSum >= target) {
      return true;
    }

    for (let i = length; i < nums.length; i++) {
      currentWindowSum += nums[i] - nums[i - length];
      if (currentWindowSum >= target) {
        return true;
      }
    }

    return false;
  }

  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2);
    if (check(mid)) {
      answer = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return answer;
};

// Test cases
const nums1 = [2, 3, 1, 2, 4, 3];
const target1 = 7;
const result1 = minSubArrayLen(target1, nums1);
console.log(`Input: target = ${target1}, nums = [${nums1}]`);
console.log(`Output: ${result1}`); // Expected output: 2
console.log('---');

const nums2 = [1, 4, 4];
const target2 = 4;
const result2 = minSubArrayLen(target2, nums2);
console.log(`Input: target = ${target2}, nums = [${nums2}]`);
console.log(`Output: ${result2}`); // Expected output: 1
console.log('---');

const nums3 = [1, 1, 1, 1, 1, 1, 1, 1];
const target3 = 11;
const result3 = minSubArrayLen(target3, nums3);
console.log(`Input: target = ${target3}, nums = [${nums3}]`);
console.log(`Output: ${result3}`); // Expected output: 0
console.log('---');

const nums4 = [1, 2, 3, 4, 5];
const target4 = 15;
const result4 = minSubArrayLen(target4, nums4);
console.log(`Input: target = ${target4}, nums = [${nums4}]`);
console.log(`Output: ${result4}`); // Expected output: 5
console.log('---');
