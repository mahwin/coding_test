let input = `7 8
a#c#eF.1
.#.#.#..
.#B#D###
0....F.1
C#E#A###
.#.#.#..
d#f#bF.1`.split("\n");
// const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().split("\n");

const solution = (input) => {
  const [rowLen, colLen] = input.shift().split(" ").map(Number);
  input = input.map((el) => el.split(""));

  const findMinsic = () => {
    //민식이 0
    for (let r = 0; r < rowLen; r++) {
      for (let c = 0; c < colLen; c++) {
        if (input[r][c] == "0") {
          input[r][c] = ".";
          return [r, c];
        }
      }
    }
  };

  const isValid = (r, c) => {
    if (r < 0 || c < 0 || r >= rowLen || c >= colLen) return false;
    return true;
  };

  const haveKey = (key, accKey) => {
    return key & (1 << (accKey.charCodeAt() - "A".charCodeAt())) ? true : false;
  };

  const search = (row, col) => {
    const keys = ["a", "b", "c", "d", "e", "f"];
    const dirs = [
      [0, 1],
      [1, 0],
      [-1, 0],
      [0, -1],
    ];
    const v = Array.from({ length: 2 ** keys.length }, () =>
      // 중요한 점!! 열쇠 종류에 따라서 특정 열쇠를 갖고있을때 전에 간 적이 있다면 안 가는게 최선임!! 조합으로 구해야 하는데 대충 더 많이 구하자! rowLen,colLen 수가 적으니까.
      Array.from({ length: rowLen }, () =>
        Array.from({ length: colLen }, () => false)
      )
    );
    const queue = [[row, col, 0, 0]]; // row,col, 누적 키 값, 간 거리값
    while (queue.length) {
      const [r, c, accKey, cnt] = queue.shift();
      if (input[r][c] == "1") return cnt;
      for (const d of dirs) {
        const nr = r + d[0];
        const nc = c + d[1];

        if (isValid(nr, nc) && !v[accKey][nr][nc]) {
          const cur = input[nr][nc];
          if (cur == "1" || cur == ".") {
            v[accKey][nr][nc] = true;
            queue.push([nr, nc, accKey, cnt + 1]);
          } else if (keys.includes(cur)) {
            let tmpKey = accKey | (1 << (cur.charCodeAt() - "a".charCodeAt()));
            v[tmpKey][nr][nc] = true;
            queue.push([nr, nc, tmpKey, cnt + 1]);
          } else if (keys.includes(cur.toLowerCase())) {
            if (haveKey(accKey, cur)) {
              v[accKey][nr][nc] = true;
              queue.push([nr, nc, accKey, cnt + 1]);
            }
          }
        }
      }
    }
    return -1;
  };

  const pos = findMinsic();

  console.log(search(...pos));
};

solution(input);
