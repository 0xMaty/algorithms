// Problem: Container With Most Water
//
// You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that
// the two endpoints of the `i`-th line are `(i, 0)` and `(i, height[i])`.
//
// Find two lines that together with the x-axis form a container, such that the container contains the most water.
//
// Return the maximum amount of water a container can store.

// Time complexity: O(n)
// We iterate through the array once with two pointers.
//
// Space complexity: O(1)
// We only use a constant amount of extra space for variables.
function maxArea(height: number[]): number {
  let left: number = 0;
  let right: number = height.length - 1;
  let maxArea: number = 0;
  while (left < right) {
    let area = Math.min(height[left], height[right]) * (right - left);
    if (maxArea < area) {
      maxArea = area;
    }
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }
  return maxArea;
}

const height1 = [1, 8, 6, 2, 5, 4, 8, 3, 7];
const result1 = maxArea(height1);
console.log(`Input: height = [${height1}]`);
console.log(`Output: ${result1}`); // Expected output: 49

const height2 = [1, 1];
const result2 = maxArea(height2);
console.log(`Input: height = [${height2}]`);
console.log(`Output: ${result2}`); // Expected output: 1
