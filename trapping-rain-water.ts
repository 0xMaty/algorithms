// Problem: Trapping Rain Water
//
// Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.
//
// Example:
// Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
// Output: 6

// Time complexity: O(n)
// We iterate through the array once using two pointers, so the time complexity is linear.
//
// Space complexity: O(1)
// We only use a constant amount of extra space for variables regardless of the input size.
function trap(height: number[]): number {
  let left: number = 0;
  let right: number = height.length - 1;
  let leftMax: number = 0;
  let rightMax: number = 0;
  let trappedWater: number = 0;
  while (left < right) {
    if (height[left] > height[right]) {
      rightMax = Math.max(rightMax, height[right]);
      trappedWater += rightMax - height[right];
      right--;
    } else {
      leftMax = Math.max(leftMax, height[left]);
      trappedWater += leftMax - height[left];
      left++;
    }
  }
  return trappedWater;
}

const height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
const result = trap(height);
console.log(`Input: height = [${height}]`);
console.log(`Output: ${result}`); // Expected output: 6

const height2 = [4, 2, 0, 3, 2, 5];
const result2 = trap(height2);
console.log(`Input: height = [${height2}]`);
console.log(`Output: ${result2}`); // Expected output: 9
