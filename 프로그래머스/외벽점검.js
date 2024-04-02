function solution(n, weak, dist) {
  const distLen = dist.length;
  const weakLen = weak.length;

  const v = Array.from({ length: distLen }, () => 0);
  let result = Infinity;

  const weakArr = weak.concat(weak.map((el) => el + n));

  const search = (distArr) => {
    for (let i = 0; i < weakArr.length - weakLen; i++) {
      let distP = 0;
      let cover = weakArr[i] + distArr[distP];
      let canCheck = true;
      for (let j = 0; j < weakLen; j++) {
        if (cover >= weakArr[i + j]) continue;
        if (distP + 1 < distArr.length)
          cover = weakArr[i + j] + distArr[++distP];
        else {
          canCheck = false;
          break;
        }
      }
      if (canCheck) return true;
    }
  };

  const dfs = (next, disArr) => {
    if (search(disArr)) {
      result = Math.min(result, disArr.length);
    }

    if (next === distLen || next > result) {
      return;
    }

    for (let i = 0; i < distLen; i++) {
      if (v[i]) continue;
      v[i] = true;
      dfs(next + 1, disArr.concat(dist[i]));
      v[i] = false;
    }
  };

  dfs(0, []);

  return result === Infinity ? -1 : result;
}
