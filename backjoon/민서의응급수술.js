const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", function (line) {
  input.push(line); // 입력받은 문자열, line
}).on("close", function () {
  console.log(solution(input)); // 문제 풀이 함수 호출
  process.exit(); // 프로세스 종료
});

const solution = (input) => {
  let cutCnt = 0;
  const [N, M] = input[0].split(" ").map((el) => Number(el));
  const linked = Array.from({ length: N + 1 }, (_, i) => i);

  const unionParent = (a, b, p) => {
    const aParent = getParent(a, p);
    const bParent = getParent(b, p);
    if (aParent === bParent) {
      cutCnt++;
      return;
    }
    if (aParent < bParent) p[bParent] = aParent;
    else p[aParent] = bParent;
  };

  function getParent(x, p) {
    if (x === p[x]) return x;
    return (p[x] = getParent(p[x], p));
  }

  for (let i = 1; i <= M; i++) {
    const [a, b] = input[i].split(" ").map(Number);
    unionParent(a, b, linked);
  }
  const set = new Set();
  for (let i = 1; i <= N; i++) {
    set.add(getParent(i, linked));
  }

  return set.size - 1 + cutCnt;
};
