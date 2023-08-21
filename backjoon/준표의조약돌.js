let input = `7 2 4
WBBBBBW`.split("\n");

const solution = () => {
  const [N, B, W] = input[0].split(" ").map(Number);
  let left = 0;
  let result = 0;
  let [black, white] = [0, 0];
  for (let i = 0; i < N; i++) {
    const color = input[1][i];
    color === "W" ? white++ : black++;
    if (black <= B) {
      if (white >= W) result = Math.max(i - left + 1, result);
    } else {
      input[1][left] === "W" ? white-- : black--;
      left++;
    }
  }
  return result;
};

console.log(solution());
