/*
Problem: Longest Substring with At Most K Distinct Characters

Given a string s and an integer k, return the length of the longest substring of s that contains at most k distinct characters.

Example 1:
Input: s = "eceba", k = 2
Output: 3
Explanation: The substring "ece" has 3 characters with at most 2 distinct characters (e and c).

Example 2:
Input: s = "aa", k = 1
Output: 2
Explanation: The substring "aa" has 2 characters with at most 1 distinct character (a).

Example 3:
Input: s = "abaccc", k = 2
Output: 4
Explanation: The substring "accc" has 4 characters with at most 2 distinct characters (a and c).
*/

// Time complexity: O(n)
// The right pointer iterates through the string once. The left pointer also iterates through the string at most once.
// Map operations (get, set, has) take average O(1) time.
//
// Space complexity: O(k)
// The map stores at most k distinct characters at any given time.
function lengthOfLongestSubstringKDistinct(s: string, k: number): number {
  let left: number = 0;
  let right: number = 0;
  let charCount: Map<string, number> = new Map();
  let maxLength: number = 0;
  let distinctCharacterCount = 0;
  while (right < s.length) {
    if (charCount.has(s[right])) {
      const currentValue = charCount.get(s[right])!;
      charCount.set(s[right], currentValue + 1);
    } else {
      charCount.set(s[right], 1);
      distinctCharacterCount += 1;
    }
    while (distinctCharacterCount > k) {
      if (charCount.has(s[left])) {
        const currentValue = charCount.get(s[left])!;
        charCount.set(s[left], currentValue - 1);
        if (charCount.get(s[left]) === 0) {
          distinctCharacterCount -= 1;
        }
        left++;
      }
    }
    maxLength = Math.max(maxLength, right - left + 1);
    right++;
  }
  return maxLength;
}

// Test Cases

// Test Case 1
const s1 = "eceba";
const k1 = 2;
const result1 = lengthOfLongestSubstringKDistinct(s1, k1);
console.log(`Input: s = "${s1}", k = ${k1}`);
console.log(`Output: ${result1}`); // Expected output: 3

// Test Case 2
const s2 = "aa";
const k2 = 1;
const result2 = lengthOfLongestSubstringKDistinct(s2, k2);
console.log(`Input: s = "${s2}", k = ${k2}`);
console.log(`Output: ${result2}`); // Expected output: 2

// Test Case 3
const s3 = "abaccc";
const k3 = 2;
const result3 = lengthOfLongestSubstringKDistinct(s3, k3);
console.log(`Input: s = "${s3}", k = ${k3}`);
console.log(`Output: ${result3}`); // Expected output: 4

// Test Case 4
const s4 = "world";
const k4 = 5;
const result4 = lengthOfLongestSubstringKDistinct(s4, k4);
console.log(`Input: s = "${s4}", k = ${k4}`);
console.log(`Output: ${result4}`); // Expected output: 5

// Test Case 5
const s5 = "abcabcabc";
const k5 = 3;
const result5 = lengthOfLongestSubstringKDistinct(s5, k5);
console.log(`Input: s = "${s5}", k = ${k5}`);
console.log(`Output: ${result5}`); // Expected output: 9

// Test Case 6
const s6 = "cbbebi";
const k6 = 3;
const result6 = lengthOfLongestSubstringKDistinct(s6, k6);
console.log(`Input: s = "${s6}", k = ${k6}`);
console.log(`Output: ${result6}`); // Expected output: 5

// Test Case 7 (Edge case: k = 0)
const s7 = "abc";
const k7 = 0;
const result7 = lengthOfLongestSubstringKDistinct(s7, k7);
console.log(`Input: s = "${s7}", k = ${k7}`);
console.log(`Output: ${result7}`); // Expected output: 0

// Test Case 8 (Edge case: empty string)
const s8 = "";
const k8 = 1;
const result8 = lengthOfLongestSubstringKDistinct(s8, k8);
console.log(`Input: s = "${s8}", k = ${k8}`);
console.log(`Output: ${result8}`); // Expected output: 0
