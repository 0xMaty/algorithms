// Problem: Kth Largest Element in a Stream
//
// Design a class to find the `kth` largest element in a stream. Note that it is the `kth` largest element in the sorted order, not the `kth` distinct element.
//
// Implement the `KthLargest` class:
// *   `KthLargest(int k, int[] nums)` initializes the object with the integer `k` and the stream of integers `nums`.
// *   `int add(int val)` adds a new integer `val` to the stream and returns the element representing the `kth` largest element in the stream.
//
// Example:
//
// Input:
// `["KthLargest", "add", "add", "add", "add", "add"]`
// `[[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]`
// Output:
// `[null, 4, 5, 5, 8, 8]`

// Time complexity:
// Constructor: O(N log k), where N is the length of `nums` and k is the size of the heap.
// Each `add` operation in the constructor takes O(log k) time.
// add(val) method: O(log k).
// Pushing an element to a heap of size k takes O(log k). Popping also takes O(log k).
//
// Space complexity: O(k)
// The MinHeap stores at most k elements.

// --- MinHeap Implementation (Basic) ---
// This is a basic MinHeap implementation. For a production-ready solution,
// you might want a more optimized or robust heap implementation.
class MinHeap {
  heap: number[];

  constructor() {
    this.heap = [];
  }

  push(val: number): void {
    this.heap.push(val);
    this.bubbleUp();
  }

  pop(): number | undefined {
    if (this.heap.length === 0) return undefined;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.sinkDown();
    return min;
  }

  peek(): number | undefined {
    return this.heap.length > 0 ? this.heap[0] : undefined;
  }

  size(): number {
    return this.heap.length;
  }

  private bubbleUp(): void {
    let index = this.heap.length - 1;
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[parentIndex] <= this.heap[index]) break;
      [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
      index = parentIndex;
    }
  }

  private sinkDown(): void {
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

// --- KthLargest Class Implementation ---
class KthLargest {
  k: number;
  minHeap: MinHeap;

  constructor(k: number, nums: number[]) {
    this.k = k;
    this.minHeap = new MinHeap();

    for (const num of nums) {
      this.add(num);
    }
  }

  add(val: number): number {
    this.minHeap.push(val);
    if (this.minHeap.size() > this.k) {
      this.minHeap.pop();
    }
    return this.minHeap.peek()!;
  }
}

// --- Test Cases ---
console.log("Test Case 1:");
const kthLargest1 = new KthLargest(3, [4, 5, 8, 2]);
console.log(kthLargest1.add(3));   // Expected: 4
console.log(kthLargest1.add(5));   // Expected: 5
console.log(kthLargest1.add(10));  // Expected: 5
console.log(kthLargest1.add(9));   // Expected: 8
console.log(kthLargest1.add(4));   // Expected: 8

console.log("\nTest Case 2:");
const kthLargest2 = new KthLargest(1, []);
console.log(kthLargest2.add(-3)); // Expected: -3
console.log(kthLargest2.add(-2)); // Expected: -2
console.log(kthLargest2.add(-4)); // Expected: -2
console.log(kthLargest2.add(0));  // Expected: 0
console.log(kthLargest2.add(4));  // Expected: 4
