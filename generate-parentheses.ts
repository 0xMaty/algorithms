// Problem: Generate Parentheses
//
// Given n pairs of parentheses, write a function to generate all combinations of well-formed (i.e., balanced) parentheses.

// Time complexity: O(n * 4^n / (n * sqrt(n))) or O(n * 4^n)
// The number of valid parenthesis combinations is the nth Catalan number, which is approximately 4^n / (n * sqrt(n)).
// Each combination has a length of 2n. String concatenation takes O(n) time.
//
// Space complexity: O(n * 4^n / (n * sqrt(n))) or O(4^n)
// The space complexity is dominated by the storage of all generated combinations.
// The recursion call stack depth is O(n), but the output size is much larger.

function generateParenthesis(n: number): string[] {
  const combinations: string[] = [];

  function findCombinations(current: string, openCount: number, closeCount: number) {
    if (current.length === 2 * n) {
      combinations.push(current);
      return;
    }
    if (openCount < n) {
      findCombinations(current + "(", openCount + 1, closeCount);
    }
    if (closeCount < openCount) {
      findCombinations(current + ")", openCount, closeCount + 1);
    }
  }

  findCombinations("", 0, 0);

  return combinations;
}

// Example Usage:
const n1 = 3;
const result1 = generateParenthesis(n1);
console.log(`Input: n = ${n1}`);
console.log(`Output: ${JSON.stringify(result1)}`); // Expected output: ["((()))","(()())","(())()","()(())","()()()"]

const n2 = 1;
const result2 = generateParenthesis(n2);
console.log(`Input: n = ${n2}`);
console.log(`Output: ${JSON.stringify(result2)}`); // Expected output: ["()"]
