function solution(k, dungeons) {
  const len = dungeons.length;
  const visited = Array.from({ length: len }, () => false);
  let max = -Infinity;
  const dfs = (piro, cnt) => {
    max = Math.max(cnt, max);
    for (let i = 0; i < len; i++) {
      if (visited[i]) continue;
      if (dungeons[i][0] <= piro) {
        visited[i] = true;
        dfs(piro - dungeons[i][1], cnt + 1);
        visited[i] = false;
      }
    }
  };
  dfs(k, 0);
  return max;
}
