// 음식이 나오면 전에 나온 음식 버리기
// 단 음식 양수, 짠 음식 음수
// 연속으로 계속 먹음
// 단맛과 짠맛의 벨런스를 맞춰야 하며

let inputs = [
  `6
5 -5 6 0 2 -8`,
  `5
-5 3 0 -3 10`,
];

let result = [4, 2];

const solution = (input) => {
  input = input.split("\n");

  const n = +input[0];
  const foods = input[1].split(" ").map(Number);
  const sumArr = [0]; //누적합 배열

  let result = 0;

  for (let i = 0; i < n; i++) {
    sumArr.push(sumArr.at(-1) + foods[i]);
  }

  const cnt = Array.from({ length: 10 }, () => 0);

  for (let i = 0; i <= n; i++) {
    const curSum = sumArr[i];
    result += cnt[curSum];
    cnt[curSum]++;
  }
  return result;
};

//  5 -5  6  0  2 -8
//  5  0  6  6  8  0

console.log(solution(inputs[0]));
