let input = `9 12
0 0 0 0 0 0 0 0 0 0 0 1
0 1 1 1 1 0 0 1 1 1 1 0
0 0 0 0 0 0 0 1 1 1 1 0
0 1 1 1 1 0 0 1 1 1 1 0
0 0 0 0 0 0 0 0 0 0 0 0
0 1 1 1 1 0 0 1 1 1 1 0
0 1 1 1 1 0 0 0 0 0 0 0
0 1 1 1 1 0 0 1 1 1 1 0
1 0 0 0 0 0 0 0 0 0 0 0
1 1 3
9 12 3`.split("\n");

const solution = () => {
  const [rowLen, colLen] = input.shift().split(" ").map(Number);
  const v = Array.from({ length: rowLen }, () =>
    Array.from({ length: colLen }, () => Array.from({ length: 5 }, () => false))
  );

  input = input.map((el) => el.split(" ").map(Number));
  let [tr, tc, td] = input.pop();
  const [sr, sc, sd] = input.pop();
  if (tr === sr && tc === sc && td === sd) return 0;
  tr -= 1;
  tc -= 1;

  const isValid = (r, c) => {
    if (r < 0 || c < 0 || r >= rowLen || c >= colLen) return false;
    return true;
  };

  const turnLeftIdx = (i) => {
    // 동 => 북 => 서 => 남 => 둥
    // 1 => 4  => 2 => 3  => 1
    if (i === 1) return 4;
    if (i === 4) return 2;
    if (i === 2) return 3;
    if (i === 3) return 1;
  };

  const turnRightIdx = (i) => {
    // 동 => 남 => 서 => 북 => 동
    // 1 => 3 => 2 => 4 = > 1
    if (i === 1) return 3;
    if (i === 3) return 2;
    if (i === 2) return 4;
    if (i === 4) return 1;
  };
  // 동 1, 서 2, 남 3, 북 4
  const dirs = [[], [0, 1], [0, -1], [1, 0], [-1, 0]];

  const q = [[sr - 1, sc - 1, sd, 0]];

  while (q.length) {
    const [r, c, d, cnt] = q.shift();

    // go k
    let nr = r;
    let nc = c;
    for (let i = 0; i < 3; i++) {
      nr += dirs[d][0];
      nc += dirs[d][1];
      if (isValid(nr, nc) && input[nr][nc] === 0) {
        if (!v[nr][nc][d]) {
          q.push([nr, nc, d, cnt + 1]);
          v[nr][nc][d] = true;
        }
        if (tr === nr && tc === nc && td === d) return cnt + 1;
      } else break;
    }

    // turn left,right

    const nextLeftD = turnLeftIdx(d);
    if (!v[r][c][nextLeftD]) {
      v[r][c][nextLeftD] = true;
      q.push([r, c, nextLeftD, cnt + 1]);
      if (tr === r && tc === c && td === nextLeftD) return cnt + 1;
    }
    const nextRightD = turnRightIdx(d);
    if (!v[r][c][nextRightD]) {
      v[r][c][nextRightD] = true;
      q.push([r, c, nextRightD, cnt + 1]);
      if (tr === r && tc === c && td === nextRightD) return cnt + 1;
    }
  }
};

console.log(solution());
