let inputs = [
  `5 3 11
2 5 3 8 1`,
  `4 2 3 
1 1 2 2`,
  `4 2 2 
1 2 3 2`,
];
let answers = [6, 5, 0];

const parser = (info) => info.split(" ").map(Number);

const solution = (input) => {
  input = input.split("\n");
  const [n, k, t] = parser(input[0]);
  const weights = parser(input[1]);
  const v = Array.from({ length: n }, () => false);

  let result = 0;
  const dfs = (node, cnt, acc) => {
    if (cnt >= k) {
      result++;
    }
    for (let i = node; i < n; i++) {
      if (!v[i] && acc + weights[i] <= t) {
        v[i] = true;
        dfs(i + 1, cnt + 1, acc + weights[i]);
        v[i] = false;
      }
    }
  };

  dfs(0, 0, 0);
  return result;
};

for (let i = 0; i < 3; i++) {
  const myAnswers = solution(inputs[i]);
  console.log(myAnswers, answers[i]);
}
