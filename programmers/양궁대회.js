function solution(n, info) {
  const ryan = Array.from({ length: 11 }, () => 0);
  const result = [0, []]; // [score, 과녁 맞춘 배열];
  const cal = (apeach, ryan) => {
    let score = 0;
    for (let i = 0; i < 10; i++) {
      if (apeach[i] === 0 && ryan[i] === 0) continue;
      score += apeach[i] < ryan[i] ? 10 - i : i - 10;
    }
    return score;
  };

  const dfs = (node, cnt) => {
    if (node === -1 && cnt === 0) {
      const score = cal(info, ryan);
      if (score > result[0]) {
        result[0] = score;
        result[1] = [...ryan];
      }
      return;
    } else if (node === -1) return;

    for (let i = cnt; i > -1; i--) {
      ryan[node] = i;
      dfs(node - 1, cnt - i);
    }
  };
  dfs(10, n);

  return result[0] > 0 ? result[1] : [-1];
}
console.log(solution(10, [0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 3]));
