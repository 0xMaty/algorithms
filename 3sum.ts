// Problem: 3Sum
//
// Given an integer array `nums`, find all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.
//
// Notice that the solution set must not contain duplicate triplets.

// Time complexity: O(n^2)
// The n * log(n) for the sort and O(n^2) for the nested loops. The O(n^2) is the dominant term.
//
// Space complexity: O(log n) to O(n)
// This depends on the implementation of the sorting algorithm. It can be O(log n) or O(n).
function threeSum(nums: number[]): number[][] {
  let result: number[][] = [];

  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }
    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (sum < 0) {
        left++;
      } else if (sum > 0) {
        right--;
      } else {
        result.push([nums[i], nums[left], nums[right]]);

        while (left < right && nums[left] === nums[left + 1]) {
          left++;
        }

        while (left < right && nums[right] === nums[right - 1]) {
          right--;
        }

        left++;
        right--;

      }

    }
  }
  return result;
};

const nums1 = [-1, 0, 1, 2, -1, -4];
const result1 = threeSum(nums1);
console.log(`Input: nums = [${nums1}]`);
console.log(`Output: [${result1.map(t => `[${t}]`)}]`); // Expected output: [[-1,-1,2],[-1,0,1]]

const nums2 = [];
const result2 = threeSum(nums2);
console.log(`Input: nums = [${nums2}]`);
console.log(`Output: [${result2.map(t => `[${t}]`)}]`); // Expected output: []

const nums3 = [0];
const result3 = threeSum(nums3);
console.log(`Input: nums = [${nums3}]`);
console.log(`Output: [${result3.map(t => `[${t}]`)}]`); // Expected output: []
