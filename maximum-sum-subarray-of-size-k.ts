// Problem: Maximum Sum Subarray of Size K
//
// Given an array of integers `arr` and a positive integer `k`, find the maximum sum of any
// contiguous subarray of size `k`.

// Time complexity: O(n)
// We iterate through the array once with a single pass (sliding window).
//
// Space complexity: O(1)
// We only use a constant amount of extra space for variables.
function findMaxSumSubarray(arr: number[], k: number): number {
  let windowStart: number = 0;
  let windowEnd: number = 0;
  let windowSum: number = 0;
  let maxSum: number = -Infinity;
  while (windowEnd < arr.length) {
    windowSum += arr[windowEnd];
    const windowWidth = windowEnd - windowStart + 1;
    if (windowWidth === k) {
      maxSum = Math.max(maxSum, windowSum);
      windowSum -= arr[windowStart];
      windowStart++;
    }
    windowEnd++;
  }
  return maxSum;
}

function main() {
  const arr1 = [2, 1, 5, 1, 3, 2];
  const k1 = 3;
  const result1 = findMaxSumSubarray(arr1, k1);
  console.log(`Input: arr = [${arr1}], k = ${k1}`);
  console.log(`Output: ${result1}`); // Expected output: 9

  const arr2 = [2, 3, 4, 1, 5];
  const k2 = 2;
  const result2 = findMaxSumSubarray(arr2, k2);
  console.log(`Input: arr = [${arr2}], k = ${k2}`);
  console.log(`Output: ${result2}`); // Expected output: 7
}

main();
