// 위상정렬 선행 조건들을 만족시키면서 수행 순서를 정함!!
// 진입 차수가 높다는 것은 그만큼 작은 학생이란 얘기
// 진입 차수가 0인 값들의 학생들을 순회한다
// 0인 학생이 여러명 일 수 있지만, 만족하는 아무 순서나 리턴해도 된다고해서 정확한 순서는 상관없음.
// 방문할 때 마다 학생의 진입 차수를 -1 해주는데 만약 0이라면 stack에 넣고 pop해서 result에 저장한다.

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];

rl.on("line", (line) => {
  input.push(line.split(" ").map(Number));
}).on("close", () => {
  solution();
});

const dfs = (n, graph, degreeArr) => {
  const result = [];
  const stack = [];

  for (let i = 1; i <= n; i++) {
    if (!degreeArr[i]) stack.push(i);
  }
  while (stack.length) {
    const node = stack.pop();
    result.push(node);
    graph[node].forEach((next) => {
      degreeArr[next]--;
      if (!degreeArr[next]) stack.push(next);
    });
  }
  console.log(result.join(" "));
};

const solution = () => {
  const [n, m] = input[0]; // n은 노드 수, m은 간선 수
  const graph = {};

  //진입 차수 저장
  const degreeArr = Array.from({ length: n + 1 }, () => 0);
  for (let i = 1; i <= n; i++) {
    graph[i] = [];
  }

  for (let i = 1; i <= m; i++) {
    const [from, to] = input[i];
    graph[from].push(to); // 간선 저장
    degreeArr[to] += 1; // 진입 차수 증가
  }
  return dfs(n, graph, degreeArr);
};
