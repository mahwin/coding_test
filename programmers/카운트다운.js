function solution1(target) {
  const dp = Array.from({ length: 100_004 }, () => [Infinity, Infinity]);
  // dp[n][0] = 던진 횟수
  // dp[n][1] = single  + bull

  const findBestPlay = (num) => {
    let min = Infinity;
    let max = -Infinity;
    let index = 0;
    let mid = (num / 2) >> 0;
    let cnt, sum;

    for (let i = 1; i <= mid; i++) {
      cnt = dp[num - i][0] + dp[i][0];
      sum = dp[num - i][1] + dp[i][1];

      if (cnt < min) {
        min = cnt;
        max = sum;
        index = i;
      } else if (cnt === min) {
        if (sum > max) {
          max = sum;
          index = i;
        }
      }
    }

    return [min, max];
  };

  for (let i = 1; i <= 60; i++) {
    if (i <= 20) {
      dp[i] = [1, 1];
    } else if ((i % 2 === 0 && i / 2 <= 20) || (i % 3 === 0 && i / 3 <= 20)) {
      dp[i] = [1, 0];
    }
  }

  dp[50] = [1, 1];

  for (let i = 21; i <= target; i++) {
    if (dp[i][0] === Infinity) {
      if (i > 301) {
        let a = ((i / 60) >> 0) - 5;
        let b = i - 60 * a;

        let [min, max] = findBestPlay(b);

        dp[i] = [min + a, max];
      } else {
        let [min, max] = findBestPlay(i);
        dp[i] = [min, max];
      }
    }
  }

  return dp[target];
}

// 21
// 1 20
// 2 19
// ...
// 10 11

function solution(target) {
  // target 최대는 100,000이며 곱하기 3한 값만큼 배열을 생성
  // 배열 길이는 300,000
  // [던질 다트 수, "싱글" 또는 "불"을 맞춘 횟수(합)] 으로 배열 초기화
  const dp = new Array(300000).fill(null).map((_) => [Infinity, 0]);

  // 과녁은 1~20이므로 target 배열 초기화
  const targetList = new Array(20).fill(null).map((_, idx) => idx + 1);

  // dp 처음 0으로 초기화
  dp[0][0] = 0;

  for (let i = 0; i < target; i++) {
    const check = (addIdx, count) => {
      if (dp[i + addIdx][0] >= dp[i][0] + 1) {
        if (dp[i + addIdx][0] === dp[i][0] + 1) {
          dp[i + addIdx][1] = Math.max(dp[i + addIdx][1], dp[i][1] + count);
        } else {
          dp[i + addIdx] = [dp[i][0] + 1, dp[i][1] + count];
        }
      }
    };
    for (let j of targetList) {
      // 순서대로 싱글, 더블, 트리플
      [
        [1, 1],
        [2, 0],
        [3, 0],
      ].forEach(([v, c]) => {
        check(j * v, c);
      });
    }
    // 불 일때
    check(50, 1);
  }
  return dp[target];
}

console.log(solution1(182));
// let num = 1;
// while (true) {
//   num++;
//   if (solution(num).join("") !== solution1(num).join("")) {
//     console.log(num);
//     console.log(solution(num));
//     console.log(solution1(num));
//     break;
//   }
// }

// 182 =>
// 120   [2,0]
// 62 => [1,1]
//        [1,1]

// 122
