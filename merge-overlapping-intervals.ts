/**
 * Given an array of intervals where intervals[i] = [start_i, end_i], merge all
 * overlapping intervals, and return an array of the non-overlapping intervals
 * that cover all the intervals in the input.
 *
 * @param intervals An array of intervals.
 * @returns An array of merged, non-overlapping intervals.
 *
 * @timeComplexity O(n log n) - The dominant factor is the initial sort of the intervals.
 * The subsequent loop to merge intervals runs in O(n) time.
 *
 * @spaceComplexity O(n) - In the worst-case scenario (no intervals overlap),
 * the space required for the output array is proportional to the input size.
 * Some sorting algorithms can also use up to O(n) space.
 */
function merge(intervals: number[][]): number[][] {

  intervals.sort((a, b) => a[0] - b[0]);

  let lastMergedInterval = intervals[0];
  const mergedIntervals = [lastMergedInterval];

  for (let i = 1; i < intervals.length; i++) {
    const currentInterval = intervals[i];
    if (currentInterval[0] <= lastMergedInterval[1]) {
      lastMergedInterval[1] = Math.max(lastMergedInterval[1], currentInterval[1]);
    } else {
      mergedIntervals.push(currentInterval);
      lastMergedInterval = currentInterval;
    }
  }

  return mergedIntervals;
}

// Example Usage:
const example1 = [[1, 3], [8, 10], [15, 18], [2, 6]];
console.log('Example 1:');
console.log('Input:', example1);
console.log('Output:', merge(example1)); // Expected: [[1,6],[8,10],[15,18]]

const example2 = [[1, 4], [4, 5]];
console.log('\nExample 2:');
console.log('Input:', example2);
console.log('Output:', merge(example2)); // Expected: [[1,5]]
