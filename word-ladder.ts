// Problem: Word Ladder
//
// A transformation sequence from `wordA` to `wordB` using a dictionary `wordList` is a sequence of words `wordA -> s1 -> s2 -> ... -> sk -> wordB` such that:
//
// 1. Every adjacent pair of words differs by a single letter.
// 2. Every `si` for `1 <= i <= k` is in `wordList`. Note that `wordA` does not need to be in `wordList`.
// 3. `wordB` is in `wordList`.
//
// Given two words, `beginWord` and `endWord`, and a dictionary `wordList`, return *the number of words in the shortest transformation sequence* from `beginWord` to `endWord`, or `0` if no such sequence exists.

// Time complexity: O(N * L)
// N is the number of words in wordList, L is the length of each word.
// Pre-processing (createPatternsMap): O(N * L) to iterate through all words and generate patterns.
// BFS Traversal: Each word is processed once. For each word, we generate L patterns (O(L)) and iterate through its neighbors. In the worst case, the total number of edges explored is proportional to N * L.
//
// Space complexity: O(N * L)
// patternsMap: Stores N * L patterns in the worst case.
// queue: Can store up to N words in the worst case.
// visitedWords: Can store up to N words in the worst case.
// Since each word has length L, the space for storing words is N * L.
function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {
  if (wordList.length === 0) return 0;
  if (!wordList.includes(endWord)) return 0;

  const patternsMap: Map<string, string[]> = createPatternsMap(wordList);
  const queue: Item[] = [{ word: beginWord, level: 1 }];
  const visitedWords: Set<string> = new Set([beginWord]);

  while (queue.length > 0) {
    const item = queue.shift()!;
    if (item!.word === endWord) {
      return item.level;
    }
    const patterns = createPatterns(item!.word);
    for (let i = 0; i < patterns.length; i++) {
      const pattern: string = patterns[i];
      if (patternsMap.has(pattern)) {
        const nextWords: string[] = patternsMap.get(pattern)!;
        for (let j = 0; j < nextWords.length; j++) {
          const nextWord: string = nextWords[j];
          if (!visitedWords.has(nextWord)) {
            visitedWords.add(nextWord);
            queue.push({ word: nextWord, level: item.level + 1 });
          }
        }
      }
    }
  }

  return 0;
};

type Item = {
  word: string;
  level: number;
}

function createPatterns(word: string): string[] {
  const patterns: string[] = [];
  for (let i = 0; i < word.length; i++) {
    const pattern = word.substring(0, i) + "*" + word.substring(i + 1);
    patterns.push(pattern);
  }
  return patterns;
}

function createPatternsMap(wordList: string[]): Map<string, string[]> {
  const patterns: Map<string, string[]> = new Map();
  for (let i = 0; i < wordList.length; i++) {
    const word = wordList[i];
    for (let j = 0; j < word.length; j++) {
      const pattern = word.substring(0, j) + "*" + word.substring(j + 1);
      if (!patterns.has(pattern)) {
        patterns.set(pattern, []);
      }
      patterns.get(pattern)!.push(word);
    }
  }
  return patterns;
}

const beginWord1 = "hit", endWord1 = "cog", wordList1 = ["hot", "dot", "dog", "lot", "log", "cog"];
const result1 = ladderLength(beginWord1, endWord1, wordList1);
console.log(`Input: beginWord = "${beginWord1}", endWord = "${endWord1}", wordList = [${wordList1.map(w => `"${w}"`)}]`);
console.log(`Output: ${result1}`); // Expected output: 5

const beginWord2 = "hit", endWord2 = "cog", wordList2 = ["hot", "dot", "dog", "lot", "log"];
const result2 = ladderLength(beginWord2, endWord2, wordList2);
console.log(`Input: beginWord = "${beginWord2}", endWord = "${endWord2}", wordList = [${wordList2.map(w => `"${w}"`)}]`);
console.log(`Output: ${result2}`); // Expected output: 0
