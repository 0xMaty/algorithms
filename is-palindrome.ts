/**
 * A phrase is a palindrome if, after converting all uppercase letters into
 * lowercase letters and removing all non-alphanumeric characters, it reads the
 * same forward and backward. Alphanumeric characters include letters and numbers.
 *
 * Given a string s, return true if it is a palindrome, or false otherwise.
 *
 * @param s The input string.
 * @returns True if the string is a palindrome, false otherwise.
 *
 * @timeComplexity O(n) - The two pointers traverse the string at most once.
 * Each character is visited a constant number of times.
 *
 * @spaceComplexity O(1) - Only a constant amount of extra space is used for pointers and variables.
 */
function isPalindrome(s: string): boolean {

  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    const leftCharacter = s[left];
    const rightCharacter = s[right];
    if (!isAlphanumeric(leftCharacter)) {
      left++;
      continue;
    }
    if (!isAlphanumeric(rightCharacter)) {
      right--;
      continue;
    }
    if (leftCharacter.toLowerCase() !== rightCharacter.toLowerCase()) {
      return false;
    }
    left++;
    right--;
  }

  return true;
}

function isAlphanumeric(char: string): boolean {
  return /^[a-zA-Z0-9]$/.test(char);
}

// Example Usage:
const example1 = "A man, a plan, a canal: Panama";
console.log('Example 1:');
console.log('Input:', example1);
console.log('Output:', isPalindrome(example1)); // Expected: true

const example2 = "race a car";
console.log('\nExample 2:');
console.log('Input:', example2);
console.log('Output:', isPalindrome(example2)); // Expected: false

const example3 = " ";
console.log('\nExample 3:');
console.log('Input:', example3);
console.log('Output:', isPalindrome(example3)); // Expected: true

