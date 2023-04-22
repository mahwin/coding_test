const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//공통 변수 선언
let input = [];
let n, m; // n은 도기의 크기 n X n, m은 선택할 병원
let hospitalArr = []; // 모든 병원의 위치 정보를 저장
let patientArr = []; // 모든 환자의 위치 정보를 저장
let selected = []; // 선택한 병원 인덱스 저장
let result = Infinity; // 폐쇄할 병원의 수

rl.on("line", (line) => {
  input.push(line.split(" ").map(Number));
});

rl.on("close", () => {
  simulation();
  process.exit();
});

const findTarget = (target, saveArr) => {
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (input[r][c] === target) {
        saveArr.push([r, c]);
      }
    }
  }
};

const calTotalDistance = () => {
  let total = 0;

  patientArr.forEach(([pr, pc]) => {
    let min = Infinity;
    selected.forEach((hosIdx) => {
      const [hr, hc] = hospitalArr[hosIdx];
      min = Math.min(Math.abs(pr - hr) + Math.abs(pc - hc), min);
    });
    total += min;
  });
  result = Math.min(total, result);
};

//dfs돌면서 병원 선택하고 조건에 충족하면 calTotalDistance로 환자의 최단 거리 합 구함.
const selectHospital = (node, cnt) => {
  if (cnt === m) {
    calTotalDistance();
  }

  if (node === hospitalArr.length) return;

  selectHospital(node + 1, cnt);
  //백트래킹.
  selected.push(node);
  selectHospital(node + 1, cnt + 1);
  selected.pop();
};

const simulation = () => {
  [n, m] = input.shift();
  findTarget(1, patientArr); // 환자 정보 저장
  findTarget(2, hospitalArr); // 병원 정보 저장

  selectHospital(0, 0);
  console.log(result);
};

// 수행시간 602ms
// 메모리 13MB
