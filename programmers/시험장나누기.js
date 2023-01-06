function solution(k, num, links) {
  let l = Array.from({ length: num.length + 1 }, () => 0);
  let r = Array.from({ length: num.length + 1 }, () => 0);
  let x = Array.from({ length: num.length + 1 }, () => 0); //응시 인원
  let p = Array.from({ length: num.length + 1 }, () => -1); //부모 노드
  let root = 0; //누드 노드
  let cnt = 0;

  for (let i = 0; i < num.length; i++) {
    [l[i], r[i]] = [...links[i]];
    x[i] = num[i];
    if (l[i] !== -1) p[l[i]] = i;
    if (r[i] !== -1) p[r[i]] = i;
  }

  //root 노드 찾기
  for (let i = 0; i < p.length; i++) {
    if (p[i] === -1) {
      root = i;
      break;
    }
  }

  const calGroupCnt = (limit) => {
    cnt = 0;
    dfs(root, limit);
    cnt += 1; // 2번 자르면 3개의 그룹이 됨
    return cnt;
  };

  const dfs = (node, limit) => {
    let lv = 0;

    if (l[node] !== -1) {
      lv = dfs(l[node], limit);
    }
    let rv = 0;
    if (r[node] !== -1) {
      rv = dfs(r[node], limit);
    }

    if (x[node] + lv + rv <= limit) return x[node] + lv + rv;
    if (x[node] + Math.min(lv, rv) <= limit) {
      cnt += 1;
      return x[node] + Math.min(lv, rv);
    }
    cnt += 2;
    return x[node];
  };

  let [left, right] = [Math.max(...num), num.reduce((a, b) => a + b)];
  while (left <= right) {
    mid = Math.floor((left + right) / 2);

    if (calGroupCnt(mid) <= k) {
      right = mid - 1;
    } else left = mid + 1;
  }

  return left;
}

console.log(
  solution(
    3,
    [12, 30, 1, 8, 8, 6, 20, 7, 5, 10, 4, 1],
    [
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [8, 5],
      [2, 10],
      [3, 0],
      [6, 1],
      [11, -1],
      [7, 4],
      [-1, -1],
      [-1, -1],
    ]
  )
);
