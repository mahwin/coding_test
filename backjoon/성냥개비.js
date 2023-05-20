let input = `4
3
6
7
15`.split("\n");

// 최댓값의 경우 자릿수가 커지기만 하면 무조건 큰 수가됨 그래서 2개로 1을 만드는 과정을 최대한 많이 반복한다.
const findMax = (num) => {
  // 논리가 짝수면 다 1로 채우기
  // 홀수면 3빼고 앞에7 붙이고 나머지 1로 채우기
  if (num % 2 === 0) {
    return "1".repeat(num / 2);
  } else {
    return "7" + "1".repeat((num - 3) / 2);
  }
};

// 성냥 개비 수  :    만들어지는 수
// 2 : 1
// 3 : 7
// 4 : 4
// 5 : 2,3,5    2 선택
// 6 : 0,6,9    0 선택 (제일 앞일 경우 6)
// 7 : 8

const checkZero = (stringNum) => {
  stringNum = stringNum.split("");
  for (let i = 1; i < stringNum.length; i++) {
    stringNum[i] === "6" ? (stringNum[i] = "0") : null;
  }
  return Number(stringNum.join(""));
};

const fillDp = () => {
  const dp = Array.from({ length: 101 }, () => 0);
  dp[2] = "1";
  dp[3] = "7";
  dp[4] = "4";
  dp[5] = "2";
  dp[6] = "6";
  dp[7] = "8";
  dp[8] = "10"; // min (dp[2]+dp[6],dp[3]+dp[5], dp[6]+d[2], dp[5]+dp[3]);
  dp[9] = "18"; // dp

  for (let i = 10; i < 101; i++) {
    let min = Infinity;
    for (let j = 2; j < 8; j++) {
      min = Math.min(checkZero(dp[i - j] + dp[j]), min);
    }
    dp[i] = min + "";
  }
  return dp;
};

const solution = () => {
  let result = ``;
  const n = +input[0];

  // minDp[100]
  const minDp = fillDp();

  for (let i = 1; i <= n; i++) {
    const num = Number(input[i]);
    result += `${minDp[num]} ${findMax(num)}` + "\n";
  }
  console.log(result.trim());
};

solution();
