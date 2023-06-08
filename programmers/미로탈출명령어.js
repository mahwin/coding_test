const dirObj = { d: [1, 0], l: [0, -1], r: [0, 1], u: [-1, 0] }; //d l r u 사전 순

const canGo = (x, y, r, c, k) => {
  let cnt = Math.abs(r - x) + Math.abs(c - y);
  if (cnt % 2 !== k % 2 || cnt > k) return false;
  else return true;
};

function solution(n, m, x, y, r, c, k) {
  if (!canGo(x, y, r, c, k)) return "impossible";

  const isValid = (row, col) => {
    // 경계 체크
    if (row >= n || col >= m || row < 0 || col < 0) return false;
    return true;
  };
  let possible = "";
  const tmp = [];

  const dfs = (row, col, cnt) => {
    if (possible.length) return;

    if (cnt === k && row === r - 1 && col === c - 1) possible = tmp.join("");

    for (const d of Object.keys(dirObj)) {
      const nr = row + dirObj[d][0];
      const nc = col + dirObj[d][1];
      const dist = Math.abs(r - 1 - nr) + Math.abs(c - 1 - nc);
      if (isValid(nr, nc) && dist <= k - cnt) {
        tmp.push(d);
        dfs(nr, nc, cnt + 1);
        tmp.pop();
      }
    }
  };
  dfs(x - 1, y - 1, 0);
  return possible;
}
