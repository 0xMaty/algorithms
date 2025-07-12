// Problem: Kth Largest Element in an Array
//
// Given an integer array `nums` and an integer `k`, return the `k`th largest element in the array.
//
// Note that it is the `k`th largest element in the sorted order, not the `k`th distinct element.

// A basic MinHeap implementation for this problem.
// In a real interview, you might be expected to implement this or use a library.
class MinHeap {
  private heap: number[] = [];

  push(val: number): void {
    this.heap.push(val);
    this.bubbleUp();
  }

  pop(): number | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    if (this.heap.length === 1) {
      return this.heap.pop();
    }
    const min = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.bubbleDown();
    return min;
  }

  peek(): number | undefined {
    return this.heap.length > 0 ? this.heap[0] : undefined;
  }

  size(): number {
    return this.heap.length;
  }

  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  private bubbleUp(): void {
    let index = this.heap.length - 1;
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[parentIndex] > this.heap[index]) {
        [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  private bubbleDown(): void {
    let index = 0;
    const length = this.heap.length;
    const element = this.heap[0];

    while (true) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIndex < length) {
        leftChild = this.heap[leftChildIndex];
        if (leftChild < element) {
          swap = leftChildIndex;
        }
      }

      if (rightChildIndex < length) {
        rightChild = this.heap[rightChildIndex];
        if (
          (swap === null && rightChild < element) ||
          (swap !== null && rightChild < leftChild!)
        ) {
          swap = rightChildIndex;
        }
      }

      if (swap === null) break;
      [this.heap[index], this.heap[swap]] = [this.heap[swap], this.heap[index]];
      index = swap;
    }
  }
}

// Time complexity: O(N log k)
// We iterate through N elements, and for each, perform heap operations (push/pop) which take O(log k) time.
//
// Space complexity: O(k)
// The min-heap stores at most k elements.
function findKthLargest(nums: number[], k: number): number {
  const heap = new MinHeap();
  for (let i = 0; i < nums.length; i++) {
    heap.push(nums[i]);
    if (heap.size() > k) {
      heap.pop();
    }
  }
  return heap.peek();
}

// Test cases
// Example 1:
// Input: nums = [3,2,1,5,6,4], k = 2
// Output: 5
const nums1 = [3, 2, 1, 5, 6, 4];
const k1 = 2;
console.log(`Input: nums = [${nums1}], k = ${k1}`);
console.log(`Output: ${findKthLargest(nums1, k1)}`); // Expected: 5

// Example 2:
// Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
// Output: 4
const nums2 = [3, 2, 3, 1, 2, 4, 5, 5, 6];
const k2 = 4;
console.log(`Input: nums = [${nums2}], k = ${k2}`);
console.log(`Output: ${findKthLargest(nums2, k2)}`); // Expected: 4

// Example 3:
// Input: nums = [1], k = 1
// Output: 1
const nums3 = [1];
const k3 = 1;
console.log(`Input: nums = [${nums3}], k = ${k3}`);
console.log(`Output: ${findKthLargest(nums3, k3)}`); // Expected: 1
