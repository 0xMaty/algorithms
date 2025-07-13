/**
 * Problem: Squares of a Sorted Array
 * 
 * Given an integer array `nums` sorted in non-decreasing order, return an array of the squares of each number sorted in non-decreasing order.
 * 
 * Link: https://leetcode.com/problems/squares-of-a-sorted-array/
 */

// Time Complexity: O(n)
// We iterate through the array once using two pointers.
//
// Space Complexity: O(n)
// We create a new result array of the same size as the input.
const sortedSquares = (nums: number[]): number[] => {
  const n = nums.length;
  const result: number[] = new Array(n);
  let resultIndex: number = n - 1;
  let left: number = 0;
  let right: number = n - 1;
  while (left <= right) {
    const leftSquared = nums[left] ** 2;
    const rightSquared = nums[right] ** 2;
    if (leftSquared > rightSquared) {
      result[resultIndex] = leftSquared;
      resultIndex--;
      left++;
    } else {
      result[resultIndex] = rightSquared;
      resultIndex--;
      right--;
    }
  }
  return result;
};

const nums1 = [-4, -1, 0, 3, 10];
const result1 = sortedSquares(nums1);
console.log(`Input: nums = [${nums1}]`);
console.log(`Output: [${result1}]`); // Expected output: [0, 1, 9, 16, 100]
console.log('---');

const nums2 = [-7, -3, 2, 3, 11];
const result2 = sortedSquares(nums2);
console.log(`Input: nums = [${nums2}]`);
console.log(`Output: [${result2}]`); // Expected output: [4, 9, 9, 49, 121]
console.log('---');

const nums3 = [0, 2, 3, 5];
const result3 = sortedSquares(nums3);
console.log(`Input: nums = [${nums3}]`);
console.log(`Output: [${result3}]`); // Expected output: [0, 4, 9, 25]
console.log('---');
