function solution(n) {
  let result = 0;
  const dfs = (cSet, dSet1, dSet2, nextRow) => {
    if (nextRow === n) {
      result++;
      return;
    }

    for (let c = 0; c < n; c++) {
      if (cSet.has(c)) continue;
      const sumDia = c + nextRow;
      const diffDia = c - nextRow;
      if (dSet1.has(sumDia) || dSet2.has(diffDia)) continue;

      dfs(
        new Set([...cSet, c]),
        new Set([...dSet1, sumDia]),
        new Set([...dSet2, diffDia]),
        nextRow + 1
      );
    }
  };

  dfs(new Set(), new Set(), new Set(), 0);
  return result;
}
