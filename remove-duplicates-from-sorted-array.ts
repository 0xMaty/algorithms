// Problem: Remove Duplicates from Sorted Array
//
// Given a sorted array of integers `nums`, remove the duplicates in-place such that each unique element appears only once.
// The relative order of the elements should be kept the same.
//
// Return k, the number of unique elements.

// Time complexity: O(n)
// We iterate through the array of n elements once.
//
// Space complexity: O(1)
// We are modifying the array in-place, so we don't use any extra space.
function removeDuplicates(nums: number[]): number {
  let writeIndex: number = 1;
  for (let readIndex = 1; readIndex < nums.length; readIndex++) {
    if (nums[readIndex] !== nums[readIndex - 1]) {
      nums[writeIndex] = nums[readIndex];
      writeIndex++;
    }
  }
  return writeIndex;
}

const nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
const k = removeDuplicates(nums);
console.log(`Input: nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]`);
console.log(`Output: ${k}`); // Expected output: 5
console.log(`Modified nums: [${nums.slice(0, k)}]`); // Expected output: [0, 1, 2, 3, 4]
