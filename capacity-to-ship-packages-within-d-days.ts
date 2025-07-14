// Problem: Capacity To Ship Packages Within D Days
//
// A conveyor belt has packages that must be shipped from one port to another within `D` days.
// The `i`-th package on the conveyor belt has a weight of `weights[i]`. Each day, we load packages
// onto the ship in the order given by `weights`. We may not load more weight than the maximum
// weight capacity of the ship.
//
// Return the least weight capacity of the ship that will result in all the packages being shipped
// within `D` days.

// Helper function: Can we ship all packages within D days with the given capacity?
// Time complexity: O(N) where N is the number of packages (weights.length).
// We iterate through the weights array once.
// Space complexity: O(1).
function check(capacity: number, weights: number[], D: number): boolean {
  let daysNeeded = 1;
  let currentWeight = 0;
  for (let i = 0; i < weights.length; i++) {
    if (currentWeight + weights[i] <= capacity) {
      currentWeight += weights[i];
    } else {
      daysNeeded++;
      currentWeight = weights[i];
      if (weights[i] > capacity) return false;
    }
  }
  return daysNeeded <= D;
}

// Main function: Find the least weight capacity.
// Time complexity: O(N log(Sum of Weights - Max Weight))
// The binary search performs log(range) iterations. In each iteration, the 'check' function takes O(N) time.
// Range is (Sum of Weights - Max Weight).
// Space complexity: O(1).
function shipWithinDays(weights: number[], D: number): number {
  let low = Math.max(...weights);
  let high = weights.reduce((sum, weight) => sum + weight, 0);
  let minCapacity = Infinity;
  while (low <= high) {
    const midCapacity = Math.floor((low + high) / 2);
    if (check(midCapacity, weights, D)) {
      minCapacity = midCapacity;
      high = midCapacity - 1;
    } else {
      low = midCapacity + 1;
    }
  }
  return minCapacity;
}

function main() {
  // Example 1:
  const weights1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const D1 = 5;
  const result1 = shipWithinDays(weights1, D1);
  console.log(`Input: weights = [${weights1}], D = ${D1}`);
  console.log(`Output: ${result1}`); // Expected: 15

  // Example 2:
  const weights2 = [3, 2, 2, 4, 1, 4];
  const D2 = 3;
  const result2 = shipWithinDays(weights2, D2);
  console.log(`Input: weights = [${weights2}], D = ${D2}`);
  console.log(`Output: ${result2}`); // Expected: 6

  // Example 3:
  const weights3 = [1, 2, 3, 1, 1];
  const D3 = 4;
  const result3 = shipWithinDays(weights3, D3);
  console.log(`Input: weights = [${weights3}], D = ${D3}`);
  console.log(`Output: ${result3}`); // Expected: 3
}

main();
