// Problem: Longest Word in Dictionary Through Deleting
//
// Given a string S and a set of words D, find the longest word in D that is a subsequence of S.
//
// Word W is a subsequence of S if some number of characters, possibly zero, can be deleted from S to form W, without reordering the remaining characters.
//
// Example: S = "abppplee", D = {"able", "ale", "apple", "bale", "kangaroo"}. Expected output: "apple"

/**
 * Checks if word is a subsequence of s.
 * Time complexity: O(N), where N is the length of string s. (Two pointers iterate through s at most once).
 * Space complexity: O(1). (Uses a constant number of variables).
 * @param s The main string.
 * @param word The word to check if it's a subsequence.
 * @returns True if word is a subsequence of s, false otherwise.
 */
function isSubsequence(s: string, word: string): boolean {
  let sIndex = 0;
  let wIndex = 0;
  while (sIndex < s.length && wIndex < word.length) {
    if (s[sIndex] === word[wIndex]) {
      sIndex++;
      wIndex++;
    } else {
      sIndex++;
    }
  }
  return wIndex === word.length;
}

/**
 * Finds the longest word in dictionary D that is a subsequence of string S.
 * If multiple words have the same longest length, returns the lexicographically smallest one.
 * Time complexity: O(K log K * M + K * N).
 *   - Sorting D: O(K log K * M) due to K words, each comparison taking up to M time.
 *   - Iterating and checking: O(K * N) as each of K words is checked against S (length N).
 * Space complexity: O(1) auxiliary space. (Sorting is in-place, and no new data structures are created proportional to input size).
 * @param s The main string.
 * @param d The dictionary of words.
 * @returns The longest word from D that is a subsequence of S.
 */
function findLongestWord(s: string, d: string[]): string {
  d.sort((a, b) => {
    if (a.length > b.length) {
      return -1;
    } else if (a.length < b.length) {
      return 1;
    } else {
      if (a > b) {
        return 1;
      } else if (a < b) {
        return -1;
      } else {
        return 0;
      }
    }
  });
  for (let i = 0; i < d.length; i++) {
    const word = d[i];
    if (!isSubsequence(s, word)) {
      continue;
    }
    return word;
  }
  return "";
}

const s1 = "abppplee";
const d1 = ["able", "ale", "apple", "bale", "kangaroo"];
const result1 = findLongestWord(s1, d1);
console.log(`Input S: "${s1}", D: [${d1.map(w => `"${w}"`).join(", ")}]`);
console.log(`Output: "${result1}"`); // Expected: "apple"

