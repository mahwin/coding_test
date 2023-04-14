const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//변수 정의
let input = [];
let operators = []; //연산자수
let min = Infinity;
let max = -Infinity;
let n;

rl.on("line", (line) => {
  input.push(line);
});

rl.on("close", () => {
  solution();
  process.exit();
});

const solution = () => {
  n = Number(input[0]);
  operators = input[2].split(" ").map(Number);
  input = input[1].split(" ").map(Number);

  dfs(input[0], 1); // 계산 값, 다음 노드의 인덱스.

  console.log(min, max);
};

dfs = (acc, cnt) => {
  if (n === cnt) {
    min = Math.min(min, acc);
    max = Math.max(max, acc);
    return;
  }

  //덧셈 연산자가 남아 있으면 수행
  if (operators[0] > 0) {
    operators[0]--;
    dfs(acc + input[cnt], cnt + 1);
    operators[0]++;
  }

  //뺄셈 연산자가 남아 있으면 수행
  if (operators[1] > 0) {
    operators[1]--;
    dfs(acc - input[cnt], cnt + 1);
    operators[1]++;
  }
  //곱 연산자가 남아 있으면 수행
  if (operators[2] > 0) {
    operators[2]--;
    dfs(acc * input[cnt], cnt + 1);
    operators[2]++;
  }
};

// 수행 시간 412ms
// 메모리 10MB
