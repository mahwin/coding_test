const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let input = [];
let n; // 전체 수
let works; // 전체 일의 인덱스
let target; // 전체 수의 반
let result = Infinity;
const selectSet = new Set(); // 계산 했던 일의 집합 저장해서 반복 줄이기.
let v = [];
const permutation = []; //2개씩 뽑는 순열 저장.
rl.on("line", (line) => {
  input.push(line);
});

rl.on("close", () => {
  for (let i = 1; i <= Number(input[0]); i++) {
    input[i] = input[i].split(" ").map(Number);
  }

  solution();
  process.exit();
});

const cal = (morning, afternoon) => {
  let morningScore = 0;
  let afternoonScore = 0;

  for (let i = 0; i < permutation.length; i++) {
    const [idx1, idx2] = permutation[i];
    morningScore += input[morning[idx1]][morning[idx2]];
    afternoonScore += input[afternoon[idx1]][afternoon[idx2]];
  }
  result = Math.min(result, Math.abs(morningScore - afternoonScore));
};

// 2개씩 뽑아주는 순열
const getPermutation = (arr) => {
  if (2 === arr.length) {
    permutation.push(arr);
    return;
  }
  for (let i = 0; i < target; i++) {
    if (v[i]) continue;
    v[i] = true;
    getPermutation([...arr, i]);
    v[i] = false;
  }
};

//아침 점심으로 일 나눠주기.
const dfs = (node, morning) => {
  if (target === morning.length) {
    let afternoon = works.filter((work) => !morning.includes(work));
    let afternoonKey = afternoon.join(","); // 배열로 값 비교하면 오래걸려서 join 해줌. 순서대로 moring에 집어넣기 때문에 sort 상관 x

    if (selectSet.has(afternoonKey)) return;
    selectSet.add(afternoonKey);
    selectSet.add(morning.join(","));
    cal(morning, afternoon);
    return;
  }

  for (let i = node; i < n; i++) {
    dfs(i + 1, [...morning, i]);
  }
};

const solution = () => {
  n = Number(input.shift());
  target = n / 2;
  works = Array.from({ length: n }, (_, i) => i);
  v = Array.from({ length: target }, () => false);

  getPermutation([]);

  dfs(0, []); // 확인할 일의 인덱스, 아침에 할 일.
  console.log(result);
};

// 수행시간 : 1684ms
