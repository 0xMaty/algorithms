// Problem: Permutation in String
//
// Given two strings `s1` and `s2`, return `true` if `s2` contains a permutation of `s1`, or `false` otherwise.
//
// In other words, return `true` if one of `s1`'s permutations is the substring of `s2`.

// Time complexity: O(L1 + L2)
// We iterate through s1 once to build the frequency map (O(L1)) and then slide a window across s2 (O(L2)). The work inside the sliding window loop is O(1) because the map size is constant (max 26).
//
// Space complexity: O(1)
// The space used by the frequency maps is constant (at most 26 keys) regardless of the input string lengths.
function checkInclusion(s1: string, s2: string): boolean {
  if (s1.length > s2.length) return false;
  const s1Freq: Map<string, number> = createFrequencyMap(s1);
  const windowFreq: Map<string, number> = new Map<string, number>();
  let left: number = 0;
  let right = s1.length;
  for (let i = left; i < right; i++) {
    addToFrequencyMap(windowFreq, s2[i]);
  }
  for (let right = s1.length; right < s2.length; right++) {
    if (areMapsEqual(s1Freq, windowFreq)) {
      return true;
    }
    addToFrequencyMap(windowFreq, s2[right]);
    subtractFrequency(windowFreq, s2[right - s1.length]);
  }

  return areMapsEqual(s1Freq, windowFreq);
};

function areMapsEqual(map1: Map<string, number>, map2: Map<string, number>): boolean {
  if (map1.size !== map2.size) {
    return false;
  }

  for (const [key, value] of map1) {
    if (!map2.has(key) || map2.get(key) !== value) {
      return false;
    }
  }

  return true;
}

function addToFrequencyMap(frequencyMap: Map<string, number>, character: string) {
  const frequency = frequencyMap.get(character);
  if (frequency === undefined) {
    frequencyMap.set(character, 1);
  } else {
    frequencyMap.set(character, frequency + 1);
  }
}

function subtractFrequency(frequencyMap: Map<string, number>, character: string) {
  const updatedFrequency: number = frequencyMap.get(character)! - 1;
  if (updatedFrequency === 0) {
    frequencyMap.delete(character);
  } else {
    frequencyMap.set(character, updatedFrequency);
  }
}

function createFrequencyMap(s: string): Map<string, number> {
  const frequencyMap: Map<string, number> = new Map();
  for (let i = 0; i < s.length; i++) {
    const frequency = frequencyMap.get(s[i]);
    if (frequency === undefined) {
      frequencyMap.set(s[i], 1);
    } else {
      frequencyMap.set(s[i], frequency + 1);
    }
  }
  return frequencyMap;
}

const s1_1 = "ab", s2_1 = "eidbaooo";
const result1 = checkInclusion(s1_1, s2_1);
console.log(`Input: s1 = "${s1_1}", s2 = "${s2_1}"`);
console.log(`Output: ${result1}`); // Expected output: true

const s1_2 = "ab", s2_2 = "eidboaoo";
const result2 = checkInclusion(s1_2, s2_2);
console.log(`Input: s1 = "${s1_2}", s2 = "${s2_2}"`);
console.log(`Output: ${result2}`); // Expected output: false

const s1_3 = "adc", s2_3 = "dcda";
const result3 = checkInclusion(s1_3, s2_3);
console.log(`Input: s1 = "${s1_3}", s2 = "${s2_3}"`);
console.log(`Output: ${result3}`); // Expected output: true
