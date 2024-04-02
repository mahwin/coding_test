const dirs = { d: [1, 0], l: [0, -1], r: [0, 1], u: [-1, 0] };

function solution(n, m, x, y, r, c, k) {
  let distance = getDistance(x, y, r, c);

  if (distance > k) return "impossible";
  if ((k - distance) % 2 !== 0) return "impossible";

  let result = "";

  const dfs = (curX, curY, remainder, routes) => {
    if (result.length > 0) return;
    if (remainder === 0) {
      if (curX === r && curY === c) {
        result = routes;
      }
      return;
    }

    for (const dir of ["d", "l", "r", "u"]) {
      const nx = curX + dirs[dir][0];
      const ny = curY + dirs[dir][1];
      if (isValid(nx, ny) && getDistance(nx, ny, r, c) <= remainder) {
        dfs(nx, ny, remainder - 1, routes + dir);
      }
    }
  };

  dfs(x, y, k, "");
  return result;
  function isValid(r, c) {
    if (r > n || c > m || r <= 0 || c <= 0) return false;
    return true;
  }
}

function getDistance(r1, c1, r2, c2) {
  return Math.abs(r1 - r2) + Math.abs(c1 - c2);
}
