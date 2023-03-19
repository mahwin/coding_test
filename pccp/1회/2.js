function solution(ability) {
  const peopleN = ability.length;
  const sportsN = ability[0].length;
  const v = Array.from({ length: peopleN }, () => false);
  let max = -Infinity;
  const dfs = (sport, sum) => {
    if (sport === sportsN) {
      max = Math.max(sum, max);
    }
    for (let i = 0; i < peopleN; i++) {
      if (v[i]) continue;
      v[i] = true;
      dfs(sport + 1, sum + ability[i][sport]);
      v[i] = false;
    }
  };
  dfs(0, 0);
  return max;
}

console.log(
  solution([
    [40, 10, 10],
    [20, 5, 0],
    [30, 30, 30],
    [70, 0, 70],
    [100, 100, 100],
  ])
);
