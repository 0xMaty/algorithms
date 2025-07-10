/**
 * Problem: Implement Queue using Stacks
 *
 * Implement a MyQueue class that supports all the normal operations of a queue
 * (push, peek, pop, and empty) using only two stacks.
 *
 * The MyQueue class should have the following methods:
 *
 * - `void push(int x)`: Pushes element x to the back of the queue.
 * - `int pop()`: Removes the element from the front of the queue and returns it.
 * - `int peek()`: Returns the element at the front of the queue without removing it.
 * - `boolean empty()`: Returns `true` if the queue is empty, `false` otherwise.
 *
 * Notes:
 * - You must use only standard operations of a stack, which means only `push to top`,
 *   `peek/pop from top`, `size`, and `is empty` operations are valid.
 * - Depending on your language, the stack may not be supported natively. You may simulate
 *   a stack using a list or deque (double-ended queue) where only `push` and `pop`
 *   operations are available.
 */

/**
 * Overall Time Complexity:
 * - push: O(1) amortized
 * - pop: O(1) amortized
 * - peek: O(1) amortized
 * - empty: O(1)
 *
 * Overall Space Complexity: O(N), where N is the number of elements in the queue.
 */
class MyQueue {
  private inStack: number[];
  private outStack: number[];

  constructor() {
    this.inStack = [];
    this.outStack = [];
  }

  /**
   * Pushes element x to the back of the queue.
   * @param x The element to push.
   * @timeComplexity O(1) amortized - Each element is pushed onto inStack once.
   */
  push(x: number): void {
    this.inStack.push(x);
  }

  /**
   * Removes the element from the front of the queue and returns it.
   * @returns The element at the front of the queue.
   * @timeComplexity O(1) amortized - Each element is moved from inStack to outStack once.
   */
  pop(): number {
    if (this.outStack.length === 0) {
      while (this.inStack.length > 0) {
        this.outStack.push(this.inStack.pop()!);
      }
    }
    const lastElement = this.outStack.pop();
    if (lastElement === undefined) {
      throw new Error("queue is empty");
    } else {
      return lastElement;
    }
  }

  /**
   * Returns the element at the front of the queue without removing it.
   * @returns The element at the front of the queue.
   * @timeComplexity O(1) amortized - Similar to pop, elements are moved only when outStack is empty.
   */
  peek(): number {
    if (this.outStack.length === 0) {
      while (this.inStack.length > 0) {
        this.outStack.push(this.inStack.pop()!);
      }
    }
    const lastElement = this.outStack[this.outStack.length - 1];
    if (lastElement === undefined) {
      throw new Error("queue is empty");
    } else {
      return lastElement;
    }
  }

  /**
   * Returns true if the queue is empty, false otherwise.
   * @returns True if the queue is empty, false otherwise.
   * @timeComplexity O(1)
   */
  empty(): boolean {
    return this.outStack.length === 0 && this.inStack.length === 0;
  }
}

// Example Usage:
const queue = new MyQueue();
console.log('Is queue empty initially?', queue.empty()); // Expected: true

queue.push(1);
queue.push(2);
console.log('After pushing 1 and 2:');
console.log('Peek:', queue.peek()); // Expected: 1
console.log('Pop:', queue.pop());   // Expected: 1
console.log('Is queue empty?', queue.empty()); // Expected: false

queue.push(3);
console.log('After pushing 3:');
console.log('Peek:', queue.peek()); // Expected: 2
console.log('Pop:', queue.pop());   // Expected: 2
console.log('Pop:', queue.pop());   // Expected: 3
console.log('Is queue empty?', queue.empty()); // Expected: true
