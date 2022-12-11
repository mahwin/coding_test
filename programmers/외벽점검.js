function solution(n, weak, dist) {
  const visited = Array.from({ length: dist.length }, () => false);

  const permutation = (target, n, tmp) => {
    if (target === tmp.length) {
      perArr.push([...tmp]);
      return;
    }
    for (let i = 0; i < n; i++) {
      if (visited[i]) continue;
      visited[i] = true;
      tmp.push(i);
      permutation(target, n, tmp);
      visited[i] = false;
      tmp.pop();
    }
  };

  let perArr = [];
  for (let i = 1; i <= n; i++) {
    permutation(i, dist.length, []);
  }

  let speadWeak = Array.from({ length: weak.length * 2 }, () => undefined);
  weak.forEach((w, i) => {
    speadWeak[i] = w;
    speadWeak[i + weak.length] = w + n;
  });

  const roots = Array.from({ length: weak.length }, () => []);
  for (let i = 0; i < weak.length; i++) {
    roots[i] = speadWeak.slice(i, weak.length + i);
  }

  for (let per of perArr) {
    for (let root of roots) {
      let worker = per.map((p) => dist[p]);
      let answer = worker.length;

      while (worker.length !== 0 && root.length !== 0) {
        start = root[0] + worker.shift();

        root = root.filter((r) => start < r);
      }

      if (!root.length) return answer;
    }
  }
  return -1;
}

console.log(solution(12, [1, 5, 6, 10], [1, 2, 3, 4]));
