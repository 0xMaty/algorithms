/**
 * Problem: Longest Substring Without Repeating Characters
 *
 * Given a string s, find the length of the longest substring without repeating characters.
 *
 * Examples:
 *
 * 1. Input: s = "abcabcbb"
 *    Output: 3
 *    Explanation: The answer is "abc", with the length of 3.
 *
 * 2. Input: s = "bbbbb"
 *    Output: 1
 *    Explanation: The answer is "b", with the length of 1.
 *
 * 3. Input: s = "pwwkew"
 *    Output: 3
 *    Explanation: The answer is "wke", with the length of 3. Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
 */

/**
 * @param s The input string.
 * @returns The length of the longest substring without repeating characters.
 *
 * @timeComplexity O(n) - The two pointers (left and right) iterate through the string at most once. Set operations (add, delete, has) take O(1) average time.
 * @spaceComplexity O(1) - The space used by the Set is at most the size of the character set (e.g., 256 for ASCII), which is a constant.
 */
function lengthOfLongestSubstring(s: string): number {

  const seenCharacters = new Set();
  let left: number = 0;
  let right: number = 0;
  let maxLength: number = 0;

  while (right < s.length) {

    while (seenCharacters.has(s[right])) {
      seenCharacters.delete(s[left]);
      left++;
    }

    seenCharacters.add(s[right]);
    maxLength = Math.max(maxLength, right - left + 1);

    right++;
  }

  return maxLength;
}

// Example Usage:
const example1 = "abcabcbb";
console.log('Example 1:');
console.log('Input:', example1);
console.log('Output:', lengthOfLongestSubstring(example1)); // Expected: 3

const example2 = "bbbbb";
console.log('\nExample 2:');
console.log('Input:', example2);
console.log('Output:', lengthOfLongestSubstring(example2)); // Expected: 1

const example3 = "pwwkew";
console.log('\nExample 3:');
console.log('Input:', example3);
console.log('Output:', lengthOfLongestSubstring(example3)); // Expected: 3

const example4 = "";
console.log('\nExample 4:');
console.log('Input:', example4);
console.log('Output:', lengthOfLongestSubstring(example4)); // Expected: 0

const example5 = " ";
console.log('\nExample 5:');
console.log('Input:', example5);
console.log('Output:', lengthOfLongestSubstring(example5)); // Expected: 1

const example6 = "au";
console.log('\nExample 6:');
console.log('Input:', example6);
console.log('Output:', lengthOfLongestSubstring(example6)); // Expected: 2

