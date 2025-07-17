// Problem: Longest Repeating Character Replacement
//
// You are given a string `s` and an integer `k`. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most `k` times.
//
// Return *the length of the longest substring containing the same letter you can get after performing the above operations.*
//
// Example 1:
// Input: s = "ABAB", k = 2
// Output: 4
// Explanation: Replace the two 'A's with two 'B's or vice versa to get "BBBB" or "AAAA".
//
// Example 2:
// Input: s = "AABABBA", k = 1
// Output: 4
// Explanation: Replace the 'A' in the middle with a 'B' to form "AABBBBA". The substring "BBBB" has the longest repeating letters, which is 4.

// Time complexity: O(N)
// The algorithm iterates through the string with the `right` pointer once. The `left` pointer also moves forward, ensuring each character is processed a constant number of times.
//
// Space complexity: O(1)
// The `charFrequency` map stores at most 26 key-value pairs (for the English alphabet), which is a constant amount of space. The other variables use constant space as well.
function characterReplacement(s: string, k: number): number {
  let left: number = 0;
  let right: number = 0;
  let charFrequency: Record<string, number> = {};
  let maxLength: number = 0;
  let maxRepeatCharCount: number = 0;
  while (right < s.length) {
    let rightChar = s[right];
    if (charFrequency[rightChar] === undefined) {
      charFrequency[rightChar] = 1;
    } else {
      charFrequency[rightChar]++;
    }
    maxRepeatCharCount = Math.max(maxRepeatCharCount, charFrequency[rightChar]);

    let replacementsNeeded = (right - left + 1) - maxRepeatCharCount;
    if (replacementsNeeded > k) {
      const leftChar = s[left];
      charFrequency[leftChar]--;
      left++;
    }

    maxLength = Math.max(maxLength, right - left + 1);
    right++;
  }
  return maxLength;
}

const s1 = "ABAB";
const k1 = 2;
const result1 = characterReplacement(s1, k1);
console.log(`Input: s = "${s1}", k = ${k1}`);
console.log(`Output: ${result1}`); // Expected output: 4

const s2 = "AABABBA";
const k2 = 1;
const result2 = characterReplacement(s2, k2);
console.log(`Input: s = "${s2}", k = ${k2}`);
console.log(`Output: ${result2}`); // Expected output: 4
