// const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().trim();

let input = "-3 -3 2 0";

const absMax = (arr) => {
  let max = 0;
  arr.forEach((num) => {
    max = Math.max(max, Math.abs(num));
  });
  return max;
};

const printf = (snail) => {
  let max = 1;
  snail.forEach((el) => (max = Math.max(max, ...el)));

  max = max.toString().length;
  let result = "";

  snail.forEach((rowInfo) => {
    let rowResult = [];
    rowInfo.forEach((info) => {
      const string = info + "";
      if (string.length !== max) {
        rowResult.push(string.padStart(max, " "));
      } else rowResult.push(string);
    });
    result += rowResult.join(" ") + "\n";
  });

  console.log(result.trimEnd());
};

const solution = () => {
  input = input.split(" ").map(Number);
  const center = absMax(input); // 예를 들어 -3이면 -3 0 3 으로 확장해야하고 -3을 0으로 옮기면 0 3 6이됨
  const [sr, sc, er, ec] = input.map((el) => el);

  const rowLen = er - sr + 1;
  const colLen = ec - sc + 1;
  const len = center * 2 + 1;
  //달팽이 배열 그릴 때 홀수로 만들어 줘여함.

  const snail = Array.from({ length: rowLen }, () =>
    Array.from({ length: colLen }, () => 1)
  );

  const fillSnail = () => {
    let [r, c] = [0, 0];

    let l = 0;
    let num = 2;
    for (let i = 0; i < 2 * len - 1; i++) {
      switch (i % 4) {
        case 0: //right
          l++;
          for (let i = 0; i < l; i++) {
            c += 1;
            if (r >= sr && r <= er && c >= sc && c <= ec)
              snail[r - sr][c - sc] = num;

            num++;
          }
          break;
        case 1: // up
          for (let i = 0; i < l; i++) {
            r -= 1;
            if (r >= sr && r <= er && c >= sc && c <= ec)
              snail[r - sr][c - sc] = num;

            num++;
          }
          break;
        case 2: //
          l++;
          for (let i = 0; i < l; i++) {
            c -= 1;
            if (r >= sr && r <= er && c >= sc && c <= ec)
              snail[r - sr][c - sc] = num;
            num++;
          }
          break;
        case 3:
          for (let i = 0; i < l; i++) {
            r += 1;
            if (r >= sr && r <= er && c >= sc && c <= ec)
              snail[r - sr][c - sc] = num;
            num++;
          }
          break;
      }
    }
  };

  fillSnail(center);
  printf(snail);
};

solution();

// 전체 배열을 그리고 필요한 부분만 짤라서 프린트하니 메모리 초과가 뜸.
// 전체 달팽이 배열 크기가 5000*5000이라 ..
// 그래서 필요한 크기만큼의 배열을 만들고, 특정 조건을 만족하는 인덱스를 가진 값만 따로 배열에 모아두고 프린트함

// 메모리 10924KB
// 시간 508ms
