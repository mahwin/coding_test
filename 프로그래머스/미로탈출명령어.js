// 알파벳 d l r u
const dirs = { d: [1, 0], l: [0, -1], r: [0, 1], u: [-1, 0] };
const IMPOSSIBLE = "impossible";

const abs = (x) => Math.abs(x);
const getDistance = (x, y, r, c) => abs(x - r) + abs(y - c);

// 알파벳 순의 dirs로 출구를 찾고 찾은 상태에서 위아래, 아래위, 오른왼, 왼오른 중 하나를 선택해서 나머지를 붙이는 식의 전략을 채택하자.

function solution(n, m, x, y, r, c, k) {
  let result = "";
  const dis = getDistance(x, y, r, c);
  // 떨어진 거리보다 이동할 수 있는 거리가 짧다면 불가능
  // 이동 거리가 더 길더라도 왔다 갔다가 되어야 해서 거리의 차 % 2가 1이면 불가능
  if (dis > k || (k - dis) % 2) return IMPOSSIBLE;

  [x, y, r, c] = [x - 1, y - 1, r - 1, c - 1];

  let flag = false;
  function dfs(route, curX, curY) {
    if (flag) return;
    if (route.length > k) return;

    if (curX === r && curY === c && route.length === k) {
      flag = true;
      result = route;
      return;
    }

    for (const key in dirs) {
      const nextX = dirs[key][0] + curX;
      const nextY = dirs[key][1] + curY;

      if (
        isValid(nextX, nextY) &&
        getDistance(nextX, nextY, r, c) <= k - route.length
      ) {
        dfs(route + key, nextX, nextY);
      }
    }
  }

  function isValid(curX, curY) {
    if (curX >= n || curY >= m || curX < 0 || curY < 0) return false;
    return true;
  }

  dfs("", x, y);
  return result;
}
