// 거리  === 0  : 가중치 1
// 거리  === 1  : 가중치 2
// 1 < 거리 < 2 : 가중치 3
// 거리  === 2  : 가중치 4
// 3 > 거리 > 2 : 가중치 5
// 4 > 거리 > 3 : 가중치 6
// 거리  > 4    : 가중치 7

const phone = {
  1: [0, 0],
  2: [0, 1],
  3: [0, 2],
  4: [1, 0],
  5: [1, 1],
  6: [1, 2],
  7: [2, 0],
  8: [2, 1],
  9: [2, 2],
  0: [3, 1],
};

const cal = (p1, p2) => {
  const [x1, y1] = phone[p1];
  const [x2, y2] = phone[p2];
  const dist = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);

  if (dist === 1) return 2;
  else if (dist < 2) return 3;
  else if (dist === 2) return 4;
  else if (dist < 2.5) return 5;
  else if (dist <= 3) return 6;
  else return 7;
};

function solution(numbers) {
  let len = numbers.length;
  const dp = Array.from({ length: len + 1 }, () => []);
  dp[0] = [[4, 6, 0]]; // 왼, 오, 가중치 누적;
  for (let i = 0; i < len; i++) {
    dp[i].forEach(([l, r, cnt]) => {
      const num = +numbers[i];
      if (l == num || r == num) {
        dp[i + 1].push([l, r, cnt + 1]);
      } else {
        dp[i + 1].push([num, r, cnt + cal(l, num)]);
        dp[i + 1].push([l, num, cnt + cal(r, num)]);
      }
    });
  }
  resultArr = dp[len].map((el) => el[2]);
  return Math.min(...resultArr);
}
