const timeToMin = (time) => {
  const [H, M] = time.split(":").map(Number);
  return H * 60 + M;
};

function solution(book_time) {
  book_time = book_time.map(([inTime, outTime]) => [
    timeToMin(inTime),
    timeToMin(outTime),
  ]);

  book_time.sort((a, b) => a[0] - b[0]);

  let needRoom = Array.from({ length: 24 * 60 }, () => 0);
  for (const [inTime, outTime] of book_time) {
    needRoom[inTime] += 1;
    needRoom[outTime + 10] -= 1;
  }
  //누적합
  let max = 0;
  for (let min = 0; min < 24 * 60; min++) {
    needRoom[min + 1] += needRoom[min];
    if (needRoom[min + 1] > max) max = needRoom[min + 1];
  }

  return max;
}

console.log(
  solution([
    ["15:00", "17:00"],
    ["16:40", "18:20"],
    ["14:20", "15:20"],
    ["14:10", "19:20"],
    ["18:20", "21:20"],
  ])
);
