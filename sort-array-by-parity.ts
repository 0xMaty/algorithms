// Problem: Sort Array by Parity
//
// Given an array of non-negative integers `A`, return an array where all the even elements of `A`
// are followed by all the odd elements.
//
// You may return any answer array that satisfies this condition.

// Time complexity: O(n)
// We iterate through the array with two pointers, and each element is visited at most once.
//
// Space complexity: O(1)
// We modify the array in-place, so we only use a constant amount of extra space.
function sortArrayByParity(A: number[]): number[] {
  let left: number = 0;
  let right: number = A.length - 1;
  while (left < right) {
    if (A[left] % 2 === 1 && A[right] % 2 === 0) {
      let tmp: number = A[left];
      A[left] = A[right];
      A[right] = tmp;
    }
    if (A[left] % 2 === 0) {
      left++;
    }
    if (A[right] % 2 === 1) {
      right--;
    }
  }
  return A;
}

function main() {
  const A1 = [3, 1, 2, 4];
  const result1 = sortArrayByParity([...A1]);
  console.log(`Input: A = [${A1}]`);
  console.log(`Output: ${result1}`); // Expected output: [2, 4, 3, 1] or similar

  const A2 = [0, 1, 2];
  const result2 = sortArrayByParity([...A2]);
  console.log(`Input: A = [${A2}]`);
  console.log(`Output: ${result2}`); // Expected output: [0, 2, 1] or similar
}

main();
