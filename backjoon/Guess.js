let input = `2
+++`.split("\n");

let nums = []; // 선택한 수 나열 저장
let n, target; // 선택할 수의 갯수, 정답 부호 2차원 배열로 저장,
let answer; // 정답 저장.
let pickNumbers = [];
let flag = false;
let numbers = Array.from({ length: 21 }, (_, i) => i - 10);

const check = (len) => {
  let result = true;
  let tmp = 0;
  for (let r = len; r >= 0; r--) {
    tmp += pickNumbers[r];

    const val = tmp > 0 ? "+" : tmp < 0 ? "-" : "0";
    if (target[r][len] === val) continue;
    else {
      result = false;
      break;
    }
  }
  return result;
};

const dfs = (len) => {
  if (len === n) {
    flag = true;
    answer = pickNumbers.join(" ");
    return;
  }

  for (let i = 0; i < 21; i++) {
    if (flag) return;
    pickNumbers[len] = numbers[i];

    if (check(len)) dfs(len + 1);
  }
  return;
};

const solution = () => {
  n = Number(input[0]);

  //인풋값 2차원 배열로 저장.
  let tmp = input[1].split("");
  target = Array.from({ length: n }, () =>
    Array.from({ length: n }, () => undefined)
  );

  for (let r = 0; r < n; r++) {
    for (let c = r; c < n; c++) {
      target[r][c] = tmp.shift();
    }
  }

  dfs(0);
  console.log(answer);
};

solution();

// -- 뽑는다고 해서 중복 허용 안 한다고 생각함.
