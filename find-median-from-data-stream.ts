// Problem: Find Median from Data Stream
//
// The median is the middle value in an ordered integer list. If the size of the list is even, there is no single middle value, and the median is the average of the two middle values.
//
// Implement the `MedianFinder` class:
//
// *   `MedianFinder()` initializes the `MedianFinder` object.
// *   `void addNum(int num)` adds an integer `num` from the data stream to the data structure.
// *   `double findMedian()` returns the median of all elements so far. Answers within `10^-5` of the actual answer will be accepted.

// Time complexity:
// addNum: O(log N) - Heap insertion and extraction operations take logarithmic time with respect to the number of elements in the heap.
// findMedian: O(1) - Peeking at the top of the heaps and performing arithmetic are constant time operations.
//
// Space complexity: O(N)
// The two heaps store all N numbers added to the data stream.

class MinHeap {
  heap: number[];

  constructor() {
    this.heap = [];
  }

  size(): number {
    return this.heap.length;
  }

  peek(): number | undefined {
    if (this.heap.length === 0) {
      return undefined;
    }
    return this.heap[0];
  }

  insert(value: number): void {
    this.heap.push(value);
    this.bubbleUp();
  }

  extractMin(): number | undefined {
    if (this.heap.length === 0) {
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

  private bubbleUp(): void {
    let currentIndex = this.heap.length - 1;
    while (currentIndex > 0) {
      const parentIndex = Math.floor((currentIndex - 1) / 2);
      if (this.heap[currentIndex] < this.heap[parentIndex]) {
        [this.heap[currentIndex], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[currentIndex]];
        currentIndex = parentIndex;
      } else {
        break;
      }
    }
  }

  private bubbleDown(): void {
    let currentIndex = 0;
    const lastIndex = this.heap.length - 1;

    while (true) {
      let leftChildIndex = 2 * currentIndex + 1;
      let rightChildIndex = 2 * currentIndex + 2;
      let smallestChildIndex = currentIndex;

      if (leftChildIndex <= lastIndex && this.heap[leftChildIndex] < this.heap[smallestChildIndex]) {
        smallestChildIndex = leftChildIndex;
      }
      if (rightChildIndex <= lastIndex && this.heap[rightChildIndex] < this.heap[smallestChildIndex]) {
        smallestChildIndex = rightChildIndex;
      }

      if (smallestChildIndex !== currentIndex) {
        [this.heap[currentIndex], this.heap[smallestChildIndex]] = [this.heap[smallestChildIndex], this.heap[currentIndex]];
        currentIndex = smallestChildIndex;
      } else {
        break;
      }
    }
  }
}

class MaxHeap {
  heap: number[];

  constructor() {
    this.heap = [];
  }

  size(): number {
    return this.heap.length;
  }

  peek(): number | undefined {
    if (this.heap.length === 0) {
      return undefined;
    }
    return this.heap[0];
  }

  insert(value: number): void {
    this.heap.push(value);
    this.bubbleUp();
  }

  extractMax(): number | undefined {
    if (this.heap.length === 0) {
      return undefined;
    }
    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const max = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.bubbleDown();
    return max;
  }

  private bubbleUp(): void {
    let currentIndex = this.heap.length - 1;
    while (currentIndex > 0) {
      const parentIndex = Math.floor((currentIndex - 1) / 2);
      if (this.heap[currentIndex] > this.heap[parentIndex]) { // Changed for MaxHeap
        [this.heap[currentIndex], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[currentIndex]];
        currentIndex = parentIndex;
      } else {
        break;
      }
    }
  }

  private bubbleDown(): void {
    let currentIndex = 0;
    const lastIndex = this.heap.length - 1;

    while (true) {
      let leftChildIndex = 2 * currentIndex + 1;
      let rightChildIndex = 2 * currentIndex + 2;
      let largestChildIndex = currentIndex; // Changed for MaxHeap

      if (leftChildIndex <= lastIndex && this.heap[leftChildIndex] > this.heap[largestChildIndex]) { // Changed for MaxHeap
        largestChildIndex = leftChildIndex;
      }
      if (rightChildIndex <= lastIndex && this.heap[rightChildIndex] > this.heap[largestChildIndex]) { // Changed for MaxHeap
        largestChildIndex = rightChildIndex;
      }

      if (largestChildIndex !== currentIndex) {
        [this.heap[currentIndex], this.heap[largestChildIndex]] = [this.heap[largestChildIndex], this.heap[currentIndex]];
        currentIndex = largestChildIndex;
      } else {
        break;
      }
    }
  }
}

class MedianFinder {

  private readonly minHeap = new MinHeap();
  private readonly maxHeap = new MaxHeap();

  addNum(num: number): void {
    this.maxHeap.insert(num);
    this.minHeap.insert(this.maxHeap.extractMax()!);
    if (this.minHeap.size() > this.maxHeap.size() + 1) {
      this.maxHeap.insert(this.minHeap.extractMin()!);
    }
  }

  findMedian(): number {
    if (this.minHeap.size() > this.maxHeap.size()) {
      return this.minHeap.peek()!;
    } else if (this.maxHeap.size() > this.minHeap.size()) {
      return this.maxHeap.peek()!;
    } else {
      return (this.maxHeap.peek()! + this.minHeap.peek()!) / 2;
    }
  }
}

// Example Usage:
const mf = new MedianFinder();
mf.addNum(1);
mf.addNum(2);
console.log(`Median after adding 1, 2: ${mf.findMedian()}`); // Expected: 1.5
mf.addNum(3);
console.log(`Median after adding 1, 2, 3: ${mf.findMedian()}`); // Expected: 2.0

// Additional test cases
const mf2 = new MedianFinder();
mf2.addNum(-1);
mf2.addNum(-2);
console.log(`Median after adding -1, -2: ${mf2.findMedian()}`); // Expected: -1.5
mf2.addNum(-3);
console.log(`Median after adding -1, -2, -3: ${mf2.findMedian()}`); // Expected: -2.0
