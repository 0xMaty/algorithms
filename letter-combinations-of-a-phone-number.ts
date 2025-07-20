// Problem: Letter Combinations of a Phone Number
//
// Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent.
// A mapping of digits to letters (just like on a telephone keypad) is provided.

// Example:
// Input: digits = "23"
// Output: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"]

// Time complexity: O(M^N * N)
// N is the length of the digits string. M is the maximum number of letters a digit maps to (M=4 for '7' and '9').
// We generate M^N combinations, and each combination takes O(N) to build (due to string concatenation).
//
// Space complexity: O(M^N * N)
// The space is dominated by the storage of the result array, which can hold M^N strings, each of length N.
// The recursion stack depth is O(N).
function letterCombinations(digits: string): string[] {
  const result: string[] = [];
  if (digits.length === 0) {
    return result;
  }

  const digitMap: { [key: string]: string } = {
    '2': 'abc',
    '3': 'def',
    '4': 'ghi',
    '5': 'jkl',
    '6': 'mno',
    '7': 'pqrs',
    '8': 'tuv',
    '9': 'wxyz',
  };

  function backtrack(index: number, currentCombination: string) {
    if (currentCombination.length === digits.length) {
      result.push(currentCombination);
      return;
    }
    const digit = digits[index];
    const letters = digitMap[digit];
    for (let i = 0; i < letters.length; i++) {
      const letter = letters[i];
      backtrack(index + 1, currentCombination + letter);
    }
  }

  backtrack(0, "");

  return result;
}

// Example 1:
const digits1 = "23";
const result1 = letterCombinations(digits1);
console.log(`Input: digits = "${digits1}"`);
console.log(`Output: [${result1}]`); // Expected output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]

// Example 2:
const digits2 = "";
const result2 = letterCombinations(digits2);
console.log(`Input: digits = "${digits2}"`);
console.log(`Output: [${result2}]`); // Expected output: []

// Example 3:
const digits3 = "7";
const result3 = letterCombinations(digits3);
console.log(`Input: digits = "${digits3}"`);
console.log(`Output: [${result3}]`); // Expected output: ["p","q","r","s"]
