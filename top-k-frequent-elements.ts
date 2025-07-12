/*
Problem: Top K Frequent Elements

Given an integer array `nums` and an integer `k`, return the `k` most frequent elements. You may return the answer in any order.
*/


class MinHeap {
  private heap: [number, number][] = [];

  push(val: [number, number]): void {
    this.heap.push(val);
    this.bubbleUp();
  }

  pop(): [number, number] | undefined {
    if (this.heap.length === 0) {
      return undefined;
    }
    if (this.heap.length === 1) {
      return this.heap.pop();
    }
    const min = this.heap[0];
    const lastElement = this.heap.pop()!;
    this.heap[0] = lastElement;
    this.bubbleDown();
    return min;
  }

  peek(): [number, number] | undefined {
    return this.heap.length > 0 ? this.heap[0] : undefined;
  }

  size(): number {
    return this.heap.length;
  }

  private bubbleUp(): void {
    let index = this.heap.length - 1;
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[parentIndex][1] > this.heap[index][1]) {
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

    while (true) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let leftChild, rightChild;
      let swap = null;

      // Compare with left child
      if (leftChildIndex < length) {
        leftChild = this.heap[leftChildIndex];
        if (leftChild[1] < this.heap[index][1]) {
          swap = leftChildIndex;
        }
      }

      // Compare with right child
      if (rightChildIndex < length) {
        rightChild = this.heap[rightChildIndex];
        if (
          (swap === null && rightChild[1] < this.heap[index][1]) ||
          (swap !== null && rightChild[1] < leftChild![1])
        ) {
          swap = rightChildIndex;
        }
      }

      if (swap === null) {
        break;
      }

      [this.heap[index], this.heap[swap]] = [this.heap[swap], this.heap[index]];
      index = swap;
    }
  }
}

/**
 * Time Complexity: O(N + U log k) where N is the number of elements in `nums`, U is the number of unique elements, and k is the target number of frequent elements.
 *   - Frequency counting: O(N) to iterate through `nums`.
 *   - Populating heap: O(U log k) as there are U unique elements, and each heap operation takes O(log k).
 *   - Extracting results: O(k log k) to pop k elements from the heap.
 *   The dominant factor is O(N + U log k), which simplifies to O(N log k) in the worst case (when U is close to N).
 * Space Complexity: O(N) where N is the number of elements in `nums`.
 *   - `elementsCount` map: O(N) in the worst case (if all elements are unique).
 *   - `MinHeap`: O(k) to store k elements.
 *   - `result` array: O(k) to store k elements.
 *   The dominant factor is O(N) from the `elementsCount` map.
 */
function topKFrequent(nums: number[], k: number): number[] {
  const heap: MinHeap = new MinHeap();
  const elementsCount: Map<number, number> = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (elementsCount.has(nums[i])) {
      const currentValue = elementsCount.get(nums[i])!;
      elementsCount.set(nums[i], currentValue + 1);
    } else {
      elementsCount.set(nums[i], 1);
    }
  }
  for (const [element, frequency] of elementsCount) {
    heap.push([element, frequency]);
    if (heap.size() > k) {
      heap.pop();
    }
  }
  const result: number[] = [];
  while (heap.size() > 0) {
    const popped = heap.pop();
    if (popped) {
      result.push(popped[0]);
    }
  }
  return result;
}

// Test Cases

// Test Case 1: Basic example
const nums1 = [1, 1, 1, 2, 2, 3], k1 = 2;
console.log(`Input: nums = ${JSON.stringify(nums1)}, k = ${k1}`);
console.log(`Output: ${JSON.stringify(topKFrequent(nums1, k1))}`); // Expected: [1,2] (order may vary)

// Test Case 2: Single element
const nums2 = [1], k2 = 1;
console.log(`Input: nums = ${JSON.stringify(nums2)}, k = ${k2}`);
console.log(`Output: ${JSON.stringify(topKFrequent(nums2, k2))}`); // Expected: [1]

// Test Case 3: All elements same frequency
const nums3 = [1, 2, 3, 4, 5], k3 = 3;
console.log(`Input: nums = ${JSON.stringify(nums3)}, k = ${k3}`);
console.log(`Output: ${JSON.stringify(topKFrequent(nums3, k3))}`); // Expected: [1,2,3] (order may vary)

// Test Case 4: Larger example with varying frequencies
const nums4 = [4, 1, -1, 2, -1, 2, 3], k4 = 2;
console.log(`Input: nums = ${JSON.stringify(nums4)}, k = ${k4}`);
console.log(`Output: ${JSON.stringify(topKFrequent(nums4, k4))}`); // Expected: [-1,2] (order may vary)
