// Problem: Backspace String Compare
//
// Given two strings `s` and `t`, return `true` if they are equal when both are typed into empty text editors. A `#` character means a backspace.
//
// Example 1:
// Input: s = "ab#c", t = "ad#c"
// Output: true
// Explanation: Both s and t become "ac".
//
// Example 2:
// Input: s = "a##c", t = "#a#c"
// Output: true
// Explanation: Both s and t become "c".
//
// Example 3:
// Input: s = "a#c", t = "b"
// Output: false
// Explanation: s becomes "c" while t becomes "b".

// Time complexity: O(N + M)
// We iterate through both strings at most twice (once for the main pointer, once for the backspace skips), where N and M are the lengths of the strings.
//
// Space complexity: O(1)
// We only use a few variables to store pointers and counters, which is constant extra space.
function backspaceCompare(s: string, t: string): boolean {
  let sPointer: number = s.length - 1;
  let sBackspaceCounter: number = 0;
  let tPointer: number = t.length - 1;
  let tBackspaceCounter: number = 0;

  while (sPointer >= 0 || tPointer >= 0) {

    while (sPointer >= 0) {
      if (s[sPointer] === "#") {
        sBackspaceCounter++;
        sPointer--;
      } else if (sBackspaceCounter > 0) {
        sBackspaceCounter--;
        sPointer--;
      } else {
        break;
      }
    }

    while (tPointer >= 0) {
      if (t[tPointer] === "#") {
        tBackspaceCounter++;
        tPointer--;
      } else if (tBackspaceCounter > 0) {
        tBackspaceCounter--;
        tPointer--;
      } else {
        break;
      }
    }

    if (sPointer < 0 && tPointer < 0) {
      return true;
    }

    if (sPointer < 0 || tPointer < 0) {
      return false;
    }

    if (s[sPointer] !== t[tPointer]) {
      return false;
    }


    sPointer--;
    tPointer--;
  }

  return true;
}

const s1 = "ab#c";
const t1 = "ad#c";
const result1 = backspaceCompare(s1, t1);
console.log(`Input: s = "${s1}", t = "${t1}"`);
console.log(`Output: ${result1}`); // Expected output: true

const s2 = "a##c";
const t2 = "#a#c";
const result2 = backspaceCompare(s2, t2);
console.log(`Input: s = "${s2}", t = "${t2}"`);
console.log(`Output: ${result2}`); // Expected output: true

const s3 = "a#c";
const t3 = "b";
const result3 = backspaceCompare(s3, t3);
console.log(`Input: s = "${s3}", t = "${t3}"`);
console.log(`Output: ${result3}`); // Expected output: false
