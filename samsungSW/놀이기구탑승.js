const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
let n; // n X n  격자의 크기.
let student; // 학생들 위치
const studentObj = {}; // 학생 번호가 key 좋아하는 학생들이 value;
rl.on("line", (line) => {
  input.push(line.trim());
});

rl.on("close", () => {
  solution();
  process.exit();
});

const isValid = (r, c) => {
  if (r < 0 || c < 0 || r >= n || c >= n) return false;
  return true;
};

const dirs = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
];
const cntLikeAndBlank = (num, r, c) => {
  let cntArr = [0, 0];
  for (const d of dirs) {
    const nr = r + d[0];
    const nc = c + d[1];
    if (isValid(nr, nc)) {
      if (!student[nr][nc]) cntArr[1]++;
      else if (studentObj[num].includes(student[nr][nc])) cntArr[0]++;
    }
  }
  return cntArr;
};

const seatStudent = (num) => {
  let possible = []; // 사방에 좋아하는 학생 수,blank 수, r ,c

  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (!student[r][c]) {
        possible.push([...cntLikeAndBlank(num, r, c), r, c]);
      }
    }
  }
  possible.sort((a, b) => {
    if (a[0] === b[0]) {
      if (a[1] === b[1]) {
        if (a[2] === b[2]) {
          return a[3] - b[3];
        } else return a[2] - b[2];
      } else return b[1] - a[1];
    } else return b[0] - a[0];
  });
  const [seatR, seatC] = possible[0].slice(2);
  student[seatR][seatC] = num;
};

const calculator = () => {
  let result = 0;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      const target = studentObj[student[r][c]];
      let satisfied = 0;
      for (const d of dirs) {
        const nr = r + d[0];
        const nc = c + d[1];

        if (isValid(nr, nc) && target.includes(student[nr][nc])) satisfied++;
      }
      if (satisfied) result += 10 ** (satisfied - 1);
    }
  }
  return result;
};

const solution = () => {
  n = Number(input[0]);
  student = Array.from({ length: n }, () =>
    Array.from({ length: n }, () => null)
  );

  for (let i = 1; i <= n ** 2; i++) {
    const [num, ...likes] = input[i].split(" ");
    studentObj[num] = likes;
    seatStudent(num);
  }
  console.log(calculator());
};

//수행 시간 476ms
//메모리 14MB
