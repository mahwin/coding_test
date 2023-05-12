const timeToMin = (time) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

function solution(book_time) {
  book_time = book_time.map(([start, end]) => [
    timeToMin(start),
    timeToMin(end) + 10,
  ]);
  book_time = book_time.sort((a, b) => {
    if (a[0] === b[0]) return a[1] - b[1];
    else return a[0] - b[0];
  });

  let max = -1; // 결과 저장

  let book = []; // 현재 시간에 투숙중인 정보 저장
  let bp = 0; //book pointer
  const lastTime = timeToMin("24:00");
  for (let time = 0; time < lastTime; time++) {
    while (bp < book_time.length && book_time[bp][0] <= time) {
      book.push(book_time[bp]);
      bp++;
    }

    book = book.filter(([s, e]) => e > time);

    max = Math.max(book.length, max);
  }

  return max;
}
// 누적합 풀이
const solution2 = (book_time) => {
  const book = Array.from({ length: timeToMin("24:10") }, () => 0);
  book_time.forEach((info, i) => {
    const [start, out] = info;
    timeToMin(start);
    const end = timeToMin(out) + 9;
    for (start; start <= end; start++) {
      book[start]++;
    }
  });
  return Max.max(...book);
};

solution([
  ["15:00", "17:00"],
  ["16:40", "18:20"],
  ["14:20", "15:20"],
  ["14:10", "19:20"],
  ["18:20", "21:20"],
]);
