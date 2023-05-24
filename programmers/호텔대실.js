const timeToMin = (time) => {
  const [H, M] = time.split(":").map(Number);
  return H * 60 + M;
};

function solution(book_time) {
  // 퇴실하고 10분 뒤에야 방이 준비됨!
  // 시작 시간을 기준으로 정렬하고 하나씩 예약 정보를 보면서
  // 나가는 시간 + 10분한 값을 stack에 넣고 다음 손님의 시작 시간보다
  // 전 손님이 나가고 호텔이 준비하는 시간이 이르다면 stack에서 빼자
  // stack.length => 예약 방의 수

  // '10:20' => 620
  book_time = book_time.map((el) => [timeToMin(el[0]), timeToMin(el[1])]);

  book_time.sort((a, b) => a[0] - b[0]);
  let stack = [];

  let max = 1;

  book_time.forEach(([s, e]) => {
    stack = stack.filter((cleanTime) => cleanTime > s);
    stack.push(e + 10);
    max = Math.max(stack.length, max);
  });
  return max;
}

function solution1(book_time) {
  book_time = book_time.map((el) => [timeToMin(el[0]), timeToMin(el[1])]);

  const end = Math.max(...book_time.map((el) => el[1]));
  const sumArr = new Array(end + 11).fill(0);

  for (let [s, e] of book_time) {
    sumArr[s]++;
    sumArr[e + 10]--;
  }

  let pre = 0;
  let max = 1;
  sumArr.forEach((num) => {
    pre += num;
    max = Math.max(pre, max);
  });

  return max;
}
