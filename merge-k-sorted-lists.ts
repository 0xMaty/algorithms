/**
 * Problem: Merge k Sorted Lists
 * 
 * You are given an array of k linked-lists lists, each sorted in ascending order.
 * Merge all the linked-lists into one sorted linked-list and return it.
 * 
 * Link: https://leetcode.com/problems/merge-k-sorted-lists/
 */

// Time Complexity: O(N log k)
// N is the total number of nodes across all lists. k is the number of lists.
// Initial heap population: O(k log k).
// Main loop: Each of N nodes is extracted (O(log k)) and potentially its next node is inserted (O(log k)).
//
// Space Complexity: O(k)
// The min-heap stores at most k elements (one from each list).

// Definition for singly-linked list.
class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}

// Basic Min-Heap implementation for ListNodes
class MinHeap {
  heap: ListNode[] = [];

  getParentIndex(i: number): number { return Math.floor((i - 1) / 2); }
  getLeftChildIndex(i: number): number { return 2 * i + 1; }
  getRightChildIndex(i: number): number { return 2 * i + 2; }

  hasParent(i: number): boolean { return this.getParentIndex(i) >= 0; }
  hasLeftChild(i: number): boolean { return this.getLeftChildIndex(i) < this.heap.length; }
  hasRightChild(i: number): boolean { return this.getRightChildIndex(i) < this.heap.length; }

  getParent(i: number): ListNode { return this.heap[this.getParentIndex(i)]; }
  getLeftChild(i: number): ListNode { return this.heap[this.getLeftChildIndex(i)]; }
  getRightChild(i: number): ListNode { return this.heap[this.getRightChildIndex(i)]; }

  swap(i: number, j: number): void {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  peek(): ListNode | null {
    if (this.heap.length === 0) return null;
    return this.heap[0];
  }

  insert(item: ListNode): void {
    this.heap.push(item);
    this.heapifyUp();
  }

  extractMin(): ListNode | null {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop()!;

    const item = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.heapifyDown();
    return item;
  }

  heapifyUp(): void {
    let index = this.heap.length - 1;
    while (this.hasParent(index) && this.getParent(index).val > this.heap[index].val) {
      this.swap(this.getParentIndex(index), index);
      index = this.getParentIndex(index);
    }
  }

  heapifyDown(): void {
    let index = 0;
    while (this.hasLeftChild(index)) {
      let smallerChildIndex = this.getLeftChildIndex(index);
      if (this.hasRightChild(index) && this.getRightChild(index).val < this.getLeftChild(index).val) {
        smallerChildIndex = this.getRightChildIndex(index);
      }

      if (this.heap[index].val < this.heap[smallerChildIndex].val) {
        break;
      } else {
        this.swap(index, smallerChildIndex);
      }
      index = smallerChildIndex;
    }
  }

  isEmpty(): boolean {
    return this.heap.length === 0;
  }
}

const mergeKLists = (lists: Array<ListNode | null>): ListNode | null => {
  const heap: MinHeap = new MinHeap();

  for (let i = 0; i < lists.length; i++) {
    const node = lists[i];
    if (node === null) {
      continue;
    }
    heap.insert(node);
  }

  const dummyHead: ListNode = new ListNode(0);
  let current: ListNode = dummyHead;
  while (!heap.isEmpty()) {
    const minNode: ListNode | null = heap.extractMin();

    current.next = minNode;
    current = minNode!;

    if (minNode!.next !== null) {
      heap.insert(minNode!.next);
    }

  }

  return dummyHead.next;
};

// Helper function to convert array to ListNode
function arrayToLinkedList(arr: number[]): ListNode | null {
  if (arr.length === 0) return null;
  const head = new ListNode(arr[0]);
  let current = head;
  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
  }
  return head;
}

// Helper function to convert ListNode to array for easy comparison
function linkedListToArray(node: ListNode | null): number[] {
  const arr: number[] = [];
  let current = node;
  while (current) {
    arr.push(current.val);
    current = current.next;
  }
  return arr;
}

// Test cases
const lists1 = [
  arrayToLinkedList([1, 4, 5]),
  arrayToLinkedList([1, 3, 4]),
  arrayToLinkedList([2, 6])
];
const result1 = mergeKLists(lists1);
console.log(`Input: ${JSON.stringify(lists1.map(linkedListToArray))}`);
console.log(`Output: ${JSON.stringify(linkedListToArray(result1))}`); // Expected: [1,1,2,3,4,4,5,6]
console.log('---');

const lists2: Array<ListNode | null> = [];
const result2 = mergeKLists(lists2);
console.log(`Input: ${JSON.stringify(lists2.map(linkedListToArray))}`);
console.log(`Output: ${JSON.stringify(linkedListToArray(result2))}`); // Expected: []
console.log('---');

const lists3 = [
  arrayToLinkedList([])
];
const result3 = mergeKLists(lists3);
console.log(`Input: ${JSON.stringify(lists3.map(linkedListToArray))}`);
console.log(`Output: ${JSON.stringify(linkedListToArray(result3))}`); // Expected: []
console.log('---');

const lists4 = [
  arrayToLinkedList([1]),
  arrayToLinkedList([])
];
const result4 = mergeKLists(lists4);
console.log(`Input: ${JSON.stringify(lists4.map(linkedListToArray))}`);
console.log(`Output: ${JSON.stringify(linkedListToArray(result4))}`); // Expected: [1]
console.log('---');
