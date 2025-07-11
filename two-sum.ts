// Problem: Two Sum
//
// Given an array of integers `nums` and an integer `target`, return *indices of the two numbers such that they add up to `target`*.
//
// You may assume that each input would have **exactly one solution**, and you may not use the same element twice.
//
// You can return the answer in any order.

// Time complexity: O(n)
// We iterate through the array of n elements once. Each lookup and insertion in the hash map takes constant time on average.
//
// Space complexity: O(n)
// In the worst case, we store all n elements in the hash map.
function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [i, map.get(complement)!];
    } else {
      map.set(nums[i], i);
    }
  }
  return [];
}

function main() {
  const nums = [2, 7, 11, 15];
  const target = 9;
  const result = twoSum(nums, target);
  console.log(`Input: nums = [${nums}], target = ${target}`);
  console.log(`Output: [${result}]`); // Expected output: [0, 1] or [1, 0]

  const nums2 = [3, 2, 4];
  const target2 = 6;
  const result2 = twoSum(nums2, target2);
  console.log(`Input: nums = [${nums2}], target = ${target2}`);
  console.log(`Output: [${result2}]`); // Expected output: [1, 2] or [2, 1]
}

main();
