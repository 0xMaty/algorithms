class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val: number, next: ListNode | null) {
    this.val = val;
    this.next = next;
  }
}

// time complexity - O(n)
// space complexity - O(1)
function reverseList(head: ListNode | null): ListNode | null {
  let tempNext: ListNode | null = null;
  let previous: ListNode | null = null;
  while (head !== null) {
    tempNext = head.next;
    head.next = previous;
    previous = head;
    head = tempNext;
  }
  return previous;
}

// time complexity - O(n)
// space complexity - O(n)
function reverseListRecursively(head: ListNode | null): ListNode | null {

  if (head === null || head.next === null) {
    return head;
  }

  const reversedSubListHead = reverseListRecursively(head.next);

  head.next.next = head;
  head.next = null;

  return reversedSubListHead;
}

// Iterative solution runs in O(n) time and O(1) space making it more efficient and suitable for large lists.
// Therefore iterative solution is generally preffered in production environment.
function main() {

  // construct list
  const tail = new ListNode(3, null);
  const middle = new ListNode(2, tail);
  const head = new ListNode(1, middle);

  const reversedHead = reverseList(head);
  console.debug(`Reversed List\n${JSON.stringify(reversedHead)}`);

  const recursivelyReversedHead = reverseListRecursively(reversedHead);
  console.debug(`\nRecursively Reversed List\n${JSON.stringify(recursivelyReversedHead)}`);
}

main();
