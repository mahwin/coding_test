const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let input = [];
rl.on("line", function (line) {
  input.push(line);
}).on("close", function () {
  solution();
  process.exit();
});

//변수
let n;
let dayInfo = []; //[[날,임금]]
let result = -Infinity;

const solution = () => {
  n = Number(input[0]);

  // input 데이터 정보 [날,임금] 묶어서 Array에 저장
  for (let i = 1; i <= n; i++) {
    const [day, earn] = input[i].split(" ").map(Number);
    dayInfo.push([day, earn]);
  }

  dfs(0, 0); // 일을 끝낸 날짜, 이때까지 번 돈
  console.log(result);
};

const dfs = (currentDay, acc) => {
  result = Math.max(acc, result);
  for (let day = currentDay; day < n; day++) {
    const nextDay = day + dayInfo[day][0];
    if (nextDay <= n) dfs(nextDay, acc + dayInfo[day][1]);
  }
};
