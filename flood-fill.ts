// Problem: Flood Fill
//
// An image is represented by an `m x n` integer grid `image` where `image[i][j]` represents the pixel value of the image.
//
// You are also given three integers `sr`, `sc`, and `color`. `sr` is the row of the starting pixel, `sc` is the column of the starting pixel, and `color` is the new color to which we should flood fill the image.
//
// To perform a flood fill, consider the starting pixel, plus any pixels connected 4-directionally to the starting pixel of the same color as the starting pixel, plus any pixels connected 4-directionally to those pixels (also with the same color as the starting pixel), and so on. Replace the color of all the aforementioned pixels with `color`.
//
// Return the modified image.

// Time complexity: O(M * N)
// In the worst case, every pixel in the M x N image will be visited once.
//
// Space complexity: O(M * N)
// In the worst case, the recursion stack depth can go up to M * N (e.g., for a completely connected image of the same color).
function floodFill(image: number[][], sr: number, sc: number, color: number): number[][] {
  if (image.length === 0) return image;
  const m = image.length;
  const n = image[0].length;
  const startColor: number = image[sr][sc];
  const directions: number[][] = [
    [-1, 0],
    [0, -1],
    [1, 0],
    [0, 1]
  ];

  function changeColor(row: number, col: number) {
    if (row < 0 || row >= m) return;
    if (col < 0 || col >= n) return;
    if (image[row][col] === color) return;
    if (image[row][col] !== startColor) return;
    image[row][col] = color;
    for (let i = 0; i < directions.length; i++) {
      const direction = directions[i];
      changeColor(row + direction[0], col + direction[1]);
    }
  }

  changeColor(sr, sc);

  return image;
};

const image1 = [[1, 1, 1], [1, 1, 0], [1, 0, 1]], sr1 = 1, sc1 = 1, color1 = 2;
const result1 = floodFill(image1, sr1, sc1, color1);
console.log(`Input: image = [${image1.map(row => `[${row}]`)}], sr = ${sr1}, sc = ${sc1}, color = ${color1}`);
console.log(`Output: [${result1.map(row => `[${row}]`)}]`); // Expected: [[2,2,2],[2,2,0],[2,0,1]]

const image2 = [[0, 0, 0], [0, 0, 0]], sr2 = 0, sc2 = 0, color2 = 0;
const result2 = floodFill(image2, sr2, sc2, color2);
console.log(`Input: image = [${image2.map(row => `[${row}]`)}], sr = ${sr2}, sc = ${sc2}, color = ${color2}`);
console.log(`Output: [${result2.map(row => `[${row}]`)}]`); // Expected: [[0,0,0],[0,0,0]]
