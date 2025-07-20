// Problem: Find All Anagrams in a String
//
// Given a string s and a non-empty string p, find all the start indices of p's anagrams in s.
// Strings consist of lowercase English letters only.
//
// Example 1:
// Input: s = "cbaebabacd", p = "abc"
// Output: [0, 6]
//
// Example 2:
// Input: s = "abab", p = "ab"
// Output: [0, 1, 2]

// Time complexity: O(s)
// The algorithm iterates through the string 's' once. The initialization takes O(p) and the sliding window takes O(s-p), resulting in a total of O(s).
//
// Space complexity: O(1)
// The space used is for the frequency map arrays, which are of a fixed size (26), not dependent on the input string lengths. This does not include the space for the result array.
function findAnagrams(s: string, p: string): number[] {
  if (p.length > s.length) return [];
  const result: number[] = [];
  const pFrequency: number[] = Array(26).fill(0);
  const wFrequency: number[] = Array(26).fill(0);
  for (let i = 0; i < p.length; i++) {
    const pChar = p[i];
    pFrequency[pChar.charCodeAt(0) - 'a'.charCodeAt(0)]++;
    const wChar = s[i];
    wFrequency[wChar.charCodeAt(0) - 'a'.charCodeAt(0)]++;
  }
  if (compareFrequencies(wFrequency, pFrequency)) {
    result.push(0);
  }

  for (let i = p.length; i < s.length; i++) {
    const newChar: string = s[i];
    wFrequency[newChar.charCodeAt(0) - 'a'.charCodeAt(0)]++;
    const oldChar: string = s[i - p.length];
    wFrequency[oldChar.charCodeAt(0) - 'a'.charCodeAt(0)]--;
    if (compareFrequencies(wFrequency, pFrequency)) {
      result.push(i - p.length + 1);
    }
  }

  return result;
}

function compareFrequencies(f1: number[], f2: number[]): boolean {
  if (f1.length !== f2.length) {
    throw new Error("number of elements in frequency arrays has to be equal");
  }
  for (let i = 0; i < 26; i++) {
    if (f1[i] !== f2[i]) {
      return false;
    }
  }
  return true;
}

const s1 = "cbaebabacd";
const p1 = "abc";
const result1 = findAnagrams(s1, p1);
console.log(`Input: s = "${s1}", p = "${p1}"`);
console.log(`Output: [${result1}]`); // Expected output: [0, 6]

const s2 = "abab";
const p2 = "ab";
const result2 = findAnagrams(s2, p2);
console.log(`Input: s = "${s2}", p = "${p2}"`);
console.log(`Output: [${result2}]`); // Expected output: [0, 1, 2]
